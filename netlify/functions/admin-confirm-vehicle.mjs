import { isAuthorized } from './lib/admin-auth.mjs';
import { updateOrder, isWithinHoursOfDeparture } from './lib/orders.mjs';
import { sendDriverInfoEmail, driverInfoMessageText } from './lib/email.mjs';

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

  const { orderId, driverName, driverPhone, vehicleDescription } = body;
  if (!orderId || !driverName || !driverPhone || !vehicleDescription) {
    return { statusCode: 400, body: JSON.stringify({ error: 'missing_fields' }) };
  }

  const order = await updateOrder(orderId, {
    status: 'vehicle_confirmed',
    vehicleInfo: { driverName, driverPhone, vehicleDescription },
  });
  if (!order) {
    return { statusCode: 404, body: JSON.stringify({ error: 'order_not_found' }) };
  }

  // A last-minute confirmation (already inside the 5-hour window by the
  // time she assigns a driver) shouldn't wait for the next scheduled sweep.
  if (isWithinHoursOfDeparture(order.booking, 5)) {
    try {
      await sendDriverInfoEmail(order);
      await updateOrder(orderId, {
        status: 'driver_info_sent',
        driverInfoSentAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to send immediate driver info email', err);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      whatsappPhone: order.booking.phone,
      whatsappMessage: driverInfoMessageText(order),
    }),
  };
};
