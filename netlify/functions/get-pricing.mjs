import { getRates } from './lib/pricing.mjs';

// Public and unauthenticated on purpose — these are the same rates the
// booking widget already reveals to any visitor as a live total, just
// fetched once up front instead of baked into the page at build time so a
// price change from the admin page takes effect without a redeploy.
export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const rates = await getRates();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ rates }),
  };
};
