import { blobStore } from './blob-store.mjs';

// Separate from the `itineraries` store so an itinerary's own JSON blob
// stays light regardless of how many ticket PDFs get attached to it.
const STORE_NAME = 'itinerary-ticket-files';

function store() {
  return blobStore(STORE_NAME);
}

export async function saveTicketFile(id, base64Content, contentType) {
  const buffer = Buffer.from(base64Content, 'base64');
  await store().set(id, buffer, { metadata: { contentType } });
}

export async function getTicketFile(id) {
  const result = await store().getWithMetadata(id, { type: 'arrayBuffer' });
  if (!result) return null;
  return { data: result.data, contentType: result.metadata.contentType };
}

export async function deleteTicketFile(id) {
  await store().delete(id);
}
