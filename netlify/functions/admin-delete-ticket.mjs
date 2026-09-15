import { isAuthorized } from './lib/admin-auth.mjs';
import { getItinerary, saveItinerary } from './lib/itineraries.mjs';
import { deleteTicketFile } from './lib/ticket-files.mjs';

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

  const { itineraryId, ticketId } = body;
  if (!itineraryId || !ticketId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'itineraryId_and_ticketId_required' }),
    };
  }

  const itinerary = await getItinerary(itineraryId);
  if (!itinerary) {
    return { statusCode: 404, body: JSON.stringify({ error: 'itinerary_not_found' }) };
  }

  const updated = await saveItinerary({
    ...itinerary,
    tickets: (itinerary.tickets || []).filter((t) => t.id !== ticketId),
  });
  await deleteTicketFile(ticketId);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itinerary: updated }),
  };
};
