import { isAuthorized } from './lib/admin-auth.mjs';

// Cheap session check with no data behind it — used by /admin/ (the
// landing page) to decide whether to show the login gate or the menu,
// without piggybacking on a data endpoint like admin-orders just for its
// 401/200 side effect.
export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !isAuthorized(event, adminPassword)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'unauthorized' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
