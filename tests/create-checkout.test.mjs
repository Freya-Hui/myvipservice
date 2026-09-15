import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculatePrice } from '../netlify/functions/create-checkout.mjs';

// A date comfortably past MIN_LEAD_DAYS (3) so lead-time isn't the reason a
// case falls into custom-quote.
function futureDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

test('Paris airport, standard vehicle', () => {
  const result = calculatePrice({
    serviceType: 'airport',
    country: 'france',
    city: 'paris',
    date: futureDate(10),
    vehicle: 'standard',
  });
  assert.equal(result.total, 150);
});

test('Paris airport, aviation seats', () => {
  const result = calculatePrice({
    serviceType: 'airport',
    country: 'france',
    city: 'paris',
    date: futureDate(10),
    vehicle: 'aviation',
  });
  assert.equal(result.total, 170);
});

test('Paris hourly, 3-hour minimum', () => {
  const result = calculatePrice({
    serviceType: 'hourly',
    country: 'france',
    city: 'paris',
    date: futureDate(10),
    hours: 3,
    vehicle: 'standard',
  });
  assert.equal(result.total, 300);
});

test('Paris charter, 2 days', () => {
  const result = calculatePrice({
    serviceType: 'charter',
    country: 'france',
    city: 'paris',
    date: futureDate(10),
    days: 2,
    vehicle: 'standard',
  });
  assert.equal(result.total, 1300);
});

test('Cannes is always a custom quote', () => {
  const result = calculatePrice({
    serviceType: 'airport',
    country: 'france',
    city: 'cannes',
    date: futureDate(10),
    vehicle: 'standard',
  });
  assert.equal(result.customQuote, true);
});

test('multi-city itineraries are always a custom quote', () => {
  const result = calculatePrice({
    serviceType: 'hourly',
    country: 'france',
    city: 'paris',
    date: futureDate(10),
    hours: 3,
    multiCity: 'yes',
    vehicle: 'standard',
  });
  assert.equal(result.customQuote, true);
});

test('"other" city is always a custom quote', () => {
  const result = calculatePrice({
    serviceType: 'hourly',
    country: 'france',
    city: 'other',
    date: futureDate(10),
    hours: 3,
    vehicle: 'standard',
  });
  assert.equal(result.customQuote, true);
});

test('UK airport transfer outside London uses the country rate', () => {
  const result = calculatePrice({
    serviceType: 'airport',
    country: 'uk',
    city: 'oxford',
    date: futureDate(10),
    vehicle: 'standard',
  });
  assert.equal(result.total, 200);
});

test('London charter uses its city-specific day rate, not the standard one', () => {
  const result = calculatePrice({
    serviceType: 'charter',
    country: 'uk',
    city: 'london',
    date: futureDate(10),
    days: 1,
    vehicle: 'standard',
  });
  assert.equal(result.total, 700);
});

test('a booking less than 3 days out is a custom quote', () => {
  const result = calculatePrice({
    serviceType: 'airport',
    country: 'france',
    city: 'paris',
    date: futureDate(1),
    vehicle: 'standard',
  });
  assert.equal(result.customQuote, true);
});

test('an hourly booking starting inside the 01:00-06:00 gap is a custom quote', () => {
  const result = calculatePrice({
    serviceType: 'hourly',
    country: 'france',
    city: 'paris',
    date: futureDate(10),
    startTime: '02:00',
    hours: 3,
    vehicle: 'standard',
  });
  assert.equal(result.customQuote, true);
});

test('a Fashion Week date uses the Fashion Week hourly rate for Paris', () => {
  const result = calculatePrice({
    serviceType: 'hourly',
    country: 'france',
    city: 'paris',
    date: '2026-09-30', // inside the 2026-09-28..2026-10-06 range
    hours: 3,
    vehicle: 'standard',
  });
  assert.equal(result.total, 360); // 120/hr fashion-week rate * 3h
  assert.equal(result.fashionWeek, true);
});

test('a non-Fashion-Week date uses the normal hourly rate', () => {
  const result = calculatePrice({
    serviceType: 'hourly',
    country: 'france',
    city: 'paris',
    date: futureDate(10),
    hours: 3,
    vehicle: 'standard',
  });
  assert.equal(result.total, 300); // 100/hr standard rate * 3h
  assert.equal(result.fashionWeek, false);
});

test('aviation seats outside Paris fall back to the standard rate (not offered elsewhere)', () => {
  const result = calculatePrice({
    serviceType: 'airport',
    country: 'uk',
    city: 'london',
    date: futureDate(10),
    vehicle: 'aviation',
  });
  assert.equal(result.total, 200);
  assert.equal(result.carType, 'standard');
});
