import Stripe from 'stripe';
import { isAuthorized } from './lib/admin-auth.mjs';
import { getOrder, createOrder, deleteOrder } from './lib/orders.mjs';
import {
  createBookingCheckoutSession,
  chauffeurProductDetails,
  terminalProductDetails,
  surchargeProductDetails,
  ticketProductDetails,
  hotelProductDetails,
  vipReceptionProductDetails,
} from './lib/checkout.mjs';
import {
  sendUpdatedPaymentLinkEmail,
  updatedPaymentLinkMessageText,
  sendQuoteReadyEmail,
  quoteReadyMessageText,
  sendTerminalQuoteReadyEmail,
  terminalQuoteReadyMessageText,
  sendTicketQuoteReadyEmail,
  ticketQuoteReadyMessageText,
  sendHotelQuoteReadyEmail,
  hotelQuoteReadyMessageText,
  sendVipReceptionQuoteReadyEmail,
  vipReceptionQuoteReadyMessageText,
} from './lib/email.mjs';

// Stripe Checkout Sessions are immutable once created — there's no "edit
// the amount" API. This expires the old session (a no-op, logged and
// ignored, for a 'quote_requested' order — its id was never a real Stripe
// session) and creates a fresh one at the new price, carrying over the same
// booking details, then emails the customer the new link so they don't
// have to fill the form again. A first-time quote gets its own email
// wording (states the price plainly) rather than the "updated" wording
// used for an actual reprice of an already-priced order.
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

  const { orderId, newAmount } = body;
  const amount = Number(newAmount);
  if (!orderId || !amount || amount <= 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_amount' }) };
  }

  const order = await getOrder(orderId);
  if (!order) {
    return { statusCode: 404, body: JSON.stringify({ error: 'order_not_found' }) };
  }
  const REPRICEABLE_STATUSES = ['pending_payment', 'expired', 'quote_requested'];
  if (!REPRICEABLE_STATUSES.includes(order.status)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'order_not_repriceable' }) };
  }
  const isFirstQuote = order.status === 'quote_requested';

  const stripe = new Stripe(stripeSecretKey);
  if (!isFirstQuote) {
    try {
      await stripe.checkout.sessions.expire(order.id);
    } catch (err) {
      // Already expired/completed on Stripe's side — fine, proceed anyway.
      console.error('Could not expire old session (may already be closed)', err);
    }
  }

  const origin =
    event.headers.origin || `https://${event.headers.host}` || 'https://myvipservice.com';
  const isTerminal = order.productType === 'private-terminal';
  const isSurcharge = order.productType === 'surcharge';
  const isTicket = order.productType === 'tickets-museum';
  const isHotel = order.productType === 'accommodation-inquiry';
  const isVipReception = order.productType === 'vip-reception';
  const productDetails = isSurcharge
    ? surchargeProductDetails(order.booking)
    : isTerminal
      ? terminalProductDetails(order.booking)
      : isTicket
        ? ticketProductDetails(order.booking)
        : isHotel
          ? hotelProductDetails(order.booking)
          : isVipReception
            ? vipReceptionProductDetails(order.booking)
            : chauffeurProductDetails(order.booking);

  try {
    const session = await createBookingCheckoutSession(stripe, {
      booking: order.booking,
      amountEuros: amount,
      origin,
      ...productDetails,
    });

    // The old record's job ends here — its own booking data (name, phone,
    // address, notes) has already been carried over onto the new order
    // below, so there's no reason to keep a second, now-dead copy of the
    // customer's personal details around under the old session id.
    await deleteOrder(order.id);
    await createOrder({
      ...order,
      id: session.id,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      paidAt: null,
      amountTotal: amount,
      supersedes: order.id,
    });

    const newOrder = { ...order, id: session.id, amountTotal: amount };
    try {
      if (isFirstQuote && isTerminal) {
        await sendTerminalQuoteReadyEmail(newOrder, session.url);
      } else if (isFirstQuote && isTicket) {
        await sendTicketQuoteReadyEmail(newOrder, session.url);
      } else if (isFirstQuote && isHotel) {
        await sendHotelQuoteReadyEmail(newOrder, session.url);
      } else if (isFirstQuote && isVipReception) {
        await sendVipReceptionQuoteReadyEmail(newOrder, session.url);
      } else if (isFirstQuote) {
        await sendQuoteReadyEmail(newOrder, session.url);
      } else {
        await sendUpdatedPaymentLinkEmail(newOrder, session.url);
      }
    } catch (err) {
      console.error('Failed to email payment link', err);
    }

    let whatsappMessage;
    if (isFirstQuote && isTerminal) {
      whatsappMessage = terminalQuoteReadyMessageText(newOrder, session.url);
    } else if (isFirstQuote && isTicket) {
      whatsappMessage = ticketQuoteReadyMessageText(newOrder, session.url);
    } else if (isFirstQuote && isHotel) {
      whatsappMessage = hotelQuoteReadyMessageText(newOrder, session.url);
    } else if (isFirstQuote && isVipReception) {
      whatsappMessage = vipReceptionQuoteReadyMessageText(newOrder, session.url);
    } else if (isFirstQuote) {
      whatsappMessage = quoteReadyMessageText(newOrder, session.url);
    } else {
      whatsappMessage = updatedPaymentLinkMessageText(newOrder, session.url);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: session.url,
        whatsappPhone: order.booking.phone,
        whatsappMessage,
      }),
    };
  } catch (err) {
    console.error('Failed to create repriced checkout session', err);
    return { statusCode: 502, body: JSON.stringify({ error: 'stripe_error' }) };
  }
};
