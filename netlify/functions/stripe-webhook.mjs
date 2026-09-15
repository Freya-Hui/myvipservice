import Stripe from 'stripe';
import { getOrder, updateOrder } from './lib/orders.mjs';
import {
  sendPaymentConfirmationEmail,
  sendInternalBookingNotification,
  sendSurchargePaymentConfirmationEmail,
  sendSurchargeInternalNotification,
} from './lib/email.mjs';

// Fires the same Netlify Forms submission (and therefore the same
// contact@myvipservice.com email notification) that a custom-quote booking
// triggers immediately on submit — but only once Stripe confirms this paid
// booking actually went through. Reaching the Stripe-hosted checkout page
// is not proof of payment; this webhook is.
function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`)
    .join('&');
}

async function submitLeadRecord(session) {
  const meta = session.metadata || {};
  const data = {
    'form-name': 'car-booking',
    paymentStatus: 'paid',
    amountPaid: `€${((session.amount_total ?? 0) / 100).toFixed(2)}`,
    stripeSessionId: session.id,
    email: session.customer_details?.email || session.customer_email || '',
    ...meta,
  };

  const response = await fetch('https://myvipservice.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeFormData(data),
  });
  if (!response.ok) {
    throw new Error(`Netlify Forms submission failed: ${response.status}`);
  }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!webhookSecret || !stripeSecretKey) {
    return { statusCode: 500, body: 'stripe_not_configured' };
  }

  const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  const rawBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;

  const stripe = new Stripe(stripeSecretKey);
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed', err);
    return { statusCode: 400, body: 'invalid_signature' };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    try {
      await submitLeadRecord(session);
    } catch (err) {
      console.error('Failed to record paid booking lead', err);
      // Still acknowledge the webhook — Stripe would otherwise retry, and
      // the payment itself already succeeded regardless of this record.
    }

    const order = await updateOrder(session.id, {
      status: 'paid',
      paidAt: new Date().toISOString(),
    });
    if (order && order.productType === 'surcharge') {
      try {
        await sendSurchargePaymentConfirmationEmail(order);
      } catch (err) {
        console.error('Failed to send surcharge payment confirmation email', err);
      }
      try {
        await sendSurchargeInternalNotification(order);
      } catch (err) {
        console.error('Failed to send surcharge internal notification', err);
      }
    } else if (order) {
      try {
        await sendPaymentConfirmationEmail(order);
      } catch (err) {
        console.error('Failed to send payment confirmation email', err);
      }
      try {
        await sendInternalBookingNotification(order.booking, {
          amountPaid: `€${order.amountTotal.toFixed(2)}`,
        });
      } catch (err) {
        console.error('Failed to send internal booking notification', err);
      }
    } else {
      console.error('No order record found for paid session', session.id);
    }
  }

  if (stripeEvent.type === 'checkout.session.expired') {
    const session = stripeEvent.data.object;
    // admin-reprice-order.mjs deliberately expires the old session on
    // Stripe's side when it creates a replacement, but it also deletes that
    // order's record immediately — so by the time this fires for a
    // repriced-away session, getOrder() already returns null and there's
    // nothing to clobber. Only a genuinely abandoned (never repriced,
    // never paid) session still has a 'pending_payment' record to update.
    const existing = await getOrder(session.id);
    if (existing && existing.status === 'pending_payment') {
      await updateOrder(session.id, { status: 'expired' });
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
