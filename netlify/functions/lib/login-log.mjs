import { blobStore } from './blob-store.mjs';

const STORE_NAME = 'admin-meta';
const MAX_ENTRIES = 200;

// One blob key per calendar month — each new month starts a fresh, empty
// log instead of growing forever. Old months' blobs are just left behind
// (storage is trivial at this volume), not actively deleted.
function monthKey(date = new Date()) {
  return `login-log-${date.toISOString().slice(0, 7)}`;
}

// There's one shared admin password, not individual accounts — "name" is
// self-reported at login (typed in, not verified against anything), not a
// real identity check. Still useful: it turns the log from "someone logged
// in" into "who says they logged in", and failed attempts still show IP/UA
// even when no name was given.
export async function recordLoginAttempt({ name, success, ip, userAgent }) {
  const store = blobStore(STORE_NAME);
  const key = monthKey();
  const existing = (await store.get(key, { type: 'json' })) || [];
  const entry = {
    at: new Date().toISOString(),
    name: name || '(未填写)',
    success,
    ip: ip || 'unknown',
    userAgent: userAgent || '',
  };
  const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
  await store.setJSON(key, updated);
}

export async function listLoginAttempts() {
  const store = blobStore(STORE_NAME);
  return (await store.get(monthKey(), { type: 'json' })) || [];
}
