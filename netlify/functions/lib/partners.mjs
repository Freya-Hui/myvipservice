import { randomUUID } from 'node:crypto';
import { blobStore } from './blob-store.mjs';

const STORE_NAME = 'partners';

function store() {
  return blobStore(STORE_NAME);
}

export async function listPartners() {
  const { blobs } = await store().list();
  const partners = await Promise.all(blobs.map((b) => store().get(b.key, { type: 'json' })));
  return partners.filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPartner(id) {
  return store().get(id, { type: 'json' });
}

// Create when no id is given, otherwise overwrite the existing record —
// same upsert-by-id shape as the rest of the admin tools.
export async function savePartner(partner) {
  const id = partner.id || randomUUID();
  const record = {
    id,
    name: partner.name,
    category: partner.category || '',
    website: partner.website || '',
    email: partner.email || '',
    phone: partner.phone || '',
  };
  await store().setJSON(id, record);
  return record;
}

export async function deletePartner(id) {
  await store().delete(id);
}
