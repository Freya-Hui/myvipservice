import { blobStore } from './blob-store.mjs';

// The editable numbers behind the chauffeur booking widget's price
// calculator. Structural rules (which branch applies, custom-quote
// triggers, service-hours window) stay in code — only the rates and the
// two date-driven settings below are meant to change without a deploy.
export const DEFAULT_RATES = {
  parisRates: {
    airport: { standard: 150, aviation: 170 },
    hourly: { standard: 100, aviation: 120 },
    charter: { standard: 650, aviation: 800 },
  },
  parisFashionWeekHourly: { standard: 120, aviation: 150 },
  standardCityRates: { hourly: 150, charter: 800 },
  cityCharterOverrides: { london: 700 },
  countryAirportRates: {
    france: 150,
    uk: 200,
    germany: 200,
    italy: 150,
    spain: 150,
    switzerland: 200,
  },
  // Interpreter/personal assistant add-on — flat day rate (8h). For a
  // multi-day charter this is charged per day booked; for a single-day
  // booking (airport transfer or hourly) it's the flat rate once.
  interpreter: { rate: 300 },
  fashionWeekSurcharge: 100,
  minLeadDays: 3,
  fashionWeekRanges: [
    ['2026-01-20', '2026-01-29'],
    ['2026-03-02', '2026-03-10'],
    ['2026-06-23', '2026-06-28'],
    ['2026-07-06', '2026-07-09'],
    ['2026-09-28', '2026-10-06'],
  ],
};

const STORE_NAME = 'pricing';
const BLOB_KEY = 'car-rates';

export async function getRates() {
  try {
    const store = blobStore(STORE_NAME);
    const stored = await store.get(BLOB_KEY, { type: 'json' });
    // A blob saved before a new rate category existed (e.g. interpreter)
    // won't have that key — merge over the defaults so a schema addition
    // doesn't need an admin to resave pricing before it works.
    if (stored) return { ...DEFAULT_RATES, ...stored };
  } catch (err) {
    console.error('Failed to read pricing from Blobs, using defaults', err);
  }
  return DEFAULT_RATES;
}

export async function setRates(rates) {
  const store = blobStore(STORE_NAME);
  await store.setJSON(BLOB_KEY, rates);
}

// Cities that are always a custom quote regardless of price — festival-period
// demand and access requirements mean Cannes is never a fixed instant price.
// Not admin-editable (v1): this is a rule, not a number.
export const ALWAYS_CUSTOM_QUOTE_CITIES = ['cannes'];

function isLeadTimeShort(dateStr, minLeadDays) {
  if (!dateStr) return true;
  const chosen = new Date(dateStr);
  const min = new Date();
  min.setDate(min.getDate() + minLeadDays);
  min.setHours(0, 0, 0, 0);
  return chosen < min;
}

function isOutsideServiceHours(serviceType, startTime) {
  if (serviceType === 'airport' || !startTime) return false;
  const [h, m] = startTime.split(':').map(Number);
  const minutes = h * 60 + m;
  return minutes >= 60 && minutes < 360;
}

function isFashionWeek(serviceType, dateStr, days, ranges) {
  if (!dateStr) return false;
  if (serviceType !== 'charter' && serviceType !== 'hourly') return false;
  const start = new Date(dateStr);
  const end = new Date(dateStr);
  if (serviceType === 'charter') {
    end.setDate(end.getDate() + Math.max(1, days) - 1);
  }
  return ranges.some(([rangeStart, rangeEnd]) => {
    const rs = new Date(rangeStart);
    const re = new Date(rangeEnd);
    return start <= re && end >= rs;
  });
}

// Returns { total, carType, fashionWeek } for a fixed-price booking, or
// { customQuote: true } when this booking can only be priced by an advisor.
export function calculatePrice(booking, rates) {
  const {
    serviceType,
    country,
    city,
    date,
    startTime,
    hours: hoursRaw,
    days: daysRaw,
    multiCity,
    vehicle,
  } = booking;

  const hours = Math.max(3, parseInt(hoursRaw, 10) || 3);
  const days = Math.max(1, parseInt(daysRaw, 10) || 1);
  const isParis = city === 'paris';
  const isOtherCity = city === 'other';
  const hasCountryAirportRate = Object.prototype.hasOwnProperty.call(
    rates.countryAirportRates,
    country,
  );

  const customQuote =
    multiCity === 'yes' ||
    isOtherCity ||
    ALWAYS_CUSTOM_QUOTE_CITIES.includes(city) ||
    (!isParis && serviceType === 'airport' && !hasCountryAirportRate) ||
    isLeadTimeShort(date, rates.minLeadDays) ||
    isOutsideServiceHours(serviceType, startTime);

  if (customQuote) return { customQuote: true };

  const carType = isParis && vehicle === 'aviation' ? 'aviation' : 'standard';
  const fashionWeek = isFashionWeek(serviceType, date, days, rates.fashionWeekRanges);
  let total = 0;

  if (isParis) {
    const base = rates.parisRates[serviceType]?.[carType];
    if (base === undefined) return { customQuote: true };
    if (serviceType === 'airport') {
      total = base;
    } else if (serviceType === 'hourly') {
      const hourlyRate = fashionWeek ? rates.parisFashionWeekHourly[carType] : base;
      total = hourlyRate * hours;
    } else if (serviceType === 'charter') {
      const fwSurcharge = fashionWeek ? rates.fashionWeekSurcharge * days : 0;
      total = base * days + fwSurcharge;
    }
  } else {
    if (serviceType === 'airport') {
      total = rates.countryAirportRates[country];
    } else if (serviceType === 'hourly') {
      total = rates.standardCityRates.hourly * hours;
    } else if (serviceType === 'charter') {
      const dayRate = rates.cityCharterOverrides[city] || rates.standardCityRates.charter;
      const fwSurcharge = fashionWeek ? rates.fashionWeekSurcharge * days : 0;
      total = dayRate * days + fwSurcharge;
    }
  }

  if (!total || total <= 0) return { customQuote: true };

  // Flat day rate — a multi-day charter needs the interpreter booked for
  // each day, a single-day airport/hourly booking just needs the one.
  const wantsInterpreter = booking.interpreter === 'yes';
  if (wantsInterpreter) {
    total += rates.interpreter.rate * (serviceType === 'charter' ? days : 1);
  }

  return { total, carType, fashionWeek, wantsInterpreter };
}
