import { listOrders, deleteOrder } from './lib/orders.mjs';

// Runs daily (see netlify.toml). An 'expired' order (checkout session timed
// out unpaid) stays around briefly so staff can still notice and reprice/
// revive it from /admin/orders, but there's no reason to keep a would-be
// customer's name, phone, and address on file indefinitely for a booking
// that never happened — purge it once that window has clearly passed.
const RETENTION_DAYS = 14;

export default async () => {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const orders = await listOrders();
  const stale = orders.filter(
    (order) => order.status === 'expired' && new Date(order.createdAt).getTime() < cutoff,
  );

  for (const order of stale) {
    try {
      await deleteOrder(order.id);
    } catch (err) {
      console.error('Failed to delete stale expired order', order.id, err);
    }
  }

  return new Response(JSON.stringify({ deleted: stale.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
