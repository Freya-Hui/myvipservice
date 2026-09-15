import { isAuthorized } from './lib/admin-auth.mjs';
import { saveItinerary } from './lib/itineraries.mjs';

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

  if (!body.title || !body.title.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'title_required' }) };
  }

  if (!body.clientId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'clientId_required' }) };
  }

  const itinerary = await saveItinerary(body);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itinerary }),
  };
};
