import { sendDiningEnquiryNotification } from './lib/email.mjs';
import { isHoneypotFilled } from './lib/spam-check.mjs';

// Fired client-side (DiningEnquiryWidget.astro, embedded in the Ducasse sur
// Seine Journal article). Email-only: there's no price or payment step, so
// unlike the other lead functions it creates no order record — and since
// the email IS the lead, a failed send is reported back instead of being
// swallowed, so the visitor can retry rather than think it went through.
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
    partySize: Number(raw.partySize) || null,
    date: raw.date || '',
    wantsPrivateSpace: raw.wantsPrivateSpace === 'yes',
    name: raw.name || '',
    email: raw.email || '',
    phone: `${raw.phoneCountryCode || ''}${raw.phoneWechat || ''}`,
    preferredContactMethod: raw.preferredContactMethod || '',
    notes: raw.notes || '',
  };

  if (!booking.name || !booking.email || !booking.partySize) {
    return { statusCode: 400, body: JSON.stringify({ error: 'missing_fields' }) };
  }

  try {
    await sendDiningEnquiryNotification(booking);
  } catch (err) {
    console.error('Failed to send dining enquiry notification', err);
    return { statusCode: 502, body: JSON.stringify({ error: 'notification_failed' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
