import { randomUUID } from 'node:crypto';
import { sendAccommodationBookingNotification } from './lib/email.mjs';
import { createOrder } from './lib/orders.mjs';
import { isHoneypotFilled } from './lib/spam-check.mjs';

// Fired client-side (AccommodationBookingWidget.astro) — a hotel stay is
// always bespoke and quoted, never an instant price, so this always starts
// as an enquiry (same admin-confirms-then-sends-link flow as tickets, see
// admin-reprice-order.mjs) rather than a checkout path of its own.
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
    propertyName: raw.propertyName || '',
    propertySlug: raw.propertySlug || '',
    // Only set for the general hotel-enquiry widget (no specific property
    // chosen yet) — the per-property AccommodationBookingWidget never sends
    // these, since propertyName already says where.
    destination: raw.destination || '',
    hotelBudget: raw.hotelBudget || '',
    // Only set by the Journal hotel-enquiry form (HotelStayEnquiryWidget).
    hotelTypes: raw.hotelTypes || '',
    partySize: Number(raw.partySize) || null,
    checkIn: raw.checkIn || '',
    checkOut: raw.checkOut || '',
    name: raw.name || '',
    email: raw.email || '',
    phone: `${raw.phoneCountryCode || ''}${raw.phoneWechat || ''}`,
    preferredContactMethod: raw.preferredContactMethod || '',
    wantsFullSeasonPlanning:
      raw.wantsFullSeasonPlanning === true || raw.wantsFullSeasonPlanning === 'true',
    wantsAlternativeHotels:
      raw.wantsAlternativeHotels === true || raw.wantsAlternativeHotels === 'true',
    notes: raw.notes || '',
  };

  try {
    await sendAccommodationBookingNotification(booking);
  } catch (err) {
    console.error('Failed to send internal accommodation booking notification', err);
  }

  try {
    await createOrder({
      id: `hotel_${randomUUID()}`,
      status: 'quote_requested',
      productType: 'accommodation-inquiry',
      createdAt: new Date().toISOString(),
      paidAt: null,
      amountTotal: null,
      vehicleInfo: null,
      driverInfoSentAt: null,
      booking,
    });
  } catch (err) {
    console.error('Failed to create order record for accommodation lead', err);
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
