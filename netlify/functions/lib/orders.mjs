import { blobStore } from './blob-store.mjs';

const STORE_NAME = 'orders';

function store() {
  return blobStore(STORE_NAME);
}

export async function createOrder(order) {
  await store().setJSON(order.id, order);
  return order;
}

export async function getOrder(id) {
  return store().get(id, { type: 'json' });
}

export async function updateOrder(id, patch) {
  const current = await getOrder(id);
  if (!current) return null;
  const updated = { ...current, ...patch };
  await store().setJSON(id, updated);
  return updated;
}

export async function deleteOrder(id) {
  await store().delete(id);
}

export async function listOrders() {
  const { blobs } = await store().list();
  const orders = await Promise.all(blobs.map((b) => store().get(b.key, { type: 'json' })));
  return orders.filter(Boolean).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

// Every service type now collects a pickup/start time (airport included,
// as of the widget's "接机也要选时间" update), so this works generically —
// returns null only if a booking is somehow missing date or startTime.
export function departureDateTime(booking) {
  if (!booking.date || !booking.startTime) return null;
  return new Date(`${booking.date}T${booking.startTime}:00`);
}

export function isWithinHoursOfDeparture(booking, hours) {
  const departure = departureDateTime(booking);
  if (!departure) return false;
  return Date.now() >= departure.getTime() - hours * 60 * 60 * 1000;
}
