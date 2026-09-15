import { isAuthorized } from './lib/admin-auth.mjs';
import { getTicketFile } from './lib/ticket-files.mjs';

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !isAuthorized(event, adminPassword)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'unauthorized' }) };
  }

  const id = event.queryStringParameters?.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'id_required' }) };
  }

  const file = await getTicketFile(id);
  if (!file) {
    return { statusCode: 404, body: JSON.stringify({ error: 'ticket_file_not_found' }) };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': file.contentType || 'application/pdf',
      'Content-Disposition': 'inline',
      'Cache-Control': 'private, no-store',
    },
    body: Buffer.from(file.data).toString('base64'),
    isBase64Encoded: true,
  };
};
