import { randomUUID } from 'node:crypto';
import { blobStore } from './blob-store.mjs';

const STORE_NAME = 'clients';

function store() {
  return blobStore(STORE_NAME);
}

export async function listClients() {
  const { blobs } = await store().list();
  const clients = await Promise.all(blobs.map((b) => store().get(b.key, { type: 'json' })));
  return clients.filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getClient(id) {
  return store().get(id, { type: 'json' });
}

// wechatId is the dedupe key for client cards (Chinese-clientele business,
// WeChat is the identifier staff actually recognize a returning client by).
// Normalized compare so "ABC123" and " abc123 " count as the same person.
export async function findClientByWechatId(wechatId, excludeId) {
  const normalized = wechatId.trim().toLowerCase();
  const clients = await listClients();
  return (
    clients.find(
      (client) => client.id !== excludeId && client.wechatId.trim().toLowerCase() === normalized,
    ) || null
  );
}

// Create when no id is given, otherwise overwrite the existing record —
// same upsert-by-id shape as the rest of the admin tools. Dedupe checking
// happens in the calling function, not here — this stays a dumb writer.
export async function saveClient(client) {
  const id = client.id || randomUUID();
  const existing = client.id ? await getClient(id) : null;
  const record = {
    id,
    wechatId: client.wechatId,
    name: client.name,
    phone: client.phone || '',
    email: client.email || '',
    whatsapp: client.whatsapp || '',
    tags: client.tags || '',
    notes: client.notes || '',
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await store().setJSON(id, record);
  return record;
}

// Does not cascade-delete that client's itineraries — they're simply
// orphaned (no referential integrity system here by design).
export async function deleteClient(id) {
  await store().delete(id);
}
