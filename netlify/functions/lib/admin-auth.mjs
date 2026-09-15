import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const COOKIE_NAME = 'admin_session';

// Single shared password, single admin user — no account system needed.
// The same password also acts as the HMAC key for signing the session
// cookie, so there's only one secret to configure (ADMIN_PASSWORD).
function sign(expiry, secret) {
  return createHmac('sha256', secret).update(String(expiry)).digest('hex');
}

export function createSessionCookie(secret) {
  const expiry = Date.now() + SESSION_TTL_MS;
  const value = `${expiry}.${sign(expiry, secret)}`;
  return `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`;
}

export function isAuthorized(event, secret) {
  const cookieHeader = event.headers.cookie || event.headers.Cookie || '';
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return false;

  const [expiryStr, sig] = match[1].split('.');
  const expiry = Number(expiryStr);
  if (!expiry || !sig || Date.now() > expiry) return false;

  const expected = sign(expiry, secret);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(sigBuf, expectedBuf);
}
