import { isAuthorized } from './lib/admin-auth.mjs';
import { deleteOrder } from './lib/orders.mjs';

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

  if (!body.orderId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'orderId_required' }) };
  }

  await deleteOrder(body.orderId);
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
