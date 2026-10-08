import { randomUUID } from 'node:crypto';
import { sendVipReceptionBookingNotification } from './lib/email.mjs';
import { createOrder } from './lib/orders.mjs';
import { isHoneypotFilled } from './lib/spam-check.mjs';

// Fired client-side (VipReceptionBookingWidget.astro) — VIP reception
// always starts as an enquiry, never an instant payment: the widget's own
// price is indicative only (see its RATES constant), and a country without
// a listed rate needs a human quote regardless. Creates an order record
// (status 'quote_requested', productType 'vip-reception') so it shows up
// in /admin/orders — the existing reprice-and-send-payment-link flow (see
// admin-reprice-order.mjs) takes it from there once the price is set.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let raw;
  try {
    raw = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  // Silently accept — telling a bot its submission was rejected just
  // teaches it to leave the honeypot blank next time.
  if (isHoneypotFilled(raw)) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const booking = {
    locale: ['en', 'zh', 'fr'].includes(raw.locale) ? raw.locale : 'en',
    scenario: ['arrival', 'departure', 'connection'].includes(raw.scenario)
      ? raw.scenario
      : 'arrival',
    country: raw.country || '',
    partySize: Number(raw.partySize) || null,
    date: raw.date || '',
    flightNumber: raw.flightNumber || '',
    wantsChauffeur: raw.wantsChauffeur === 'yes',
    vehicle: raw.wantsChauffeur === 'yes' ? raw.vehicle || 'standard' : '',
    name: raw.name || '',
    email: raw.email || '',
    phone: `${raw.phoneCountryCode || ''}${raw.phoneWechat || ''}`,
    preferredContactMethod: raw.preferredContactMethod || '',
    notes: raw.notes || '',
    // The page's own indicative figures, kept so the quote can start from
    // what the customer was shown (never trusted as a price).
    estimatedTotal: String(raw.estimatedTotal || '').slice(0, 40),
    priceBreakdown: String(raw.priceBreakdown || '').slice(0, 200),
  };

  try {
    await sendVipReceptionBookingNotification(booking);
  } catch (err) {
    console.error('Failed to send internal VIP reception booking notification', err);
  }

  try {
    await createOrder({
      id: `vipreception_${randomUUID()}`,
      status: 'quote_requested',
      productType: 'vip-reception',
      createdAt: new Date().toISOString(),
      paidAt: null,
      amountTotal: null,
      vehicleInfo: null,
      driverInfoSentAt: null,
      booking,
    });
  } catch (err) {
    console.error('Failed to create order record for VIP reception lead', err);
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
