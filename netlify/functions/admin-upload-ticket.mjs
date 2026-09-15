import { randomUUID } from 'node:crypto';
import { isAuthorized } from './lib/admin-auth.mjs';
import { getItinerary, saveItinerary } from './lib/itineraries.mjs';
import { saveTicketFile } from './lib/ticket-files.mjs';

// Netlify's synchronous function invocation caps the request body around
// 6MB; base64 inflates the original file by ~4/3, so this is a conservative
// ceiling that leaves room for the rest of the JSON payload. Rejecting here
// gives a clear "file too large" error instead of letting Netlify fail the
// request at a lower level.
const MAX_DECODED_BYTES = 4 * 1024 * 1024;

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

  const { itineraryId, fileName, contentType, base64Content } = body;
  if (!itineraryId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'itineraryId_required' }) };
  }
  if (!fileName || !fileName.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'fileName_required' }) };
  }
  if (!base64Content) {
    return { statusCode: 400, body: JSON.stringify({ error: 'file_required' }) };
  }
  if (base64Content.length * 0.75 > MAX_DECODED_BYTES) {
    return { statusCode: 400, body: JSON.stringify({ error: 'file_too_large' }) };
  }

  const itinerary = await getItinerary(itineraryId);
  if (!itinerary) {
    return { statusCode: 404, body: JSON.stringify({ error: 'itinerary_not_found' }) };
  }

  const ticketId = randomUUID();
  await saveTicketFile(ticketId, base64Content, contentType || 'application/pdf');

  const ticket = { id: ticketId, fileName: fileName.trim(), uploadedAt: new Date().toISOString() };
  const updated = await saveItinerary({
    ...itinerary,
    tickets: [...(itinerary.tickets || []), ticket],
  });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itinerary: updated }),
  };
};
