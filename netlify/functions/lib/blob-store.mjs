import { getStore } from '@netlify/blobs';

// This site is published via manual `netlify deploy` (not a Git-linked CI
// build), so Netlify doesn't auto-inject Blobs credentials into functions —
// siteID/token have to be passed explicitly. See:
// https://docs.netlify.com/build/data-and-storage/netlify-blobs/
export function blobStore(name) {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (siteID && token) {
    return getStore({ name, siteID, token });
  }
  return getStore(name);
}
