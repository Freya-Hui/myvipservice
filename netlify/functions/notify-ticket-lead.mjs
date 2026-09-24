import { randomUUID } from 'node:crypto';
import { sendTicketBookingNotification } from './lib/email.mjs';
import { createOrder } from './lib/orders.mjs';
import { isHoneypotFilled } from './lib/spam-check.mjs';

// Fired client-side (TicketBookingWidget.astro) — both attraction/event
// tickets and the private guided museum tour always start as an enquiry,
// never an instant payment: ticket prices are only known once we actually
// check the real listed price, and even the museum tour's flat €300 rate
// goes through the same admin-confirms-then-sends-link flow for
// consistency (see admin-reprice-order.mjs) rather than a separate instant
// checkout path.
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

  const requestType = raw.requestType === 'museumTour' ? 'museumTour' : 'tickets';
  const booking = {
    locale: ['en', 'zh', 'fr'].includes(raw.locale) ? raw.locale : 'en',
    requestType,
    eventName: requestType === 'tickets' ? raw.eventName || '' : '',
    museum: requestType === 'museumTour' ? raw.museum || 'louvre' : '',
    language: requestType === 'museumTour' ? raw.language || 'mandarin' : '',
    wantsChauffeur: requestType === 'museumTour' && raw.wantsChauffeur === 'yes',
    vehicle:
      requestType === 'museumTour' && raw.wantsChauffeur === 'yes' ? raw.vehicle || 'standard' : '',
    partySize: Number(raw.partySize) || null,
    date: raw.date || '',
    name: raw.name || '',
    email: raw.email || '',
    phone: `${raw.phoneCountryCode || ''}${raw.phoneWechat || ''}`,
    preferredContactMethod: raw.preferredContactMethod || '',
    notes: raw.notes || '',
  };

  try {
    await sendTicketBookingNotification(booking);
  } catch (err) {
    console.error('Failed to send internal ticket booking notification', err);
  }

  try {
    await createOrder({
      id: `ticket_${randomUUID()}`,
      status: 'quote_requested',
      productType: 'tickets-museum',
      createdAt: new Date().toISOString(),
      paidAt: null,
      amountTotal: null,
      vehicleInfo: null,
      driverInfoSentAt: null,
      booking,
    });
  } catch (err) {
    console.error('Failed to create order record for ticket lead', err);
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
