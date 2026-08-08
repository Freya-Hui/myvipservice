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
}

// English carries the full 16-item taxonomy; zh/fr/ru cover only the 8
// featured items, since no "view all 16" UI exists in those locales yet.
export const travelTypes: Record<Locale, TravelType[]> = {
  en: [
    {
      id: 'family-journeys',
      title: 'Family Journeys',
      description:
        'Itineraries paced for every generation, from childcare support to activities the whole family can share.',
      featured: true,
      order: 1,
      href: '/en/services/family-children-services/',
    },
    {
      id: 'romantic-escapes',
      title: 'Romantic Escapes',
      description:
        'Private dinners, secluded stays and quiet corners of Europe, planned around two people.',
      featured: true,
      order: 2,
      href: '/en/services/romantic-travel/',
    },
    {
      id: 'art-culture',
      title: 'Art & Culture',
      description:
        'Private museum access, gallery visits and cultural itineraries shaped around what moves you.',
      featured: true,
      order: 3,
      href: '/en/journeys/paris-loire-valley-journey/',
    },
    {
      id: 'food-wine',
      title: 'Food & Wine',
      description:
        'Estate visits across Bordeaux, Burgundy and beyond, alongside private dining with chefs and sommeliers.',
      featured: true,
      order: 4,
      href: '/en/services/dining-culinary-experiences/',
    },
    {
      id: 'celebrations',
      title: 'Celebrations & Special Occasions',
      description:
        'Anniversaries, milestone birthdays and family gatherings, staged in venues that suit the occasion.',
      featured: true,
      order: 5,
      href: '/en/services/private-experiences/',
    },
    {
      id: 'business-vip',
      title: 'Business & VIP Travel',
      description:
        'Meeting logistics, discreet transport and introductions arranged around a demanding schedule.',
      featured: true,
      order: 6,
      href: '/en/services/business-vip-assistance/',
    },
    {
      id: 'fashion-shopping',
      title: 'Fashion & Shopping',
      description:
        "Personal shopping appointments, ateliers and access to fittings across Europe's fashion capitals.",
      featured: false,
      order: 7,
    },
    {
      id: 'wellness-retreats',
      title: 'Wellness Retreats',
      description:
        'Spa stays, thermal circuits and quieter itineraries built around rest rather than sightseeing.',
      featured: false,
      order: 8,
    },
    {
      id: 'ski-alpine',
      title: 'Ski & Alpine Journeys',
      description:
        'Ski-in/ski-out chalets, private instructors and mountain dining across the Alps.',
      featured: true,
      order: 9,
      href: '/en/journeys/alps-geneva-journey/',
    },
    {
      id: 'coastal-yacht',
      title: 'Coastal & Yacht Escapes',
      description: 'Private moorings, coastal towns and days on the water along the Mediterranean.',
      featured: true,
      order: 10,
      href: '/en/journeys/cote-dazur-provence-journey/',
    },
    {
      id: 'multi-generational',
      title: 'Multi-Generational Travel',
      description: 'Itineraries that work for grandparents and grandchildren travelling together.',
      featured: false,
      order: 11,
    },
    {
      id: 'long-stay-europe',
      title: 'Long-Stay Europe',
      description:
        'Extended stays for clients who prefer to settle into one region rather than move quickly between cities.',
      featured: false,
      order: 12,
    },
    {
      id: 'private-small-groups',
      title: 'Private Small Groups',
      description:
        'Itineraries designed for a small circle of friends or colleagues travelling together.',
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
  zh: [
    {
      id: 'family-journeys',
      title: '家庭旅行',
      description: '兼顾各年龄段的行程安排，包含儿童看护支持与全家共享的活动。',
      featured: true,
      order: 1,
      href: '/zh/services/family-children-services/',
    },
    {
      id: 'romantic-escapes',
      title: '浪漫之旅',
      description: '私享晚餐、静谧居所与欧洲僻静角落，专为两人规划。',
      featured: true,
      order: 2,
      href: '/zh/services/romantic-travel/',
    },
    {
      id: 'art-culture',
      title: '艺术与文化',
      description: '私享博物馆通道、画廊参观与量身定制的文化行程。',
      featured: true,
      order: 3,
      href: '/zh/journeys/paris-loire-valley-journey/',
    },
    {
      id: 'food-wine',
      title: '美食与美酒',
      description: '探访波尔多、勃艮第等产区酒庄，与主厨和侍酒师共享私宴。',
      featured: true,
      order: 4,
      href: '/zh/services/dining-culinary-experiences/',
    },
    {
      id: 'celebrations',
      title: '庆典与特别时刻',
      description: '纪念日、里程碑生日与家庭聚会，在合适的场地举办。',
      featured: true,
      order: 5,
      href: '/zh/services/private-experiences/',
    },
    {
      id: 'business-vip',
      title: '商务与贵宾出行',
      description: '围绕繁忙行程安排会议后勤、专属接送与商务引荐。',
      featured: true,
      order: 6,
      href: '/zh/services/business-vip-assistance/',
    },
    {
      id: 'ski-alpine',
      title: '滑雪与阿尔卑斯之旅',
      description: '阿尔卑斯山脉的滑雪进出木屋、私人教练与山间美食。',
      featured: true,
      order: 9,
      href: '/zh/journeys/alps-geneva-journey/',
    },
    {
      id: 'coastal-yacht',
      title: '海岸与游艇假期',
      description: '地中海沿岸的私人泊位、滨海小镇与海上时光。',
      featured: true,
      order: 10,
      href: '/zh/journeys/cote-dazur-provence-journey/',
    },
  ],
  fr: [
    {
      id: 'family-journeys',
      title: 'Voyages en famille',
      description:
        'Itinéraires adaptés à chaque génération, avec accompagnement pour les enfants et des activités que toute la famille peut partager.',
      featured: true,
      order: 1,
      href: '/fr/services/family-children-services/',
    },
    {
      id: 'romantic-escapes',
      title: 'Escapades romantiques',
      description:
        "Dîners privés, adresses discrètes et coins tranquilles d'Europe, pensés pour deux.",
      featured: true,
      order: 2,
      href: '/fr/services/romantic-travel/',
    },
    {
      id: 'art-culture',
      title: 'Art & Culture',
      description:
        'Accès privé aux musées, visites de galeries et itinéraires culturels sur mesure.',
      featured: true,
      order: 3,
      href: '/fr/journeys/paris-loire-valley-journey/',
    },
    {
      id: 'food-wine',
      title: 'Gastronomie & Vin',
      description:
        'Domaines de Bordeaux, de Bourgogne et au-delà, dîners privés avec chefs et sommeliers.',
      featured: true,
      order: 4,
      href: '/fr/services/dining-culinary-experiences/',
    },
    {
      id: 'celebrations',
      title: 'Célébrations & occasions spéciales',
      description: 'Anniversaires et réunions de famille, organisés dans des lieux adaptés.',
      featured: true,
      order: 5,
      href: '/fr/services/private-experiences/',
    },
    {
      id: 'business-vip',
      title: 'Business & voyages VIP',
      description:
        "Logistique de réunions et transport discret autour d'un emploi du temps exigeant.",
      featured: true,
      order: 6,
      href: '/fr/services/business-vip-assistance/',
    },
    {
      id: 'ski-alpine',
      title: 'Ski & voyages alpins',
      description: 'Chalets ski-in/ski-out, moniteurs privés et tables de montagne dans les Alpes.',
      featured: true,
      order: 9,
      href: '/fr/journeys/alps-geneva-journey/',
    },
    {
      id: 'coastal-yacht',
      title: 'Escapades côtières & yacht',
      description: 'Mouillages privés et journées en mer le long de la Méditerranée.',
      featured: true,
      order: 10,
      href: '/fr/journeys/cote-dazur-provence-journey/',
    },
  ],
  ru: [
    {
      id: 'family-journeys',
      title: 'Семейные путешествия',
      description:
        'Маршруты для всех поколений, с поддержкой по уходу за детьми и мероприятиями для всей семьи.',
      featured: true,
      order: 1,
      href: '/ru/services/family-children-services/',
    },
    {
      id: 'romantic-escapes',
      title: 'Романтические путешествия',
      description: 'Частные ужины и тихие уголки Европы, продуманные для двоих.',
      featured: true,
      order: 2,
      href: '/ru/services/romantic-travel/',
    },
    {
      id: 'art-culture',
      title: 'Искусство и культура',
      description: 'Частный доступ в музеи и индивидуальные культурные маршруты.',
      featured: true,
      order: 3,
      href: '/ru/journeys/paris-loire-valley-journey/',
    },
    {
      id: 'food-wine',
      title: 'Гастрономия и вино',
      description:
        'Винодельни Бордо, Бургундии и других регионов, частные ужины с шефами и сомелье.',
      featured: true,
      order: 4,
      href: '/ru/services/dining-culinary-experiences/',
    },
    {
      id: 'celebrations',
      title: 'Торжества и особые случаи',
      description: 'Юбилеи и семейные встречи в подходящих местах.',
      featured: true,
      order: 5,
      href: '/ru/services/private-experiences/',
    },
    {
      id: 'business-vip',
      title: 'Бизнес и VIP-поездки',
      description: 'Логистика встреч и деликатный трансфер при плотном графике.',
      featured: true,
      order: 6,
      href: '/ru/services/business-vip-assistance/',
    },
    {
      id: 'ski-alpine',
      title: 'Горные лыжи и Альпы',
      description: 'Шале ski-in/ski-out, частные инструкторы и горные рестораны в Альпах.',
      featured: true,
      order: 9,
      href: '/ru/journeys/alps-geneva-journey/',
    },
    {
      id: 'coastal-yacht',
      title: 'Побережье и яхты',
      description: 'Частные стоянки и дни на воде вдоль Средиземноморья.',
      featured: true,
      order: 10,
      href: '/ru/journeys/cote-dazur-provence-journey/',
    },
  ],
};

export const processSteps: Record<Locale, SiteDataItem[]> = {
  en: [
    {
      title: 'Enquire',
      description: 'Share your dates, destination and what matters most to you.',
    },
    {
      title: 'We Design',
      description:
        'Our team builds a tailored proposal, drawing on our network across France and Europe.',
    },
    { title: 'Confirm', description: 'Review, refine and confirm every detail before you travel.' },
    {
      title: "We're With You",
      description: 'Round-the-clock support throughout your trip, from arrival to departure.',
    },
  ],
  zh: [
    { title: '发起咨询', description: '告诉我们出行日期、目的地与您最看重的需求。' },
    { title: '方案设计', description: '团队依托法国与欧洲网络，为您定制专属方案。' },
    { title: '确认行程', description: '确认每一处细节后再出发。' },
    { title: '全程支持', description: '行程期间全天候支持，直至旅程结束。' },
  ],
  fr: [
    {
      title: 'Votre demande',
      description: 'Partagez vos dates, votre destination et vos priorités.',
    },
    {
      title: 'Notre proposition',
      description: 'Nous concevons une offre sur mesure grâce à notre réseau.',
    },
    {
      title: 'Confirmation',
      description: 'Chaque détail est validé avant votre départ.',
    },
    {
      title: 'À vos côtés',
      description: 'Un accompagnement continu du départ au retour.',
    },
  ],
  ru: [
    { title: 'Запрос', description: 'Расскажите о датах, направлении и приоритетах.' },
    { title: 'Разработка', description: 'Команда готовит индивидуальное предложение.' },
    {
      title: 'Подтверждение',
      description: 'Каждая деталь согласовывается перед поездкой.',
    },
    { title: 'Сопровождение', description: 'Поддержка на протяжении всей поездки.' },
  ],
};

export const whyUsPoints: Record<Locale, SiteDataItem[]> = {
  en: [
    {
      title: 'France-Based',
      description: 'A team on the ground in Paris, not a call centre reading from a script.',
    },
    {
      title: 'Chinese-Speaking',
      description: 'Direct communication in Mandarin, with no translation lag on urgent requests.',
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
      title: '中文直接沟通',
      description: '普通话直接对接，紧急需求不会因翻译产生延误。',
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
      title: 'Interlocuteurs sinophones',
      description:
        'Communication directe en mandarin, sans délai de traduction sur les demandes urgentes.',
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
  ru: [
    {
      title: 'Команда во Франции',
      description: 'Команда на месте в Париже, а не колл-центр, читающий по сценарию.',
    },
    {
      title: 'Общение на китайском',
      description:
        'Прямое общение на китайском языке — срочные запросы не задерживаются на переводе.',
    },
    {
      title: 'Один персональный консультант',
      description:
        'Отели, водители, рестораны — всё координирует один консультант, вам не нужно повторять запрос заново.',
    },
    {
      title: 'До, во время и после поездки',
      description:
        'Поддержка не заканчивается на бронировании — мы на связи в течение поездки и после возвращения домой.',
    },
  ],
};

export const networkHighlights: Record<Locale, SiteDataItem[]> = {
  en: [
    {
      title: 'France',
      description:
        'The home of fashion and art, with privileged access to luxury-brand executives, runway shows and private receptions.',
    },
    {
      title: 'Europe-Wide Network',
      description:
        'Trusted partners across the UK, Switzerland, Italy, Spain and other leading destinations ensure seamless travel.',
    },
    {
      title: 'Compliance & Privacy',
      description:
        'European professional ethics, rigorous client confidentiality and professional standards throughout.',
    },
  ],
  zh: [
    {
      title: '法国',
      description: '时尚与艺术之都，通向奢侈品牌高层与私人活动的资源渠道。',
    },
    { title: '欧洲网络', description: '英国、瑞士、意大利、西班牙等地的可信赖合作伙伴。' },
    { title: '合规与隐私', description: '遵循欧洲职业道德，严格保护客户隐私。' },
  ],
  fr: [
    {
      title: 'France',
      description:
        'La patrie de la mode et de l’art, avec un accès privilégié aux dirigeants des maisons de luxe, aux défilés et aux réceptions privées.',
    },
    {
      title: 'Réseau européen',
      description:
        "Des partenaires de confiance au Royaume-Uni, en Suisse, en Italie, en Espagne et dans d'autres destinations majeures garantissent un voyage sans accroc.",
    },
    {
      title: 'Conformité & confidentialité',
      description: 'Éthique professionnelle européenne et confidentialité stricte.',
    },
  ],
  ru: [
    {
      title: 'Франция',
      description:
        'Родина моды и искусства, с привилегированным доступом к руководству люксовых домов, показам и частным приёмам.',
    },
    {
      title: 'Европейская сеть',
      description:
        'Надёжные партнёры в Великобритании, Швейцарии, Италии, Испании и других ведущих направлениях обеспечивают беспрепятственные поездки.',
    },
    {
      title: 'Комплаенс и конфиденциальность',
      description: 'Европейская профессиональная этика и строгая конфиденциальность.',
    },
  ],
};
