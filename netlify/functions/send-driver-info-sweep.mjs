import { listOrders, updateOrder, isWithinHoursOfDeparture } from './lib/orders.mjs';
import { sendDriverInfoEmail } from './lib/email.mjs';

// Runs on a schedule (see netlify.toml) rather than being called directly.
// Every service type collects a pickup/start time now, so this applies
// uniformly — an order only gets skipped here if it's missing that field
// (e.g. one placed before that was true), in which case the manual "Send
// driver info" button on /admin/orders is the fallback.
export default async () => {
  const orders = await listOrders();
  const due = orders.filter(
    (order) => order.status === 'vehicle_confirmed' && isWithinHoursOfDeparture(order.booking, 5),
  );

  for (const order of due) {
    try {
      await sendDriverInfoEmail(order);
      await updateOrder(order.id, {
        status: 'driver_info_sent',
        driverInfoSentAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to send scheduled driver info email for order', order.id, err);
    }
  }

  return new Response(JSON.stringify({ sent: due.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
