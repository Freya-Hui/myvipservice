import { isAuthorized } from './lib/admin-auth.mjs';
import { setRates, DEFAULT_RATES } from './lib/pricing.mjs';

function isNonNegativeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

// A price rate of exactly 0 isn't a valid fare — it's what an accidentally
// blank admin form field coerces to (Number('') === 0) — so reject it here
// rather than let the widget quietly offer a free ride.
function isPriceRate(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

// The Stripe checkout function trusts whatever is stored here to price a
// real charge, so a malformed save must be rejected outright rather than
// silently partially applied.
function validateRates(rates) {
  if (!rates || typeof rates !== 'object') return false;

  for (const service of ['airport', 'hourly', 'charter']) {
    for (const carType of ['standard', 'aviation']) {
      if (!isPriceRate(rates.parisRates?.[service]?.[carType])) return false;
    }
  }
  for (const carType of ['standard', 'aviation']) {
    if (!isPriceRate(rates.parisFashionWeekHourly?.[carType])) return false;
  }
  if (!isPriceRate(rates.standardCityRates?.hourly)) return false;
  if (!isPriceRate(rates.standardCityRates?.charter)) return false;
  if (
    typeof rates.cityCharterOverrides !== 'object' ||
    !Object.values(rates.cityCharterOverrides).every(isPriceRate)
  ) {
    return false;
  }
  if (
    typeof rates.countryAirportRates !== 'object' ||
    !Object.values(rates.countryAirportRates).every(isPriceRate)
  ) {
    return false;
  }
  if (!isPriceRate(rates.interpreter?.rate)) return false;
  if (!isNonNegativeNumber(rates.fashionWeekSurcharge)) return false;
  if (!isNonNegativeNumber(rates.minLeadDays)) return false;
  if (
    !Array.isArray(rates.fashionWeekRanges) ||
    !rates.fashionWeekRanges.every(
      (pair) =>
        Array.isArray(pair) &&
        pair.length === 2 &&
        pair.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)),
    )
  ) {
    return false;
  }
  return true;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !isAuthorized(event, adminPassword)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'unauthorized' }) };
  }

  let rates;
  try {
    rates = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  // Fill anything missing from the current defaults shape so a partial
  // client-side form (e.g. a field that failed to load) can't wipe it out.
  const merged = { ...DEFAULT_RATES, ...rates };
  if (!validateRates(merged)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_rates' }) };
  }

  await setRates(merged);
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
