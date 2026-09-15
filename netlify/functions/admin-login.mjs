import { timingSafeEqual } from 'node:crypto';
import { createSessionCookie } from './lib/admin-auth.mjs';
import { recordLoginAttempt, listLoginAttempts } from './lib/login-log.mjs';

function clientInfo(event) {
  return {
    ip: event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'unknown',
    userAgent: event.headers['user-agent'] || '',
  };
}

// No CAPTCHA on this form (kept out deliberately — it can be unreliable from
// mainland China), so this is the only thing standing between the password
// and a brute-force script. Reuses the login log that already exists for
// the audit trail rather than a second blob store just for counting.
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_THRESHOLD = 8;

async function isLockedOut(ip) {
  if (!ip || ip === 'unknown') return false;
  const cutoff = Date.now() - LOCKOUT_WINDOW_MS;
  const attempts = await listLoginAttempts();
  const recentFailures = attempts.filter(
    (a) => a.ip === ip && !a.success && new Date(a.at).getTime() >= cutoff,
  );
  return recentFailures.length >= LOCKOUT_THRESHOLD;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { statusCode: 500, body: JSON.stringify({ error: 'admin_not_configured' }) };
  }

  const info = clientInfo(event);
  if (await isLockedOut(info.ip)) {
    return { statusCode: 429, body: JSON.stringify({ error: 'too_many_attempts' }) };
  }

  let name = '';
  let password = '';
  try {
    const body = JSON.parse(event.body || '{}');
    name = (body.name || '').trim().slice(0, 100);
    password = body.password || '';
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  const given = Buffer.from(password);
  const expected = Buffer.from(adminPassword);
  const match = given.length === expected.length && timingSafeEqual(given, expected);

  try {
    await recordLoginAttempt({ name: name || '(未填写)', success: match, ...info });
  } catch (err) {
    console.error('Failed to record login attempt', err);
  }

  if (!match) {
    return { statusCode: 401, body: JSON.stringify({ error: 'wrong_password' }) };
  }

  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': createSessionCookie(adminPassword),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ok: true }),
  };
};
