import { getOrder } from './lib/orders.mjs';

// Public and unauthenticated by design — access control is "you have the
// link" (the order id is an unguessable Stripe session id), the same model
// a courier tracking link or a Stripe receipt link uses. Only returns the
// fields a customer needs to see their own booking status, not the full
// admin record (no notes, no raw phone formatting details beyond what they
// already gave us, etc. — though there's nothing especially sensitive here
// either way since it's their own data).
export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const ref = event.queryStringParameters?.ref;
  if (!ref) {
    return { statusCode: 400, body: JSON.stringify({ error: 'missing_ref' }) };
  }

  // A repriced order's old record is deleted outright once the new one
  // exists (see admin-reprice-order.mjs) — nothing keeps its personal data
  // around just to redirect an old link, so an old link here simply 404s.
  const current = await getOrder(ref);

  if (!current) {
    return { statusCode: 404, body: JSON.stringify({ error: 'not_found' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({
      status: current.status,
      amountTotal: current.amountTotal,
      booking: {
        locale: current.booking.locale,
        serviceType: current.booking.serviceType,
        city: current.booking.city,
        date: current.booking.date,
        startTime: current.booking.startTime,
      },
      vehicleInfo: current.vehicleInfo,
    }),
  };
};
