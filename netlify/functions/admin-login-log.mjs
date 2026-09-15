import { isAuthorized } from './lib/admin-auth.mjs';
import { listLoginAttempts } from './lib/login-log.mjs';

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !isAuthorized(event, adminPassword)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'unauthorized' }) };
  }

  const attempts = await listLoginAttempts();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ attempts }),
  };
};
