// Shared between create-checkout.mjs (new booking) and
// admin-reprice-order.mjs (same booking, corrected amount) — both need the
// exact same Stripe Checkout Session shape.

// Stripe metadata values must be strings under 500 chars — trim anything a
// free-text field could blow past.
function truncate(value, max = 480) {
  const str = String(value ?? '');
  return str.length > max ? `${str.slice(0, max)}…` : str;
}

// `booking` here is the normalized shape stored on an order record (see
// createOrder() in create-checkout.mjs), not the raw client form payload.
// `productName`/`productDescription`/`returnPath` are supplied by the
// caller rather than derived here, so this stays usable for more than one
// bookable product (chauffeur, private terminal, ...) without needing to
// know each one's own field shape.
export async function createBookingCheckoutSession(
  stripe,
  { booking, amountEuros, origin, productName, productDescription, returnPath },
) {
  return stripe.checkout.sessions.create({
    mode: 'payment',
    // Stripe's own minimum — there's no shorter native expiry. A dashboard
    // "expired" label for anything left pending past this is driven by the
    // checkout.session.expired webhook event, not a separate timer.
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    customer_email: booking.email || undefined,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(amountEuros * 100),
          product_data: {
            name: productName,
            description: productDescription,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}${returnPath}?paid=1`,
    cancel_url: `${origin}${returnPath}?paid=0`,
    metadata: Object.fromEntries(
      Object.entries(booking)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, truncate(typeof value === 'boolean' ? String(value) : value)]),
    ),
  });
}

// Default chauffeur-specific product name/description/return-path, kept
// here (rather than inlined at both call sites) since both
// create-checkout.mjs and admin-reprice-order.mjs need the exact same
// values for a car booking.
export function chauffeurProductDetails(booking) {
  const locale = ['en', 'zh', 'fr'].includes(booking.locale) ? booking.locale : 'en';
  return {
    productName: `Private Chauffeur — ${booking.serviceType} — ${booking.city}`,
    productDescription: `${booking.date}${booking.startTime ? ` ${booking.startTime}` : ''} · ${booking.vehicle === 'aviation' ? 'Aviation seats' : 'Standard'}${booking.wantsVipReception ? ' · + VIP Airport Reception' : ''}${booking.interpreter === 'yes' ? ' · + Interpreter/Assistant' : ''}`,
    returnPath: `/${locale}/services/private-transportation/chauffeur/`,
  };
}

// Same for the private terminal product.
export function terminalProductDetails(booking) {
  const locale = ['en', 'zh', 'fr'].includes(booking.locale) ? booking.locale : 'en';
  return {
    productName: `Private Terminal — ${booking.scenario} — ${booking.partySize} guest(s)`,
    productDescription: `${booking.date}${booking.flightNumber ? ` · ${booking.flightNumber}` : ''}`,
    returnPath: `/${locale}/services/private-transportation/private-terminal/`,
  };
}

// Same for tickets / private guided museum tour requests.
export function ticketProductDetails(booking) {
  const locale = ['en', 'zh', 'fr'].includes(booking.locale) ? booking.locale : 'en';
  const isMuseumTour = booking.requestType === 'museumTour';
  return {
    productName: isMuseumTour
      ? `Private Guided Museum Tour — ${booking.museum} — ${booking.partySize} guest(s)`
      : `Tickets — ${booking.eventName}`,
    productDescription: `${booking.date}${isMuseumTour ? ` · ${booking.language}` : ''}`,
    returnPath: `/${locale}/services/tickets-events/`,
  };
}

// Same for a VIP airport reception enquiry (see VipReceptionBookingWidget.astro).
export function vipReceptionProductDetails(booking) {
  const locale = ['en', 'zh', 'fr'].includes(booking.locale) ? booking.locale : 'en';
  return {
    productName: `VIP Airport Reception — ${booking.scenario} — ${booking.partySize} guest(s)`,
    productDescription: `${booking.date} · ${booking.country}${booking.wantsChauffeur ? ' · + Private chauffeur' : ''}`,
    returnPath: `/${locale}/services/vip-airport-reception/`,
  };
}

// Same for a bespoke accommodation stay enquiry (see AccommodationBookingWidget.astro).
export function hotelProductDetails(booking) {
  const locale = ['en', 'zh', 'fr'].includes(booking.locale) ? booking.locale : 'en';
  return {
    productName: `${booking.propertyName} — Stay Quote — ${booking.partySize} guest(s)`,
    productDescription: `${booking.checkIn} → ${booking.checkOut}`,
    returnPath: booking.propertySlug
      ? `/${locale}/accommodations/${booking.propertySlug}/`
      : `/${locale}/accommodations/`,
  };
}

// A one-off top-up charge on an already-paid, already-driver-assigned
// chauffeur booking — e.g. hours run over the booked charter/hourly rate,
// billed before that leg of the trip ends rather than left informal. Not a
// reprice of the original order: that stays untouched, this is a second,
// separate Stripe session tied to it via booking.relatedOrderId.
export function surchargeProductDetails(booking) {
  const locale = ['en', 'zh', 'fr'].includes(booking.locale) ? booking.locale : 'en';
  return {
    productName: `Additional Charges — Private Chauffeur (${booking.originalDate})`,
    productDescription: booking.note || 'Additional service time',
    returnPath: `/${locale}/services/private-transportation/chauffeur/`,
  };
}
