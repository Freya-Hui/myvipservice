import { isAuthorized } from './lib/admin-auth.mjs';
import { saveClient, findClientByWechatId } from './lib/clients.mjs';

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

  if (!body.name || !body.name.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'name_required' }) };
  }

  if (!body.wechatId || !body.wechatId.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'wechatId_required' }) };
  }

  const duplicate = await findClientByWechatId(body.wechatId, body.id || null);
  if (duplicate) {
    return {
      statusCode: 409,
      body: JSON.stringify({ error: 'wechatId_duplicate', existing: duplicate }),
    };
  }

  const client = await saveClient(body);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client }),
  };
};
