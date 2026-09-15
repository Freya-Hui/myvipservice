import { isAuthorized } from './lib/admin-auth.mjs';
import { getOrder, updateOrder } from './lib/orders.mjs';
import { sendDriverInfoEmail, driverInfoMessageText } from './lib/email.mjs';

// Manual override for the scheduled sweep (send-driver-info-sweep.mjs) —
// lets her send driver info immediately regardless of the 5-hours-before
// timing, e.g. for a last-minute confirmation or an older order that
// predates collecting a startTime for every service type.
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

  const order = await getOrder(body.orderId);
  if (!order || !order.vehicleInfo) {
    return { statusCode: 400, body: JSON.stringify({ error: 'no_vehicle_assigned' }) };
  }

  await sendDriverInfoEmail(order);
  await updateOrder(order.id, {
    status: 'driver_info_sent',
    driverInfoSentAt: new Date().toISOString(),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      whatsappPhone: order.booking.phone,
      whatsappMessage: driverInfoMessageText(order),
    }),
  };
};
