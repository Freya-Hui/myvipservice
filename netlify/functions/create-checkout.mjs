import Stripe from 'stripe';
import { getRates, calculatePrice } from './lib/pricing.mjs';
import { createOrder } from './lib/orders.mjs';
import { createBookingCheckoutSession, chauffeurProductDetails } from './lib/checkout.mjs';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'stripe_not_configured' }) };
  }

  let rawBooking;
  try {
    rawBooking = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  const rates = await getRates();
  const pricing = calculatePrice(rawBooking, rates);
  if (pricing.customQuote) {
    return { statusCode: 400, body: JSON.stringify({ error: 'custom_quote' }) };
  }

  const locale = ['en', 'zh', 'fr'].includes(rawBooking.locale) ? rawBooking.locale : 'en';
  const booking = {
    locale,
    serviceType: rawBooking.serviceType,
    country: rawBooking.country,
    city: rawBooking.city,
    date: rawBooking.date,
    startTime: rawBooking.startTime || '',
    flightNumber: rawBooking.flightNumber || '',
    partySize: rawBooking.partySize,
    luggage: rawBooking.luggage,
    hours: rawBooking.hours,
    days: rawBooking.days,
    vehicle: pricing.carType,
    address: rawBooking.address,
    name: rawBooking.name,
    email: rawBooking.email,
    phone: `${rawBooking.phoneCountryCode || ''}${rawBooking.phoneWechat || ''}`,
    preferredContactMethod: rawBooking.preferredContactMethod,
    interpreter: rawBooking.interpreter === 'yes',
    notes: rawBooking.notes || '',
    fashionWeek: !!pricing.fashionWeek,
    wantsVipReception: !!pricing.vipReception,
  };

  const origin =
    event.headers.origin || `https://${event.headers.host}` || 'https://myvipservice.com';
  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await createBookingCheckoutSession(stripe, {
      booking,
      amountEuros: pricing.total,
      origin,
      ...chauffeurProductDetails(booking),
    });

    await createOrder({
      id: session.id,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      paidAt: null,
      amountTotal: pricing.total,
      vehicleInfo: null,
      driverInfoSentAt: null,
      booking,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error('Stripe checkout session creation failed', err);
    return { statusCode: 502, body: JSON.stringify({ error: 'stripe_error' }) };
  }
};
