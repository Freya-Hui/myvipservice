import Stripe from 'stripe';
import { isAuthorized } from './lib/admin-auth.mjs';
import { getOrder, updateOrder } from './lib/orders.mjs';
import { sendRefundApologyEmail } from './lib/email.mjs';

// "Unable to arrange a vehicle" path — issues a full Stripe refund and
// sends the apology email, with an optional admin-authored note (e.g. an
// alternative arrangement) appended. order.id is the Stripe Checkout
// Session id, not a payment_intent, so the session has to be retrieved
// first to find what to actually refund.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!adminPassword || !isAuthorized(event, adminPassword)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'unauthorized' }) };
  }
  if (!stripeSecretKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'stripe_not_configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  const { orderId, note } = body;
  if (!orderId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'orderId_required' }) };
  }

  const order = await getOrder(orderId);
  if (!order) {
    return { statusCode: 404, body: JSON.stringify({ error: 'order_not_found' }) };
  }

  const stripe = new Stripe(stripeSecretKey);
  try {
    const session = await stripe.checkout.sessions.retrieve(orderId);
    if (!session.payment_intent) {
      return { statusCode: 400, body: JSON.stringify({ error: 'not_paid' }) };
    }
    await stripe.refunds.create({ payment_intent: session.payment_intent });
  } catch (err) {
    console.error('Stripe refund failed', err);
    return { statusCode: 502, body: JSON.stringify({ error: 'stripe_refund_failed' }) };
  }

  const updated = await updateOrder(orderId, {
    status: 'refunded',
    refundedAt: new Date().toISOString(),
    refundNote: note || '',
  });

  try {
    await sendRefundApologyEmail(updated, note || '');
  } catch (err) {
    console.error('Failed to send refund apology email', err);
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
