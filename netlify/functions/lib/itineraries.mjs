import { randomUUID } from 'node:crypto';
import { blobStore } from './blob-store.mjs';

const STORE_NAME = 'itineraries';

function store() {
  return blobStore(STORE_NAME);
}

// Most-recently-touched first — more useful for a staff tool than
// alphabetical-by-title (matches lib/orders.mjs's listOrders convention).
export async function listItineraries() {
  const { blobs } = await store().list();
  const itineraries = await Promise.all(blobs.map((b) => store().get(b.key, { type: 'json' })));
  return itineraries.filter(Boolean).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export async function listItinerariesByClient(clientId) {
  const itineraries = await listItineraries();
  return itineraries.filter((itinerary) => itinerary.clientId === clientId);
}

export async function getItinerary(id) {
  return store().get(id, { type: 'json' });
}

// days/items ids are generated client-side (crypto.randomUUID()) and the
// whole itinerary saves as one JSON blob per submit — no per-day/per-item
// network round trip.
export async function saveItinerary(itinerary) {
  const id = itinerary.id || randomUUID();
  const existing = itinerary.id ? await getItinerary(id) : null;
  const record = {
    id,
    clientId: itinerary.clientId,
    title: itinerary.title,
    status: itinerary.status || 'draft',
    startDate: itinerary.startDate || '',
    endDate: itinerary.endDate || '',
    days: itinerary.days || [],
    flights: itinerary.flights || [],
    // Chauffeured private-car service, not self-drive rental — MYVIPSERVICE
    // always provides a driver, so "charter" matches the actual business.
    charters: itinerary.charters || [],
    todos: itinerary.todos || [],
    // Metadata only ({id, fileName, uploadedAt}) — file bytes live in the
    // separate itinerary-ticket-files store, see lib/ticket-files.mjs.
    tickets: itinerary.tickets || [],
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await store().setJSON(id, record);
  return record;
}

export async function deleteItinerary(id) {
  await store().delete(id);
}
