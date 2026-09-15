import Stripe from 'stripe';
import { isAuthorized } from './lib/admin-auth.mjs';
import { getOrder, createOrder } from './lib/orders.mjs';
import { createBookingCheckoutSession, surchargeProductDetails } from './lib/checkout.mjs';
import { sendSurchargePaymentLinkEmail, surchargePaymentLinkMessageText } from './lib/email.mjs';

// Hours/days running over a charter or hourly chauffeur booking need a
// second, separate payment — the original order is already paid and stays
// untouched, this creates its own Stripe session tied back to it via
// booking.relatedOrderId. Admin-only: settling it is still a manual "the
// driver and client agreed on X hours over" step, not a self-serve flow.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !isAuthorized(event, adminPassword)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'unauthorized' }) };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'stripe_not_configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  const { orderId, amount: amountRaw, note } = body;
  const amount = Number(amountRaw);
  if (!orderId || !amount || amount <= 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_amount' }) };
  }

  const originalOrder = await getOrder(orderId);
  if (!originalOrder) {
    return { statusCode: 404, body: JSON.stringify({ error: 'order_not_found' }) };
  }

  const booking = {
    locale: originalOrder.booking.locale,
    name: originalOrder.booking.name,
    email: originalOrder.booking.email,
    phone: originalOrder.booking.phone,
    preferredContactMethod: originalOrder.booking.preferredContactMethod,
    originalDate: originalOrder.booking.date,
    note: note || '',
    relatedOrderId: orderId,
  };

  const origin =
    event.headers.origin || `https://${event.headers.host}` || 'https://myvipservice.com';
  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await createBookingCheckoutSession(stripe, {
      booking,
      amountEuros: amount,
      origin,
      ...surchargeProductDetails(booking),
    });

    const newOrder = {
      id: session.id,
      status: 'pending_payment',
      productType: 'surcharge',
      createdAt: new Date().toISOString(),
      paidAt: null,
      amountTotal: amount,
      vehicleInfo: null,
      driverInfoSentAt: null,
      booking,
    };
    await createOrder(newOrder);

    try {
      await sendSurchargePaymentLinkEmail(newOrder, session.url);
    } catch (err) {
      console.error('Failed to email surcharge payment link', err);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: session.url,
        whatsappPhone: booking.phone,
        whatsappMessage: surchargePaymentLinkMessageText(newOrder, session.url),
      }),
    };
  } catch (err) {
    console.error('Failed to create surcharge checkout session', err);
    return { statusCode: 502, body: JSON.stringify({ error: 'stripe_error' }) };
  }
};
