import type { Locale } from '../i18n/ui';

/**
 * Small, fixed-length lists used by homepage sections that don't warrant a
 * full content collection (they're part of the page layout, not editorial
 * content someone adds/removes items to). All four locales carry finalized
 * copy.
 */

export interface SiteDataItem {
  title: string;
  description: string;
}

/**
 * Country-level grouping for the Destinations list page. This is *display*
 * structure, not content: it doesn't touch the `destinations` collection
 * schema (which only has a continent-level `region` field) — it's a plain
 * ordered list of translationKeys per country, kept here so the page order
 * (France first, then the rest of Europe) is data-driven instead of
 * hardcoded conditionals. Empty groups simply don't render; add keys here
 * as matching destination content is published, no schema change needed.
 */
export interface DestinationCountryGroup {
  /** matches a `destinations.country.*` key in ui.ts */
  labelKey: string;
  translationKeys: string[];
}

export const destinationCountryGroups: DestinationCountryGroup[] = [
  {
    labelKey: 'destinations.country.france',
    translationKeys: [
      'paris',
      'french-riviera',
      'provence',
      'french-alps',
      'bordeaux',
      'burgundy',
      'loire-valley',
    ],
  },
  { labelKey: 'destinations.country.switzerland', translationKeys: ['geneva'] },
  { labelKey: 'destinations.country.italy', translationKeys: ['milan'] },
  { labelKey: 'destinations.country.unitedKingdom', translationKeys: ['london'] },
  { labelKey: 'destinations.country.monaco', translationKeys: ['monaco'] },
  { labelKey: 'destinations.country.spainPortugal', translationKeys: ['marbella'] },
  { labelKey: 'destinations.country.greece', translationKeys: ['athens'] },
  { labelKey: 'destinations.country.otherEurope', translationKeys: ['vienna'] },
  { labelKey: 'destinations.country.japan', translationKeys: ['japan'] },
];

export interface TravelType extends SiteDataItem {
  id: string;
  featured: boolean;
  order: number;
  /** Locale-prefixed path to the closest matching Journey/Service/Experience page. Omitted where no real match exists. */
  href?: string;
  /** Registered image-attributions.ts id — set on featured items only (the homepage card grid needs a photo; the unfeatured 8 don't render anywhere yet). */
  imageId?: string;
  /**
   * Indicative price line, shown only where set. Deliberately omitted from
   * the zh locale by editorial decision — Chinese-market enquiries go
   * through a quote conversation rather than a sticker price — so this is
   * populated per-locale, not derived from one shared value.
   */
  price?: string;
  /** Short "FOR ___" style caption for the homepage photo-mosaic — set on
   *  featured items only. The full `title` (e.g. "Coastal & Yacht
   *  Escapes") stays the one used everywhere else (nav-style listings,
   *  card grids); this is just a punchier label for text-over-photo use. */
  shortLabel?: string;
}

// This array is now a pure backlog, not a page data source: the 4
// previously-featured entries (family-journeys / romantic-escapes /
// celebrations / business-vip) have been migrated into the real
// `travelStyles` content collection (src/content/travel-styles/) and its
// `/travel-styles/{slug}/` detail pages — see docs/content-architecture.md
// §5 and the `travel-audience-segments` skill. The 12 entries below are
// candidate future travel styles, kept for reference only; nothing reads
// this array. Building one out means adding a real travelStyles entry per
// locale, not un-commenting anything here.
export const travelTypes: Record<Locale, TravelType[]> = {
  en: [
    {
      id: 'multi-generational',
      title: 'Multi-Generational Travel',
      description: 'Itineraries that work for grandparents and grandchildren travelling together.',
      featured: false,
      order: 5,
    },
    {
      id: 'private-small-groups',
      title: 'Private Small Groups',
      description:
        'Itineraries designed for a small circle of friends or colleagues travelling together, with a single point of contact for the whole party.',
      featured: false,
      order: 6,
    },
    {
      id: 'art-culture',
      title: 'Art & Culture',
      description:
        'Expert-guided museum tours, gallery visits and cultural itineraries shaped around what moves you.',
      featured: false,
      order: 7,
      href: '/en/journeys/paris-loire-valley-journey/',
    },
    {
      id: 'food-wine',
      title: 'Food & Wine',
      description:
        'Estate visits across Bordeaux, Burgundy and beyond, alongside private dining with chefs and sommeliers.',
      featured: false,
      order: 8,
      href: '/en/journeys/bordeaux-burgundy-wine-journey/',
    },
    {
      id: 'ski-alpine',
      title: 'Ski & Alpine Journeys',
      description:
        'Ski-in/ski-out chalets, private instructors and mountain dining across the Alps.',
      featured: false,
      order: 9,
      href: '/en/journeys/alps-geneva-journey/',
    },
    {
      id: 'coastal-yacht',
      title: 'Coastal & Yacht Escapes',
      description: 'Private moorings, coastal towns and days on the water along the Mediterranean.',
      featured: false,
      order: 10,
      href: '/en/journeys/cote-dazur-provence-journey/',
    },
    {
      id: 'fashion-shopping',
      title: 'Fashion & Shopping',
      description:
        "Personal shopping appointments, ateliers and access to fittings across Europe's fashion capitals.",
      featured: false,
      order: 11,
    },
    {
      id: 'wellness-retreats',
      title: 'Wellness Retreats',
      description:
        'Spa stays, thermal circuits and quieter itineraries built around rest rather than sightseeing.',
      featured: false,
      order: 12,
    },
    {
      id: 'long-stay-europe',
      title: 'Long-Stay Europe',
      description:
        'Extended stays for clients who prefer to settle into one region rather than move quickly between cities.',
      featured: false,
      order: 13,
    },
    {
      id: 'children-focused',
      title: 'Children-Focused Travel',
      description: 'Activities, childcare and pacing built around younger travellers.',
      featured: false,
      order: 14,
    },
    {
      id: 'summer-camp-support',
      title: 'Summer Camp Family Support',
      description:
        'Logistics and local support for families enrolling children in European summer programmes.',
      featured: false,
      order: 15,
    },
    {
      id: 'multi-city-europe',
      title: 'Multi-City European Journeys',
      description:
        'A single itinerary connecting several European cities, with transport and stays arranged end to end.',
      featured: false,
      order: 16,
    },
  ],
  // The 12 backlog styles have never been translated (only the now-migrated
  // 4 were) — kept empty rather than partially populated.
  zh: [],
  fr: [],
};

export const whyUsPoints: Record<Locale, SiteDataItem[]> = {
  en: [
    {
      title: 'France-Based',
      description: 'A team on the ground in Paris, not a call centre reading from a script.',
    },
    {
      title: 'English, Chinese & French, Fluently',
      description:
        'Advisors work comfortably across all three languages, so urgent requests never wait on translation.',
    },
    {
      title: 'One Dedicated Contact',
      description:
        'A single advisor coordinates every supplier — hotels, drivers, restaurants — so you never repeat yourself.',
    },
    {
      title: 'Before, During and After',
      description:
        'Support doesn’t stop at booking — we stay reachable through the trip and after you’re home.',
    },
  ],
  zh: [
    {
      title: '扎根法国',
      description: '巴黎本地团队，而非照本宣科的呼叫中心。',
    },
    {
      title: '中英法三语沟通',
      description: '顾问团队可自如切换中、英、法三语，紧急需求不会因翻译产生延误。',
    },
    {
      title: '一位专属顾问',
      description: '酒店、司机、餐厅——所有供应商由同一位顾问统一协调，您无需重复说明需求。',
    },
    {
      title: '行前、行中、行后',
      description: '支持不止于预订本身——行程期间乃至归国后，我们始终保持联系。',
    },
  ],
  fr: [
    {
      title: 'Basés en France',
      description: "Une équipe sur le terrain à Paris, pas un centre d'appels qui lit un script.",
    },
    {
      title: 'Anglais, chinois et français, couramment',
      description:
        "Nos conseillers travaillent aisément dans ces trois langues, pour qu'aucune demande urgente n'attende une traduction.",
    },
    {
      title: 'Un conseiller dédié',
      description:
        'Un seul interlocuteur coordonne chaque prestataire — hôtels, chauffeurs, restaurants — sans jamais vous répéter.',
    },
    {
      title: 'Avant, pendant et après',
      description:
        "Notre accompagnement ne s'arrête pas à la réservation — nous restons joignables pendant le séjour et après votre retour.",
    },
  ],
};

/**
 * Homepage "quick services" grid — the fastest, most transactional asks
 * (book a hotel, airport transfer, chauffeur, tickets) as literal
 * task-named entries, rather than travelTypes' mood-based framing, so a
 * visitor can recognise a concrete service at a glance. Reuses the
 * TravelTypes component/shape; several entries intentionally point at the
 * same service page, since one page's content already covers all of them
 * (e.g. private-transportation covers transfer/chauffeur).
 */
export const quickServices: Record<Locale, TravelType[]> = {
  en: [
    {
      id: 'quick-hotel',
      title: 'Hotel Booking',
      description: 'Long-standing partner hotels — upgrades and priority perks where possible.',
      featured: true,
      order: 1,
      href: '/en/services/hotel-villa-reservations/book/',
    },
    {
      id: 'quick-transfer',
      title: 'VIP Airport Reception',
      description: 'Meet-and-assist from the gate to a car waiting outside.',
      featured: true,
      order: 2,
      href: '/en/services/vip-airport-reception/book/',
    },
    {
      id: 'quick-chauffeur',
      title: 'Private Chauffeur',
      description: 'A car and driver on call, for a few hours or the full stay.',
      featured: true,
      order: 3,
      href: '/en/services/private-transportation/chauffeur/book/',
    },
    {
      id: 'quick-tickets',
      title: 'Tickets & Guided Tours',
      description:
        'Scarce seats for tennis, motorsport and sold-out shows, plus a private guided museum tour — Louvre, Orsay, Versailles and beyond.',
      featured: true,
      order: 4,
      href: '/en/services/tickets-events/book/',
    },
  ],
  zh: [
    {
      id: 'quick-hotel',
      title: '酒店预订',
      description: '长期合作的地标酒店，视情况协助升房与优先礼遇。',
      featured: true,
      order: 1,
      href: '/zh/services/hotel-villa-reservations/book/',
    },
    {
      id: 'quick-transfer',
      title: 'VIP礼遇接待',
      description: '从舱门口到座驾，全程有人迎接。',
      featured: true,
      order: 2,
      href: '/zh/services/vip-airport-reception/book/',
    },
    {
      id: 'quick-chauffeur',
      title: '包车服务',
      description: '专车专属司机随叫随到，按小时或全程安排。',
      featured: true,
      order: 3,
      href: '/zh/services/private-transportation/chauffeur/book/',
    },
    {
      id: 'quick-tickets',
      title: '票务与讲解预订',
      description: '网球、赛车与热门演出的稀缺席位，以及卢浮宫、奥赛、凡尔赛等博物馆专属讲解。',
      featured: true,
      order: 4,
      href: '/zh/services/tickets-events/book/',
    },
  ],
  fr: [
    {
      id: 'quick-hotel',
      title: "Réservation d'hôtel",
      description:
        'Hôtels partenaires de longue date — surclassements et égards prioritaires selon disponibilité.',
      featured: true,
      order: 1,
      href: '/fr/services/hotel-villa-reservations/book/',
    },
    {
      id: 'quick-transfer',
      title: 'Accueil VIP Aéroport',
      description: "Accueil dès la porte d'embarquement jusqu'à la voiture.",
      featured: true,
      order: 2,
      href: '/fr/services/vip-airport-reception/book/',
    },
    {
      id: 'quick-chauffeur',
      title: 'Chauffeur privé',
      description: "Voiture et chauffeur disponibles, à l'heure ou pour tout le séjour.",
      featured: true,
      order: 3,
      href: '/fr/services/private-transportation/chauffeur/book/',
    },
    {
      id: 'quick-tickets',
      title: 'Billets & Visites Guidées',
      description:
        "Places rares pour le tennis, le sport automobile et les spectacles complets, ainsi qu'une visite guidée privée de musée — Louvre, Orsay, Versailles et plus.",
      featured: true,
      order: 4,
      href: '/fr/services/tickets-events/book/',
    },
  ],
};
