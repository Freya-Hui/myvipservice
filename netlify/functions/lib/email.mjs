import { Resend } from 'resend';

// Sends transactional email to the CUSTOMER (payment confirmation, driver
// info). Distinct from the Netlify Forms submission elsewhere in this repo,
// which only notifies the business inbox — Resend is needed for anything
// addressed to the customer with custom content.
const FROM_ADDRESS = 'MYVIPSERVICE <booking@myvipservice.com>';

async function send({ to, subject, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured — skipping customer email:', subject);
    return;
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from: FROM_ADDRESS, to, subject, text });
  if (error) console.error('Resend send failed', error);
}

const PAYMENT_CONFIRMATION = {
  en: {
    subject: 'Your MYVIPSERVICE booking is confirmed — arranging your vehicle',
    body: (date) =>
      `Thank you — your payment has been received.\n\nWe're now securing a suitable vehicle for your booking on ${date}. We'll confirm the vehicle within 24 hours, and send your driver's name and contact details around 5 hours before pickup.\n\nIn the rare case we're unable to find a suitable match, we'll let you know within 24 hours.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE 预订已确认——正在为您安排车辆',
    body: (date) =>
      `感谢您，付款已收到。\n\n我们正在为您 ${date} 的预订安排合适的车辆，会在 24 小时内确认车辆，并在用车前约 5 小时发送司机姓名与联系方式。\n\n如果极少数情况下未能找到合适车辆，我们会在 24 小时内告知您。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Votre réservation MYVIPSERVICE est confirmée — organisation du véhicule',
    body: (date) =>
      `Merci, votre paiement a bien été reçu.\n\nNous organisons actuellement un véhicule adapté pour votre réservation du ${date}. Nous confirmerons le véhicule sous 24 heures et vous enverrons le nom et les coordonnées de votre chauffeur environ 5 heures avant la prise en charge.\n\nDans le cas rare où nous ne pourrions pas trouver de véhicule adapté, nous vous en informerons sous 24 heures.\n\n— MYVIPSERVICE`,
  },
};

const DRIVER_INFO = {
  en: {
    subject: (date) => `Your driver & vehicle for ${date}`,
    body: (d) =>
      `Your chauffeur is confirmed:\n\nDriver: ${d.driverName}\nContact: ${d.driverPhone}\nVehicle: ${d.vehicleDescription}\n\nSee you soon.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: (date) => `您 ${date} 的司机与车辆信息`,
    body: (d) =>
      `您的司机已确认：\n\n司机：${d.driverName}\n联系方式：${d.driverPhone}\n车辆：${d.vehicleDescription}\n\n期待为您服务。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: (date) => `Votre chauffeur et véhicule pour le ${date}`,
    body: (d) =>
      `Votre chauffeur est confirmé :\n\nChauffeur : ${d.driverName}\nContact : ${d.driverPhone}\nVéhicule : ${d.vehicleDescription}\n\nÀ bientôt.\n\n— MYVIPSERVICE`,
  },
};

const ORDER_CONFIRMED = {
  en: {
    subject: (date) => `Your vehicle is arranged — ${date}`,
    body: (date) =>
      `Good news — we've secured a vehicle for your booking on ${date}.\n\nYour driver's name and contact details will follow closer to pickup, as usual around 5 hours before.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: (date) => `您 ${date} 的用车已安排好`,
    body: (date) =>
      `好消息——已经为您 ${date} 的预订协调好车辆。\n\n司机姓名与联系方式将按惯例在用车前约 5 小时发送给您。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: (date) => `Votre véhicule est organisé — ${date}`,
    body: (date) =>
      `Bonne nouvelle — nous avons trouvé un véhicule pour votre réservation du ${date}.\n\nLe nom et les coordonnées de votre chauffeur vous seront communiqués plus près de la prise en charge, comme d'habitude environ 5 heures avant.\n\n— MYVIPSERVICE`,
  },
};

const REFUND_APOLOGY = {
  en: {
    subject: 'Unable to arrange your MYVIPSERVICE booking — full refund issued',
    body: (amount, note) =>
      `We're very sorry — despite our best efforts, we were unable to secure a suitable vehicle for your booking.\n\nA full refund of €${amount} has been issued and should appear in your account within 5–10 business days.${note ? `\n\n${note}` : ''}\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '非常抱歉，未能为您安排车辆——已全额退款',
    body: (amount, note) =>
      `非常抱歉——尽管我们尽了最大努力，仍未能为您的预订找到合适的车辆。\n\n已为您全额退款 €${amount}，预计 5–10 个工作日内到账。${note ? `\n\n${note}` : ''}\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Impossible d’organiser votre réservation MYVIPSERVICE — remboursement intégral',
    body: (amount, note) =>
      `Nous sommes vraiment désolés — malgré tous nos efforts, nous n'avons pas pu trouver de véhicule adapté pour votre réservation.\n\nUn remboursement intégral de ${amount} € a été émis et devrait apparaître sur votre compte sous 5 à 10 jours ouvrés.${note ? `\n\n${note}` : ''}\n\n— MYVIPSERVICE`,
  },
};

// Customer-facing labels for the trip-summary block in the quote email —
// keyed by locale, separate from the internal-notification labels below
// (those are Chinese-only, for the business inbox, and don't need to match
// a customer's own language).
const SERVICE_TYPE_LABELS_BY_LOCALE = {
  en: { airport: 'Airport transfer', hourly: 'Hourly charter', charter: 'Multi-day charter' },
  zh: { airport: '机场接送', hourly: '按小时包车', charter: '多日包车' },
  fr: {
    airport: 'Transfert aéroport',
    hourly: "Mise à disposition à l'heure",
    charter: 'Mise à disposition plusieurs jours',
  },
};

const VEHICLE_LABELS_BY_LOCALE = {
  en: { standard: 'Standard vehicle', aviation: 'Aviation-grade (wide-body)' },
  zh: { standard: '标准车型', aviation: '航空级（宽体）' },
  fr: { standard: 'Véhicule standard', aviation: 'Catégorie aviation (habitacle large)' },
};

const TRIP_SUMMARY_FIELD_LABELS = {
  en: {
    service: 'Service',
    route: 'Route',
    date: 'Date',
    duration: 'Duration',
    flight: 'Flight',
    party: 'Passengers',
    luggage: 'Bags',
    vipReception: 'Add-on',
  },
  zh: {
    service: '服务类型',
    route: '路线',
    date: '日期',
    duration: '时长',
    flight: '航班号',
    party: '乘车人数',
    luggage: '行李件数',
    vipReception: '加购项目',
  },
  fr: {
    service: 'Service',
    route: 'Trajet',
    date: 'Date',
    duration: 'Durée',
    flight: 'Vol',
    party: 'Passagers',
    luggage: 'Bagages',
    vipReception: 'Option ajoutée',
  },
};

const VIP_RECEPTION_ADDON_LABEL = {
  en: 'VIP Airport Reception',
  zh: 'VIP礼遇接待',
  fr: 'Accueil VIP Aéroport',
};

const DURATION_UNIT = {
  en: { days: (n) => `${n} day(s)`, hours: (n) => `${n} hour(s)` },
  zh: { days: (n) => `${n} 天`, hours: (n) => `${n} 小时` },
  fr: { days: (n) => `${n} jour(s)`, hours: (n) => `${n} heure(s)` },
};

// The booking-details block included in the quote email, so "€480" is
// never sent without saying what it's actually a quote for.
function tripSummaryText(booking, locale) {
  const l = TRIP_SUMMARY_FIELD_LABELS[locale] || TRIP_SUMMARY_FIELD_LABELS.en;
  const serviceLabels = SERVICE_TYPE_LABELS_BY_LOCALE[locale] || SERVICE_TYPE_LABELS_BY_LOCALE.en;
  const vehicleLabels = VEHICLE_LABELS_BY_LOCALE[locale] || VEHICLE_LABELS_BY_LOCALE.en;
  const duration = DURATION_UNIT[locale] || DURATION_UNIT.en;

  const lines = [
    `${l.service}: ${serviceLabels[booking.serviceType] || booking.serviceType} — ${vehicleLabels[booking.vehicle] || booking.vehicle}`,
    `${l.route}: ${[booking.city, booking.country].filter(Boolean).join(', ')}`,
    `${l.date}: ${[booking.date, booking.startTime].filter(Boolean).join(' ')}`,
    booking.days && `${l.duration}: ${duration.days(booking.days)}`,
    booking.hours && `${l.duration}: ${duration.hours(booking.hours)}`,
    booking.flightNumber && `${l.flight}: ${booking.flightNumber}`,
    booking.partySize && `${l.party}: ${booking.partySize}`,
    booking.luggage !== undefined && booking.luggage !== '' && `${l.luggage}: ${booking.luggage}`,
    booking.wantsVipReception &&
      `${l.vipReception}: ${VIP_RECEPTION_ADDON_LABEL[locale] || VIP_RECEPTION_ADDON_LABEL.en}`,
  ].filter(Boolean);

  return lines.join('\n');
}

const QUOTE_READY = {
  en: {
    subject: 'Your MYVIPSERVICE booking quote is ready',
    body: (amount, url, booking) =>
      `Thank you for your enquiry. Here's a summary of your booking, and the quote for it.\n\n${tripSummaryText(booking, 'en')}\n\nQuote: €${amount}\n\nPlease use this secure payment link to confirm and complete your booking:\n\n${url}\n\nThis link is valid for 30 minutes.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE 预订报价已确认',
    body: (amount, url, booking) =>
      `感谢您的咨询，以下是您此次预订的行程摘要与报价。\n\n${tripSummaryText(booking, 'zh')}\n\n报价：€${amount}\n\n请使用以下安全支付链接确认并完成预订：\n\n${url}\n\n该链接 30 分钟内有效。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Votre devis MYVIPSERVICE est prêt',
    body: (amount, url, booking) =>
      `Merci pour votre demande. Voici un récapitulatif de votre réservation et le devis correspondant.\n\n${tripSummaryText(booking, 'fr')}\n\nDevis : ${amount} €\n\nMerci d'utiliser ce lien de paiement sécurisé pour confirmer et finaliser votre réservation :\n\n${url}\n\nCe lien est valable 30 minutes.\n\n— MYVIPSERVICE`,
  },
};

const SCENARIO_LABELS_BY_LOCALE = {
  en: { arrival: 'Arrival', departure: 'Departure', connection: 'Connection' },
  zh: { arrival: '抵达', departure: '出发', connection: '转机' },
  fr: { arrival: 'Arrivée', departure: 'Départ', connection: 'Correspondance' },
};

const TERMINAL_SUMMARY_LABELS = {
  en: {
    scenario: 'Scenario',
    party: 'Travellers',
    date: 'Date',
    flight: 'Flight',
    chauffeur: 'Private chauffeur',
  },
  zh: {
    scenario: '场景',
    party: '出行人数',
    date: '日期',
    flight: '航班号',
    chauffeur: '专属司机',
  },
  fr: {
    scenario: 'Occasion',
    party: 'Voyageurs',
    date: 'Date',
    flight: 'Vol',
    chauffeur: 'Chauffeur privé',
  },
};

function terminalSummaryText(booking, locale) {
  const l = TERMINAL_SUMMARY_LABELS[locale] || TERMINAL_SUMMARY_LABELS.en;
  const scenarioLabels = SCENARIO_LABELS_BY_LOCALE[locale] || SCENARIO_LABELS_BY_LOCALE.en;
  const vehicleLabels = VEHICLE_LABELS_BY_LOCALE[locale] || VEHICLE_LABELS_BY_LOCALE.en;

  const lines = [
    `${l.scenario}: ${scenarioLabels[booking.scenario] || booking.scenario}`,
    `${l.party}: ${booking.partySize}`,
    `${l.date}: ${booking.date}`,
    booking.flightNumber && `${l.flight}: ${booking.flightNumber}`,
    booking.wantsChauffeur &&
      `${l.chauffeur}: ${vehicleLabels[booking.vehicle] || booking.vehicle}`,
  ].filter(Boolean);

  return lines.join('\n');
}

const TERMINAL_QUOTE_READY = {
  en: {
    subject: 'Your MYVIPSERVICE private terminal quote is ready',
    body: (amount, url, booking) =>
      `Thank you for your enquiry. We've confirmed availability and airline eligibility — here's a summary of your request, and the quote for it.\n\n${terminalSummaryText(booking, 'en')}\n\nQuote: €${amount}\n\nPlease use this secure payment link to confirm and complete your booking:\n\n${url}\n\nThis link is valid for 30 minutes.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE 私人航站楼报价已确认',
    body: (amount, url, booking) =>
      `感谢您的咨询，我们已确认可用性与航空公司资格，以下是您此次预约的摘要与报价。\n\n${terminalSummaryText(booking, 'zh')}\n\n报价：€${amount}\n\n请使用以下安全支付链接确认并完成预订：\n\n${url}\n\n该链接 30 分钟内有效。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Votre devis MYVIPSERVICE pour le terminal privé est prêt',
    body: (amount, url, booking) =>
      `Merci pour votre demande. Nous avons confirmé la disponibilité et l'éligibilité de la compagnie aérienne — voici un récapitulatif de votre demande et le devis correspondant.\n\n${terminalSummaryText(booking, 'fr')}\n\nDevis : ${amount} €\n\nMerci d'utiliser ce lien de paiement sécurisé pour confirmer et finaliser votre réservation :\n\n${url}\n\nCe lien est valable 30 minutes.\n\n— MYVIPSERVICE`,
  },
};

const VIP_RECEPTION_SUMMARY_LABELS = {
  en: {
    scenario: 'Scenario',
    country: 'Country',
    party: 'Party size',
    date: 'Date',
    flight: 'Flight',
    chauffeur: 'Private chauffeur',
  },
  zh: {
    scenario: '场景',
    country: '国家',
    party: '人数',
    date: '日期',
    flight: '航班号',
    chauffeur: '专属司机',
  },
  fr: {
    scenario: 'Occasion',
    country: 'Pays',
    party: 'Nombre de personnes',
    date: 'Date',
    flight: 'Vol',
    chauffeur: 'Chauffeur privé',
  },
};

function vipReceptionSummaryText(booking, locale) {
  const l = VIP_RECEPTION_SUMMARY_LABELS[locale] || VIP_RECEPTION_SUMMARY_LABELS.en;
  const scenarioLabels = SCENARIO_LABELS_BY_LOCALE[locale] || SCENARIO_LABELS_BY_LOCALE.en;
  const vehicleLabels = VEHICLE_LABELS_BY_LOCALE[locale] || VEHICLE_LABELS_BY_LOCALE.en;

  const lines = [
    `${l.scenario}: ${scenarioLabels[booking.scenario] || booking.scenario}`,
    `${l.country}: ${booking.country}`,
    `${l.party}: ${booking.partySize}`,
    `${l.date}: ${booking.date}`,
    booking.flightNumber && `${l.flight}: ${booking.flightNumber}`,
    booking.wantsChauffeur &&
      `${l.chauffeur}: ${vehicleLabels[booking.vehicle] || booking.vehicle}`,
  ].filter(Boolean);

  return lines.join('\n');
}

const VIP_RECEPTION_QUOTE_READY = {
  en: {
    subject: 'Your MYVIPSERVICE VIP airport reception quote is ready',
    body: (amount, url, booking) =>
      `Thank you for your enquiry. Here's a summary of it, and the quote.\n\n${vipReceptionSummaryText(booking, 'en')}\n\nQuote: €${amount}\n\nPlease use this secure payment link to confirm and complete your booking:\n\n${url}\n\nThis link is valid for 30 minutes.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE VIP礼遇接待报价已确认',
    body: (amount, url, booking) =>
      `感谢您的咨询，以下是您此次需求的摘要与报价。\n\n${vipReceptionSummaryText(booking, 'zh')}\n\n报价：€${amount}\n\n请使用以下安全支付链接确认并完成预订：\n\n${url}\n\n该链接 30 分钟内有效。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: "Votre devis MYVIPSERVICE pour l'accueil VIP aéroport est prêt",
    body: (amount, url, booking) =>
      `Merci pour votre demande. Voici un récapitulatif et le devis correspondant.\n\n${vipReceptionSummaryText(booking, 'fr')}\n\nDevis : ${amount} €\n\nMerci d'utiliser ce lien de paiement sécurisé pour confirmer et finaliser votre réservation :\n\n${url}\n\nCe lien est valable 30 minutes.\n\n— MYVIPSERVICE`,
  },
};

const TICKET_SUMMARY_LABELS = {
  en: {
    type: 'Request',
    event: 'Attraction / Event',
    museum: 'Museum',
    language: 'Guide language',
    party: 'People',
    date: 'Date',
    chauffeur: 'Private chauffeur',
  },
  zh: {
    type: '需求类型',
    event: '景点/活动',
    museum: '博物馆',
    language: '讲解语言',
    party: '人数',
    date: '日期',
    chauffeur: '专属司机',
  },
  fr: {
    type: 'Demande',
    event: 'Attraction / Événement',
    museum: 'Musée',
    language: 'Langue du guide',
    party: 'Personnes',
    date: 'Date',
    chauffeur: 'Chauffeur privé',
  },
};

const TICKET_TYPE_LABELS_BY_LOCALE = {
  en: { tickets: 'Attraction & Event Tickets', museumTour: 'Private Guided Museum Tour' },
  zh: { tickets: '景点/演出/赛事门票', museumTour: '博物馆专属导览' },
  fr: {
    tickets: "Billets d'attractions et d'événements",
    museumTour: 'Visite guidée privée de musée',
  },
};

function ticketSummaryText(booking, locale) {
  const l = TICKET_SUMMARY_LABELS[locale] || TICKET_SUMMARY_LABELS.en;
  const typeLabels = TICKET_TYPE_LABELS_BY_LOCALE[locale] || TICKET_TYPE_LABELS_BY_LOCALE.en;
  const isMuseumTour = booking.requestType === 'museumTour';

  const lines = [
    `${l.type}: ${typeLabels[booking.requestType] || booking.requestType}`,
    !isMuseumTour && booking.eventName && `${l.event}: ${booking.eventName}`,
    isMuseumTour && booking.museum && `${l.museum}: ${booking.museum}`,
    isMuseumTour && booking.language && `${l.language}: ${booking.language}`,
    `${l.party}: ${booking.partySize}`,
    `${l.date}: ${booking.date}`,
    isMuseumTour && booking.wantsChauffeur && `${l.chauffeur}: ${booking.vehicle}`,
  ].filter(Boolean);

  return lines.join('\n');
}

const HOTEL_SUMMARY_LABELS = {
  en: {
    property: 'Property',
    party: 'Guests',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    fullSeasonPlanning: 'Full ski season planning requested',
    alternativeHotels: 'Alternative hotel options requested',
  },
  zh: {
    property: '酒店',
    party: '入住人数',
    checkIn: '入住日期',
    checkOut: '离店日期',
    fullSeasonPlanning: '需要完整雪季行程规划',
    alternativeHotels: '需要备选酒店方案',
  },
  fr: {
    property: 'Établissement',
    party: 'Voyageurs',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    fullSeasonPlanning: 'Planification complète de la saison de ski demandée',
    alternativeHotels: "Options d'hôtels alternatifs demandées",
  },
};

function hotelSummaryText(booking, locale) {
  const l = HOTEL_SUMMARY_LABELS[locale] || HOTEL_SUMMARY_LABELS.en;
  const lines = [
    `${l.property}: ${booking.propertyName}`,
    `${l.party}: ${booking.partySize}`,
    `${l.checkIn}: ${booking.checkIn}`,
    `${l.checkOut}: ${booking.checkOut}`,
    booking.wantsFullSeasonPlanning && l.fullSeasonPlanning,
    booking.wantsAlternativeHotels && l.alternativeHotels,
  ].filter(Boolean);

  return lines.join('\n');
}

const HOTEL_QUOTE_READY = {
  en: {
    subject: 'Your MYVIPSERVICE stay quote is ready',
    body: (amount, url, booking) =>
      `Thank you for your request. Here's a summary of it, and the quote.\n\n${hotelSummaryText(booking, 'en')}\n\nQuote: €${amount}\n\nPlease use this secure payment link to confirm and complete your booking:\n\n${url}\n\nThis link is valid for 30 minutes.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE 酒店报价已确认',
    body: (amount, url, booking) =>
      `感谢您的咨询，以下是您此次需求的摘要与报价。\n\n${hotelSummaryText(booking, 'zh')}\n\n报价：€${amount}\n\n请使用以下安全支付链接确认并完成预订：\n\n${url}\n\n该链接 30 分钟内有效。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Votre devis de séjour MYVIPSERVICE est prêt',
    body: (amount, url, booking) =>
      `Merci pour votre demande. Voici un récapitulatif et le devis correspondant.\n\n${hotelSummaryText(booking, 'fr')}\n\nDevis : ${amount} €\n\nMerci d'utiliser ce lien de paiement sécurisé pour confirmer et finaliser votre réservation :\n\n${url}\n\nCe lien est valable 30 minutes.\n\n— MYVIPSERVICE`,
  },
};

const TICKET_QUOTE_READY = {
  en: {
    subject: 'Your MYVIPSERVICE tickets/tour quote is ready',
    body: (amount, url, booking) =>
      `Thank you for your request. Here's a summary of it, and the quote.\n\n${ticketSummaryText(booking, 'en')}\n\nQuote: €${amount}\n\nPlease use this secure payment link to confirm and complete your booking:\n\n${url}\n\nThis link is valid for 30 minutes.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE 票务/导览报价已确认',
    body: (amount, url, booking) =>
      `感谢您的咨询，以下是您此次需求的摘要与报价。\n\n${ticketSummaryText(booking, 'zh')}\n\n报价：€${amount}\n\n请使用以下安全支付链接确认并完成预订：\n\n${url}\n\n该链接 30 分钟内有效。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Votre devis MYVIPSERVICE (billets / visite) est prêt',
    body: (amount, url, booking) =>
      `Merci pour votre demande. Voici un récapitulatif et le devis correspondant.\n\n${ticketSummaryText(booking, 'fr')}\n\nDevis : ${amount} €\n\nMerci d'utiliser ce lien de paiement sécurisé pour confirmer et finaliser votre réservation :\n\n${url}\n\nCe lien est valable 30 minutes.\n\n— MYVIPSERVICE`,
  },
};

// A top-up charge on an already-confirmed chauffeur booking (e.g. hours ran
// over) — a separate, second payment link, not a reprice of the original
// order. `booking.note` is the admin-authored line describing what the
// charge covers (e.g. "2 extra hours"); optional, so the sentence still
// reads fine without one.
const SURCHARGE_PAYMENT_LINK = {
  en: {
    subject: 'Additional charges for your MYVIPSERVICE booking',
    body: (amount, url, booking) =>
      `This covers additional charges for your booking on ${booking.originalDate}${booking.note ? ` — ${booking.note}` : ''}.\n\nAmount due: €${amount}\n\nPlease settle this before the end of your trip, using this secure payment link:\n\n${url}\n\nThis link is valid for 30 minutes.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE 预订产生了额外费用',
    body: (amount, url, booking) =>
      `这是您 ${booking.originalDate} 预订产生的额外费用${booking.note ? `——${booking.note}` : ''}。\n\n应付金额：€${amount}\n\n请在本次行程结束前，通过以下安全支付链接结清：\n\n${url}\n\n该链接 30 分钟内有效。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Frais supplémentaires pour votre réservation MYVIPSERVICE',
    body: (amount, url, booking) =>
      `Ceci couvre des frais supplémentaires pour votre réservation du ${booking.originalDate}${booking.note ? ` — ${booking.note}` : ''}.\n\nMontant dû : ${amount} €\n\nMerci de régler ce montant avant la fin de votre trajet, via ce lien de paiement sécurisé :\n\n${url}\n\nCe lien est valable 30 minutes.\n\n— MYVIPSERVICE`,
  },
};

const SURCHARGE_PAYMENT_CONFIRMATION = {
  en: {
    subject: 'Payment received — additional charges',
    body: (amount, booking) =>
      `Thank you — your additional payment of €${amount} for the booking on ${booking.originalDate} has been received.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: 'MYVIPSERVICE 额外费用已收到',
    body: (amount, booking) =>
      `感谢您，${booking.originalDate} 预订的额外费用 €${amount} 已收到确认。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Paiement reçu — frais supplémentaires',
    body: (amount, booking) =>
      `Merci — votre paiement supplémentaire de ${amount} € pour la réservation du ${booking.originalDate} a bien été reçu.\n\n— MYVIPSERVICE`,
  },
};

const UPDATED_PAYMENT_LINK = {
  en: {
    subject: 'Updated payment link for your MYVIPSERVICE booking',
    body: (url) =>
      `Your booking price has been updated. Please use this new secure payment link to complete your booking:\n\n${url}\n\nThis link is valid for 30 minutes.\n\n— MYVIPSERVICE`,
  },
  zh: {
    subject: '您的 MYVIPSERVICE 预订支付链接已更新',
    body: (url) =>
      `您的预订价格有更新，请使用下面这个新的安全支付链接完成付款：\n\n${url}\n\n该链接 30 分钟内有效。\n\n—— MYVIPSERVICE`,
  },
  fr: {
    subject: 'Lien de paiement mis à jour pour votre réservation MYVIPSERVICE',
    body: (url) =>
      `Le prix de votre réservation a été mis à jour. Merci d'utiliser ce nouveau lien de paiement sécurisé pour finaliser votre réservation :\n\n${url}\n\nCe lien est valable 30 minutes.\n\n— MYVIPSERVICE`,
  },
};

function templateFor(map, locale) {
  return map[locale] || map.en;
}

const ADMIN_ADDRESS = 'contact@myvipservice.com';

const SERVICE_TYPE_LABELS = {
  airport: '机场接送',
  hourly: '按小时包车',
  charter: '多日包车',
};

const VEHICLE_LABELS = {
  standard: '标准车型',
  aviation: '航空级（宽体）',
};

// Internal notification to the business inbox when a chauffeur booking
// comes in — either paid (Stripe confirmed) or a custom-quote lead awaiting
// manual follow-up. Kept as one plain-text, clearly-labelled block instead
// of the raw Netlify Forms field dump, which lists every field name
// (camelCase, no grouping) in submission order.
export async function sendInternalBookingNotification(booking, meta = {}) {
  const status = meta.amountPaid
    ? `已支付 ${meta.amountPaid}（Stripe）`
    : '客户提交，等待人工报价确认';

  const lines = [
    `状态：${status}`,
    '',
    '【客户信息】',
    `姓名：${booking.name || '—'}`,
    `邮箱：${booking.email || '—'}`,
    `电话：${booking.phone || '—'}`,
    `偏好联系方式：${booking.preferredContactMethod || '—'}`,
    '',
    '【行程信息】',
    `服务类型：${SERVICE_TYPE_LABELS[booking.serviceType] || booking.serviceType || '—'}`,
    `地点：${[booking.city, booking.country].filter(Boolean).join(', ') || '—'}`,
    `日期：${[booking.date, booking.startTime].filter(Boolean).join(' ') || '—'}`,
    `车型：${VEHICLE_LABELS[booking.vehicle] || booking.vehicle || '—'}`,
    `乘车人数：${booking.partySize ?? '—'}`,
    `行李件数：${booking.luggage ?? '—'}`,
    booking.flightNumber && `航班号：${booking.flightNumber}`,
    booking.hours && `时长：${booking.hours} 小时`,
    booking.days && `天数：${booking.days} 天`,
    booking.address && `地址：${booking.address}`,
    (booking.interpreter === true || booking.interpreter === 'yes') && '需要翻译陪同',
    booking.fashionWeek === true && '时装周期间',
    (booking.wantsVipReception === true || booking.wantsVipReception === 'yes') &&
      '已加购 VIP礼遇接待',
  ].filter(Boolean);

  if (booking.notes) {
    lines.push('', '【客户备注】', booking.notes);
  }

  const statusFlag = meta.amountPaid ? '已支付' : '待报价';
  await send({
    to: ADMIN_ADDRESS,
    subject: `[${statusFlag}] 包车新预订 — ${booking.name || '未填写姓名'} · ${booking.date || ''}`,
    text: lines.join('\n'),
  });
}

const SCENARIO_LABELS = {
  arrival: '抵达',
  departure: '出发',
  connection: '转机',
};

// Same purpose as sendInternalBookingNotification, kept as its own function
// rather than a branch inside that one — the field shape (party size,
// scenario, optional chauffeur add-on) is different enough from a car
// booking that sharing one function would mean threading two unrelated
// layouts through the same conditionals.
export async function sendTerminalBookingNotification(booking) {
  const lines = [
    '状态：客户提交，等待人工确认（含航空公司资格核实）',
    '',
    '【客户信息】',
    `姓名：${booking.name || '—'}`,
    `邮箱：${booking.email || '—'}`,
    `电话：${booking.phone || '—'}`,
    `偏好联系方式：${booking.preferredContactMethod || '—'}`,
    '',
    '【预约信息】',
    `场景：${SCENARIO_LABELS[booking.scenario] || booking.scenario || '—'}`,
    `人数：${booking.partySize || '—'}`,
    `日期：${booking.date || '—'}`,
    booking.flightNumber && `航班号：${booking.flightNumber}`,
    booking.wantsChauffeur
      ? `同时需要专属司机：是（${VEHICLE_LABELS[booking.vehicle] || booking.vehicle || '未选车型'}）`
      : '同时需要专属司机：否',
  ].filter(Boolean);

  if (booking.notes) {
    lines.push('', '【客户备注】', booking.notes);
  }

  await send({
    to: ADMIN_ADDRESS,
    subject: `[待确认] 私人航站楼预约 — ${booking.name || '未填写姓名'} · ${booking.date || ''}`,
    text: lines.join('\n'),
  });
}

export async function sendVipReceptionBookingNotification(booking) {
  const lines = [
    '状态：客户提交，等待人工报价确认',
    '',
    '【客户信息】',
    `姓名：${booking.name || '—'}`,
    `邮箱：${booking.email || '—'}`,
    `电话：${booking.phone || '—'}`,
    `偏好联系方式：${booking.preferredContactMethod || '—'}`,
    '',
    '【需求信息】',
    `场景：${SCENARIO_LABELS[booking.scenario] || booking.scenario || '—'}`,
    `国家：${booking.country || '—'}`,
    `人数：${booking.partySize || '—'}`,
    `日期：${booking.date || '—'}`,
    booking.flightNumber && `航班号：${booking.flightNumber}`,
    booking.wantsChauffeur
      ? `同时加购专属座驾：是（${VEHICLE_LABELS[booking.vehicle] || booking.vehicle || '未选车型'}）`
      : '同时加购专属座驾：否',
  ].filter(Boolean);

  if (booking.notes) {
    lines.push('', '【客户备注】', booking.notes);
  }

  await send({
    to: ADMIN_ADDRESS,
    subject: `[待报价] VIP礼遇接待 — ${booking.name || '未填写姓名'} · ${booking.date || ''}`,
    text: lines.join('\n'),
  });
}

const TICKET_TYPE_LABELS = {
  tickets: '票务需求',
  museumTour: '博物馆专属导览',
};

// Same purpose as sendTerminalBookingNotification — tickets and the museum
// tour share one form (a type toggle) but have different field shapes, so
// this branches on requestType internally rather than needing a second,
// near-duplicate function.
export async function sendTicketBookingNotification(booking) {
  const isMuseumTour = booking.requestType === 'museumTour';
  const lines = [
    '状态：客户提交，等待人工报价确认',
    '',
    '【客户信息】',
    `姓名：${booking.name || '—'}`,
    `邮箱：${booking.email || '—'}`,
    `电话：${booking.phone || '—'}`,
    `偏好联系方式：${booking.preferredContactMethod || '—'}`,
    '',
    '【需求信息】',
    `类型：${TICKET_TYPE_LABELS[booking.requestType] || booking.requestType || '—'}`,
    !isMuseumTour && `景点/活动：${booking.eventName || '—'}`,
    isMuseumTour && `博物馆：${booking.museum || '—'}`,
    isMuseumTour &&
      booking.museum === 'other' &&
      '⚠️ 非固定价博物馆——先确认可行性和报价，不要直接按 €300 报价',
    isMuseumTour && `讲解语言：${booking.language || '—'}`,
    `人数：${booking.partySize || '—'}`,
    `日期：${booking.date || '—'}`,
    isMuseumTour &&
      `同时需要专属司机：${booking.wantsChauffeur ? `是（${booking.vehicle === 'aviation' ? '航空座椅' : '标准车型'}）` : '否'}`,
  ].filter(Boolean);

  if (booking.notes) {
    lines.push('', '【客户备注】', booking.notes);
  }

  await send({
    to: ADMIN_ADDRESS,
    subject: `[待报价] 票务/导览需求 — ${booking.name || '未填写姓名'} · ${booking.date || ''}`,
    text: lines.join('\n'),
  });
}

export async function sendAccommodationBookingNotification(booking) {
  const lines = [
    '状态：客户提交，等待人工报价确认',
    '',
    '【客户信息】',
    `姓名：${booking.name || '—'}`,
    `邮箱：${booking.email || '—'}`,
    `电话：${booking.phone || '—'}`,
    `偏好联系方式：${booking.preferredContactMethod || '—'}`,
    '',
    '【需求信息】',
    `酒店：${booking.propertyName || '—'}`,
    `入住人数：${booking.partySize || '—'}`,
    `入住日期：${booking.checkIn || '—'}`,
    `离店日期：${booking.checkOut || '—'}`,
    `需要完整雪季行程规划：${booking.wantsFullSeasonPlanning ? '是' : '否'}`,
    `需要备选酒店方案：${booking.wantsAlternativeHotels ? '是' : '否'}`,
  ].filter(Boolean);

  if (booking.notes) {
    lines.push('', '【客户备注】', booking.notes);
  }

  await send({
    to: ADMIN_ADDRESS,
    subject: `[待报价] 酒店预订咨询 — ${booking.propertyName || '—'} · ${booking.name || '未填写姓名'}`,
    text: lines.join('\n'),
  });
}

// Plain message text, reused both for the Resend email body and for the
// pre-filled WhatsApp (wa.me) click-to-send link in the admin orders page —
// one source of wording instead of maintaining it twice.
export function driverInfoMessageText(order) {
  return templateFor(DRIVER_INFO, order.booking.locale).body(order.vehicleInfo);
}

export function updatedPaymentLinkMessageText(order, checkoutUrl) {
  return templateFor(UPDATED_PAYMENT_LINK, order.booking.locale).body(checkoutUrl);
}

export function quoteReadyMessageText(order, checkoutUrl) {
  return templateFor(QUOTE_READY, order.booking.locale).body(
    order.amountTotal.toFixed(2),
    checkoutUrl,
    order.booking,
  );
}

export function terminalQuoteReadyMessageText(order, checkoutUrl) {
  return templateFor(TERMINAL_QUOTE_READY, order.booking.locale).body(
    order.amountTotal.toFixed(2),
    checkoutUrl,
    order.booking,
  );
}

export function ticketQuoteReadyMessageText(order, checkoutUrl) {
  return templateFor(TICKET_QUOTE_READY, order.booking.locale).body(
    order.amountTotal.toFixed(2),
    checkoutUrl,
    order.booking,
  );
}

export function hotelQuoteReadyMessageText(order, checkoutUrl) {
  return templateFor(HOTEL_QUOTE_READY, order.booking.locale).body(
    order.amountTotal.toFixed(2),
    checkoutUrl,
    order.booking,
  );
}

export function vipReceptionQuoteReadyMessageText(order, checkoutUrl) {
  return templateFor(VIP_RECEPTION_QUOTE_READY, order.booking.locale).body(
    order.amountTotal.toFixed(2),
    checkoutUrl,
    order.booking,
  );
}

export function surchargePaymentLinkMessageText(order, checkoutUrl) {
  return templateFor(SURCHARGE_PAYMENT_LINK, order.booking.locale).body(
    order.amountTotal.toFixed(2),
    checkoutUrl,
    order.booking,
  );
}

export async function sendSurchargePaymentLinkEmail(order, checkoutUrl) {
  const template = templateFor(SURCHARGE_PAYMENT_LINK, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: surchargePaymentLinkMessageText(order, checkoutUrl),
  });
}

export async function sendSurchargePaymentConfirmationEmail(order) {
  const template = templateFor(SURCHARGE_PAYMENT_CONFIRMATION, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.amountTotal.toFixed(2), order.booking),
  });
}

// Internal notification when a surcharge link is actually paid — distinct
// from sendInternalBookingNotification, which is labelled "包车新预订" (new
// chauffeur booking) and would be misleading here: this is a top-up on a
// trip that's already been arranged, not a new booking coming in.
export async function sendSurchargeInternalNotification(order) {
  const b = order.booking;
  const lines = [
    `状态：已支付 €${order.amountTotal.toFixed(2)}（Stripe）`,
    '',
    `关联订单：${b.relatedOrderId || '—'}`,
    `客户：${b.name || '—'}`,
    `原订单日期：${b.originalDate || '—'}`,
    b.note && `说明：${b.note}`,
  ].filter(Boolean);
  await send({
    to: ADMIN_ADDRESS,
    subject: `[已支付] 超时补款 — ${b.name || '未填写姓名'} · €${order.amountTotal.toFixed(2)}`,
    text: lines.join('\n'),
  });
}

export async function sendPaymentConfirmationEmail(order) {
  const template = templateFor(PAYMENT_CONFIRMATION, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.booking.date),
  });
}

export async function sendOrderConfirmedEmail(order) {
  const template = templateFor(ORDER_CONFIRMED, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject(order.booking.date),
    text: template.body(order.booking.date),
  });
}

// `note` is an optional admin-authored line (e.g. an alternative
// arrangement) appended after the standard refund wording — plain text, so
// it rides along as-is in whichever language the admin wrote it in.
export async function sendRefundApologyEmail(order, note) {
  const template = templateFor(REFUND_APOLOGY, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.amountTotal.toFixed(2), note),
  });
}

export async function sendDriverInfoEmail(order) {
  const template = templateFor(DRIVER_INFO, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject(order.booking.date),
    text: driverInfoMessageText(order),
  });
}

export async function sendQuoteReadyEmail(order, checkoutUrl) {
  const template = templateFor(QUOTE_READY, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.amountTotal.toFixed(2), checkoutUrl, order.booking),
  });
}

export async function sendTerminalQuoteReadyEmail(order, checkoutUrl) {
  const template = templateFor(TERMINAL_QUOTE_READY, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.amountTotal.toFixed(2), checkoutUrl, order.booking),
  });
}

export async function sendTicketQuoteReadyEmail(order, checkoutUrl) {
  const template = templateFor(TICKET_QUOTE_READY, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.amountTotal.toFixed(2), checkoutUrl, order.booking),
  });
}

export async function sendHotelQuoteReadyEmail(order, checkoutUrl) {
  const template = templateFor(HOTEL_QUOTE_READY, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.amountTotal.toFixed(2), checkoutUrl, order.booking),
  });
}

export async function sendVipReceptionQuoteReadyEmail(order, checkoutUrl) {
  const template = templateFor(VIP_RECEPTION_QUOTE_READY, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: template.body(order.amountTotal.toFixed(2), checkoutUrl, order.booking),
  });
}

export async function sendUpdatedPaymentLinkEmail(order, checkoutUrl) {
  const template = templateFor(UPDATED_PAYMENT_LINK, order.booking.locale);
  await send({
    to: order.booking.email,
    subject: template.subject,
    text: updatedPaymentLinkMessageText(order, checkoutUrl),
  });
}
