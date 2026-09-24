import { randomUUID } from 'node:crypto';
import { sendInternalBookingNotification } from './lib/email.mjs';
import { createOrder } from './lib/orders.mjs';
import { isHoneypotFilled } from './lib/spam-check.mjs';

// Fired client-side (CarBookingWidget.astro) for custom-quote bookings —
// no fixed price to charge yet, so there's no Stripe webhook to hang this
// off of the way paid bookings do. Sends the same clearly-labelled internal
// notification as the paid path, instead of leaving the business inbox to
// rely solely on Netlify's raw form-field-dump notification email. Also
// creates an order record (status 'quote_requested', no amount yet) so the
// lead shows up in /admin/orders — setting a price there reuses the same
// reprice-and-send-payment-link flow as any other order.
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

  // Same field shape as the raw car-booking form (see CarBookingWidget.astro)
  // — normalized here to match what sendInternalBookingNotification expects,
  // mirroring create-checkout.mjs's booking construction for the paid path.
  const booking = {
    locale: ['en', 'zh', 'fr'].includes(raw.locale) ? raw.locale : 'en',
    serviceType: raw.serviceType,
    country: raw.country,
    city: raw.city,
    date: raw.date,
    startTime: raw.startTime || '',
    flightNumber: raw.flightNumber || '',
    partySize: raw.partySize,
    luggage: raw.luggage,
    hours: raw.hours,
    days: raw.days,
    vehicle: raw.vehicle,
    address: raw.address,
    name: raw.name,
    email: raw.email,
    phone: `${raw.phoneCountryCode || ''}${raw.phoneWechat || ''}`,
    preferredContactMethod: raw.preferredContactMethod,
    interpreter: raw.interpreter === 'yes',
    notes: raw.notes || '',
    fashionWeek: raw.fashionWeek === 'yes',
    wantsVipReception: raw.wantsVipReception === 'yes',
  };

  try {
    await sendInternalBookingNotification(booking, {});
  } catch (err) {
    console.error('Failed to send internal booking notification', err);
    // Best-effort — the customer-facing flow (lead received message) must
    // never fail because of this.
  }

  try {
    await createOrder({
      id: `quote_${randomUUID()}`,
      status: 'quote_requested',
      createdAt: new Date().toISOString(),
      paidAt: null,
      amountTotal: null,
      vehicleInfo: null,
      driverInfoSentAt: null,
      booking,
    });
  } catch (err) {
    console.error('Failed to create order record for quote lead', err);
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
