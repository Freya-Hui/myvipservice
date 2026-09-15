import { isAuthorized } from './lib/admin-auth.mjs';
import { updateOrder } from './lib/orders.mjs';
import { sendOrderConfirmedEmail } from './lib/email.mjs';

// The lightweight "we've found you a vehicle" confirmation, sent within the
// 24-hour window after payment — distinct from admin-confirm-vehicle.mjs,
// which assigns the actual driver/vehicle details closer to departure.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !isAuthorized(event, adminPassword)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'unauthorized' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  const { orderId } = body;
  if (!orderId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'orderId_required' }) };
  }

  const order = await updateOrder(orderId, {
    status: 'order_confirmed',
    orderConfirmedAt: new Date().toISOString(),
  });
  if (!order) {
    return { statusCode: 404, body: JSON.stringify({ error: 'order_not_found' }) };
  }

  try {
    await sendOrderConfirmedEmail(order);
  } catch (err) {
    console.error('Failed to send order-confirmed email', err);
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
