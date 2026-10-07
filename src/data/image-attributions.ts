/**
 * Registry of every non-original image used on the site. Every entry here
 * must have a matching row in docs/image-asset-register.md — keep both in
 * sync. `usageStatus: 'temporary'` means: fine to ship as a Phase 1 visual
 * placeholder, but swap for commissioned/licensed photography before this
 * goes further than an internal review.
 */

import type { Locale } from '../i18n/ui';

export type ImageUsageStatus = 'temporary' | 'licensed' | 'pending-approval';

export interface ImageAttribution {
  id: string;
  /** Local path served from /public — never hot-link the original source. */
  src: string;
  sourceUrl: string;
  sourceName: string;
  author: string;
  license: string;
  usageStatus: ImageUsageStatus;
  /** Alt text per locale — screen readers should never fall back to English. */
  altByLocale: Record<Locale, string>;
  notes?: string;
}

export const imageAttributions: ImageAttribution[] = [
  {
    id: 'hero-home',
    src: '/images/hero-home.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-view-of-a-city-from-a-roof-top-PEMcqBV5L7Q',
    sourceName: 'Unsplash',
    author: 'Svetlana Gumerova',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Paris rooftops with the Sacré-Cœur basilica in the distance.',
      zh: '巴黎屋顶景观，远处可见圣心大教堂。',
      fr: 'Les toits de Paris avec la basilique du Sacré-Cœur au loin.',
    },
    notes:
      'Homepage hero — deliberately not the Eiffel Tower (avoids the tourist-postcard cliché per the brand design principles); a quieter "insider view" composition.',
  },
  {
    id: 'destination-paris',
    src: '/images/destination-paris.jpg',
    sourceUrl: 'https://unsplash.com/photos/white-painted-building-under-blue-sky-m8b0B00iHvI',
    sourceName: 'Unsplash',
    author: 'Matthieu Oger',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A corner apartment building with a domed turret on a tree-lined Paris street.',
      zh: '巴黎林荫街道上一栋带穹顶转角的公寓楼。',
      fr: 'Un immeuble d’angle à tourelle en dôme, sur une rue parisienne bordée d’arbres.',
    },
    notes:
      'Replaces a reused Eiffel Tower cliché shot (previously shared with the old hero-paris file) with a distinct, non-touristic Paris street scene — avoids the "Eiffel Tower cliché" the brand principles call out, and gives this id its own image instead of sharing a file with another id.',
  },
  {
    id: 'destination-french-riviera',
    src: '/images/destination-french-riviera.jpg',
    sourceUrl:
      'https://unsplash.com/photos/coastal-town-nestled-by-the-blue-sea-and-mountains-aoFr17pnyrs',
    sourceName: 'Unsplash',
    author: 'Kamilla Isalieva',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A coastal town on the French Riviera, nestled between the sea and hills.',
      zh: '法国里维埃拉的一座滨海小镇，坐落于大海与山丘之间。',
      fr: "Une ville côtière de la Côte d'Azur, nichée entre mer et collines.",
    },
  },
  {
    id: 'destination-french-alps',
    src: '/images/destination-french-alps.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-snow-covered-mountain-with-a-ski-lodge-in-the-foreground-0zwzo_v2ZHQ',
    sourceName: 'Unsplash',
    author: 'Nicola Fittipaldi',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A snow-covered mountain with a ski lodge in the foreground, in the French Alps.',
      zh: '法国阿尔卑斯山脉中一座白雪覆盖的山峰，前景是一座滑雪小屋。',
      fr: 'Une montagne enneigée avec un chalet de ski au premier plan, dans les Alpes françaises.',
    },
  },
  {
    id: 'destination-provence',
    src: '/images/destination-provence.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-village-on-top-of-a-hill-surrounded-by-trees-vLJDVNSywA0',
    sourceName: 'Unsplash',
    author: 'Simon Spring',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A hilltop village in Provence, surrounded by trees.',
      zh: '普罗旺斯一座被树林环绕的山顶村庄。',
      fr: "Un village perché en Provence, entouré d'arbres.",
    },
  },
  {
    id: 'service-hotels-villas',
    src: '/images/service-hotels-villas.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-hotel-lobby-with-a-chandelier-hanging-from-the-ceiling-WR1bkBstInw',
    sourceName: 'Unsplash',
    author: 'Quang Nguyen Vinh',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A hotel lobby with a chandelier hanging from the ceiling.',
      zh: '一间酒店大堂，天花板悬挂着水晶吊灯。',
      fr: "Un hall d'hôtel avec un lustre suspendu au plafond.",
    },
    notes:
      'Generic — does not depict any named, real property. Do not caption with a specific hotel name.',
  },
  {
    id: 'service-hotel-exterior',
    src: '/images/service-hotel-exterior.jpg',
    sourceUrl: 'https://unsplash.com/photos/two-large-urns-flank-a-swimming-pool-area-jJFi3ie9Grw',
    sourceName: 'Unsplash',
    author: 'Claudio Pantoni',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A private villa pool terrace in Provence, framed by cypress trees and terracotta urns.',
      zh: '普罗旺斯一处私人别墅泳池露台，柏树与陶罐环绕。',
      fr: 'La terrasse d’une piscine de villa privée en Provence, entre cyprès et jarres en terre cuite.',
    },
    notes:
      'Hotel & Villa Reservations service hero — generic, does not depict any named, real property. Do not caption with a specific hotel or villa name.',
  },
  {
    id: 'service-private-experiences',
    src: '/images/service-private-experiences.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-table-is-set-with-candles-and-plates-of-food-HCFqhYC_Hvw',
    sourceName: 'Unsplash',
    author: 'Zac Cain',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A candlelit dinner table set with plates of food.',
      zh: '烛光晚宴餐桌，摆放着精致菜肴。',
      fr: 'Une table dressée aux chandelles, avec des assiettes garnies.',
    },
  },
  {
    id: 'journal-preview-paris-cafe',
    src: '/images/journal-preview-paris-cafe.jpg',
    sourceUrl:
      'https://unsplash.com/photos/people-sitting-on-chair-near-building-during-daytime-bOICdD-Gulk',
    sourceName: 'Unsplash',
    author: 'Alex Harmuth',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'People sitting at a café terrace on a Paris street.',
      zh: '人们坐在巴黎街头的咖啡馆露台上。',
      fr: "Des personnes assises à la terrasse d'un café, dans une rue de Paris.",
    },
  },
  {
    id: 'destination-geneva',
    src: '/images/destination-geneva.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-view-of-a-city-from-above-4BcxkctzeUM',
    sourceName: 'Unsplash',
    author: 'Tom Podmore',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'An aerial view of Geneva, Switzerland, in the morning.',
      zh: '清晨瑞士日内瓦的航拍景色。',
      fr: 'Vue aérienne de Genève, en Suisse, le matin.',
    },
  },
  {
    id: 'destination-japan',
    src: '/images/destination-japan.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-pagoda-with-a-tree-in-front-of-it-with-kiyomizu-dera-in-the-background-ZNBg8Pinuak',
    sourceName: 'Unsplash',
    author: 'Shinichi Kotoku',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A pagoda near Kiyomizu-dera temple in Kyoto, Japan.',
      zh: '日本京都清水寺附近的一座宝塔。',
      fr: 'Une pagode près du temple Kiyomizu-dera à Kyoto, au Japon.',
    },
  },
  {
    id: 'accommodation-villa-geneva',
    src: '/images/accommodation-villa-geneva.jpg',
    sourceUrl:
      'https://unsplash.com/photos/spacious-green-lawn-and-swimming-pool-with-lounge-chairs-3Jb1wgUwG4M',
    sourceName: 'Unsplash',
    author: 'Aziz Kouri',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A villa garden with a swimming pool and lounge chairs.',
      zh: '别墅花园，配有游泳池与休闲躺椅。',
      fr: 'Un jardin de villa avec piscine et chaises longues.',
    },
    notes: 'Generic villa exterior — does not depict any named, real property.',
  },
  {
    id: 'accommodation-chateau-de-neydens-exterior',
    src: '/images/accommodation-chateau-de-neydens-exterior.jpg',
    sourceUrl: 'https://www.chateauneydens.com/en',
    sourceName: 'Château de Neydens (Idyllic Collection) official site',
    author: 'Idyllic Collection',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Château de Neydens at dusk, its 12th-century stone tower lit beside the pool terrace.',
      zh: '黄昏时分的Château de Neydens，12世纪石塔在泳池露台旁亮起灯光。',
      fr: 'Le Château de Neydens au crépuscule, sa tour de pierre du XIIe siècle éclairée près de la terrasse de la piscine.',
    },
    notes: 'Former 12th-century Cistercian barn, officially classified 5-star.',
  },
  {
    id: 'accommodation-chateau-de-neydens-facade2',
    src: '/images/accommodation-chateau-de-neydens-facade2.jpg',
    sourceUrl: 'https://www.chateauneydens.com/en',
    sourceName: 'Château de Neydens (Idyllic Collection) official site',
    author: 'Idyllic Collection',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The infinity pool at Château de Neydens, overlooking the wooded 1.5-hectare park and distant hills.',
      zh: 'Château de Neydens的无边泳池，俯瞰1.5公顷的林地庄园与远山。',
      fr: "La piscine à débordement du Château de Neydens, avec vue sur le parc boisé d'1,5 hectare et les collines au loin.",
    },
    notes: 'Distinct daytime angle from the dusk exterior shot, no duplicate.',
  },
  {
    id: 'accommodation-chateau-de-neydens-pool',
    src: '/images/accommodation-chateau-de-neydens-pool.jpg',
    sourceUrl: 'https://www.chateauneydens.com/en',
    sourceName: 'Château de Neydens (Idyllic Collection) official site',
    author: 'Idyllic Collection',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Canopied daybeds beside the 20-metre heated pool at Château de Neydens.',
      zh: 'Château de Neydens 20米恒温泳池旁带顶棚的双人躺椅。',
      fr: 'Des lits de jour à baldaquin près de la piscine chauffée de 20 mètres du Château de Neydens.',
    },
    notes: 'Heated outdoor pool with adjustable depth.',
  },
  {
    id: 'accommodation-chateau-de-neydens-cinema',
    src: '/images/accommodation-chateau-de-neydens-cinema.jpg',
    sourceUrl: 'https://www.chateauneydens.com/en',
    sourceName: 'Château de Neydens (Idyllic Collection) official site',
    author: 'Idyllic Collection',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The château’s private home cinema, voted Best Home Cinema EMEA in 2022.',
      zh: '城堡的私人家庭影院，2022年获评"欧洲、中东及非洲最佳家庭影院"。',
      fr: 'Le home cinéma privé du château, élu meilleur home cinéma EMEA en 2022.',
    },
    notes: 'Award-winning amenity — a genuinely distinctive feature for this property.',
  },
  {
    id: 'accommodation-chateau-de-neydens-cars',
    src: '/images/accommodation-chateau-de-neydens-cars.jpg',
    sourceUrl: 'https://www.chateauneydens.com/en',
    sourceName: 'Château de Neydens (Idyllic Collection) official site',
    author: 'Idyllic Collection',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The château’s private collector-car gallery, with a vintage Aston Martin among the exhibits.',
      zh: '城堡内的私人经典车藏品展廊，一台复古款Aston Martin位列其中。',
      fr: 'La galerie privée de voitures de collection du château, avec une Aston Martin vintage parmi les pièces exposées.',
    },
    notes: 'Private exhibition of collector cars, a distinctive amenity for this property.',
  },
  {
    id: 'accommodation-chateau-de-neydens-cave',
    src: '/images/accommodation-chateau-de-neydens-cave.jpg',
    sourceUrl: 'https://www.chateauneydens.com/en',
    sourceName: 'Château de Neydens (Idyllic Collection) official site',
    author: 'Idyllic Collection',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The château’s historic wine cellar, stocked with Bordeaux.',
      zh: '城堡内的历史酒窖，存放着波尔多名庄佳酿。',
      fr: 'La cave historique du château, garnie de grands crus bordelais.',
    },
    notes: 'Historic cellar within the former Cistercian barn structure.',
  },
  {
    id: 'accommodation-chateau-de-neydens-park',
    src: '/images/accommodation-chateau-de-neydens-park.jpg',
    sourceUrl: 'https://www.chateauneydens.com/en',
    sourceName: 'Château de Neydens (Idyllic Collection) official site',
    author: 'Idyllic Collection',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "A shaded lounge set up beneath a tree in the château's 1.5-hectare wooded park.",
      zh: '城堡1.5公顷林地庄园内树荫下的休闲区。',
      fr: "Un salon d'extérieur ombragé sous un arbre, dans le parc boisé d'1,5 hectare du château.",
    },
    notes: "The estate's grounds, distinct from the pool-terrace images.",
  },
  {
    id: 'event-art-basel-paris-2025-aerial',
    src: '/images/event-art-basel-paris-2025-aerial.jpg',
    sourceUrl: 'https://myvipservice.com/',
    sourceName: 'MYVIPSERVICE',
    author: 'MYVIPSERVICE',
    license: 'Own photograph',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Rows of white gallery booths and visitors under the glass roof of the Grand Palais during Art Basel Paris.',
      zh: '巴黎艺术周期间，大皇宫玻璃穹顶之下一排排白色画廊展位与参观者。',
      fr: 'Des rangées de stands de galeries blancs et des visiteurs sous la verrière du Grand Palais, pendant Art Basel Paris.',
    },
    notes:
      'Own photograph taken at the 2025 edition of Art Basel Paris, wide view only. Faces are not identifiable. No individual artwork is the subject.',
  },
  {
    id: 'event-art-basel-paris-2025-hall',
    src: '/images/event-art-basel-paris-2025-hall.jpg',
    sourceUrl: 'https://myvipservice.com/',
    sourceName: 'MYVIPSERVICE',
    author: 'MYVIPSERVICE',
    license: 'Own photograph',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The fair floor seen from a balcony beneath the green iron roof of the Grand Palais, visitors moving between booths.',
      zh: '从露台望向大皇宫绿色铁艺穹顶下的展厅，参观者在展位之间走动。',
      fr: 'La salle de la foire vue depuis un balcon, sous la charpente métallique verte du Grand Palais, des visiteurs circulant entre les stands.',
    },
    notes:
      'Own photograph taken at the 2025 edition of Art Basel Paris, wide view only. Faces are not identifiable. No individual artwork is the subject.',
  },
  {
    id: 'destination-paris-grand-palais-night',
    src: '/images/destination-paris-grand-palais-night.jpg',
    sourceUrl:
      'https://www.pexels.com/photo/glass-dome-of-grand-palais-in-paris-at-night-29356596/',
    sourceName: 'Pexels',
    author: 'Siva Seshappan',
    license: 'Pexels License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The glass dome of the Grand Palais in Paris at night, a French flag above the roofline.',
      zh: '夜晚的巴黎大皇宫玻璃穹顶，屋顶上方飘着法国国旗。',
      fr: 'La verrière du Grand Palais, à Paris, de nuit, avec un drapeau français au-dessus de la toiture.',
    },
    notes: 'Grand Palais exterior, taken 2 November 2024. Not an Art Basel event photograph.',
  },
  {
    id: 'experience-art-gallery',
    src: '/images/experience-art-gallery.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-large-painting-hanging-on-the-wall-of-a-museum-uJCubgWo-0E',
    sourceName: 'Unsplash',
    author: 'Declan Sun',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A large painting displayed in an art museum gallery.',
      zh: '艺术博物馆展厅中展出的一幅大型画作。',
      fr: "Une grande toile exposée dans une galerie de musée d'art.",
    },
    notes: 'Generic gallery interior — does not depict the Louvre or any named institution.',
  },
  {
    id: 'service-private-transportation',
    src: '/images/service-private-transportation.jpg',
    sourceUrl: 'https://unsplash.com/photos/black-car-PScacPyJE5U',
    sourceName: 'Unsplash',
    author: 'Zoe Holling',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A black luxury chauffeured car parked outside an elegant hotel entrance.',
      zh: '一辆黑色豪华专车停靠在典雅的酒店门口。',
      fr: "Une voiture de luxe noire avec chauffeur garée devant l'entrée élégante d'un hôtel.",
    },
    notes: 'Generic — does not depict any named property or chauffeur company.',
  },
  {
    id: 'service-dining',
    src: '/images/service-dining.jpg',
    sourceUrl: 'https://unsplash.com/photos/dish-on-white-ceramic-plate-N_Y88TWmGwA',
    sourceName: 'Unsplash',
    author: 'Jay Wennington',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A plated gourmet dish on a restaurant table set with wine glasses and bread.',
      zh: '餐厅餐桌上摆放的精致美食，配有红酒杯与面包。',
      fr: 'Un plat gastronomique dressé sur une table de restaurant, avec verres à vin et pain.',
    },
    notes: 'Generic — does not depict any named restaurant.',
  },
  {
    id: 'service-tickets-events',
    src: '/images/service-tickets-events.jpg',
    sourceUrl: 'https://unsplash.com/photos/empty-theater-with-rows-of-seats-and-stage-kFCor16bqq4',
    sourceName: 'Unsplash',
    author: 'ARTO SURAJ',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'An empty theatre auditorium with rows of red seats facing the stage.',
      zh: '空旷的剧院观众厅，一排排红色座椅面向舞台。',
      fr: 'Une salle de théâtre vide avec des rangées de sièges rouges face à la scène.',
    },
    notes: 'Generic — does not depict any named venue or event.',
  },
  {
    id: 'service-family',
    src: '/images/service-family.jpg',
    sourceUrl:
      'https://unsplash.com/photos/man-woman-and-child-holding-hands-on-seashore-SIOdjcYotms',
    sourceName: 'Unsplash',
    author: 'Natalya Zaritskaya',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A family of three holding hands and walking along the seashore.',
      zh: '一家三口手牵手走在海边。',
      fr: 'Une famille de trois personnes se tenant la main en marchant le long du rivage.',
    },
  },
  {
    id: 'service-concierge',
    src: '/images/service-concierge.jpg',
    sourceUrl:
      'https://unsplash.com/photos/hotel-reception-desk-with-modern-wooden-furniture-and-seating-kfnWOD1Tbp8',
    sourceName: 'Unsplash',
    author: 'Neon Wang',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A hotel reception desk with warm wood panelling and modern seating.',
      zh: '酒店前台，温暖的木质装潢与现代化座椅。',
      fr: "Un comptoir de réception d'hôtel avec un habillage en bois chaleureux et un mobilier moderne.",
    },
    notes: 'Generic — does not depict any named property.',
  },
  {
    id: 'service-reception-desk-call',
    src: '/images/service-reception-desk-call.jpg',
    sourceUrl: 'https://pixabay.com/photos/receptionists-phone-call-hotel-5975962/',
    sourceName: 'Pixabay',
    author: 'Rodrigo_SalomonHC',
    license: 'Pixabay License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A hotel receptionist answering the phone, with a guest suitcase waiting at the desk.',
      zh: '酒店前台接待人员正在接听电话，柜台旁放着客人的行李箱。',
      fr: "Une réceptionniste d'hôtel répondant au téléphone, avec la valise d'un client posée au comptoir.",
    },
    notes: 'Generic — does not depict any named property.',
  },
  {
    id: 'service-business',
    src: '/images/service-business.jpg',
    sourceUrl: 'https://unsplash.com/photos/modern-meeting-room-with-city-view-yzOieLQof-U',
    sourceName: 'Unsplash',
    author: 'Marc Wieland',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A modern meeting room with a panoramic city skyline view.',
      zh: '现代化会议室，可俯瞰城市天际线全景。',
      fr: 'Une salle de réunion moderne avec une vue panoramique sur la ville.',
    },
    notes: 'Generic — does not depict any named venue.',
  },
  {
    id: 'service-travel-planning',
    src: '/images/service-travel-planning.jpg',
    sourceUrl: 'https://unsplash.com/photos/eyeglasses-on-map-qoAIlAmLJBU',
    sourceName: 'Unsplash',
    author: 'oxana v',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A pair of glasses resting on an open travel map with a notebook and pen.',
      zh: '一副眼镜放在展开的旅行地图上，旁边是笔记本与钢笔。',
      fr: 'Une paire de lunettes posée sur une carte de voyage ouverte, avec un carnet et un stylo.',
    },
  },
  {
    id: 'service-fashion-shopping',
    src: '/images/service-fashion-shopping.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-room-with-a-wall-of-clothes-on-the-wall-CDLBz2lPpLM',
    sourceName: 'Unsplash',
    author: 'Max Harlynking',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A minimalist clothing boutique with a wall of garments on hangers.',
      zh: '极简风格的精品服装店，一整面墙的挂装。',
      fr: 'Une boutique de vêtements minimaliste avec un mur de vêtements sur cintres.',
    },
    notes: 'Generic — does not depict any named boutique or brand MYVIPSERVICE is affiliated with.',
  },
  {
    id: 'service-romantic-travel',
    src: '/images/service-romantic-travel.jpg',
    sourceUrl: 'https://unsplash.com/photos/dinner-table-is-set-at-sunset-Epwi_z04Tgo',
    sourceName: 'Unsplash',
    author: 'Lilian Do Khac',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A candlelit table set for two on a terrace at sunset.',
      zh: '夕阳下露台上为两人布置的烛光晚餐桌。',
      fr: 'Une table dressée aux chandelles pour deux, sur une terrasse au coucher du soleil.',
    },
  },
  {
    id: 'destination-french-riviera-yacht',
    src: '/images/destination-french-riviera-yacht.jpg',
    sourceUrl:
      'https://unsplash.com/photos/luxury-yachts-docked-in-a-sunny-harbor-with-city-buildings-ghCui-1AFRA',
    sourceName: 'Unsplash',
    author: 'Todor Andonov',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Luxury yachts moored in a sunny Mediterranean harbour.',
      zh: '地中海阳光港湾中停泊的豪华游艇。',
      fr: 'Yachts de luxe amarrés dans un port méditerranéen ensoleillé.',
    },
    notes: 'Generic marina — does not depict a specific named port or club.',
  },
  {
    id: 'destination-provence-vineyard',
    src: '/images/destination-provence-vineyard.jpg',
    sourceUrl:
      'https://unsplash.com/photos/vineyard-rows-with-a-farmhouse-and-mountains-under-blue-sky-z-JfZ26aQNE',
    sourceName: 'Unsplash',
    author: 'Rich Martello',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Vineyard rows with a farmhouse, photographed in Lourmarin, Provence.',
      zh: '普罗旺斯卢尔马兰的葡萄园与农舍。',
      fr: 'Rangs de vigne et mas provençal, photographiés à Lourmarin.',
    },
    notes: 'Genuinely photographed in Lourmarin, Provence — no generic-location caveat needed.',
  },
  {
    id: 'destination-french-alps-chalet',
    src: '/images/destination-french-alps-chalet.jpg',
    sourceUrl:
      'https://unsplash.com/photos/luxurious-wooden-chalet-interior-with-dining-and-living-areas-gdhAPf_kZ14',
    sourceName: 'Unsplash',
    author: 'Valentin DUCRETTET',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A luxurious wooden chalet interior with dining and living areas.',
      zh: '木质装潢的豪华木屋内部，包含用餐与起居区域。',
      fr: "L'intérieur boisé et luxueux d'un chalet, avec espaces repas et séjour.",
    },
    notes: 'Generic — does not depict any named property.',
  },
  {
    id: 'destination-geneva-lake',
    src: '/images/destination-geneva-lake.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-sailboat-sailing-on-a-lake-with-a-town-in-the-background-zeP33VjWSew',
    sourceName: 'Unsplash',
    author: 'Gavin Li',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A sailboat on Lake Geneva with the town in the background.',
      zh: '日内瓦湖上的帆船，背景是湖畔小镇。',
      fr: 'Un voilier sur le lac Léman, avec la ville en arrière-plan.',
    },
  },
  {
    id: 'destination-geneva-jet-deau',
    src: '/images/destination-geneva-jet-deau.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-large-fountain-spewing-water-into-the-air-PZMNQ7ZlkAw',
    sourceName: 'Unsplash',
    author: 'Devam Jhabak',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "The Jet d'Eau fountain on Lake Geneva, with a rainbow and the city skyline behind it.",
      zh: '日内瓦湖上的大喷泉（Jet d’Eau），伴着一道彩虹，背景是城市天际线。',
      fr: "Le Jet d'Eau sur le lac Léman, avec un arc-en-ciel et la silhouette de la ville en arrière-plan.",
    },
  },
  {
    id: 'destination-geneva-palais-des-nations',
    src: '/images/destination-geneva-palais-des-nations.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-building-with-a-lot-of-flags-in-front-of-it-VJ6uNHuEnqk',
    sourceName: 'Unsplash',
    author: 'Salya T',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "The flag-lined entrance to the Palais des Nations, the UN's European headquarters in Geneva.",
      zh: '日内瓦万国宫（联合国欧洲总部）入口，两侧列满各国国旗。',
      fr: "L'entrée du Palais des Nations, siège européen des Nations Unies à Genève, bordée de drapeaux.",
    },
  },
  {
    id: 'destination-geneva-lake-sailing',
    src: '/images/destination-geneva-lake-sailing.jpg',
    sourceUrl: 'https://pixabay.com/photos/lake-boat-water-sailing-boat-1915846/',
    sourceName: 'Pixabay',
    author: 'danielbuescher',
    license: 'Pixabay License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A lone sailboat on the still water of Lake Geneva, with the Alps in the distance.',
      zh: '日内瓦湖平静的水面上，一艘帆船独行，远处是阿尔卑斯山脉。',
      fr: "Un voilier seul sur les eaux calmes du lac Léman, avec les Alpes à l'horizon.",
    },
  },
  {
    id: 'service-watchmaking-detail',
    src: '/images/service-watchmaking-detail.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-close-up-of-a-pocket-watch-on-a-table-hAHzIx8EBdM',
    sourceName: 'Unsplash',
    author: 'Ruben Caldera',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A close-up of a mechanical watch movement being worked on by a watchmaker.',
      zh: '一枚机械表机芯的特写，钟表师正在对其进行调校。',
      fr: "Gros plan sur un mouvement de montre mécanique en cours d'ajustement par un horloger.",
    },
  },
  {
    id: 'experience-louvre-apollon-gallery',
    src: '/images/experience-louvre-apollon-gallery.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Galerie_d%27Apollon_(Louvre).jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Wilfredor',
    license: 'CC0 1.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: "The Galerie d'Apollon at the Louvre, its gilded and painted ceiling receding down the gallery.",
      zh: '卢浮宫阿波罗长廊，镀金与彩绘的天顶一路延伸向长廊深处。',
      fr: "La galerie d'Apollon au Louvre, avec son plafond doré et peint qui se prolonge le long de la galerie.",
    },
  },
  {
    id: 'experience-orsay-clock',
    src: '/images/experience-orsay-clock.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-clock-on-a-wall-qapcR1wFgvs',
    sourceName: 'Unsplash',
    author: 'Bev Griffith',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "One of the large clocks of the Musée d'Orsay, seen from inside against the light.",
      zh: '奥赛博物馆的大钟之一，从馆内逆光望去。',
      fr: "L'une des grandes horloges du musée d'Orsay, vue de l'intérieur à contre-jour.",
    },
  },
  {
    id: 'experience-versailles-petit-trianon',
    src: '/images/experience-versailles-petit-trianon.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Petit_Trianon_at_the_Palace_of_Versailles.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'DiscoA340',
    license: 'CC BY-SA 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The facade of the Petit Trianon at the Palace of Versailles under a cloudy sky.',
      zh: '凡尔赛宫小特里亚农的外立面，天空多云。',
      fr: 'La façade du Petit Trianon au château de Versailles, sous un ciel nuageux.',
    },
  },
  {
    id: 'experience-louvre-zurbaran-san-serapio',
    src: '/images/experience-louvre-zurbaran-san-serapio.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:San_Serapio,_por_Francisco_de_Zurbar%C3%A1n.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Francisco de Zurbarán',
    license: 'Public domain',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Saint Serapion, a painting by Francisco de Zurbarán: a monk in a white habit with his head fallen to one shoulder.',
      zh: '弗朗西斯科·德·苏巴朗的画作《圣塞拉皮翁》：一位身穿白色修士袍、头垂向一侧肩膀的修士。',
      fr: 'Saint Sérapion, tableau de Francisco de Zurbarán : un moine en habit blanc, la tête retombée sur l’épaule.',
    },
    notes: 'Representative work by the artist, not a claim that this canvas is in the exhibition.',
  },
  {
    id: 'experience-louvre-fernandez-paso-angustia',
    src: '/images/experience-louvre-fernandez-paso-angustia.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Valladolid-Museo_Nacional_de_Escultura-4-Paso_de_la_6%C2%AA_Angustia_(Gregorio_Fern%C3%A1ndez).jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Javi Guerra Hernando',
    license: 'CC BY-SA 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A painted wooden sculpture group by Gregorio Fernández at the Museo Nacional de Escultura in Valladolid: two crosses and a mourning figure.',
      zh: '格雷戈里奥·费尔南德斯的彩绘木雕群像，藏于巴利亚多利德国家雕塑博物馆：两个十字架与一位哀悼的人物。',
      fr: 'Groupe sculpté en bois polychrome de Gregorio Fernández au Museo Nacional de Escultura de Valladolid : deux croix et une figure en deuil.',
    },
    notes:
      'Representative work from the lending museum, not a claim that this piece is in the exhibition.',
  },
  {
    id: 'experience-orsay-cassatt-goodnight-hug',
    src: '/images/experience-orsay-cassatt-goodnight-hug.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Mary_Cassatt_-_Mother_and_Child_(The_Goodnight_Hug).jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Mary Cassatt',
    license: 'Public domain',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Mother and Child (The Goodnight Hug), a pastel by Mary Cassatt: a mother holding a small child close.',
      zh: '玛丽·卡萨特的粉彩画《母与子（晚安的拥抱）》：母亲把年幼的孩子紧紧抱在怀里。',
      fr: 'Mère et enfant (Le câlin du soir), pastel de Mary Cassatt : une mère serre un jeune enfant contre elle.',
    },
    notes: 'Representative work by the artist, not a claim that this work is in the exhibition.',
  },
  {
    id: 'experience-versailles-marie-antoinette-portrait',
    src: '/images/experience-versailles-marie-antoinette-portrait.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Marie-Antoinette_en_grand_habit_de_cour_-_1778_-_Elisabeth_Louise_Vig%C3%A9e_Le_Brun.jpg',
    sourceName: 'Wikimedia Commons',
    author:
      'Yann Caradec (photograph of a public-domain painting by Élisabeth Louise Vigée Le Brun)',
    license: 'CC BY-SA 2.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Marie-Antoinette in Court Dress, 1778, a portrait by Élisabeth Louise Vigée Le Brun.',
      zh: '伊丽莎白·路易丝·维热·勒布伦 1778 年所作肖像《身着宫廷盛装的玛丽·安托瓦内特》。',
      fr: 'Marie-Antoinette en grand habit de cour, 1778, portrait par Élisabeth Louise Vigée Le Brun.',
    },
    notes:
      'Representative portrait of the subject, not a claim that this painting is in the exhibition.',
  },
  {
    id: 'experience-louvre-gallery-ceiling',
    src: '/images/experience-louvre-gallery-ceiling.jpg',
    sourceUrl: 'https://unsplash.com/photos/louvre-museum-interior-Xpjl7cahHgo',
    sourceName: 'Unsplash',
    author: 'Camila Camacho',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A painted and gilded ceiling inside the Louvre.',
      zh: '卢浮宫内的彩绘镀金天顶。',
      fr: 'Un plafond peint et doré à l’intérieur du Louvre.',
    },
  },
  {
    id: 'experience-louvre-pyramid',
    src: '/images/experience-louvre-pyramid.jpg',
    sourceUrl:
      'https://unsplash.com/photos/glass-pyramid-building-near-body-of-water-during-daytime-zoK6WhRlTQo',
    sourceName: 'Unsplash',
    author: 'Guillaume Meurice',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "The Louvre's glass pyramid reflected in the courtyard water, with the historic palace behind it.",
      zh: '卢浮宫玻璃金字塔倒映在庭院水面上，身后是历史悠久的宫殿建筑。',
      fr: 'La pyramide de verre du Louvre se reflétant dans le bassin de la cour, avec le palais historique en arrière-plan.',
    },
  },
  {
    id: 'destination-japan-tea-ceremony',
    src: '/images/destination-japan-tea-ceremony.jpg',
    sourceUrl: 'https://unsplash.com/photos/person-pouring-hot-water-on-white-cup-gy_DN08336U',
    sourceName: 'Unsplash',
    author: '五玄土 ORIENTO',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Hot water being poured for a traditional Japanese tea ceremony.',
      zh: '为传统日本茶道注入热水的场景。',
      fr: "De l'eau chaude versée lors d'une cérémonie du thé japonaise traditionnelle.",
    },
    notes: 'Generic — does not depict any named tea house or venue.',
  },
  {
    id: 'destination-japan-kaiseki',
    src: '/images/destination-japan-kaiseki.jpg',
    sourceUrl: 'https://unsplash.com/photos/two-brown-trays-with-cooked-foods-2cpx1N7Us5Q',
    sourceName: 'Unsplash',
    author: 'Richard Iwaki',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A multi-course kaiseki-style Japanese meal served on trays.',
      zh: '以托盘盛放的多道式日本怀石料理。',
      fr: 'Un repas japonais de style kaiseki, à plusieurs services, servi sur des plateaux.',
    },
    notes: 'Generic — does not depict any named restaurant.',
  },
  {
    id: 'destination-milan',
    src: '/images/destination-milan.jpg',
    sourceUrl: 'https://unsplash.com/photos/milan-cathedral-xEQLO9EGu64',
    sourceName: 'Unsplash',
    author: 'Caleb Stokes',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Milan Cathedral (Duomo di Milano), Italy.',
      zh: '意大利米兰大教堂。',
      fr: 'La cathédrale de Milan (Duomo di Milano), Italie.',
    },
  },
  {
    id: 'destination-london',
    src: '/images/destination-london.jpg',
    sourceUrl:
      'https://unsplash.com/photos/landscape-photography-of-big-ben-under-white-sky-HbYnglDQmuo',
    sourceName: 'Unsplash',
    author: 'Ugur Akdemir',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The Elizabeth Tower (Big Ben) in London, England.',
      zh: '英国伦敦的伊丽莎白塔（大本钟）。',
      fr: 'La tour Elizabeth (Big Ben) à Londres, Angleterre.',
    },
  },
  {
    id: 'destination-monaco',
    src: '/images/destination-monaco.jpg',
    sourceUrl:
      'https://unsplash.com/photos/aerial-photography-of-docks-yachts-near-buildings-Lml_PhRFbsk',
    sourceName: 'Unsplash',
    author: 'Simon Moore',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Aerial view of yachts docked in Monte Carlo harbour, Monaco.',
      zh: '摩纳哥蒙特卡洛港口停泊游艇的航拍景色。',
      fr: 'Vue aérienne des yachts amarrés dans le port de Monte-Carlo, Monaco.',
    },
  },
  {
    id: 'destination-marbella',
    src: '/images/destination-marbella.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-harbor-filled-with-lots-of-boats-under-a-cloudy-sky-VnexMz4vy38',
    sourceName: 'Unsplash',
    author: 'Sergio Guardiola Herrador',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Puerto Banús marina in Marbella, Spain, filled with boats.',
      zh: '西班牙马贝拉班努斯港，停满游艇。',
      fr: 'Le port de Puerto Banús à Marbella, Espagne, rempli de bateaux.',
    },
  },
  {
    id: 'destination-athens',
    src: '/images/destination-athens.jpg',
    sourceUrl: 'https://unsplash.com/photos/acropolis-of-athens-at-golden-hour-yqBvJJ8jGBQ',
    sourceName: 'Unsplash',
    author: 'Constantinos Kollias',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The Acropolis of Athens, Greece, at golden hour.',
      zh: '金色时刻的希腊雅典卫城。',
      fr: "L'Acropole d'Athènes, en Grèce, à l'heure dorée.",
    },
  },
  {
    id: 'destination-vienna',
    src: '/images/destination-vienna.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-large-white-building-with-a-green-dome-9mjZaMgNSZI',
    sourceName: 'Unsplash',
    author: 'Leonhard Niederwimmer',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The Hofburg imperial palace in Vienna, Austria.',
      zh: '奥地利维也纳的霍夫堡皇宫。',
      fr: 'Le palais impérial de la Hofburg à Vienne, Autriche.',
    },
  },
  {
    id: 'destination-bordeaux',
    src: '/images/destination-bordeaux.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-vineyard-with-a-church-in-the-background-ZjQo8dO6Mwg',
    sourceName: 'Unsplash',
    author: 'Angell Guillén',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A vineyard near Bordeaux, France, with a village church in the distance.',
      zh: '法国波尔多附近的葡萄园，远处可见村庄教堂。',
      fr: 'Un vignoble près de Bordeaux, en France, avec une église de village au loin.',
    },
  },
  {
    id: 'destination-loire-valley',
    src: '/images/destination-loire-valley.jpg',
    sourceUrl: 'https://unsplash.com/photos/white-castle-surrounded-by-water-W1SHl5ki3yk',
    sourceName: 'Unsplash',
    author: 'Dorian Mongel',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Château de Chenonceau spanning the Cher river in the Loire Valley, France.',
      zh: '横跨谢尔河的舍农索城堡，位于法国卢瓦尔河谷。',
      fr: 'Le château de Chenonceau enjambant le Cher, dans la vallée de la Loire, France.',
    },
  },
  {
    id: 'destination-loire-valley-chambord',
    src: '/images/destination-loire-valley-chambord.jpg',
    sourceUrl: 'https://unsplash.com/photos/landscape-photo-of-white-and-brown-castle-Yui3DZiX7yM',
    sourceName: 'Unsplash',
    author: 'Dorian Mongel',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "Château de Chambord's turreted facade reflected in its moat.",
      zh: '香波堡布满塔楼的立面，倒映在护城河水面上。',
      fr: 'La façade à tourelles du château de Chambord se reflétant dans ses douves.',
    },
  },
  {
    id: 'destination-burgundy',
    src: '/images/destination-burgundy.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-large-building-with-statues-on-top-of-it-pl7Bd0IN7b4',
    sourceName: 'Unsplash',
    author: 'Rayyân',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A historic building in Dijon, the capital of Burgundy, France.',
      zh: '法国勃艮第首府第戎的一座历史建筑。',
      fr: 'Un bâtiment historique à Dijon, capitale de la Bourgogne, France.',
    },
  },
  {
    id: 'accommodation-ritz-paris',
    src: '/images/accommodation-ritz-paris.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:H%C3%B4tel_Ritz_Paris,_21_June_2008.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Wolfgang Jung',
    license: 'CC BY-SA 2.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The Ritz Paris facade and entrance awnings on Place Vendôme.',
      zh: '巴黎丽兹酒店位于旺多姆广场的正面外观与入口雨篷。',
      fr: "La façade et les auvents d'entrée du Ritz Paris, place Vendôme.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-ritz-paris-hemingway',
    src: '/images/accommodation-ritz-paris-hemingway.jpg',
    sourceUrl: 'https://www.ritzparis.com/hotel/paris/bars-restaurants/bar-hemingway',
    sourceName: 'Ritz Paris',
    author: 'Ritz Paris',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The legendary Bar Hemingway at the Ritz Paris, its walls covered in memorabilia.',
      zh: '丽兹巴黎传奇的海明威酒吧，墙上挂满了纪念物件。',
      fr: 'Le légendaire Bar Hemingway du Ritz Paris, ses murs couverts de souvenirs.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-ritz-paris-espadon',
    src: '/images/accommodation-ritz-paris-espadon.jpg',
    sourceUrl: 'https://www.ritzparis.com/hotel/paris/bars-restaurants/espadon-restaurant',
    sourceName: 'Ritz Paris',
    author: 'Ritz Paris',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "L'Espadon, the Ritz Paris's Michelin-starred restaurant, its open kitchen visible from the dining room.",
      zh: '丽兹巴黎米其林餐厅 L’Espadon，用餐区可以看到开放式厨房。',
      fr: "L'Espadon, le restaurant étoilé Michelin du Ritz Paris, avec sa cuisine ouverte visible depuis la salle.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-ritz-paris-pool',
    src: '/images/accommodation-ritz-paris-pool.jpg',
    sourceUrl: 'https://www.ritzparis.com/hotel/paris/ritz-club-spa',
    sourceName: 'Ritz Paris',
    author: 'Ritz Paris',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The indoor pool at the Ritz Club & Spa, under a painted sky ceiling.',
      zh: '丽兹俱乐部与水疗中心的室内泳池，天顶绘有云天壁画。',
      fr: "La piscine intérieure du Ritz Club & Spa, sous un plafond peint en trompe-l'œil de ciel.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-ritz-paris-chanel-suite',
    src: '/images/accommodation-ritz-paris-chanel-suite.jpg',
    sourceUrl: 'https://www.ritzparis.com/hotel/paris',
    sourceName: 'Ritz Paris',
    author: 'Ritz Paris',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The bedroom of the Suite Coco Chanel at the Ritz Paris, where the designer lived for over two decades.',
      zh: '丽兹巴黎可可·香奈儿套房的卧室，她曾在此居住超过二十年。',
      fr: 'La chambre de la Suite Coco Chanel du Ritz Paris, où la couturière a vécu pendant plus de vingt ans.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-ritz-paris-imperial-suite',
    src: '/images/accommodation-ritz-paris-imperial-suite.jpg',
    sourceUrl: 'https://www.ritzparis.com/hotel/paris',
    sourceName: 'Ritz Paris',
    author: 'Ritz Paris',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The Suite Impériale at the Ritz Paris, its gilded Versailles-style decor the hotel's most opulent.",
      zh: '丽兹巴黎皇家套房，凡尔赛式的镀金装饰是全酒店最奢华的房型。',
      fr: "La Suite Impériale du Ritz Paris, son décor doré façon Versailles étant le plus somptueux de l'hôtel.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-four-seasons-george-v',
    src: '/images/accommodation-four-seasons-george-v.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:H%C3%B4tel_George-V,_31_avenue_George-V,_Paris_8e_1.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Polymagou',
    license: 'CC BY-SA 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The Four Seasons Hotel George V entrance on avenue George-V, Paris.',
      zh: '巴黎乔治五世大道上四季酒店的入口。',
      fr: "L'entrée du Four Seasons Hôtel George V, avenue George-V, à Paris.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-four-seasons-george-v-orangerie',
    src: '/images/accommodation-four-seasons-george-v-orangerie.jpg',
    sourceUrl: 'https://www.fourseasons.com/paris/dining/restaurants/l-orangerie/',
    sourceName: 'Four Seasons',
    author: 'Four Seasons Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "L'Orangerie, the two-Michelin-starred restaurant under its glass canopy overlooking the hotel's marble courtyard.",
      zh: '米其林二星餐厅 L’Orangerie，玻璃穹顶下正对酒店大理石庭院。',
      fr: "L'Orangerie, restaurant deux étoiles Michelin, sous sa verrière donnant sur la cour de marbre de l'hôtel.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-four-seasons-george-v-le-george',
    src: '/images/accommodation-four-seasons-george-v-le-george.jpg',
    sourceUrl: 'https://www.fourseasons.com/paris/dining/restaurants/le_george/',
    sourceName: 'Four Seasons',
    author: 'Four Seasons Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Le George, the Mediterranean restaurant helmed by chef Simone Zanoni, its dining room dressed with the tall floral displays this hotel is known for.',
      zh: 'Le George 餐厅，主厨 Simone Zanoni 掌勺的地中海餐厅，餐厅里也少不了这家酒店招牌式的高身花艺陈设。',
      fr: "Le George, table méditerranéenne du chef Simone Zanoni, avec les hautes compositions florales qui font la signature de l'hôtel.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-four-seasons-george-v-royal-suite',
    src: '/images/accommodation-four-seasons-george-v-royal-suite.jpg',
    sourceUrl: 'https://www.fourseasons.com/paris/accommodations/signature-suites/royal_suite/',
    sourceName: 'Four Seasons',
    author: 'Four Seasons Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The bedroom of the Royal Suite at Four Seasons Hotel George V, Paris, with a private balcony.',
      zh: '四季酒店乔治五世皇家套房的卧室，带私人阳台。',
      fr: 'La chambre de la Suite Royale du Four Seasons Hôtel George V, avec balcon privé.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-four-seasons-george-v-eiffel-suite',
    src: '/images/accommodation-four-seasons-george-v-eiffel-suite.jpg',
    sourceUrl:
      'https://www.fourseasons.com/paris/accommodations/signature-suites/eiffel_tower_suite/',
    sourceName: 'Four Seasons',
    author: 'Four Seasons Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The living room of the Eiffel Tower Suite at Four Seasons Hotel George V, Paris.',
      zh: '四季酒店乔治五世埃菲尔铁塔套房的客厅。',
      fr: 'Le salon de la Suite Tour Eiffel du Four Seasons Hôtel George V.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-four-seasons-george-v-le-cinq',
    src: '/images/accommodation-four-seasons-george-v-le-cinq.jpg',
    sourceUrl: 'https://www.fourseasons.com/paris/dining/restaurants/le_cinq/',
    sourceName: 'Four Seasons',
    author: 'Four Seasons Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The dining room of Le Cinq, the three-Michelin-starred restaurant at Four Seasons Hotel George V, its signature floral displays throughout.',
      zh: '四季酒店乔治五世米其林三星餐厅 Le Cinq 的用餐区，招牌花艺陈设随处可见。',
      fr: 'La salle du Cinq, le restaurant trois étoiles Michelin du Four Seasons Hôtel George V, avec ses compositions florales emblématiques.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-four-seasons-george-v-le-cinq-dish',
    src: '/images/accommodation-four-seasons-george-v-le-cinq-dish.jpg',
    sourceUrl: 'https://www.fourseasons.com/paris/dining/restaurants/le_cinq/',
    sourceName: 'Four Seasons',
    author: 'Four Seasons Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "A caviar dish plated at Le Cinq, chef Christian Le Squer's three-Michelin-starred restaurant.",
      zh: 'Le Cinq 餐厅的一道鱼子酱菜品，主厨 Christian Le Squer 掌勺的米其林三星餐厅。',
      fr: 'Un plat au caviar dressé au Cinq, le restaurant trois étoiles du chef Christian Le Squer.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-four-seasons-george-v-spa',
    src: '/images/accommodation-four-seasons-george-v-spa.jpg',
    sourceUrl: 'https://www.fourseasons.com/paris/spa/',
    sourceName: 'Four Seasons',
    author: 'Four Seasons Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The spa lounge at Four Seasons Hotel George V, Paris, its pool visible through mirrored glass.',
      zh: '四季酒店乔治五世水疗中心的休息区，镜面玻璃后是室内泳池。',
      fr: 'Le salon du spa du Four Seasons Hôtel George V, avec la piscine visible à travers les glaces.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-hotel-de-crillon',
    src: '/images/accommodation-hotel-de-crillon.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hotel-de-Crillon-Paris-02-2018.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Gunnar Klack',
    license: 'CC BY-SA 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: "The Hôtel de Crillon's colonnaded facade on Place de la Concorde, Paris.",
      zh: '巴黎协和广场上克里雍酒店（Hôtel de Crillon）的柱廊立面。',
      fr: "La façade à colonnes de l'Hôtel de Crillon, place de la Concorde, à Paris.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-hotel-de-crillon-marie-antoinette-suite',
    src: '/images/accommodation-hotel-de-crillon-marie-antoinette-suite.jpg',
    sourceUrl:
      'https://www.rosewoodhotels.com/en/hotel-de-crillon/accommodation/signature-suites/suite-marie-antoinette',
    sourceName: 'Rosewood Hotels',
    author: 'Rosewood Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The living room of the Suite Marie-Antoinette at Hôtel de Crillon, where the queen once took piano lessons.',
      zh: '克里雍酒店玛丽·安托万内特套房的客厅，她曾在这里上钢琴课。',
      fr: "Le salon de la Suite Marie-Antoinette à l'Hôtel de Crillon, où la reine prenait ses leçons de piano.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-hotel-de-crillon-lagerfeld-suite',
    src: '/images/accommodation-hotel-de-crillon-lagerfeld-suite.jpg',
    sourceUrl:
      'https://www.rosewoodhotels.com/en/hotel-de-crillon/accommodation/signature-suites/grands-appartements-concorde',
    sourceName: 'Rosewood Hotels',
    author: 'Rosewood Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Grand Appartement Concorde at Hôtel de Crillon, designed by Karl Lagerfeld.',
      zh: '克里雍酒店由 Karl Lagerfeld 设计的协和大公寓（Grand Appartement Concorde）。',
      fr: "Le Grand Appartement Concorde de l'Hôtel de Crillon, dessiné par Karl Lagerfeld.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-hotel-de-crillon-nonos',
    src: '/images/accommodation-hotel-de-crillon-nonos.jpg',
    sourceUrl:
      'https://www.rosewoodhotels.com/en/hotel-de-crillon/dining/nonos-comestibles-paul-pairet',
    sourceName: 'Rosewood Hotels',
    author: 'Rosewood Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A steak-frites dish being finished tableside at Nonos & Comestibles par Paul Pairet, Hôtel de Crillon.',
      zh: '克里雍酒店 Nonos & Comestibles 餐厅（主厨 Paul Pairet）的牛排薯条，餐桌旁现场浇汁。',
      fr: "Un steak-frites servi et nappé à table à Nonos & Comestibles par Paul Pairet, à l'Hôtel de Crillon.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-hotel-de-crillon-spa',
    src: '/images/accommodation-hotel-de-crillon-spa.jpg',
    sourceUrl: 'https://www.rosewoodhotels.com/en/hotel-de-crillon/wellness',
    sourceName: 'Rosewood Hotels',
    author: 'Rosewood Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The pool at Sense, A Rosewood Spa, Hôtel de Crillon.',
      zh: '克里雍酒店 Sense, A Rosewood Spa 水疗中心的泳池。',
      fr: "La piscine de Sense, A Rosewood Spa, à l'Hôtel de Crillon.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-meurice',
    src: '/images/accommodation-le-meurice.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:H%C3%B4tel_Meurice_-_Paris.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Axou',
    license: 'CC BY-SA 3.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: "Le Meurice's arcaded facade on Rue de Rivoli, Paris.",
      zh: '巴黎里沃利街上勒莫里斯酒店的拱廊立面。',
      fr: 'La façade à arcades du Meurice, rue de Rivoli, à Paris.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-le-meurice-dali-suite',
    src: '/images/accommodation-le-meurice-dali-suite.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/le-meurice/rooms-suites/presidential-apartment-dali-park-view',
    sourceName: 'Le Meurice',
    author: 'Le Meurice',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The living room of the Presidential Apartment Dalí, Salvador Dalí's favourite suite at Le Meurice.",
      zh: '勒莫里斯酒店达利总统套房的客厅，是萨尔瓦多·达利本人最喜欢的套房。',
      fr: "Le salon de l'Appartement Présidentiel Dalí, la suite préférée de Salvador Dalí au Meurice.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-meurice-belle-etoile',
    src: '/images/accommodation-le-meurice-belle-etoile.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/le-meurice/rooms-suites/belle-etoile-penthouse-suite-with-terrace',
    sourceName: 'Le Meurice',
    author: 'Le Meurice',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The rooftop terrace of the Belle Etoile Penthouse Suite at Le Meurice, with the Eiffel Tower in view.',
      zh: '勒莫里斯酒店美丽星辰顶层套房的露台，可以望见埃菲尔铁塔。',
      fr: 'La terrasse en toiture de la Belle Etoile Penthouse Suite du Meurice, avec la tour Eiffel en vue.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-meurice-ducasse-room',
    src: '/images/accommodation-le-meurice-ducasse-room.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/le-meurice/dining/restaurant-le-meurice-alain-ducasse',
    sourceName: 'Le Meurice',
    author: 'Le Meurice',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The painted ceiling and crystal chandelier of Restaurant le Meurice Alain Ducasse, inspired by Versailles.',
      zh: '勒莫里斯酒店 Alain Ducasse 餐厅内以凡尔赛为灵感的天顶壁画与水晶吊灯。',
      fr: "Le plafond peint et le lustre en cristal du Restaurant le Meurice Alain Ducasse, d'inspiration versaillaise.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-meurice-ducasse-dish',
    src: '/images/accommodation-le-meurice-ducasse-dish.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/le-meurice/dining/restaurant-le-meurice-alain-ducasse',
    sourceName: 'Le Meurice',
    author: 'Le Meurice',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A delicately plated dish at the two-Michelin-starred Restaurant le Meurice Alain Ducasse.',
      zh: '米其林二星餐厅 Restaurant le Meurice Alain Ducasse 的一道精致菜品。',
      fr: 'Un plat finement dressé au Restaurant le Meurice Alain Ducasse, deux étoiles Michelin.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-meurice-grolet',
    src: '/images/accommodation-le-meurice-grolet.jpg',
    sourceUrl: 'https://www.dorchestercollection.com/paris/le-meurice/dining/restaurant-le-dali',
    sourceName: 'Le Meurice',
    author: 'Le Meurice',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Pastry chef Cédric Grolet at work on his trompe-l'oeil fruit desserts at La Pâtisserie du Meurice.",
      zh: '甜点主厨 Cédric Grolet 在勒莫里斯甜品店制作他招牌的"以假乱真"水果造型甜点。',
      fr: "Le chef pâtissier Cédric Grolet au travail sur ses fruits trompe-l'œil à La Pâtisserie du Meurice.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-plaza-athenee',
    src: '/images/accommodation-plaza-athenee.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Paris_75008_Avenue_Montaigne_23_H%C3%B4tel_Plaza-Ath%C3%A9n%C3%A9e_20130810_facade.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Alexander Baranov',
    license: 'CC BY 2.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: "The Plaza Athénée's signature red awnings on avenue Montaigne, Paris.",
      zh: '巴黎蒙田大道上巴黎雅典娜广场酒店标志性的红色雨篷。',
      fr: 'Les célèbres auvents rouges du Plaza Athénée, avenue Montaigne, à Paris.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-plaza-athenee-relais-plaza',
    src: '/images/accommodation-plaza-athenee-relais-plaza.jpg',
    sourceUrl: 'https://www.dorchestercollection.com/paris/hotel-plaza-athenee/',
    sourceName: 'Dorchester Collection',
    author: 'Dorchester Collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'An elegant salon at Hôtel Plaza Athénée set for a private event, crystal chandeliers above round tables and palms.',
      zh: '雅典娜广场酒店的宴会沙龙布置，水晶吊灯下的圆桌与棕榈植物。',
      fr: "Un salon de l'Hôtel Plaza Athénée dressé pour un événement privé, lustres en cristal au-dessus de tables rondes et de palmiers.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-plaza-athenee-grande-table',
    src: '/images/accommodation-plaza-athenee-grande-table.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/hotel-plaza-athenee/dining/la-grande-table-du-plaza-athenee',
    sourceName: 'Dorchester Collection',
    author: 'Dorchester Collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The gilded ceiling and columns of La Grande Table du Plaza Athénée, the hotel's Michelin-starred restaurant.",
      zh: '雅典娜广场酒店米其林餐厅 La Grande Table 的金叶装饰穹顶与立柱。',
      fr: "Le plafond doré et les colonnes de La Grande Table du Plaza Athénée, le restaurant étoilé de l'hôtel.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-plaza-athenee-grande-table-dish',
    src: '/images/accommodation-plaza-athenee-grande-table-dish.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/hotel-plaza-athenee/dining/la-grande-table-du-plaza-athenee',
    sourceName: 'Dorchester Collection',
    author: 'Dorchester Collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A tableside seafood preparation on a silver trolley at La Grande Table du Plaza Athénée.',
      zh: 'La Grande Table 餐厅银器推车上的海鲜现场展示。',
      fr: "Une préparation de fruits de mer en salle, sur guéridon d'argent, à La Grande Table du Plaza Athénée.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-plaza-athenee-spa',
    src: '/images/accommodation-plaza-athenee-spa.jpg',
    sourceUrl: 'https://www.dorchestercollection.com/paris/hotel-plaza-athenee/spa-wellness',
    sourceName: 'Dorchester Collection',
    author: 'Dorchester Collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A treatment room at the Dior Spa, Hôtel Plaza Athénée.',
      zh: '雅典娜广场酒店迪奥水疗中心的理疗室。',
      fr: "Une cabine de soins du Dior Spa, à l'Hôtel Plaza Athénée.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-plaza-athenee-royal-suite',
    src: '/images/accommodation-plaza-athenee-royal-suite.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/hotel-plaza-athenee/rooms-suites/royal-suite',
    sourceName: 'Dorchester Collection',
    author: 'Dorchester Collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The living and dining room of the Royal Suite at Hôtel Plaza Athénée, Louis XVI-style furniture throughout.',
      zh: '雅典娜广场酒店皇家套房的客厅与餐厅，路易十六风格家具。',
      fr: "Le salon et la salle à manger de la Suite Royale de l'Hôtel Plaza Athénée, mobilier de style Louis XVI.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-plaza-athenee-haute-couture-suite',
    src: '/images/accommodation-plaza-athenee-haute-couture-suite.jpg',
    sourceUrl:
      'https://www.dorchestercollection.com/paris/hotel-plaza-athenee/rooms-suites/haute-couture-eiffel-suite',
    sourceName: 'Dorchester Collection',
    author: 'Dorchester Collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Haute Couture Eiffel Suite at Hôtel Plaza Athénée, its window framing the Eiffel Tower.',
      zh: '雅典娜广场酒店高定套房，窗外正对埃菲尔铁塔。',
      fr: "La Haute Couture Eiffel Suite de l'Hôtel Plaza Athénée, sa fenêtre encadrant la tour Eiffel.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-mandarin-oriental',
    src: '/images/accommodation-mandarin-oriental.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Mandarin_Oriental_Paris,_2_August_2015_001.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Norio NAKAYAMA',
    license: 'CC BY-SA 2.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The Mandarin Oriental Paris entrance signage on Rue Saint-Honoré.',
      zh: '巴黎圣奥诺雷街上文华东方酒店的入口招牌。',
      fr: "L'enseigne d'entrée du Mandarin Oriental, Paris, rue Saint-Honoré.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-mandarin-oriental-camelia',
    src: '/images/accommodation-mandarin-oriental-camelia.jpg',
    sourceUrl: 'https://www.mandarinoriental.com/en/paris/place-vendome/dine/camelia',
    sourceName: 'Mandarin Oriental, Paris official site',
    author: 'Mandarin Oriental Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Camélia's lush garden terrace, set for dinner beneath string lights.",
      zh: 'Camélia餐厅的花园露台，灯串下已备好晚餐餐桌。',
      fr: 'La luxuriante terrasse jardin de Camélia, dressée pour le dîner sous une guirlande lumineuse.',
    },
    notes:
      "Chef Nina Haradji's contemporary Parisian brasserie, opened onto the hotel's camellia garden.",
  },
  {
    id: 'accommodation-mandarin-oriental-bar8',
    src: '/images/accommodation-mandarin-oriental-bar8.jpg',
    sourceUrl: 'https://www.mandarinoriental.com/en/paris/place-vendome/dine/bar-8',
    sourceName: 'Mandarin Oriental, Paris official site',
    author: 'Mandarin Oriental Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Bar 8's plant-filled terrace in the hotel's inner garden.",
      zh: 'Bar 8酒吧的露台，被酒店内庭花园的绿植环绕。',
      fr: "La terrasse verdoyante du Bar 8, nichée dans le jardin intérieur de l'hôtel.",
    },
    notes: 'Cocktail bar opening onto the same camellia garden courtyard as Camélia.',
  },
  {
    id: 'accommodation-mandarin-oriental-spa',
    src: '/images/accommodation-mandarin-oriental-spa.jpg',
    sourceUrl: 'https://www.mandarinoriental.com/en/paris/place-vendome/wellness/the-spa',
    sourceName: 'Mandarin Oriental, Paris official site',
    author: 'Mandarin Oriental Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Tibetan singing bowl used during a treatment at The Spa, inspired by the brand’s Oriental heritage.',
      zh: '文华东方水疗理疗中使用的西藏颂钵，呼应品牌的东方传承。',
      fr: "Un bol chantant tibétain utilisé lors d'un soin au Spa, inspiré de l'héritage oriental de la maison.",
    },
    notes: 'The Spa blends Oriental heritage rituals with advanced Western treatments.',
  },
  {
    id: 'accommodation-mandarin-oriental-couture-suite',
    src: '/images/accommodation-mandarin-oriental-couture-suite.jpg',
    sourceUrl: 'https://www.mandarinoriental.com/en/paris/place-vendome/stay/couture-suite',
    sourceName: 'Mandarin Oriental, Paris official site',
    author: 'Mandarin Oriental Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The bedroom of a Couture Suite, with a garden view and an adjoining marble bathroom.',
      zh: 'Couture Suite套房卧室，可见花园景观与相连的大理石浴室。',
      fr: "La chambre d'une Couture Suite, avec vue sur le jardin et salle de bains en marbre attenante.",
    },
    notes: "Signature suite conceived as a tribute to Paris's fashion houses.",
  },
  {
    id: 'accommodation-mandarin-oriental-penthouse',
    src: '/images/accommodation-mandarin-oriental-penthouse.jpg',
    sourceUrl:
      'https://www.mandarinoriental.com/en/paris/place-vendome/stay/mandarin-penthouse-suite',
    sourceName: 'Mandarin Oriental, Paris official site',
    author: 'Mandarin Oriental Hotel Group',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A direct Eiffel Tower view from the bathroom of the Mandarin Penthouse Suite.',
      zh: 'Mandarin Penthouse Suite浴室内直接望见的埃菲尔铁塔景观。',
      fr: 'Une vue directe sur la tour Eiffel depuis la salle de bains de la Mandarin Penthouse Suite.',
    },
    notes: "The hotel's top-floor penthouse, with rooftop terraces overlooking the tower.",
  },
  {
    id: 'accommodation-shangri-la',
    src: '/images/accommodation-shangri-la.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Awning_of_the_Shangri-La_hotel_in_Paris,_23_January_2014.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'FLLL',
    license: 'CC BY-SA 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The Shangri-La Paris entrance canopy, in the former Bonaparte residence.',
      zh: '巴黎香格里拉酒店入口雨篷，原为波拿巴亲王官邸。',
      fr: "L'auvent d'entrée du Shangri-La Paris, dans l'ancienne résidence Bonaparte.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-shangri-la-entrance',
    src: '/images/accommodation-shangri-la-entrance.jpg',
    sourceUrl: 'https://www.shangri-la.com/en/paris/shangrila/',
    sourceName: 'Shangri-La Paris official site',
    author: 'Shangri-La Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A doorman crosses the wrought-iron gated courtyard of Shangri-La Paris, the former hôtel particulier of Prince Roland Bonaparte.',
      zh: '身着制服的门童穿过巴黎香格里拉酒店的锻铁大门庭院——这里曾是罗兰·波拿巴亲王的私人官邸。',
      fr: 'Un chasseur traverse la cour à grille en fer forgé du Shangri-La Paris, ancien hôtel particulier du prince Roland Bonaparte.',
    },
    notes:
      'Distinct entrance/courtyard angle from the existing coverImage awning shot, sourced from the official site homepage carousel.',
  },
  {
    id: 'accommodation-shangri-la-bonaparte',
    src: '/images/accommodation-shangri-la-bonaparte.jpg',
    sourceUrl: 'https://www.shangri-la.com/en/paris/shangrila/',
    sourceName: 'Shangri-La Paris official site',
    author: 'Shangri-La Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A guest room in the Prince Roland Bonaparte apartment, with a period portrait and Directoire-style furnishings.',
      zh: '波拿巴亲王套房内景，墙上悬挂着历史肖像画，家具延续法式督政府风格。',
      fr: "Une chambre de l'appartement du Prince Roland Bonaparte, avec un portrait d'époque et un mobilier de style Directoire.",
    },
    notes:
      "Ties directly to the hotel's Prince Roland Bonaparte history featured in the article text.",
  },
  {
    id: 'accommodation-shangri-la-shang-palace',
    src: '/images/accommodation-shangri-la-shang-palace.jpg',
    sourceUrl: 'https://www.shangri-la.com/en/paris/shangrila/dining/restaurants/shang-palace',
    sourceName: 'Shangri-La Paris official site',
    author: 'Shangri-La Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The dark-wood and jade-toned interior of Shang Palace, France’s only Michelin-starred Chinese restaurant.',
      zh: 'Shang Palace 餐厅内景，深色木饰与翡翠色调交织——法国唯一的米其林星级中餐厅。',
      fr: "L'intérieur en bois sombre et tons de jade de Shang Palace, seul restaurant chinois étoilé au Michelin de France.",
    },
    notes: 'Michelin-starred restaurant — paired with a dish photo per the two-image rule.',
  },
  {
    id: 'accommodation-shangri-la-shang-palace-dish',
    src: '/images/accommodation-shangri-la-shang-palace-dish.jpg',
    sourceUrl: 'https://www.shangri-la.com/en/paris/shangrila/dining/restaurants/shang-palace',
    sourceName: 'Shangri-La Paris official site',
    author: 'Shangri-La Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A signature dish at Shang Palace, lobster and scallop fried rice presented tableside.',
      zh: 'Shang Palace 招牌菜——龙虾带子炒饭，餐桌旁呈现。',
      fr: 'Un plat signature de Shang Palace, riz frit au homard et aux noix de Saint-Jacques présenté à table.',
    },
    notes: 'Dish photo for the Michelin-starred restaurant, per the two-image rule.',
  },
  {
    id: 'accommodation-shangri-la-bar-botaniste',
    src: '/images/accommodation-shangri-la-bar-botaniste.jpg',
    sourceUrl: 'https://www.shangri-la.com/restaurants-bars/paris/shangrila/le-bar/',
    sourceName: 'Shangri-La Paris official site',
    author: 'Shangri-La Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Cocktails and bar snacks at Le Bar Botaniste, designed by Pierre-Yves Rochon in tribute to Napoleonic-era tents.',
      zh: 'Le Bar Botaniste 的鸡尾酒与佐酒小食，酒吧由设计师 Pierre-Yves Rochon 操刀，灵感来自拿破仑时代的军帐。',
      fr: "Cocktails et mets d'accompagnement au Bar Botaniste, imaginé par Pierre-Yves Rochon en hommage aux tentes napoléoniennes.",
    },
    notes: 'Forbes Travel Guide 58 Best Hotel Star Bars 2025 winner.',
  },
  {
    id: 'accommodation-shangri-la-spa',
    src: '/images/accommodation-shangri-la-spa.jpg',
    sourceUrl: 'https://www.shangri-la.com/paris/shangrila/health-leisure/chi-the-spa/',
    sourceName: 'Shangri-La Paris official site',
    author: 'Shangri-La Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A treatment at Chi, The Spa, housed in what were once Prince Bonaparte’s stables.',
      zh: 'Chi The Spa 内的理疗场景，spa 所在建筑曾是波拿巴亲王的马厩。',
      fr: 'Un soin à Chi, The Spa, installé dans les anciennes écuries du Prince Bonaparte.',
    },
    notes: 'Spa occupies the former stables of the Bonaparte hôtel particulier.',
  },
  {
    id: 'accommodation-shangri-la-suite',
    src: '/images/accommodation-shangri-la-suite.jpg',
    sourceUrl:
      'https://www.shangri-la.com/en/paris/shangrila/rooms-suites/signature-suites/la-suite-shangri-la/',
    sourceName: 'Shangri-La Paris official site',
    author: 'Shangri-La Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The living room of La Suite Shangri-La, on the top floor with an unobstructed Eiffel Tower view.',
      zh: 'La Suite Shangri-La 套房客厅，位于酒店顶层，可无遮挡地望见埃菲尔铁塔。',
      fr: 'Le salon de La Suite Shangri-La, au dernier étage avec une vue dégagée sur la tour Eiffel.',
    },
    notes: 'Signature top-floor suite, 120sqm plus a 100sqm private terrace.',
  },
  {
    id: 'accommodation-the-peninsula',
    src: '/images/accommodation-the-peninsula.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_Peninsula_Paris,_23_June_2014.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'PPR 19',
    license: 'CC BY-SA 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The Peninsula Paris, a restored 1908 Belle Époque building, at dusk.',
      zh: '黄昏时分的巴黎半岛酒店——一座修复后的1908年美好年代建筑。',
      fr: 'Le Peninsula Paris, immeuble Belle Époque de 1908 restauré, au crépuscule.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-the-peninsula-oiseau-blanc',
    src: '/images/accommodation-the-peninsula-oiseau-blanc.jpg',
    sourceUrl: 'https://www.peninsula.com/en/paris/hotel-fine-dining/french-rooftop-loiseau-blanc',
    sourceName: 'The Peninsula Paris official site',
    author: 'The Hongkong and Shanghai Hotels',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "L'Oiseau Blanc's glass-domed dining room, shaped like the wings of the 1927 biplane it's named after, with the Eiffel Tower in view.",
      zh: 'L’Oiseau Blanc餐厅的玻璃穹顶用餐区，造型取自1927年同名双翼飞机的机翼，窗外可见埃菲尔铁塔。',
      fr: "La salle à manger sous verrière de L'Oiseau Blanc, en forme d'ailes du biplan de 1927 dont elle porte le nom, avec vue sur la tour Eiffel.",
    },
    notes:
      'Two-Michelin-star rooftop restaurant, named after the plane in a 1927 transatlantic attempt.',
  },
  {
    id: 'accommodation-the-peninsula-oiseau-blanc-terrace',
    src: '/images/accommodation-the-peninsula-oiseau-blanc-terrace.jpg',
    sourceUrl: 'https://www.peninsula.com/en/paris/hotel-fine-dining/french-rooftop-loiseau-blanc',
    sourceName: 'The Peninsula Paris official site',
    author: 'The Hongkong and Shanghai Hotels',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "A table set on L'Oiseau Blanc's garden terrace, framed by an iron arbour with the Eiffel Tower beyond.",
      zh: 'L’Oiseau Blanc花园露台上的餐桌，铁艺花架取景，远处是埃菲尔铁塔。',
      fr: "Une table dressée sur la terrasse-jardin de L'Oiseau Blanc, encadrée par une pergola en fer, avec la tour Eiffel en toile de fond.",
    },
    notes: 'Second image for the Michelin two-star restaurant, per the two-image rule.',
  },
  {
    id: 'accommodation-the-peninsula-lili',
    src: '/images/accommodation-the-peninsula-lili.jpg',
    sourceUrl: 'https://www.peninsula.com/en/paris/hotel-fine-dining/lili-cantonese-chinese',
    sourceName: 'The Peninsula Paris official site',
    author: 'The Hongkong and Shanghai Hotels',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'LiLi, the Cantonese restaurant, styled after the glamour of 1920s Hong Kong.',
      zh: '粤菜餐厅LiLi，装饰风格取自二十年代香港的摩登氛围。',
      fr: 'LiLi, le restaurant cantonais, au décor inspiré du glamour du Hong Kong des années 1920.',
    },
    notes: "Chef Ma Wing Tak's Cantonese restaurant, the hotel's Chinese dining room.",
  },
  {
    id: 'accommodation-the-peninsula-spa',
    src: '/images/accommodation-the-peninsula-spa.jpg',
    sourceUrl: 'https://www.peninsula.com/en/paris/wellness/luxury-hotel-spa',
    sourceName: 'The Peninsula Paris official site',
    author: 'The Hongkong and Shanghai Hotels',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A plant-lined corridor at The Peninsula Spa, leading to the 20-metre indoor pool.',
      zh: '巴黎半岛水疗中心的绿植走廊，通向20米室内泳池。',
      fr: 'Un couloir bordé de plantes du Peninsula Spa, menant à la piscine intérieure de 20 mètres.',
    },
    notes: 'The largest hotel spa in Paris, at 1,800 square metres.',
  },
  {
    id: 'accommodation-the-peninsula-historic-suite',
    src: '/images/accommodation-the-peninsula-historic-suite.jpg',
    sourceUrl:
      'https://www.peninsula.com/en/paris/luxury-hotel-room-suite-types/the-historic-suite',
    sourceName: 'The Peninsula Paris official site',
    author: 'The Hongkong and Shanghai Hotels',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Historic Suite bedroom, with original Haussmannian mouldings and a crystal chandelier.',
      zh: 'Historic Suite套房卧室，保留了原始的奥斯曼式墙面线脚与水晶吊灯。',
      fr: "La chambre de l'Historic Suite, avec ses moulures haussmanniennes d'origine et son lustre en cristal.",
    },
    notes: "Signature suite paying tribute to the building's 1908 Haussmannian architecture.",
  },
  {
    id: 'accommodation-la-reserve',
    src: '/images/accommodation-la-reserve.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:La_R%C3%A9serve_Paris.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Bach Nguyen',
    license: 'CC0 1.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: "La Réserve Paris's townhouse facade with its signature red door.",
      zh: '拉雷瑟夫巴黎酒店的官邸式立面与标志性红色大门。',
      fr: 'La façade de style hôtel particulier de La Réserve Paris et sa porte rouge emblématique.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-cheval-blanc-apartment',
    src: '/images/accommodation-cheval-blanc-apartment.jpg',
    sourceUrl: 'https://www.chevalblanc.com/en/maison/paris/rooms-and-suites/theapartment/',
    sourceName: 'Cheval Blanc',
    author: 'Cheval Blanc / LVMH Hotel Management',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A corner of The Apartment at Cheval Blanc Paris, with a contemporary art piece and the Eiffel Tower in view.',
      zh: '白马酒店巴黎"The Apartment"套房一角，当代艺术品旁能望见埃菲尔铁塔。',
      fr: "Un coin de L'Appartement du Cheval Blanc Paris, avec une œuvre d'art contemporain et la tour Eiffel en vue.",
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-cheval-blanc-plenitude',
    src: '/images/accommodation-cheval-blanc-plenitude.jpg',
    sourceUrl: 'https://www.chevalblanc.com/en/maison/paris/restaurants-and-bars/plenitude/',
    sourceName: 'Cheval Blanc',
    author: 'Cheval Blanc / LVMH Hotel Management',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The dining room of Plénitude, the three-Michelin-starred restaurant at Cheval Blanc Paris, overlooking the Seine.',
      zh: '白马酒店巴黎米其林三星餐厅 Plénitude 的用餐区，正对塞纳河。',
      fr: 'La salle de Plénitude, le restaurant trois étoiles Michelin du Cheval Blanc Paris, avec vue sur la Seine.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-cheval-blanc-plenitude-dish',
    src: '/images/accommodation-cheval-blanc-plenitude-dish.jpg',
    sourceUrl: 'https://www.chevalblanc.com/en/maison/paris/restaurants-and-bars/plenitude/',
    sourceName: 'Cheval Blanc',
    author: 'Cheval Blanc / LVMH Hotel Management',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "A langoustine dish at Plénitude, chef Arnaud Donckele's three-Michelin-starred restaurant.",
      zh: '主厨 Arnaud Donckele 米其林三星餐厅 Plénitude 的一道螯虾菜品。',
      fr: 'Un plat de langoustine à Plénitude, le restaurant trois étoiles du chef Arnaud Donckele.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-cheval-blanc-tout-paris',
    src: '/images/accommodation-cheval-blanc-tout-paris.jpg',
    sourceUrl: 'https://www.chevalblanc.com/en/maison/paris/restaurants-and-bars/le-tout-paris/',
    sourceName: 'Cheval Blanc',
    author: 'Cheval Blanc / LVMH Hotel Management',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The terrace of Le Tout-Paris, the Michelin-starred brasserie on the 7th floor of Cheval Blanc Paris, overlooking the Seine and the Eiffel Tower.',
      zh: '白马酒店巴黎 7 楼米其林一星餐厅 Le Tout-Paris 的露台，可以看到塞纳河与埃菲尔铁塔。',
      fr: 'La terrasse du Tout-Paris, la brasserie étoilée du 7e étage du Cheval Blanc Paris, avec vue sur la Seine et la tour Eiffel.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-cheval-blanc-spa',
    src: '/images/accommodation-cheval-blanc-spa.jpg',
    sourceUrl: 'https://www.chevalblanc.com/en/maison/paris/wellness/',
    sourceName: 'Cheval Blanc',
    author: 'Cheval Blanc / LVMH Hotel Management',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The 30-metre infinity pool at Dior Spa Cheval Blanc, its walls lined with shifting digital views of Paris.',
      zh: 'Dior Spa Cheval Blanc 30 米无边泳池，墙面是不断变化的巴黎数字影像。',
      fr: 'La piscine à débordement de 30 mètres du Dior Spa Cheval Blanc, ses parois animées de vues numériques changeantes de Paris.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-cheval-blanc',
    src: '/images/accommodation-cheval-blanc.jpg',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Grand_Magasin_Samaritaine_-_Paris_I_(FR75)_-_2021-06-05_-_1.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Chabe01',
    license: 'CC BY-SA 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The restored Art Deco Samaritaine building on the Seine, home to Cheval Blanc Paris.',
      zh: '塞纳河畔修复后的装饰艺术风格拉萨玛丽丹百货大楼，白马酒店所在地。',
      fr: "L'immeuble Art déco restauré de la Samaritaine sur la Seine, qui abrite le Cheval Blanc Paris.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-bulgari-paris',
    src: '/images/accommodation-bulgari-paris.jpg',
    sourceUrl: 'https://www.bulgarihotels.com/en_US/paris',
    sourceName: 'Property archive',
    author: 'Bvlgari Hotels & Resorts',
    license: 'used with permission',
    usageStatus: 'licensed',
    altByLocale: {
      en: "Bvlgari Hotel Paris's corner facade near the Champs-Élysées, at golden hour.",
      zh: '宝格丽酒店巴黎的转角外立面，毗邻香榭丽舍大道，拍摄于黄昏时分。',
      fr: "La façade d'angle du Bvlgari Hotel Paris, près des Champs-Élysées, à l'heure dorée.",
    },
    notes:
      "A genuine, identifiable exterior photo of this specific property, supplied by the client from the hotel's own asset folder (BH_PARIS_GALLERY_NEW) rather than a public stock library.",
  },
  {
    id: 'accommodation-bulgari-paris-lobby',
    src: '/images/accommodation-bulgari-paris-lobby.jpg',
    sourceUrl: 'https://www.bulgarihotels.com/en_US/paris',
    sourceName: 'Property archive',
    author: 'Bvlgari Hotels & Resorts',
    license: 'used with permission',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The marble starburst floor and sculptural glass chandelier of the Bvlgari Hotel Paris lobby.',
      zh: '宝格丽酒店巴黎大堂，星芒纹理大理石地面与雕塑感玻璃吊灯。',
      fr: 'Le sol en marbre à motif étoilé et le lustre sculptural en verre du lobby du Bvlgari Hotel Paris.',
    },
    notes:
      "A genuine, identifiable interior photo of this specific property, supplied by the client from the hotel's own asset folder (BH_PARIS_GALLERY_NEW) rather than a public stock library.",
  },
  {
    id: 'accommodation-bulgari-paris-ristorante',
    src: '/images/accommodation-bulgari-paris-ristorante.jpg',
    sourceUrl: 'https://www.bulgarihotels.com/en_US/paris/dining/il-ristorante-niko-romito',
    sourceName: 'Property archive',
    author: 'Bvlgari Hotels & Resorts',
    license: 'used with permission',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The dining room of Il Ristorante - Niko Romito at Bvlgari Hotel Paris, by night.',
      zh: '宝格丽酒店巴黎 Il Ristorante - Niko Romito 餐厅的夜间用餐区。',
      fr: 'La salle du Il Ristorante - Niko Romito au Bvlgari Hotel Paris, de nuit.',
    },
    notes:
      "A genuine, identifiable interior photo of this specific property, supplied by the client from the hotel's own asset folder (BH_PARIS_GALLERY_NEW) rather than a public stock library.",
  },
  {
    id: 'accommodation-bulgari-paris-spa',
    src: '/images/accommodation-bulgari-paris-spa.jpg',
    sourceUrl: 'https://www.bulgarihotels.com/en_US/paris',
    sourceName: 'Property archive',
    author: 'Bvlgari Hotels & Resorts',
    license: 'used with permission',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The swimming pool at the Bvlgari Spa, Bvlgari Hotel Paris.',
      zh: '宝格丽酒店巴黎 Bvlgari Spa 水疗中心的泳池。',
      fr: 'La piscine du Bvlgari Spa, au Bvlgari Hotel Paris.',
    },
    notes:
      "A genuine, identifiable interior photo of this specific property, supplied by the client from the hotel's own asset folder (BH_PARIS_GALLERY_NEW) rather than a public stock library.",
  },
  {
    id: 'accommodation-bulgari-paris-suite',
    src: '/images/accommodation-bulgari-paris-suite.jpg',
    sourceUrl:
      'https://www.bulgarihotels.com/en_US/paris/accommodation/bvlgari-suites/bulgari-suite-i---iii',
    sourceName: 'Property archive',
    author: 'Bvlgari Hotels & Resorts',
    license: 'used with permission',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The living room of Bvlgari Suite I & III, with a framed display of Bvlgari jewellery.',
      zh: '宝格丽套房 I & III 的客厅，墙上是宝格丽珠宝的展示画框。',
      fr: 'Le salon de la Suite Bvlgari I & III, avec un cadre exposant des bijoux Bvlgari.',
    },
    notes:
      "A genuine, identifiable interior photo of this specific property, supplied by the client from the hotel's own asset folder (BH_PARIS_GALLERY_NEW) rather than a public stock library.",
  },
  {
    id: 'accommodation-bulgari-paris-penthouse',
    src: '/images/accommodation-bulgari-paris-penthouse.jpg',
    sourceUrl:
      'https://www.bulgarihotels.com/en_US/paris/accommodation/bvlgari-suites/bulgari-penthouse',
    sourceName: 'Property archive',
    author: 'Bvlgari Hotels & Resorts',
    license: 'used with permission',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The living room and library of the Bvlgari Penthouse, Bvlgari Hotel Paris, overlooking the rooftops of Paris.',
      zh: '宝格丽酒店巴黎顶层套房的客厅与藏书区，俯瞰巴黎屋顶天际线。',
      fr: 'Le salon-bibliothèque de la Bvlgari Penthouse, au Bvlgari Hotel Paris, avec vue sur les toits de Paris.',
    },
    notes:
      "A genuine, identifiable interior photo of this specific property, supplied by the client from the hotel's own asset folder (BH_PARIS_GALLERY_NEW) rather than a public stock library.",
  },
  {
    id: 'service-private-jet-interior',
    src: '/images/service-private-jet-interior.jpg',
    sourceUrl: 'https://unsplash.com/photos/ogUyaf8JWA4',
    sourceName: 'Unsplash',
    author: 'Andy Wang',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The cabin interior of a private jet, with facing leather seats.',
      zh: '私人飞机机舱内部，对坐式真皮座椅。',
      fr: "L'intérieur de la cabine d'un jet privé, avec des sièges en cuir face à face.",
    },
  },
  {
    // Was previously mismatched with a door-panel photo unrelated to the
    // "standard 7-seat" configuration it illustrates — swapped with
    // service-car-aviation-seats below, which was itself a genuine V-Class
    // seat photo mislabelled as the reclining/aviation option. Same `id`,
    // just repointed to the correct file (see media-library.md's
    // "图片替换不改内容文件" convention).
    id: 'service-car-interior',
    src: '/images/service-car-interior.jpg',
    sourceUrl: 'https://unsplash.com/photos/luxurious-black-leather-seats-in-a-van-118W6gHx_iI',
    sourceName: 'Unsplash',
    author: 'Sunset Limousines',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Rear bench seating in a wide-body luxury van, standard configuration.',
      zh: '宽体豪华商务车后排标准座椅配置。',
      fr: 'Sièges arrière en banquette dans un van de luxe à carrosserie large, configuration standard.',
    },
  },
  {
    // Real fleet-supplier photo (client-provided, authorized for use —
    // replaced the earlier "no accurate free photo found" Unsplash
    // placeholder). Shows the actual reclining/individually-adjustable
    // "aviation-style" captain's chairs with extending footrests, the
    // genuine premium option this card is meant to represent.
    id: 'service-car-aviation-seats',
    src: '/images/service-car-aviation-seats.jpg',
    sourceUrl: '',
    sourceName: 'Fleet supplier',
    author: 'Fleet supplier',
    license: 'Provided by fleet supplier for promotional use',
    usageStatus: 'licensed',
    notes: 'Client-provided fleet-supplier photo, no public source page to link.',
    altByLocale: {
      en: 'Individual reclining leather captain’s chairs with extending footrests, in a wide-body luxury van.',
      zh: '宽体豪华商务车内独立可调节真皮航空座椅，配可伸展脚踏板。',
      fr: 'Sièges capitaine en cuir inclinables individuels avec repose-pieds extensible, dans un van de luxe à carrosserie large.',
    },
  },
  {
    id: 'service-wine-cellar',
    src: '/images/service-wine-cellar.jpg',
    sourceUrl: 'https://unsplash.com/photos/mpfXEaWfdoQ',
    sourceName: 'Unsplash',
    author: 'Amin Zabardast',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A long wine cellar corridor lined with aging bottles.',
      zh: '一条长长的酒窖通道，两侧陈放着陈酿葡萄酒。',
      fr: 'Un long couloir de cave à vin bordé de bouteilles en vieillissement.',
    },
  },
  {
    id: 'service-chef-plating',
    src: '/images/service-chef-plating.jpg',
    sourceUrl: 'https://unsplash.com/photos/chef-pouring-sauce-over-plated-steak-MaWMfm-HCqQ',
    sourceName: 'Unsplash',
    author: 'Urban Gyllström',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "A chef's hands finishing a plated dish with sauce.",
      zh: '主厨双手正为摆盘菜肴淋上酱汁的收尾瞬间。',
      fr: 'Les mains d’un chef finalisant un plat dressé avec une sauce.',
    },
  },
  {
    id: 'service-opera-house',
    src: '/images/service-opera-house.jpg',
    sourceUrl: 'https://unsplash.com/photos/V0ttLGYVvY8',
    sourceName: 'Unsplash',
    author: 'Aurora Song',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The ornate gilded interior of a historic European opera house.',
      zh: '欧洲一座历史悠久歌剧院金碧辉煌的内部装饰。',
      fr: "L'intérieur doré et orné d'un opéra historique européen.",
    },
  },
  {
    id: 'service-roland-garros',
    src: '/images/service-roland-garros.jpg',
    sourceUrl:
      'https://unsplash.com/photos/stadium-seating-with-spectators-at-court-philippe-chatrier-r81fCxOVQq4',
    sourceName: 'Unsplash',
    author: 'Ashwin Tanjore',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Tiered seating at Court Philippe-Chatrier, Roland-Garros.',
      zh: '法网菲利普·夏蒂埃球场的阶梯看台。',
      fr: 'Les tribunes du court Philippe-Chatrier, à Roland-Garros.',
    },
  },
  {
    id: 'service-floral-event',
    src: '/images/service-floral-event.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-long-wooden-table-adorned-with-white-flowers-SQitm8We48E',
    sourceName: 'Unsplash',
    author: 'Jonathan Borba',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A long table dressed with an elaborate arrangement of white flowers.',
      zh: '一张长桌，铺陈着繁复精致的白色花艺装饰。',
      fr: 'Une longue table habillée d’un somptueux décor de fleurs blanches.',
    },
  },
  {
    id: 'experience-extime-lounge',
    src: '/images/experience-extime-lounge.jpg',
    sourceUrl: 'https://www.extime.com/en/extime-exclusive-paris',
    sourceName: 'Extime Exclusive Paris',
    author: 'Extime Exclusive Paris',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The private lounge at Extime Exclusive Paris, with crimson velvet armchairs beneath an engraved glass wall.',
      zh: 'Extime Exclusive Paris 专属候机厅，深红丝绒座椅，背景是雕刻玻璃墙面。',
      fr: 'Le salon privé d’Extime Exclusive Paris, fauteuils en velours cramoisi sous un mur de verre gravé.',
    },
  },
  {
    id: 'experience-extime-salon',
    src: '/images/experience-extime-salon.jpg',
    sourceUrl: 'https://www.extime.com/en/extime-exclusive-paris',
    sourceName: 'Extime Exclusive Paris',
    author: 'Extime Exclusive Paris',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A private salon in the customs zone at Extime Exclusive Paris, with champagne service and a garden view.',
      zh: 'Extime Exclusive Paris 海关区贵宾沙龙，备有香槟服务，窗外是花园景致。',
      fr: 'Un salon privé en zone douanière d’Extime Exclusive Paris, service de champagne et vue sur le jardin.',
    },
  },
  {
    id: 'experience-extime-checkin',
    src: '/images/experience-extime-checkin.jpg',
    sourceUrl: 'https://www.extime.com/en/extime-exclusive-paris',
    sourceName: 'Extime Exclusive Paris',
    author: 'Extime Exclusive Paris',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The arched check-in hall at Extime Exclusive Paris, with a porter and dedicated staff on hand.',
      zh: 'Extime Exclusive Paris 拱形值机大厅，专属礼宾与行李管家随时待命。',
      fr: 'Le hall d’enregistrement voûté d’Extime Exclusive Paris, avec porteur et personnel dédié.',
    },
  },
  {
    id: 'experience-extime-tarmac',
    src: '/images/experience-extime-tarmac.jpg',
    sourceUrl: 'https://www.extime.com/en/extime-exclusive-paris',
    sourceName: 'Extime Exclusive Paris',
    author: 'Extime Exclusive Paris',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A guest walking from the aircraft steps directly to a private car waiting on the tarmac.',
      zh: '宾客从舷梯直接步向停机坪上等候的专属座驾。',
      fr: 'Un client marchant de la passerelle de l’avion directement vers une voiture privée sur le tarmac.',
    },
  },
  {
    id: 'service-lobby-detail',
    src: '/images/service-lobby-detail.jpg',
    sourceUrl:
      'https://unsplash.com/photos/modern-lobby-with-marble-reception-desk-and-plants-pt0nGH-NvoA',
    sourceName: 'Unsplash',
    author: 'Aalo Lens',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A marble reception desk in a quiet, minimalist lobby.',
      zh: '宁静极简风格大堂中的大理石接待台。',
      fr: "Un comptoir d'accueil en marbre dans un hall calme et minimaliste.",
    },
  },
  {
    id: 'service-la-defense',
    src: '/images/service-la-defense.jpg',
    sourceUrl:
      'https://unsplash.com/photos/modern-skyscrapers-rise-above-a-historic-european-city-JrO2rWczrVQ',
    sourceName: 'Unsplash',
    author: 'Danish Prakash',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The La Défense business district skyline, seen from central Paris.',
      zh: '从巴黎市中心眺望拉德芳斯商务区天际线。',
      fr: 'La skyline du quartier d’affaires de La Défense, vue depuis le centre de Paris.',
    },
  },
  {
    id: 'service-meeting-room',
    src: '/images/service-meeting-room.jpg',
    sourceUrl:
      'https://unsplash.com/photos/empty-conference-room-with-a-panoramic-city-view-at-sunset-wEi2LkDF8LY',
    sourceName: 'Unsplash',
    author: 'Pavel Gromov',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'An empty executive boardroom with a panoramic city view at dusk.',
      zh: '一间空无一人的高级会议室，黄昏时分俯瞰城市全景。',
      fr: 'Une salle de conseil vide avec une vue panoramique sur la ville au crépuscule.',
    },
  },
  {
    id: 'service-camera-lens',
    src: '/images/service-camera-lens.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-hand-holding-a-camera-lens-XKwYkC8nGMI',
    sourceName: 'Unsplash',
    author: 'Alef Morais',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A hand holding a camera lens, close up.',
      zh: '手持相机镜头的特写。',
      fr: 'Une main tenant un objectif photo, gros plan.',
    },
  },
  {
    id: 'service-atelier-fitting',
    src: '/images/service-atelier-fitting.jpg',
    sourceUrl: 'https://unsplash.com/photos/white-tape-measure-and-gray-scissors-qQKv7r1BaRw',
    sourceName: 'Unsplash',
    author: 'pina messina',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "A tailor's measuring tape and scissors on fine silk fabric.",
      zh: '精致丝绸面料上的裁缝卷尺与剪刀。',
      fr: 'Un mètre ruban de couturier et des ciseaux sur un tissu de soie fine.',
    },
  },
  {
    id: 'service-boutique-appointment',
    src: '/images/service-boutique-appointment.jpg',
    sourceUrl: 'https://pixabay.com/photos/merry-christmas-shopping-clothes-606993/',
    sourceName: 'Pixabay',
    author: 'markusspiske',
    license: 'Pixabay License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A rack of folded garments on hangers, with mannequins in soft focus behind.',
      zh: '衣架上叠放整齐的衣物，背景是虚化的人体模特。',
      fr: 'Un portant de vêtements pliés sur des cintres, avec des mannequins en arrière-plan flou.',
    },
    notes: 'Generic — does not depict any named property.',
  },
  {
    id: 'service-grand-ballroom',
    src: '/images/service-grand-ballroom.jpg',
    sourceUrl:
      'https://unsplash.com/photos/grand-ballroom-with-ornate-chandeliers-and-polished-floor-krAQD5gGBSM',
    sourceName: 'Unsplash',
    author: 'mana5280',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A grand ballroom lit by rows of crystal chandeliers.',
      zh: '一座被成排水晶吊灯点亮的宏伟宴会厅。',
      fr: 'Une grande salle de bal éclairée par des rangées de lustres en cristal.',
    },
  },
  {
    id: 'journey-bordeaux-burgundy-chateau',
    src: '/images/journey-bordeaux-burgundy-chateau.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-castle-stands-behind-a-vineyard-under-a-cloudy-sky-uomrAVoxs3o',
    sourceName: 'Unsplash',
    author: 'Soham Banerjee',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A turreted château rising behind rows of vines under a cloudy sky.',
      zh: '阴云天空下，一座带塔楼的城堡矗立在成排葡萄藤之后。',
      fr: 'Un château à tourelles se dressant derrière des rangs de vigne sous un ciel nuageux.',
    },
    notes: 'Generic — no visible signage identifying a specific named château or producer.',
  },
  {
    id: 'destination-burgundy-vineyard',
    src: '/images/destination-burgundy-vineyard.jpg',
    sourceUrl:
      'https://unsplash.com/photos/person-walking-through-a-vineyard-at-sunset-5f23KdhZUtQ',
    sourceName: 'Unsplash',
    author: 'Elodie Debard',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "Rows of vines in Burgundy's Côte d'Or, glowing gold in the evening light.",
      zh: '勃艮第金丘（Côte d’Or）成排的葡萄藤，在傍晚的光线下泛着金色。',
      fr: "Des rangs de vigne dans la Côte-d'Or bourguignonne, dorés par la lumière du soir.",
    },
  },
  {
    id: 'journey-bordeaux-burgundy-saint-emilion',
    src: '/images/journey-bordeaux-burgundy-saint-emilion.jpg',
    sourceUrl:
      'https://unsplash.com/photos/rooftops-of-a-french-village-with-rolling-hills-hNmG6GWqSUU',
    sourceName: 'Unsplash',
    author: 'Benjamin Esteves',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Terracotta rooftops of the hilltop village of Saint-Émilion, with vineyards in the valley beyond.',
      zh: '圣埃美隆山顶村庄的赤陶屋顶景观，山谷中可见远处的葡萄园。',
      fr: 'Les toits de tuiles du village perché de Saint-Émilion, avec les vignes de la vallée en arrière-plan.',
    },
  },
  {
    id: 'journey-bordeaux-burgundy-cote-de-nuits',
    src: '/images/journey-bordeaux-burgundy-cote-de-nuits.jpg',
    sourceUrl:
      'https://unsplash.com/photos/vineyard-rows-stretch-out-under-a-bright-blue-sky-zhCy92YZi3M',
    sourceName: 'Unsplash',
    author: 'vinsdebourgogne.nl',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Rows of young vines stretching across a Burgundy vineyard in Irancy under a clear sky.',
      zh: '晴空下，法国勃艮第伊朗西（Irancy）葡萄园中成排的幼年葡萄藤。',
      fr: "Des rangs de jeunes vignes s'étendant dans un vignoble bourguignon à Irancy, sous un ciel dégagé.",
    },
  },
  {
    id: 'journey-bordeaux-burgundy-vines-detail',
    src: '/images/journey-bordeaux-burgundy-vines-detail.jpg',
    sourceUrl: 'https://unsplash.com/photos/a-bunch-of-grapes-hanging-from-a-vine-egx7fm0rgzA',
    sourceName: 'Unsplash',
    author: 'Ingeborg Korme',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Close-up of a cluster of dark grapes hanging on the vine in Vougeot, Burgundy.',
      zh: '法国勃艮第武若（Vougeot）葡萄藤上一串深色葡萄的特写。',
      fr: 'Gros plan sur une grappe de raisins noirs suspendue à la vigne à Vougeot, en Bourgogne.',
    },
  },
  {
    id: 'journey-bordeaux-burgundy-cellar',
    src: '/images/journey-bordeaux-burgundy-cellar.jpg',
    sourceUrl: 'https://unsplash.com/photos/brown-wooden-wine-barrel-lot-NUD6cWNdBv8',
    sourceName: 'Unsplash',
    author: 'Daniel Vogel',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Rows of oak wine barrels stacked in a dimly lit cellar, their reflections visible on the wet floor.',
      zh: '昏暗酒窖中层层堆叠的橡木酒桶，湿润的地面映出其倒影。',
      fr: 'Des rangées de fûts de chêne empilés dans une cave faiblement éclairée, leurs reflets visibles sur le sol humide.',
    },
    notes: 'Generic — does not depict any named winery or brand.',
  },
  {
    id: 'journey-bordeaux-burgundy-tasting',
    src: '/images/journey-bordeaux-burgundy-tasting.jpg',
    sourceUrl: 'https://unsplash.com/photos/person-pouring-red-wine-on-wine-glass-etWlaoFnTl4',
    sourceName: 'Unsplash',
    author: 'Lefteris Kallergis',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Red wine being poured into a glass, hands only, no faces visible.',
      zh: '红酒正被倒入酒杯，画面中仅可见双手，没有出现面孔。',
      fr: 'Du vin rouge versé dans un verre, seules les mains sont visibles, aucun visage.',
    },
  },
  {
    id: 'journey-bordeaux-burgundy-dining',
    src: '/images/journey-bordeaux-burgundy-dining.jpg',
    sourceUrl: 'https://unsplash.com/photos/table-setting-with-wine-glasses-and-menus-4dwaIO28zbY',
    sourceName: 'Unsplash',
    author: 'Preillumination SeTh',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'An elegant restaurant table set with wine glasses and menus, no diners visible.',
      zh: '一张布置优雅的餐厅餐桌，摆放着酒杯与菜单，画面中没有食客。',
      fr: 'Une table de restaurant élégamment dressée avec des verres à vin et des menus, sans convives visibles.',
    },
    notes: 'Generic — does not depict any named restaurant.',
  },
  {
    id: 'journey-mediterranean-coast',
    src: '/images/journey-mediterranean-coast.jpg',
    sourceUrl: 'https://unsplash.com/photos/rocky-coastline-meets-the-deep-blue-ocean-NEFMq7KpYiI',
    sourceName: 'Unsplash',
    author: 'Seval Torun',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A rocky Mediterranean coastline meeting deep blue water, seen from above.',
      zh: '从高处俯瞰地中海嶙峋海岸线与深蓝海水交汇处。',
      fr: 'Un littoral méditerranéen rocheux rencontrant une eau bleu profond, vu d’en haut.',
    },
    notes: 'Generic coastline — does not depict a specific named port or resort.',
  },
  {
    id: 'journey-mediterranean-santorini-steps',
    src: '/images/journey-mediterranean-santorini-steps.jpg',
    sourceUrl:
      'https://unsplash.com/photos/white-stairs-lead-down-to-the-blue-ocean-in-santorini-PRAsKaEUP_0',
    sourceName: 'Unsplash',
    author: 'Wojciech Wyszkowski',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Whitewashed steps leading down toward the sea on a Greek island.',
      zh: '希腊小岛上，白色石阶一路向下通往大海。',
      fr: 'Des marches blanchies à la chaux descendant vers la mer sur une île grecque.',
    },
    notes: 'Generic Greek-island detail — does not depict a specific named property.',
  },
  {
    id: 'journey-nordic-fjords-panorama',
    src: '/images/journey-nordic-fjords-panorama.jpg',
    sourceUrl:
      'https://unsplash.com/photos/green-covered-mountain-in-panorama-photography-rJcfCdp_9tg',
    sourceName: 'Unsplash',
    author: 'Lachlan Gowen',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A Norwegian fjord village mirrored in still water beneath green mountains.',
      zh: '挪威峡湾村庄倒映在平静水面上，背靠青翠山峦。',
      fr: 'Un village norvégien niché dans un fjord, reflété dans une eau calme sous des montagnes verdoyantes.',
    },
    notes: 'Generic fjord landscape — does not depict a specific named cruise line or vessel.',
  },
  {
    id: 'journey-nordic-fjords-ship',
    src: '/images/journey-nordic-fjords-ship.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-boat-in-a-body-of-water-surrounded-by-mountains-VQv1N3FOsRg',
    sourceName: 'Unsplash',
    author: 'David Bottenberg',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A small cruise ship sailing through a steep Norwegian fjord.',
      zh: '一艘小型邮轮航行于陡峭的挪威峡湾之中。',
      fr: 'Un petit navire de croisière naviguant dans un fjord norvégien escarpé.',
    },
    notes:
      'Ship livery is generic/unbranded in this crop — do not caption with a specific cruise line name.',
  },
  {
    id: 'journey-nordic-fjords-valley',
    src: '/images/journey-nordic-fjords-valley.jpg',
    sourceUrl:
      'https://unsplash.com/photos/winding-road-on-a-green-hillside-overlooking-a-serene-fjord-VrgvLDRV63g',
    sourceName: 'Unsplash',
    author: 'Liosha Shyp',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A misty green fjord valley with a small village along the water.',
      zh: '云雾缭绕的翠绿峡湾山谷，村庄沿水岸而建。',
      fr: 'Une vallée verdoyante et brumeuse au bord d’un fjord, avec un petit village le long de l’eau.',
    },
    notes: 'Generic fjord valley — does not depict a specific named destination.',
  },
  {
    id: 'service-pont-alexandre',
    src: '/images/service-pont-alexandre.jpg',
    sourceUrl: 'https://unsplash.com/photos/R5scocnOOdM',
    sourceName: 'Unsplash',
    author: 'Léonard Cotte',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Pont Alexandre III at dusk, its ornate lampposts lit above the Seine.',
      zh: '黄昏中的亚历山大三世桥，华丽的灯柱在塞纳河上方亮起。',
      fr: 'Le pont Alexandre III au crépuscule, ses lampadaires ornés illuminés au-dessus de la Seine.',
    },
  },
  {
    id: 'accommodation-maison-kairui-tasting-table',
    src: '/images/accommodation-maison-kairui-tasting-table.jpg',
    sourceUrl: 'https://www.maisonkairui.com',
    sourceName: 'Maison Kairui',
    author: 'Maison Kairui',
    license: 'Provided by property for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Wine glasses and tasting notes set out along a wooden table at Maison Kairui.',
      zh: '恺瑞酒庄木质长桌上摆好的品酒杯与品鉴笔记。',
      fr: 'Verres à vin et fiches de dégustation disposés sur une table en bois à Maison Kairui.',
    },
    notes:
      "Extracted from the property's own introduction brochure, shared directly by MYVIPSERVICE with the owner's permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'accommodation-maison-kairui-dining-table',
    src: '/images/accommodation-maison-kairui-dining-table.jpg',
    sourceUrl: 'https://www.maisonkairui.com',
    sourceName: 'Maison Kairui',
    author: 'Maison Kairui',
    license: 'Provided by property for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A dining table set with candlesticks and cherry blossoms at Maison Kairui.',
      zh: '恺瑞酒庄餐桌，摆着烛台与樱花装饰。',
      fr: 'Une table dressée avec des chandeliers et des fleurs de cerisier à Maison Kairui.',
    },
    notes:
      "Extracted from the property's own introduction brochure, shared directly by MYVIPSERVICE with the owner's permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'accommodation-maison-kairui-tearoom',
    src: '/images/accommodation-maison-kairui-tearoom.jpg',
    sourceUrl: 'https://www.maisonkairui.com',
    sourceName: 'Maison Kairui',
    author: 'Maison Kairui',
    license: 'Provided by property for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The wabi-sabi-style tearoom at Maison Kairui, with a low stone table and woven floor seating.',
      zh: '恺瑞酒庄侘寂风茶室，低矮石桌配编织地席座椅。',
      fr: "Le salon de thé dans l'esprit wabi-sabi de Maison Kairui, avec une table basse en pierre et des sièges tressés au sol.",
    },
    notes:
      "Extracted from the property's own introduction brochure, shared directly by MYVIPSERVICE with the owner's permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'accommodation-maison-kairui-pool',
    src: '/images/accommodation-maison-kairui-pool.jpg',
    sourceUrl: 'https://www.maisonkairui.com',
    sourceName: 'Maison Kairui',
    author: 'Maison Kairui',
    license: 'Provided by property for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Sun loungers beside the garden pool at Maison Kairui.',
      zh: '恺瑞酒庄花园泳池边的日光躺椅。',
      fr: 'Des transats au bord de la piscine du jardin de Maison Kairui.',
    },
    notes:
      "Extracted from the property's own introduction brochure, shared directly by MYVIPSERVICE with the owner's permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'experience-ducasse-seine-aerial',
    src: '/images/experience-ducasse-seine-aerial.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'An aerial night view of the Ducasse sur Seine electric restaurant boat on the river.',
      zh: '塞纳河上的 Ducasse sur Seine 电动游船餐厅夜景鸟瞰。',
      fr: 'Vue aérienne de nuit du bateau-restaurant électrique Ducasse sur Seine.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'experience-ducasse-seine-table-eiffel',
    src: '/images/experience-ducasse-seine-table-eiffel.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A table set for two aboard Ducasse sur Seine, the Eiffel Tower framed through the window.',
      zh: 'Ducasse sur Seine 船上为两人准备的餐桌，窗外正对埃菲尔铁塔。',
      fr: 'Une table dressée pour deux à bord de Ducasse sur Seine, la tour Eiffel encadrée par la fenêtre.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'experience-ducasse-seine-deck-eiffel',
    src: '/images/experience-ducasse-seine-deck-eiffel.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Guests on the upper deck of Ducasse sur Seine at dusk, the Eiffel Tower rising behind them.',
      zh: '黄昏时分，宾客在 Ducasse sur Seine 上层甲板，身后是埃菲尔铁塔。',
      fr: 'Des convives sur le pont supérieur de Ducasse sur Seine au crépuscule, la tour Eiffel en arrière-plan.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'experience-ducasse-seine-dining-room',
    src: '/images/experience-ducasse-seine-dining-room.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Candlelit tables inside the glass-walled dining room of Ducasse sur Seine at night.',
      zh: 'Ducasse sur Seine 玻璃船舱内的烛光晚餐桌，夜色中拍摄。',
      fr: 'Des tables aux chandelles dans la salle vitrée de Ducasse sur Seine, la nuit.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder.",
  },
  {
    id: 'experience-ducasse-seine-dish-map',
    src: '/images/experience-ducasse-seine-dish-map.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A plated starter of beetroot and cured fish on a plate printed with a map of Paris.',
      zh: '盘面印有巴黎街区地图的餐盘，盛着甜菜与腌制鱼的前菜。',
      fr: 'Une entrée de betterave et de poisson mariné dans une assiette imprimée d’un plan de Paris.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder. Cropped to 4:3.",
  },
  {
    id: 'experience-ducasse-seine-daylight-table',
    src: '/images/experience-ducasse-seine-daylight-table.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A table laid with wine glasses beside the windows, the Seine and a stone bridge visible in daylight.',
      zh: '窗边摆好酒杯的餐桌，白天可以看到塞纳河和石桥。',
      fr: 'Une table dressée avec des verres à vin près des baies vitrées, la Seine et un pont de pierre en plein jour.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder. Cropped to 4:3.",
  },
  {
    id: 'experience-ducasse-seine-alexandre-bridge',
    src: '/images/experience-ducasse-seine-alexandre-bridge.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'The Pont Alexandre III lit at dusk with the Eiffel Tower in the distance, seen from the river.',
      zh: '暮色中亮灯的亚历山大三世桥，远处是埃菲尔铁塔，从河面上望去。',
      fr: 'Le pont Alexandre III illuminé au crépuscule, la tour Eiffel au loin, vu depuis le fleuve.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder. Cropped to 4:3.",
  },
  {
    id: 'experience-ducasse-seine-dining-room-day',
    src: '/images/experience-ducasse-seine-dining-room-day.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'Tables laid in the glass-walled dining room in daylight, under a mirrored ceiling.',
      zh: '白天的玻璃船舱餐厅，餐桌已摆好，头顶是镜面天花板。',
      fr: 'Des tables dressées dans la salle vitrée en plein jour, sous un plafond en miroirs.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder. Cropped to 4:3.",
  },
  {
    id: 'experience-ducasse-seine-place-setting',
    src: '/images/experience-ducasse-seine-place-setting.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A place setting with a branded charger plate, cutlery and a small salt dish on a white tablecloth.',
      zh: '白色桌布上的餐位摆设：带标识的装饰餐盘、餐具和一小碟盐。',
      fr: 'Un couvert avec assiette de présentation siglée, couverts et petite coupelle de sel sur une nappe blanche.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder. Cropped to 4:3.",
  },
  {
    id: 'experience-ducasse-seine-service',
    src: '/images/experience-ducasse-seine-service.jpg',
    sourceUrl: 'https://www.ducasse-seine.com',
    sourceName: 'Ducasse sur Seine',
    author: 'Pierre Monetta',
    license: 'Provided by partner for promotional use',
    usageStatus: 'licensed',
    altByLocale: {
      en: 'A server pouring wine at a window table while the river passes outside.',
      zh: '服务生在靠窗的餐桌旁斟酒，窗外是流动的河面。',
      fr: 'Un serveur versant le vin à une table près de la baie vitrée, le fleuve défilant dehors.',
    },
    notes:
      "Extracted from the partner's own event brochure, shared directly by MYVIPSERVICE with permission to use for promotional purposes — not an Unsplash placeholder. Cropped to 4:3.",
  },
  {
    id: 'destination-courchevel-1850-gondola',
    src: '/images/destination-courchevel-1850-gondola.jpg',
    sourceUrl: 'https://www.courchevel.com',
    sourceName: 'Courchevel Tourisme (official tourist office)',
    author: 'Courchevel Tourisme',
    license:
      'Unconfirmed — sourced from the official tourist office site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Courchevel gondola cabin rising above the clouds, snow-capped peaks in the distance.',
      zh: '库尔雪维尔缆车缆厢升至云海之上，远处是雪峰。',
      fr: 'Une cabine de télécabine de Courchevel s’élevant au-dessus des nuages, sommets enneigés au loin.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'destination-courchevel-1850-trois-vallees',
    src: '/images/destination-courchevel-1850-trois-vallees.jpg',
    sourceUrl: 'https://www.courchevel.com',
    sourceName: 'Courchevel Tourisme (official tourist office)',
    author: 'Courchevel Tourisme',
    license:
      'Unconfirmed — sourced from the official tourist office site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'An aerial view of groomed pistes across the Les Trois Vallées ski area.',
      zh: '三山谷（Les 3 Vallées）雪场整备雪道的航拍全景。',
      fr: 'Vue aérienne des pistes damées du domaine skiable des Trois Vallées.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'destination-courchevel-1850-ski-group',
    src: '/images/destination-courchevel-1850-ski-group.jpg',
    sourceUrl: 'https://www.courchevel.com',
    sourceName: 'Courchevel Tourisme (official tourist office)',
    author: 'Courchevel Tourisme',
    license:
      'Unconfirmed — sourced from the official tourist office site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A group of skiers pausing on a piste, snow-capped peaks behind them.',
      zh: '一群滑雪者在雪道上稍作停留，身后是连绵雪峰。',
      fr: 'Un groupe de skieurs marquant une pause sur une piste, sommets enneigés en arrière-plan.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-fouquets-courchevel-facade',
    src: '/images/accommodation-fouquets-courchevel-facade.jpg',
    sourceUrl: '',
    sourceName:
      'Fouquet’s Courchevel — client-supplied brochure (ExclusiveExperiences_FouquetsCourchevel_ENG.pdf)',
    author: 'Groupe Barrière',
    license:
      'Unconfirmed — cover image from a Fouquet’s Courchevel brochure PDF the client sent directly; no public URL, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Fouquet’s Courchevel at dusk, its chalet facade lit with warm fairy lights against a pink sky.',
      zh: '黄昏时分的 Fouquet’s Courchevel，木屋外墙上暖黄色的灯饰映衬着粉紫色天空。',
      fr: 'Fouquet’s Courchevel au crépuscule, la façade du chalet illuminée de guirlandes chaudes sous un ciel rosé.',
    },
    notes:
      'Client-supplied brochure image (more defensible than a site scrape, same precedent as the aviation-seats photo), but still needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-fouquets-courchevel-suite',
    src: '/images/accommodation-fouquets-courchevel-suite.jpg',
    sourceUrl: '',
    sourceName:
      "Fouquet’s Courchevel — client-supplied (高雪维尔图片库/Fouquet's Courchevel/room-1.jpg)",
    author: 'Groupe Barrière',
    license:
      'Unconfirmed — client-supplied image, no public URL, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A suite living room at Fouquet’s Courchevel, a three-sided fireplace lit beside a wood-panelled sitting area.',
      zh: 'Fouquet’s Courchevel 套房客厅，三面通透的壁炉在木饰面起居区旁燃起。',
      fr: 'Le salon d’une suite à Fouquet’s Courchevel, cheminée à trois faces allumée près d’un coin salon lambrissé.',
    },
    notes:
      'Official gallery image — needs confirmed usage license before this goes past internal review.',
  },
  {
    id: 'accommodation-fouquets-courchevel-loulou',
    src: '/images/accommodation-fouquets-courchevel-loulou.jpg',
    sourceUrl: '',
    sourceName:
      "Fouquet’s Courchevel — client-supplied (高雪维尔图片库/Fouquet's Courchevel/restaurant-loulou-1.jpg)",
    author: 'Groupe Barrière',
    license:
      'Unconfirmed — client-supplied image, no public URL, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Loulou restaurant’s outdoor terrace at Fouquet’s Courchevel, set tables among snow-covered pines.',
      zh: 'Fouquet’s Courchevel 的 Loulou 餐厅露台，餐桌布置在积雪的松林间。',
      fr: 'La terrasse extérieure du restaurant Loulou à Fouquet’s Courchevel, tables dressées parmi les pins enneigés.',
    },
    notes:
      'Official site image — needs confirmed usage license before this goes past internal review.',
  },
  {
    id: 'accommodation-fouquets-courchevel-spa',
    src: '/images/accommodation-fouquets-courchevel-spa.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/collection-fouquet-s/courchevel/gallery',
    sourceName: 'Fouquet’s Courchevel official site (hotelsbarriere.com)',
    author: 'Groupe Barrière',
    license:
      'Unconfirmed — sourced from the property’s official site gallery, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The indoor pool at Fouquet’s Courchevel’s spa, loungers along a stained-glass wall with snow visible through the windows.',
      zh: 'Fouquet’s Courchevel 水疗中心的室内泳池，彩色玻璃墙边摆着躺椅，窗外可见雪景。',
      fr: 'La piscine intérieure du spa de Fouquet’s Courchevel, transats le long d’un mur en verre coloré, neige visible par les fenêtres.',
    },
    notes:
      'Official gallery image — needs confirmed usage license before this goes past internal review.',
  },
  {
    id: 'accommodation-fouquets-paris-facade',
    src: '/images/accommodation-fouquets-paris-facade.jpg',
    sourceUrl:
      'https://www.hotelsbarriere.com/en/collection-fouquet-s/paris/restaurants-and-bars/brasserie-fouquet-s-paris',
    sourceName: 'Fouquet’s Paris official site (hotelsbarriere.com)',
    author: 'Adrien Hue (credited on the official site)',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Fouquet’s Paris’s ground-floor facade on the Champs-Élysées, gold signage above a red awning and pavement terrace.',
      zh: 'Fouquet’s Paris 面向香榭丽舍大街的底层外立面，红色遮阳篷上方是金色招牌，门前设有露台。',
      fr: 'La façade du rez-de-chaussée de Fouquet’s Paris sur les Champs-Élysées, enseigne dorée au-dessus d’un store rouge et d’une terrasse.',
    },
    notes:
      'Official site image, photo credited to Adrien Hue in the source filename — needs confirmed usage license before this goes past internal review.',
  },
  {
    id: 'accommodation-fouquets-paris-suite',
    src: '/images/accommodation-fouquets-paris-suite.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/collection-fouquet-s/paris/rooms-and-suites',
    sourceName: 'Fouquet’s Paris official site (hotelsbarriere.com)',
    author: 'Groupe Barrière',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Suite Prestige Champs-Élysées at Fouquet’s Paris, a quilted gold headboard beside French doors onto a wrought-iron balcony.',
      zh: 'Fouquet’s Paris 的香榭丽舍尊贵套房，金色绗缝床头板旁是通向锻铁阳台的落地窗门。',
      fr: 'La Suite Prestige Champs-Élysées de Fouquet’s Paris, tête de lit matelassée dorée près d’une porte-fenêtre donnant sur un balcon en fer forgé.',
    },
    notes:
      'Official site image — needs confirmed usage license before this goes past internal review.',
  },
  {
    id: 'accommodation-fouquets-paris-le-joy',
    src: '/images/accommodation-fouquets-paris-le-joy.jpg',
    sourceUrl:
      'https://www.hotelsbarriere.com/en/collection-fouquet-s/paris/restaurants-and-bars/joy',
    sourceName: 'Fouquet’s Paris official site (hotelsbarriere.com)',
    author: 'Groupe Barrière',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Le Joy restaurant at Fouquet’s Paris, a library-alcove dining room in dark green and mahogany opening onto a private garden.',
      zh: 'Fouquet’s Paris 的 Le Joy 餐厅，深绿与红木色调的图书角式用餐区，一侧通向私密花园。',
      fr: 'Le restaurant Joy de Fouquet’s Paris, salle à manger façon bibliothèque en vert foncé et acajou ouvrant sur un jardin privé.',
    },
    notes:
      'Official site image — needs confirmed usage license before this goes past internal review.',
  },
  {
    id: 'accommodation-aman-le-melezin-exterior',
    src: '/images/accommodation-aman-le-melezin-exterior.jpg',
    sourceUrl: '',
    sourceName: 'Aman Le Mélézin — client-supplied (社交媒体宣传素材)',
    author: 'Aman',
    license:
      'Unconfirmed — client-supplied social-media promo photo, no public URL, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A skier heading toward the Aman Le Mélézin chalet, its signage visible against the mountains.',
      zh: '一名滑雪者滑向 Aman Le Mélézin 木屋，招牌在雪山背景下清晰可见。',
      fr: 'Un skieur se dirigeant vers le chalet Aman Le Mélézin, son enseigne visible devant les montagnes.',
    },
    notes:
      'Client-supplied photo (more defensible than a site scrape), but still needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-dining',
    src: '/images/accommodation-aman-le-melezin-dining.jpg',
    sourceUrl: '',
    sourceName: 'Aman Le Mélézin — client-supplied (社交媒体宣传素材)',
    author: 'Aman',
    license:
      'Unconfirmed — client-supplied social-media promo photo, no public URL, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A dining table set by a floor-to-ceiling window overlooking snow-laden pines.',
      zh: '一张摆好餐具的餐桌，落地窗外是积雪的松林。',
      fr: 'Une table dressée devant une baie vitrée donnant sur des pins couverts de neige.',
    },
    notes:
      'Client-supplied photo, needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-suite-melezin',
    src: '/images/accommodation-aman-le-melezin-suite-melezin.jpg',
    sourceUrl: 'https://www.aman.com/resorts/aman-le-melezin/accommodation/chambres-suites',
    sourceName: 'Aman Le Mélézin',
    author: 'Aman',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Suite Le Mélézin bedroom opening onto adjoining rooms through timber-framed doors.',
      zh: 'Suite Le Mélézin 套房卧室，木框门洞连接着相邻的房间。',
      fr: 'La chambre de la Suite Le Mélézin, ouvrant sur les pièces attenantes par des portes à cadre bois.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-suite-vanoise',
    src: '/images/accommodation-aman-le-melezin-suite-vanoise.jpg',
    sourceUrl: 'https://www.aman.com/resorts/aman-le-melezin/accommodation/chambres-suites',
    sourceName: 'Aman Le Mélézin',
    author: 'Aman',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Suite La Vanoise principal bedroom, with wood interiors and mountain views through glass doors.',
      zh: 'Suite La Vanoise 套房主卧，木质室内装饰，玻璃门外是雪山景观。',
      fr: 'La chambre principale de la Suite La Vanoise, décor en bois et vue sur les montagnes à travers des portes vitrées.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-chambre-ski-piste',
    src: '/images/accommodation-aman-le-melezin-chambre-ski-piste.jpg',
    sourceUrl: 'https://www.aman.com/resorts/aman-le-melezin/accommodation/chambres-suites',
    sourceName: 'Aman Le Mélézin',
    author: 'Aman',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Chambre/Suite Ski Piste bedroom with a four-poster bed overlooking the Bellecôte piste.',
      zh: 'Chambre/Suite Ski Piste 房型的四柱床卧室，正对 Bellecôte 雪道。',
      fr: 'Une chambre Ski Piste avec lit à baldaquin donnant sur la piste de Bellecôte.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-chambre-village',
    src: '/images/accommodation-aman-le-melezin-chambre-village.jpg',
    sourceUrl: 'https://www.aman.com/resorts/aman-le-melezin/accommodation/chambres-suites',
    sourceName: 'Aman Le Mélézin',
    author: 'Aman',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Chambre Village seating nook overlooking the snowy Alpine landscape.',
      zh: 'Chambre Village 房型的休憩角，窗外是雪山景观。',
      fr: 'Un coin salon de la Chambre Village avec vue sur le paysage alpin enneigé.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-chambre-nord',
    src: '/images/accommodation-aman-le-melezin-chambre-nord.jpg',
    sourceUrl: 'https://www.aman.com/resorts/aman-le-melezin/accommodation/chambres-suites',
    sourceName: 'Aman Le Mélézin',
    author: 'Aman',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Chambre Nord bedroom with wood panelling and large windows over the snowy landscape.',
      zh: 'Chambre Nord 房型卧室，木饰墙面，大窗外是雪景。',
      fr: 'Une chambre Nord aux boiseries et grandes fenêtres donnant sur le paysage enneigé.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-spa-pool',
    src: '/images/accommodation-aman-le-melezin-spa-pool.jpg',
    sourceUrl: 'https://www.aman.com/resorts/aman-le-melezin/wellness',
    sourceName: 'Aman Le Mélézin',
    author: 'Aman',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The 14-metre indoor pool at Aman Le Mélézin’s spa, framed by stone columns and lounge chairs.',
      zh: 'Aman Le Mélézin 水疗中心的 14 米室内泳池，石柱环绕，两侧是休息躺椅。',
      fr: 'La piscine intérieure de 14 mètres du spa d’Aman Le Mélézin, encadrée de colonnes en pierre et de chaises longues.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-aman-le-melezin-akari-restaurant',
    src: '/images/accommodation-aman-le-melezin-akari-restaurant.jpg',
    sourceUrl: 'https://www.aman.com/resorts/aman-le-melezin/dining/nama',
    sourceName: 'Aman Le Mélézin',
    author: 'Aman',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Akari dining room, with terracotta walls, wood cabinetry and a set table.',
      zh: 'Akari 餐厅内景，赤陶墙面配木质陈设，已经摆好的餐桌。',
      fr: 'La salle du restaurant Akari, murs terracotta, boiseries et table dressée.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-interior',
    src: '/images/accommodation-le-k2-palace-interior.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/stay/rooms.html',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A redesigned room at Le K2 Palace, with dark wood panelling and warm lighting.',
      zh: 'Le K2 Palace 翻新后的客房，深色木饰面墙与暖调灯光。',
      fr: 'Une chambre rénovée du Le K2 Palace, boiseries sombres et éclairage chaleureux.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-altiplano',
    src: '/images/accommodation-le-k2-palace-altiplano.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/taste/altiplano.html',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A table set at L’Altiplano, Le K2 Palace’s two-Michelin-starred Peruvian restaurant, with the night piste visible through the window.',
      zh: 'Le K2 Palace 米其林二星餐厅 L’Altiplano 的餐桌布置，窗外是夜色中的雪道。',
      fr: 'Une table dressée à L’Altiplano, le restaurant péruvien deux étoiles du Le K2 Palace, avec la piste de nuit en toile de fond.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-suite-chalet-k8',
    src: '/images/accommodation-le-k2-palace-suite-chalet-k8.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/stay/suites-chalets.html',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The living and dining area of Suite-Chalet K8 at Le K2 Palace, with mountain views through floor-to-ceiling windows.',
      zh: 'Le K2 Palace 复式套房木屋 K8 的客厅与餐厅区域，落地窗外是山景。',
      fr: 'Le salon et la salle à manger de la Suite-Chalet K8 du Le K2 Palace, avec vue sur la montagne depuis les baies vitrées.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-chalet-abruzzes',
    src: '/images/accommodation-le-k2-palace-chalet-abruzzes.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/stay/chalets.html',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The vaulted-ceiling living room of Chalet Abruzzes, the largest of Le K2 Palace’s standalone chalets.',
      zh: 'Le K2 Palace 独栋木屋中面积最大的 Abruzzes 木屋，挑高木梁客厅。',
      fr: 'Le salon aux poutres apparentes du Chalet Abruzzes, le plus grand des chalets indépendants du Le K2 Palace.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-altiplano-dish',
    src: '/images/accommodation-le-k2-palace-altiplano-dish.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/taste/altiplano.html',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A ceviche-style seafood appetizer plated at L’Altiplano, Le K2 Palace’s two-Michelin-starred Peruvian restaurant.',
      zh: 'Le K2 Palace 米其林二星餐厅 L’Altiplano 的一道生腌风格海鲜前菜，摆盘精致。',
      fr: 'Une entrée de fruits de mer façon ceviche, dressée à L’Altiplano, le restaurant péruvien deux étoiles du Le K2 Palace.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-aerial',
    src: '/images/accommodation-le-k2-palace-aerial.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A daytime aerial view of Le K2 Palace’s chalets spread across the hillside among the pines.',
      zh: 'Le K2 Palace 沿山坡分布的木屋群日间航拍，散落在松林之间。',
      fr: 'Une vue aérienne de jour des chalets du Le K2 Palace éparpillés à flanc de colline parmi les pins.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-spa',
    src: '/images/accommodation-le-k2-palace-spa.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/stay/hotel-and-services.html',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A treatment room at the Goji Spa, Le K2 Palace’s 500-square-metre spa.',
      zh: 'Le K2 Palace 500 平方米 Goji Spa 水疗中心的理疗室。',
      fr: 'Une cabine de soins du Goji Spa, le spa de 500 m² du Le K2 Palace.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-palace-exterior',
    src: '/images/accommodation-le-k2-palace-exterior.jpg',
    sourceUrl: 'https://www.lek2palace.com/en/',
    sourceName: 'Le K2 Palace',
    author: 'Le K2 Palace',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'An aerial view of Le K2 Palace’s chalets spread across the hillside among the pines.',
      zh: 'Le K2 Palace 沿山坡分布的木屋群航拍，散落在松林之间。',
      fr: 'Vue aérienne des chalets du Le K2 Palace éparpillés à flanc de colline parmi les pins.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-k2-altitude-exterior',
    src: '/images/accommodation-le-k2-altitude-exterior.jpg',
    sourceUrl: 'https://www.lek2altitude.com/en/',
    sourceName: 'Le K2 Altitude',
    author: 'Le K2 Altitude',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The timber-and-stone facade of Le K2 Altitude, its circular sign mounted above the entrance.',
      zh: 'Le K2 Altitude 木石结构的外观，圆形招牌挂在入口上方。',
      fr: 'La façade en bois et pierre du Le K2 Altitude, avec son enseigne circulaire au-dessus de l’entrée.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-le-strato-exterior',
    src: '/images/accommodation-le-strato-exterior.jpg',
    sourceUrl: 'https://www.hotelstrato.com/en',
    sourceName: 'Hôtel Le Strato',
    author: 'Hôtel Le Strato',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Hôtel Le Strato beside a piste, its sign visible on the snow-covered chalet facade.',
      zh: 'Hôtel Le Strato 紧邻雪道而建，积雪覆盖的木屋外墙上可见招牌。',
      fr: 'L’Hôtel Le Strato au bord d’une piste, son enseigne visible sur la façade enneigée du chalet.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-lapogee-courchevel-suite',
    src: '/images/accommodation-lapogee-courchevel-suite.jpg',
    sourceUrl: 'https://www.oetkerhotels.com/hotels/lapogee-courchevel/',
    sourceName: 'L’Apogée Courchevel (Oetker Collection)',
    author: 'Oetker Collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A suite at L’Apogée Courchevel, with a checkerboard floor and jewel-toned furnishings.',
      zh: 'L’Apogée Courchevel 的一间套房，棋盘格地板搭配宝石色调的家具。',
      fr: 'Une suite de L’Apogée Courchevel, avec un sol à damier et un mobilier aux tons pierres précieuses.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-les-airelles-facade',
    src: '/images/accommodation-les-airelles-facade.jpg',
    sourceUrl: 'https://airelles.com/en/destination/courchevel-hotel',
    sourceName: 'Les Airelles',
    author: 'Les Airelles',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The hand-painted, castle-inspired facade of Les Airelles, skis resting in the snow outside.',
      zh: 'Les Airelles 手绘城堡风格的外墙，门外雪地上摆着几副雪板。',
      fr: 'La façade peinte à la main, d’inspiration château, des Airelles, avec des skis posés dans la neige.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-cheval-blanc-courchevel-exterior',
    src: '/images/accommodation-cheval-blanc-courchevel-exterior.jpg',
    sourceUrl: 'https://www.chevalblanc.com/en/maison/courchevel/',
    sourceName: 'Cheval Blanc Courchevel',
    author: 'Cheval Blanc',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'An aerial view of Cheval Blanc Courchevel’s yellow-and-timber chalet among snow-laden pines.',
      zh: 'Cheval Blanc Courchevel 黄色木屋航拍，四周是积雪的松林。',
      fr: 'Vue aérienne du chalet jaune et bois de Cheval Blanc Courchevel, entouré de pins chargés de neige.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-rosewood-courchevel-interior',
    src: '/images/accommodation-rosewood-courchevel-interior.jpg',
    sourceUrl: 'https://www.rosewoodhotels.com',
    sourceName: 'Rosewood Courchevel Le Jardin Alpin',
    author: 'Rosewood Hotels & Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A bedroom at Rosewood Courchevel Le Jardin Alpin, its stone headboard wall lit by a bedside lamp.',
      zh: 'Rosewood Courchevel Le Jardin Alpin 的一间卧室，床头石墙在台灯下泛着暖光。',
      fr: 'Une chambre du Rosewood Courchevel Le Jardin Alpin, son mur de pierre en tête de lit éclairé par une lampe de chevet.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-six-senses-courchevel-exterior',
    src: '/images/accommodation-six-senses-courchevel-exterior.jpg',
    sourceUrl: 'https://www.sixsenses.com',
    sourceName: 'Six Senses Residences Courchevel',
    author: 'Six Senses',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The stone-and-timber facade of Six Senses Residences Courchevel under a clear blue sky.',
      zh: 'Six Senses Residences Courchevel 石木结构的外观，晴朗的蓝天为背景。',
      fr: 'La façade en pierre et bois du Six Senses Residences Courchevel sous un ciel bleu dégagé.',
    },
    notes:
      'Needs a confirmed usage license before this goes past internal review — see docs/image-asset-register.md.',
  },
  {
    id: 'accommodation-hotel-negresco-nice',
    src: '/images/accommodation-hotel-negresco-nice.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hotel_Negresco_fa%C3%A7ade.JPG',
    sourceName: 'Wikimedia Commons',
    author: 'Hélène Grenier',
    license: 'CC BY-SA 3.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: "The Hôtel Negresco's pink dome on the Promenade des Anglais, a National Historic Monument since 2003.",
      zh: '尼斯英国人漫步大道上Negresco酒店的粉色穹顶，2003年起被列为法国历史古迹。',
      fr: "Le dôme rose de l'Hôtel Negresco sur la Promenade des Anglais, Monument Historique depuis 2003.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-hotel-negresco-nice-dali-augier',
    src: '/images/accommodation-hotel-negresco-nice-dali-augier.jpg',
    sourceUrl: 'https://www.lenegresco.com/en/jeanne-augier-collection',
    sourceName: 'Le Negresco official site — Jeanne Augier Collection archive',
    author: 'Le Negresco / Jeanne & Paul Augier private collection',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A 1967 archive photograph of Salvador Dalí visiting Jeanne Augier at the Negresco.',
      zh: '1967年的档案照片，萨尔瓦多·达利到访Jeanne Augier位于Negresco的居所。',
      fr: "Une photographie d'archive de 1967 montrant Salvador Dalí en visite chez Jeanne Augier au Negresco.",
    },
    notes:
      'Documents the hotel’s real celebrity history under owner Jeanne Augier (1957–2019) — not a staged or generic image.',
  },
  {
    id: 'accommodation-hotel-negresco-nice-miles-davis',
    src: '/images/accommodation-hotel-negresco-nice-miles-davis.jpg',
    sourceUrl: 'https://www.lenegresco.com/en/jeanne-augier-collection',
    sourceName: 'Le Negresco official site',
    author: 'Le Negresco',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Niki de Saint Phalle's mosaic sculpture Miles Davis stands outside the hotel, facing the sea.",
      zh: 'Niki de Saint Phalle创作的马赛克雕塑《Miles Davis》矗立在酒店门前，面朝大海。',
      fr: "La sculpture en mosaïque Miles Davis de Niki de Saint Phalle se dresse devant l'hôtel, face à la mer.",
    },
    notes:
      'Distinct from the coverImage angle — no duplicate. Also shows the Le Chantecler entrance signage.',
  },
  {
    id: 'accommodation-hotel-negresco-nice-versailles',
    src: '/images/accommodation-hotel-negresco-nice-versailles.jpg',
    sourceUrl: 'https://www.lenegresco.com/en/jeanne-augier-collection',
    sourceName: 'Le Negresco official site',
    author: 'Le Negresco',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Hyacinthe Rigaud's official portrait of Louis XIV in coronation robes, one of only three in existence, on display in the bar Le Versailles.",
      zh: 'Le Versailles酒吧内展出的路易十四加冕礼服官方肖像画，出自Hyacinthe Rigaud之手，全球仅存三幅之一。',
      fr: "Le portrait officiel de Louis XIV en habit de sacre par Hyacinthe Rigaud, l'un des trois seuls existants, exposé au bar Le Versailles.",
    },
    notes:
      'From the Jeanne Augier art collection; one of only three known versions of this portrait.',
  },
  {
    id: 'accommodation-hotel-negresco-nice-suite-415',
    src: '/images/accommodation-hotel-negresco-nice-suite-415.jpg',
    sourceUrl: 'https://www.lenegresco.com/en/jeanne-augier-collection',
    sourceName: 'Le Negresco official site',
    author: 'Le Negresco',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Imperial Junior Suite (No. 415), with its Empire-style swan’s-neck bed — reportedly Jeanne Augier’s favourite room in the hotel.',
      zh: '帝国风格茱莉亚套房（415号房），天鹅颈造型的帝政风格床榻——据称是Jeanne Augier本人在酒店里最喜爱的房间。',
      fr: 'La Junior Suite Impériale (n°415) et son lit à col de cygne de style Empire — la chambre favorite de Jeanne Augier, dit-on.',
    },
    notes: 'A documented, named signature room with real provenance, not a generic suite photo.',
  },
  {
    id: 'accommodation-hotel-negresco-nice-chantecler',
    src: '/images/accommodation-hotel-negresco-nice-chantecler.jpg',
    sourceUrl: 'https://www.lenegresco.com/en/restaurants/le-chantecler',
    sourceName: 'Le Negresco official site',
    author: 'Le Negresco',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A white-gloved server presents the menu at Le Chantecler, embossed in Braille.',
      zh: '身着白手套的服务生在Le Chantecler餐厅呈上菜单，封面压印着盲文。',
      fr: 'Un serveur ganté de blanc présente la carte du Chantecler, gaufrée en braille.',
    },
    notes: 'Michelin-starred restaurant (1 star, 2026 guide), chef Virginie Basselot.',
  },
  {
    id: 'accommodation-intercontinental-marseille-facade',
    src: '/images/accommodation-intercontinental-marseille-facade.jpg',
    sourceUrl: 'https://marseille.intercontinental.com/en/',
    sourceName: 'InterContinental Marseille – Hotel Dieu official site',
    author: 'Eric Cuvillier / InterContinental Marseille',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The former Hôtel-Dieu's horseshoe-shaped 18th-century facade, lit at dusk.",
      zh: '黄昏灯光下，原Hôtel-Dieu医院马蹄形的18世纪立面。',
      fr: "La façade en fer à cheval du XVIIIe siècle de l'ancien Hôtel-Dieu, éclairée au crépuscule.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-intercontinental-marseille-terrace',
    src: '/images/accommodation-intercontinental-marseille-terrace.jpg',
    sourceUrl: 'https://marseille.intercontinental.com/en/',
    sourceName: 'InterContinental Marseille – Hotel Dieu official site',
    author: 'InterContinental Marseille',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A private room terrace with a view across the rooftops to Notre-Dame de la Garde.',
      zh: '客房私人露台，越过屋顶可见守护圣母教堂。',
      fr: "Une terrasse privative avec vue sur les toits jusqu'à Notre-Dame de la Garde.",
    },
    notes: 'One of 33 rooms with a private terrace.',
  },
  {
    id: 'accommodation-intercontinental-marseille-fenetres',
    src: '/images/accommodation-intercontinental-marseille-fenetres.jpg',
    sourceUrl: 'https://marseille.intercontinental.com/en/les-fenetres/',
    sourceName: 'InterContinental Marseille – Hotel Dieu official site',
    author: 'Eric Cuvillier / InterContinental Marseille',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Les Fenêtres brasserie's terrace, set for dining with Notre-Dame de la Garde on the skyline.",
      zh: 'Les Fenêtres餐厅露台已备好餐桌，守护圣母教堂点缀天际线。',
      fr: "La terrasse de la brasserie Les Fenêtres, dressée pour le service, avec Notre-Dame de la Garde à l'horizon.",
    },
    notes: "The hotel's Provençal-inspired brasserie.",
  },
  {
    id: 'accommodation-intercontinental-marseille-capian',
    src: '/images/accommodation-intercontinental-marseille-capian.jpg',
    sourceUrl: 'https://marseille.intercontinental.com/en/the-bar/',
    sourceName: 'InterContinental Marseille – Hotel Dieu official site',
    author: 'Yann Audic / InterContinental Marseille',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Capian bar, named after the local word for the painted prow of a Mediterranean fishing boat.',
      zh: 'Capian酒吧，名字取自地中海渔船彩绘船首的当地方言称呼。',
      fr: 'Le bar Capian, du nom donné localement à la proue peinte des barques de pêche méditerranéennes.',
    },
    notes: 'Indoor bar; also has a terrace facing Notre-Dame de la Garde.',
  },
  {
    id: 'accommodation-intercontinental-marseille-presidential-suite',
    src: '/images/accommodation-intercontinental-marseille-presidential-suite.jpg',
    sourceUrl: 'https://marseille.intercontinental.com/en/the-suites/',
    sourceName: 'InterContinental Marseille – Hotel Dieu official site',
    author: 'Gilles Perbal / InterContinental Marseille',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Presidential Suite, decorated with hints of lavender as a nod to Provence.',
      zh: '总统套房，以薰衣草紫色点缀，呼应普罗旺斯风情。',
      fr: "La Suite Présidentielle, ornée de touches de lavande en clin d'œil à la Provence.",
    },
    notes: "The hotel's top suite, designed by Jean-Philippe Nuel.",
  },
  {
    id: 'accommodation-le-majestic-cannes-facade',
    src: '/images/accommodation-le-majestic-cannes-facade.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/cannes/le-majestic.html',
    sourceName: 'Hôtel Barrière Le Majestic Cannes official site',
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Le Majestic's curved Art Deco facade on La Croisette, seen from above.",
      zh: '从高处俯瞰Le Majestic位于La Croisette大道上的弧形装饰艺术立面。',
      fr: 'La façade Art déco incurvée du Majestic sur la Croisette, vue du dessus.',
    },
    notes:
      'Built 1926, architect Théo Petit — a genuine, identifiable exterior, not a generic stand-in.',
  },
  {
    id: 'accommodation-le-majestic-cannes-michele-morgan-suite',
    src: '/images/accommodation-le-majestic-cannes-michele-morgan-suite.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/cannes/le-majestic.html',
    sourceName: 'Hôtel Barrière Le Majestic Cannes official site',
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The living room of the Michèle Morgan Suite, named for the French actress, with a sea view balcony.',
      zh: 'Michèle Morgan套房客厅，以法国女演员命名，带海景阳台。',
      fr: "Le salon de la Suite Michèle Morgan, du nom de l'actrice française, avec balcon donnant sur la mer.",
    },
    notes: 'Signature suite named for the celebrated French actress.',
  },
  {
    id: 'accommodation-le-majestic-cannes-dior-suite',
    src: '/images/accommodation-le-majestic-cannes-dior-suite.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/cannes/le-majestic.html',
    sourceName: 'Hôtel Barrière Le Majestic Cannes official site',
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The Christian Dior Suite's dark-panelled salon, unique in Europe, styled after the Parisian fashion house.",
      zh: 'Christian Dior套房的深色护墙板客厅，全欧洲独一无二，装饰风格致敬这家巴黎时装屋。',
      fr: "Le salon aux boiseries sombres de la Suite Christian Dior, unique en Europe, dans l'esprit de la maison parisienne.",
    },
    notes: 'The only suite of its kind in Europe dedicated to the Dior house.',
  },
  {
    id: 'accommodation-le-majestic-cannes-beach',
    src: '/images/accommodation-le-majestic-cannes-beach.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/cannes/le-majestic.html',
    sourceName: 'Hôtel Barrière Le Majestic Cannes official site',
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "An aerial view of Le Majestic's private beach pontoon, striped loungers over turquoise water.",
      zh: '鸟瞰Le Majestic私人海滩栈桥，条纹躺椅下是碧绿海水。',
      fr: 'Vue aérienne du ponton de la plage privée du Majestic, transats rayés sur une mer turquoise.',
    },
    notes: "The hotel's own private beach, a short walk from the main building.",
  },
  {
    id: 'accommodation-le-majestic-cannes-ciros',
    src: '/images/accommodation-le-majestic-cannes-ciros.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/cannes/le-majestic.html',
    sourceName: 'Hôtel Barrière Le Majestic Cannes official site',
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "A table set at Ciro's Cannes, the hotel's seafood restaurant on the private beach.",
      zh: 'Ciro’s Cannes餐厅已备好的餐桌，这是酒店设在私人海滩上的海鲜餐厅。',
      fr: "Une table dressée chez Ciro's Cannes, le restaurant de fruits de mer de l'hôtel sur la plage privée.",
    },
    notes: "Riviera seafood restaurant on the hotel's private beach.",
  },
  {
    id: 'accommodation-le-majestic-cannes-spa',
    src: '/images/accommodation-le-majestic-cannes-spa.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/cannes/le-majestic.html',
    sourceName: 'Hôtel Barrière Le Majestic Cannes official site',
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Diane Barrière Spa, partnered with Biologique Recherche, with a sea-facing treatment lounge.',
      zh: 'Diane Barrière水疗中心，与法国护肤品牌Biologique Recherche合作，面海的休息区。',
      fr: 'Le Spa Diane Barrière, en partenariat avec Biologique Recherche, avec son salon de repos face à la mer.',
    },
    notes: 'The spa named for Diane Barrière-Desseigne.',
  },
  {
    id: 'accommodation-le-majestic-cannes-majestic-suite',
    src: '/images/accommodation-le-majestic-cannes-majestic-suite.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/cannes/le-majestic.html',
    sourceName: 'Hôtel Barrière Le Majestic Cannes official site',
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The Majestic Suite's private rooftop terrace and heated infinity pool at dusk.",
      zh: 'Majestic套房的私人屋顶露台与恒温无边泳池，黄昏时分。',
      fr: 'La terrasse privée en toiture de la Suite Majestic et sa piscine à débordement chauffée, au crépuscule.',
    },
    notes:
      "The hotel's top suite, 1,615 sqft terrace with its own heated pool, yacht-club styling.",
  },
  {
    id: 'accommodation-anantara-plaza-nice-facade',
    src: '/images/accommodation-anantara-plaza-nice-facade.jpg',
    sourceUrl: 'https://www.anantara.com/en/plaza-nice',
    sourceName: 'Anantara Plaza Nice Hotel official site',
    author: 'Anantara Hotels & Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The hotel's 1848 Belle Époque facade on Avenue de Verdun, with its rooftop terrace structure.",
      zh: '酒店位于Avenue de Verdun的1848年美好年代立面，顶部可见屋顶露台结构。',
      fr: "La façade Belle Époque de 1848 de l'hôtel sur l'avenue de Verdun, avec sa structure de terrasse en toiture.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-anantara-plaza-nice-rooftop',
    src: '/images/accommodation-anantara-plaza-nice-rooftop.jpg',
    sourceUrl: 'https://www.anantara.com/en/plaza-nice/restaurants/seen-by-olivier',
    sourceName: 'Anantara Plaza Nice Hotel official site',
    author: 'Anantara Hotels & Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "SEEN by Olivier's rooftop terrace, set for cocktails with a sea view.",
      zh: 'SEEN by Olivier屋顶露台，已备好鸡尾酒座位，坐拥海景。',
      fr: "La terrasse en toiture de SEEN by Olivier, dressée pour l'apéritif avec vue sur la mer.",
    },
    notes: "The hotel's rooftop restaurant and bar, led by chef Olivier da Costa.",
  },
  {
    id: 'accommodation-anantara-plaza-nice-spa',
    src: '/images/accommodation-anantara-plaza-nice-spa.jpg',
    sourceUrl: 'https://www.anantara.com/en/plaza-nice/spa',
    sourceName: 'Anantara Plaza Nice Hotel official site',
    author: 'Anantara Hotels & Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A treatment room at Anantara Spa, with a carved timber canopy over the treatment table.',
      zh: 'Anantara Spa理疗室，雕刻木质吊顶覆于理疗床上方。',
      fr: "Une cabine de soin de l'Anantara Spa, avec sa verrière en bois sculpté au-dessus de la table de massage.",
    },
    notes: 'Uses THALION marine cosmetics and CHO Nature oils from Grasse.',
  },
  {
    id: 'accommodation-anantara-plaza-nice-deluxe-room',
    src: '/images/accommodation-anantara-plaza-nice-deluxe-room.jpg',
    sourceUrl: 'https://www.anantara.com/en/plaza-nice/rooms',
    sourceName: 'Anantara Plaza Nice Hotel official site',
    author: 'Anantara Hotels & Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Deluxe Room, contemporary in style with a work desk and framed art.',
      zh: 'Deluxe Room客房，现代风格，配有办公桌与装饰画框。',
      fr: 'Une chambre Deluxe, de style contemporain, avec bureau et œuvre encadrée.',
    },
    notes: "Standard room category, part of the hotel's contemporary renovation.",
  },
  {
    id: 'accommodation-anantara-plaza-nice-albert-suite',
    src: '/images/accommodation-anantara-plaza-nice-albert-suite.jpg',
    sourceUrl: 'https://www.anantara.com/en/plaza-nice/suites/presidential-suite',
    sourceName: 'Anantara Plaza Nice Hotel official site',
    author: 'Anantara Hotels & Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The Albert Ist Suite's living and dining room, with Belle Époque-style furniture and a sea-view balcony.",
      zh: 'Albert Ist Suite套房的客厅与餐厅，美好年代风格家具，阳台可见海景。',
      fr: 'Le salon et la salle à manger de la Suite Albert Ier, avec mobilier de style Belle Époque et balcon vue mer.',
    },
    notes: "The hotel's top-floor signature suite, named for Albert I, King of the Belgians.",
  },
  {
    id: 'accommodation-la-reserve-ramatuelle-pool',
    src: '/images/accommodation-la-reserve-ramatuelle-pool.jpg',
    sourceUrl: 'https://www.lareserve-ramatuelle.com/en/',
    sourceName: 'La Réserve Ramatuelle official site',
    author: 'La Réserve Ramatuelle',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Sun loungers beside the pool, facing the open Mediterranean.',
      zh: '泳池边的躺椅，正对开阔的地中海。',
      fr: 'Des chaises longues au bord de la piscine, face à la Méditerranée.',
    },
    notes:
      'A private domain in the garrigue rather than an urban palace — the pool-and-sea view captures its character better than a building facade.',
  },
  {
    id: 'accommodation-la-reserve-ramatuelle-villa',
    src: '/images/accommodation-la-reserve-ramatuelle-villa.jpg',
    sourceUrl: 'https://www.lareserve-ramatuelle.com/en/',
    sourceName: 'La Réserve Ramatuelle official site',
    author: 'La Réserve Ramatuelle',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'One of the 14 standalone villas, with its own private pool and terrace.',
      zh: '14栋独栋别墅之一，自带私人泳池与露台。',
      fr: "L'une des 14 villas indépendantes, avec sa propre piscine privée et sa terrasse.",
    },
    notes: 'Private villa with pool, distinct from the hotel rooms and suites.',
  },
  {
    id: 'accommodation-la-reserve-ramatuelle-voile',
    src: '/images/accommodation-la-reserve-ramatuelle-voile.jpg',
    sourceUrl:
      'https://www.lareserve-ramatuelle.com/en/restaurant/gastronomic-restaurant-la-voile/',
    sourceName: 'La Réserve Ramatuelle official site',
    author: 'La Réserve Ramatuelle',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "La Voile's dining room, floor-to-ceiling glass framing the coastline below.",
      zh: 'La Voile餐厅用餐区，落地玻璃窗framing脚下的海岸线。',
      fr: 'La salle de La Voile, ses baies vitrées encadrant le littoral en contrebas.',
    },
    notes: 'Two-Michelin-star restaurant, chef Eric Canino, seasonal (May–October).',
  },
  {
    id: 'accommodation-la-reserve-ramatuelle-plage',
    src: '/images/accommodation-la-reserve-ramatuelle-plage.jpg',
    sourceUrl: 'https://www.lareserve-ramatuelle.com/en/',
    sourceName: 'La Réserve Ramatuelle official site',
    author: 'R. Brun / La Réserve Ramatuelle',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A table set at La Réserve à la Plage, the beach club on Pampelonne designed with Philippe Starck.',
      zh: 'La Réserve à la Plage海滩俱乐部内已备好的餐桌，位于Pampelonne海滩，由Philippe Starck参与设计。',
      fr: 'Une table dressée à La Réserve à la Plage, le club de plage de Pampelonne conçu avec Philippe Starck.',
    },
    notes:
      'Designed with Philippe Starck for owner Michel Reybier — a named-designer connection worth featuring.',
  },
  {
    id: 'accommodation-la-reserve-ramatuelle-spa',
    src: '/images/accommodation-la-reserve-ramatuelle-spa.jpg',
    sourceUrl: 'https://www.lareserve-ramatuelle.com/en/',
    sourceName: 'La Réserve Ramatuelle official site',
    author: 'La Réserve Ramatuelle',
    license:
      'Unconfirmed — sourced from the property’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The spa's indoor pool, minimalist in design with floor-to-ceiling glass.",
      zh: '水疗中心的室内泳池，极简设计风格，配落地玻璃窗。',
      fr: 'La piscine intérieure du spa, au design épuré et baies vitrées.',
    },
    notes: 'The Nescens Wellness Experience spa, spanning an entire floor.',
  },
  {
    id: 'accommodation-hotel-barriere-les-neiges-courchevel-exterior',
    src: '/images/accommodation-hotel-barriere-les-neiges-courchevel-exterior.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/collection-fouquet-s/courchevel',
    sourceName: "Fouquet's Courchevel (Hôtels Barrière) official site",
    author: 'November Studio / Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Bellecôte ski run below the hotel, with the Three Valleys peaks beyond.',
      zh: '酒店下方的Bellecôte雪道，远处是三峡谷（Three Valleys）群峰。',
      fr: "La piste de la Bellecôte au pied de l'hôtel, avec les sommets des Trois Vallées en arrière-plan.",
    },
    notes: 'Ski-in/ski-out at the foot of the Bellecôte slope.',
  },
  {
    id: 'accommodation-hotel-barriere-les-neiges-courchevel-appartement',
    src: '/images/accommodation-hotel-barriere-les-neiges-courchevel-appartement.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/collection-fouquet-s/courchevel/rooms-and-suites',
    sourceName: "Fouquet's Courchevel (Hôtels Barrière) official site",
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "L'Appartement Les Neiges, with a three-sided fireplace opening onto its own terrace.",
      zh: "L'Appartement Les Neiges套房，三面见火的壁炉连通私人露台。",
      fr: "L'Appartement Les Neiges, avec sa cheminée à trois faces ouvrant sur sa propre terrasse.",
    },
    notes:
      "The hotel's top private apartment, retaining the Les Neiges name after the property rebrand.",
  },
  {
    id: 'accommodation-hotel-barriere-les-neiges-courchevel-loulou',
    src: '/images/accommodation-hotel-barriere-les-neiges-courchevel-loulou.jpg',
    sourceUrl:
      'https://www.hotelsbarriere.com/en/collection-fouquet-s/courchevel/restaurants-and-bars',
    sourceName: "Fouquet's Courchevel (Hôtels Barrière) official site",
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Loulou's candlelit dining room, in reclaimed Savoyard chalet wood.",
      zh: 'Loulou餐厅烛光摇曳的用餐区，选用萨瓦地区回收老木料装饰。',
      fr: 'La salle aux chandelles de Loulou, habillée de bois de chalet savoyard de récupération.',
    },
    notes: "The hotel's Italian mountain trattoria.",
  },
  {
    id: 'accommodation-hotel-barriere-les-neiges-courchevel-pool',
    src: '/images/accommodation-hotel-barriere-les-neiges-courchevel-pool.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/collection-fouquet-s/courchevel/experiences/spa',
    sourceName: "Fouquet's Courchevel (Hôtels Barrière) official site",
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The Spa Diane Barrière's 20-metre pool, the largest among Courchevel's five-star hotels.",
      zh: 'Spa Diane Barrière的20米泳池，是库尔雪维尔五星级酒店中最长的一座。',
      fr: 'La piscine de 20 mètres du Spa Diane Barrière, la plus longue parmi les hôtels 5 étoiles de Courchevel.',
    },
    notes: '1,000 sqm spa, six treatment cabins, hammam, sauna, outdoor jacuzzi.',
  },
  {
    id: 'accommodation-hotel-barriere-les-neiges-courchevel-suite',
    src: '/images/accommodation-hotel-barriere-les-neiges-courchevel-suite.jpg',
    sourceUrl: 'https://www.hotelsbarriere.com/en/collection-fouquet-s/courchevel/rooms-and-suites',
    sourceName: "Fouquet's Courchevel (Hôtels Barrière) official site",
    author: 'Hôtels Barrière',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The Prestige Suite living room, with an open fire and mountain-chalet furnishings.',
      zh: 'Prestige Suite套房客厅，明火壁炉搭配山间木屋风格家具。',
      fr: 'Le salon de la Suite Prestige, avec son feu ouvert et son mobilier esprit chalet de montagne.',
    },
    notes: '1,249 sqft south-facing suite with personal butler service.',
  },
  {
    id: 'accommodation-como-le-montrachet-lobby',
    src: '/images/accommodation-como-le-montrachet-lobby.jpg',
    sourceUrl: 'https://www.comohotels.com/france/como-le-montrachet/about',
    sourceName: 'COMO Le Montrachet official site',
    author: 'COMO Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The reception hall, with sage-green woodwork and antique Burgundian pottery on display.',
      zh: '前台大堂，鼠尾草绿色木饰墙面，陈列着勃艮第古董陶器。',
      fr: 'Le hall de réception, boiseries vert sauge et poteries anciennes de Bourgogne en vitrine.',
    },
    notes:
      'A genuine, identifiable interior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-como-le-montrachet-vineyard',
    src: '/images/accommodation-como-le-montrachet-vineyard.jpg',
    sourceUrl: 'https://www.comohotels.com/france/como-le-montrachet/about',
    sourceName: 'COMO Le Montrachet official site',
    author: 'COMO Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The vineyards of the Côte-d'Or, seen from Puligny-Montrachet.",
      zh: '从Puligny-Montrachet望出去的金丘（Côte-d’Or）葡萄园景色。',
      fr: "Les vignes de la Côte-d'Or, vues depuis Puligny-Montrachet.",
    },
    notes: 'One of the world’s most renowned wine villages.',
  },
  {
    id: 'accommodation-como-le-montrachet-cellar',
    src: '/images/accommodation-como-le-montrachet-cellar.jpg',
    sourceUrl: 'https://www.comohotels.com/france/como-le-montrachet/experiences',
    sourceName: 'COMO Le Montrachet official site',
    author: 'COMO Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Oak barrels ageing in a stone Burgundian wine cellar.',
      zh: '橡木酒桶在勃艮第石砌酒窖中陈酿。',
      fr: 'Des fûts de chêne vieillissant dans une cave à vin bourguignonne en pierre.',
    },
    notes: 'Illustrates the wine-tour experiences arranged from the hotel.',
  },
  {
    id: 'accommodation-como-le-montrachet-manoir-room',
    src: '/images/accommodation-como-le-montrachet-manoir-room.jpg',
    sourceUrl: 'https://www.comohotels.com/france/como-le-montrachet/accommodation',
    sourceName: 'COMO Le Montrachet official site',
    author: 'COMO Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Manoir room under the eaves, with original oak beams and toile de Jouy upholstery.',
      zh: 'Manoir客房，屋顶下保留原始橡木梁，配Toile de Jouy印花软装。',
      fr: "Une chambre Manoir sous les combles, avec poutres de chêne d'origine et tissus toile de Jouy.",
    },
    notes: 'Standard room category across the property’s three buildings.',
  },
  {
    id: 'accommodation-como-le-montrachet-suite',
    src: '/images/accommodation-como-le-montrachet-suite.jpg',
    sourceUrl:
      'https://www.comohotels.com/burgundy/como-le-montrachet/accommodation/montrachet-suite',
    sourceName: 'COMO Le Montrachet official site',
    author: 'COMO Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The Montrachet Suite's ensuite bathroom, a clawfoot tub set beneath exposed oak rafters.",
      zh: 'Montrachet Suite套房浴室，一座爪足浴缸置于外露橡木椽下。',
      fr: 'La salle de bains de la Suite Montrachet, une baignoire à pieds griffus sous les chevrons de chêne apparents.',
    },
    notes:
      'Signature suite in Villa Christine — two images per the Michelin/signature-content rule.',
  },
  {
    id: 'accommodation-como-le-montrachet-suite2',
    src: '/images/accommodation-como-le-montrachet-suite2.jpg',
    sourceUrl:
      'https://www.comohotels.com/burgundy/como-le-montrachet/accommodation/montrachet-suite',
    sourceName: 'COMO Le Montrachet official site',
    author: 'COMO Hotels and Resorts',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The Montrachet Suite's bedroom, papered in toile de Jouy beneath the original roof timbers.",
      zh: 'Montrachet Suite套房卧室，Toile de Jouy印花壁纸，头顶是原始屋顶木梁。',
      fr: "La chambre de la Suite Montrachet, tapissée de toile de Jouy sous la charpente d'origine.",
    },
    notes: "The hotel's top suite, located in Villa Christine.",
  },
  {
    id: 'accommodation-le-richebourg-exterior',
    src: '/images/accommodation-le-richebourg-exterior.jpg',
    sourceUrl: 'https://www.hotel-lerichebourg.com/en/',
    sourceName: 'Hôtel Le Richebourg official site',
    author: 'Hôtel Le Richebourg',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The hotel's contemporary garden wing, with the village rooftops of Vosne-Romanée behind.",
      zh: '酒店现代风格的花园侧翼，背景是沃恩-罗曼尼村的屋顶。',
      fr: "L'aile contemporaine de l'hôtel sur le jardin, avec les toits du village de Vosne-Romanée en arrière-plan.",
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
  {
    id: 'accommodation-le-richebourg-garden',
    src: '/images/accommodation-le-richebourg-garden.jpg',
    sourceUrl: 'https://www.hotel-lerichebourg.com/en/the-bar-the-restaurant/',
    sourceName: 'Hôtel Le Richebourg official site',
    author: 'Hôtel Le Richebourg',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The hotel's kitchen garden, with a geometric giraffe sculpture among the herb beds.",
      zh: '酒店的自家菜园，几何造型的长颈鹿雕塑立于香草苗床间。',
      fr: "Le potager de l'hôtel, avec sa sculpture géométrique de girafe parmi les carrés d'herbes aromatiques.",
    },
    notes: 'Supplies the restaurant, which opens onto this garden.',
  },
  {
    id: 'accommodation-le-richebourg-dish',
    src: '/images/accommodation-le-richebourg-dish.jpg',
    sourceUrl: 'https://www.hotel-lerichebourg.com/en/the-bar-the-restaurant/',
    sourceName: 'Hôtel Le Richebourg official site',
    author: 'Hôtel Le Richebourg',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A seasonal main course at Restaurant Le Richebourg, paired with a glass of red Burgundy.',
      zh: 'Le Richebourg餐厅的时令主菜，搭配一杯勃艮第红葡萄酒。',
      fr: "Un plat de saison du restaurant Le Richebourg, accompagné d'un verre de bourgogne rouge.",
    },
    notes: 'Restaurant serving Burgundian-influenced, seasonal cuisine.',
  },
  {
    id: 'accommodation-le-richebourg-spa',
    src: '/images/accommodation-le-richebourg-spa.jpg',
    sourceUrl: 'https://www.hotel-lerichebourg.com/en/the-vineaspa/',
    sourceName: 'Hôtel Le Richebourg official site',
    author: 'Jeremie Blancfené / Hôtel Le Richebourg',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The vineaSpa's relaxation lounge, with loungers beside the indoor pool.",
      zh: 'vineaSpa水疗中心的休息区，室内泳池旁摆放着躺椅。',
      fr: "L'espace détente du vineaSpa, avec ses transats au bord de la piscine intérieure.",
    },
    notes: 'Indoor pool, sauna, steam room, ice fountain and sensitive shower.',
  },
  {
    id: 'accommodation-le-richebourg-room101',
    src: '/images/accommodation-le-richebourg-room101.jpg',
    sourceUrl: 'https://www.hotel-lerichebourg.com/en/the-rooms/',
    sourceName: 'Hôtel Le Richebourg official site',
    author: 'Hôtel Le Richebourg',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Prestige Terrace Room, opening directly onto its own private terrace.',
      zh: 'Prestige Terrace Room客房，直通私人露台。',
      fr: 'Une chambre Prestige Terrasse, ouvrant directement sur sa propre terrasse privée.',
    },
    notes: 'One of the hotel’s terrace-facing room categories.',
  },
  {
    id: 'accommodation-le-richebourg-room117',
    src: '/images/accommodation-le-richebourg-room117.jpg',
    sourceUrl: 'https://www.hotel-lerichebourg.com/en/the-rooms/',
    sourceName: 'Hôtel Le Richebourg official site',
    author: 'Hôtel Le Richebourg',
    license:
      'Unconfirmed — sourced from the hotel’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Junior Suite, with a daybed that converts for a third or fourth guest.',
      zh: 'Junior Suite套房，沙发床可转换供第三、四位客人使用。',
      fr: 'Une Junior Suite, avec sa banquette convertible pour un troisième ou quatrième client.',
    },
    notes: 'Junior Suite category, suited to families.',
  },
  {
    id: 'accommodation-grand-villa-geneva-mies-exterior',
    src: '/images/accommodation-grand-villa-geneva-mies-exterior.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-grand-villa-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Pascal Bitz / Ultima Collection',
    license:
      'Unconfirmed — sourced from the villa operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The villa’s terrace, pool and landscaped grounds, seen from above.',
      zh: '别墅的露台、泳池与精心打理的花园，俯瞰视角。',
      fr: 'La terrasse, la piscine et le jardin paysager de la villa, vus d’en haut.',
    },
    notes: 'Cover image — genuine, identifiable exterior of this specific property.',
  },
  {
    id: 'accommodation-grand-villa-geneva-mies-cellar',
    src: '/images/accommodation-grand-villa-geneva-mies-cellar.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-grand-villa-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the villa operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The villa’s wine cellar, with illuminated glass racks and a sports car visible through the garage window.',
      zh: '别墅的酒窖，玻璃展示柜内灯光映衬，透过车库窗可见跑车。',
      fr: 'La cave à vin de la villa, avec ses casiers vitrés éclairés et une voiture de sport visible à travers la vitre du garage.',
    },
    notes: 'Lower level also holds a 10-car marble garage and a 12-person teppanyaki dining room.',
  },
  {
    id: 'accommodation-grand-villa-geneva-mies-cinema',
    src: '/images/accommodation-grand-villa-geneva-mies-cinema.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-grand-villa-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the villa operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Guests in the villa’s private home cinema.',
      zh: '客人在别墅的私人影院内观影。',
      fr: 'Des clients dans le cinéma privé de la villa.',
    },
    notes: 'Only available shot of the cinema; includes guests rather than an empty-room shot.',
  },
  {
    id: 'accommodation-grand-villa-geneva-mies-spa',
    src: '/images/accommodation-grand-villa-geneva-mies-spa.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-grand-villa-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the villa operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The villa’s spa treatment room, with mosaic tiling and a heated stone table.',
      zh: '别墅水疗护理室，马赛克瓷砖搭配加热石台。',
      fr: 'La salle de soins du spa de la villa, avec son carrelage en mosaïque et sa table en pierre chauffante.',
    },
    notes: 'Spa also includes a sauna and hammam beside the heated infinity pool.',
  },
  {
    id: 'accommodation-grand-villa-geneva-mies-bedroom',
    src: '/images/accommodation-grand-villa-geneva-mies-bedroom.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-grand-villa-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the villa operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A bedroom with a floor-to-ceiling glass wall opening onto a private terrace.',
      zh: '一间卧室，落地玻璃墙直通私人露台。',
      fr: 'Une chambre avec un mur de verre toute hauteur ouvrant sur une terrasse privée.',
    },
    notes: 'The first-floor master suite adds two dressing rooms to this terrace configuration.',
  },
  {
    id: 'accommodation-grand-villa-geneva-mies-living',
    src: '/images/accommodation-grand-villa-geneva-mies-living.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-grand-villa-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the villa operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The sunken living and dining room, seating a large group beneath a pair of chandeliers.',
      zh: '下沉式客厅兼餐厅，两盏吊灯下可容纳大型团体聚餐。',
      fr: 'Le salon-salle à manger en contrebas, pouvant accueillir un grand groupe sous deux lustres.',
    },
    notes: 'Behind floor-to-ceiling glass on the garden level, opening onto the terrace.',
  },
  {
    id: 'accommodation-quai-wilson-geneva-exterior',
    src: '/images/accommodation-quai-wilson-geneva-exterior.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-quai-wilson-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the residence operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The restored Belle Époque building on Quai Wilson, seen from below.',
      zh: '威尔逊河堤上修复完好的美好年代风格建筑，仰视视角。',
      fr: "L'immeuble Belle Époque restauré du Quai Wilson, vu d'en bas.",
    },
    notes: 'Cover image — genuine, identifiable exterior of this specific building.',
  },
  {
    id: 'accommodation-quai-wilson-geneva-dining',
    src: '/images/accommodation-quai-wilson-geneva-dining.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-quai-wilson-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the residence operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The duplex dining room, seating ten beneath arc floor lamps with a view over Lake Geneva.',
      zh: '复式单元的餐厅，弧形落地灯下可容纳十人用餐，窗外是日内瓦湖景。',
      fr: 'La salle à manger du duplex, avec ses lampadaires arqués et sa vue sur le lac Léman.',
    },
    notes: 'Residence 5, the six-bedroom duplex with private rooftop.',
  },
  {
    id: 'accommodation-quai-wilson-geneva-living',
    src: '/images/accommodation-quai-wilson-geneva-living.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-quai-wilson-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the residence operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The duplex living room, with lake and Alp views through tall French windows.',
      zh: '复式单元的客厅，透过高大的法式落地窗可见湖景与阿尔卑斯山。',
      fr: 'Le salon du duplex, avec vue sur le lac et les Alpes à travers de hautes fenêtres à la française.',
    },
    notes: 'Shares the same panorama as the dining room.',
  },
  {
    id: 'accommodation-quai-wilson-geneva-rooftop',
    src: '/images/accommodation-quai-wilson-geneva-rooftop.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-quai-wilson-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the residence operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The duplex's private rooftop terrace, looking down the lake toward the Jet d'Eau at dusk.",
      zh: '复式单元的私人屋顶露台，黄昏时分可眺望湖面与大喷泉。',
      fr: "La terrasse privée sur le toit du duplex, avec vue sur le lac et le Jet d'Eau au crépuscule.",
    },
    notes: 'Exclusive to Residence 5, the duplex.',
  },
  {
    id: 'accommodation-quai-wilson-geneva-spa',
    src: '/images/accommodation-quai-wilson-geneva-spa.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-quai-wilson-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the residence operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The residential spa’s relaxation area, with a steam room and a marble-clad rest area.',
      zh: '住宅式水疗中心的休息区，配有蒸汽房与大理石铺面的休憩空间。',
      fr: "L'espace détente du spa résidentiel, avec son hammam et son coin repos habillé de marbre.",
    },
    notes: 'Shared by all five residences in the building.',
  },
  {
    id: 'accommodation-quai-wilson-geneva-treatment',
    src: '/images/accommodation-quai-wilson-geneva-treatment.jpg',
    sourceUrl: 'https://www.ultimacollection.com/our-collection/ultima-quai-wilson-geneva',
    sourceName: 'Ultima Collection official site',
    author: 'Ultima Collection',
    license:
      'Unconfirmed — sourced from the residence operator’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'One of two private spa treatment rooms.',
      zh: '两间私人水疗护理室之一。',
      fr: "L'une des deux cabines de soins privées du spa.",
    },
    notes: 'Treatments from Augustinus Bader and Seed to Skin Tuscany.',
  },
  {
    id: 'journey-alps-geneva-clinique-la-prairie',
    src: '/images/journey-alps-geneva-clinique-la-prairie.jpg',
    sourceUrl: 'https://cliniquelaprairie.com/destinations/switzerland/montreux/',
    sourceName: 'Clinique La Prairie official site',
    author: 'Clinique La Prairie',
    license:
      'Unconfirmed — sourced from the clinic’s official site, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'The historic lakeside residence at Clinique La Prairie in Montreux, where the clinic’s longevity research began.',
      zh: '拉普雷里诊所（Clinique La Prairie）位于蒙特勒的历史建筑，诊所的长寿研究正是从这里起步。',
      fr: 'La résidence historique au bord du lac de la Clinique La Prairie à Montreux, où ont débuté les recherches sur la longévité de la clinique.',
    },
    notes: 'Genuine, identifiable exterior of the named clinic, not a generic spa stand-in.',
  },
  {
    id: 'journey-alps-geneva-offpiste-ski',
    src: '/images/journey-alps-geneva-offpiste-ski.jpg',
    sourceUrl: 'https://unsplash.com/photos/7fHUOwi8f0w',
    sourceName: 'Unsplash',
    author: 'Patrick Hendry',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Two skiers carving fresh tracks down an open off-piste slope.',
      zh: '两名滑雪者在开阔的野雪坡道上划出新鲜的雪痕。',
      fr: 'Deux skieurs traçant de nouvelles lignes sur une pente hors-piste ouverte.',
    },
    notes: 'Generic — does not depict a named guide or resort.',
  },
  {
    id: 'journey-loire-valley-chambord',
    src: '/images/journey-loire-valley-chambord.jpg',
    sourceUrl: 'https://unsplash.com/photos/Yui3DZiX7yM',
    sourceName: 'Unsplash',
    author: 'Dorian Mongel',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Château de Chambord seen across its moat, with its distinctive turreted roofline.',
      zh: '隔着护城河眺望香波堡，屋顶塔楼轮廓极具辨识度。',
      fr: 'Le château de Chambord vu depuis ses douves, avec sa toiture aux tourelles caractéristiques.',
    },
    notes: 'Genuine, identifiable exterior of the named château.',
  },
  {
    id: 'journey-loire-valley-chenonceau',
    src: '/images/journey-loire-valley-chenonceau.jpg',
    sourceUrl: 'https://unsplash.com/photos/5ISQSCOd-MM',
    sourceName: 'Unsplash',
    author: 'Colin Watts',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Château de Chenonceau, its gallery arching over the Cher river.',
      zh: '舍农索城堡，长廊横跨谢尔河之上。',
      fr: 'Le château de Chenonceau, sa galerie enjambant le Cher.',
    },
    notes: 'Genuine, identifiable exterior of the named château.',
  },
  {
    id: 'journey-provence-lavender-valensole',
    src: '/images/journey-provence-lavender-valensole.jpg',
    sourceUrl: 'https://unsplash.com/photos/nD9tEn63suc',
    sourceName: 'Unsplash',
    author: 'Antony BEC',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Rows of lavender in the Valensole plateau, Provence, at dusk.',
      zh: '普罗旺斯瓦朗索勒（Valensole）高原上一排排薰衣草，黄昏时分。',
      fr: 'Des rangées de lavande sur le plateau de Valensole, en Provence, au crépuscule.',
    },
    notes: 'Genuine lavender field in a named Provence location, seasonal (roughly June–August).',
  },
  {
    id: 'journey-alps-mont-blanc',
    src: '/images/journey-alps-mont-blanc.jpg',
    sourceUrl:
      'https://unsplash.com/photos/snow-covered-mountain-under-blue-sky-during-daytime-xgFE3m3kayg',
    sourceName: 'Unsplash',
    author: 'Randy Yip',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Jagged, snow-covered granite spires of the Mont Blanc massif above Chamonix.',
      zh: '霞慕尼上方勃朗峰山群嶙峋的积雪花岗岩尖峰。',
      fr: 'Les aiguilles de granit enneigées du massif du Mont-Blanc au-dessus de Chamonix.',
    },
  },
  {
    id: 'journey-loire-valley-villandry',
    src: '/images/journey-loire-valley-villandry.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-large-green-landscape-with-a-path-and-buildings-in-the-background-HXhX25_vwMA',
    sourceName: 'Unsplash',
    author: 'snap wander',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The formal Renaissance gardens of Château de Villandry, seen from above.',
      zh: '从高处俯瞰维朗德里堡（Château de Villandry）文艺复兴风格的规整花园。',
      fr: 'Les jardins Renaissance du château de Villandry, vus depuis les hauteurs.',
    },
  },
  {
    id: 'experience-monaco-harbour-night',
    src: '/images/experience-monaco-harbour-night.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-harbor-filled-with-lots-of-boats-at-night-RpAU8kvUX7g',
    sourceName: 'Unsplash',
    author: 'Florian K.',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: "Monaco's harbour and hillside skyline lit up at night, yachts moored along the quay.",
      zh: '夜色中的摩纳哥港湾与山坡天际线灯火通明，游艇沿码头停泊。',
      fr: 'Le port de Monaco et les collines illuminés la nuit, yachts amarrés le long du quai.',
    },
  },
  {
    id: 'experience-london-museum-family',
    src: '/images/experience-london-museum-family.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-little-girl-standing-in-front-of-a-building-XhPgnxvLa5g',
    sourceName: 'Unsplash',
    author: 'Mieke Campbell',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A child looking closely at ancient marble relief sculptures in a museum gallery.',
      zh: '一个孩子在博物馆展厅里，近距离观看古代大理石浮雕。',
      fr: 'Un enfant observant de près des bas-reliefs en marbre antique dans une galerie de musée.',
    },
    notes:
      'Tagged by the source as the British Museum — depicts a real museum interior, not a named institutional partnership.',
  },
  {
    id: 'accommodation-villa-riviera-pool-view',
    src: '/images/accommodation-villa-riviera-pool-view.jpg',
    sourceUrl:
      'https://unsplash.com/photos/an-open-door-leading-to-a-pool-with-a-view-of-the-ocean-czm7vvObNJs',
    sourceName: 'Unsplash',
    author: 'Arno Senoner',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'An open shuttered door framing a pool and sea view on the French Riviera coast.',
      zh: '透过敞开的百叶门望向泳池与海景，法国里维埃拉海岸。',
      fr: "Une porte à volets ouverte encadrant une piscine et une vue sur la mer, sur la Côte d'Azur.",
    },
  },
  {
    id: 'accommodation-villa-provence-facade',
    src: '/images/accommodation-villa-provence-facade.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-charming-old-building-with-a-tree-and-blue-shutters-QAFgjcZz-fI',
    sourceName: 'Unsplash',
    author: 'Camille La Brequa',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'A stone Provençal house facade with pale blue shutters and a climbing rose.',
      zh: '普罗旺斯石屋立面，浅蓝色百叶窗，攀爬的蔷薇花。',
      fr: 'Une façade de maison provençale en pierre, volets bleu pâle et rosier grimpant.',
    },
  },
  {
    id: 'accommodation-villa-lac-leman-vineyard',
    src: '/images/accommodation-villa-lac-leman-vineyard.jpg',
    sourceUrl:
      'https://unsplash.com/photos/red-and-white-wooden-house-near-body-of-water-WNDFHt6Nr54',
    sourceName: 'Unsplash',
    author: 'Gabriel Garcia Marengo',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'Vineyard-covered hillside houses above Lake Geneva, canton of Vaud, Switzerland.',
      zh: '瑞士沃州（Vaud）日内瓦湖畔葡萄园山坡上的民居。',
      fr: 'Maisons sur un coteau viticole surplombant le lac Léman, canton de Vaud, Suisse.',
    },
  },
  {
    id: 'destination-provence-gordes',
    src: '/images/destination-provence-gordes.jpg',
    sourceUrl:
      'https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-Oo3jbnStg6g',
    sourceName: 'Unsplash',
    author: 'Sébastien Jermer',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The hilltop village of Gordes in the Luberon, seen from the valley below.',
      zh: '从山谷望向吕贝隆地区戈尔德（Gordes）山顶村庄。',
      fr: 'Le village perché de Gordes, dans le Luberon, vu depuis la vallée.',
    },
  },
  {
    id: 'accommodation-la-reserve-bar',
    src: '/images/accommodation-la-reserve-bar.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:La_R%C3%A9serve_bar_Paris.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'CVB',
    license: 'CC BY 4.0',
    usageStatus: 'licensed',
    altByLocale: {
      en: "La Réserve Paris's bar, with black lacquer panelling, gilt trim and deep red upholstery.",
      zh: '拉雷瑟夫巴黎酒店酒吧，黑漆护墙板、金色装饰线条与深红色软装。',
      fr: 'Le bar de La Réserve Paris, boiseries laquées noires, filets dorés et velours rouge profond.',
    },
  },
  {
    id: 'accommodation-maison-villeroy-facade',
    src: '/images/accommodation-maison-villeroy-facade.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Maison Villeroy's stone facade on Rue Jean Goujon, in Paris's 8th arrondissement.",
      zh: 'Maison Villeroy 位于让·古戎街的石材立面，巴黎第八区。',
      fr: 'La façade en pierre de Maison Villeroy, rue Jean Goujon, dans le 8e arrondissement de Paris.',
    },
    notes: '1908 mansion, designated a historic monument (monument historique).',
  },
  {
    id: 'accommodation-maison-villeroy-staircase',
    src: '/images/accommodation-maison-villeroy-staircase.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "The mansion's original stairwell, framed by a mirrored doorway and hanging glass-globe lights.",
      zh: '宅邸原有的楼梯间，镜面门框与悬挂玻璃球灯相映。',
      fr: "La cage d'escalier d'origine de l'hôtel particulier, encadrée d'une porte en miroir et de suspensions en verre.",
    },
    notes: 'Restored by design firm Atelier Alain Ellouz, preserving the 1908 architecture.',
  },
  {
    id: 'accommodation-maison-villeroy-trente-trois',
    src: '/images/accommodation-maison-villeroy-trente-trois.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: "Trente-Trois's wood-panelled dining room, tables set beneath a carved marble fireplace mirror.",
      zh: 'Trente-Trois 餐厅的木饰面用餐厅，餐桌设于雕花大理石壁炉镜前。',
      fr: 'La salle à manger lambrissée de Trente-Trois, tables dressées sous un miroir de cheminée en marbre sculpté.',
    },
    notes: 'One Michelin star since January 2021, chef Sébastien Sanjou.',
  },
  {
    id: 'accommodation-maison-villeroy-spa',
    src: '/images/accommodation-maison-villeroy-spa.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A dark-stone spa treatment room opening onto a private planted courtyard.',
      zh: '深色石材水疗理疗室，通向私人种植庭院。',
      fr: 'Une salle de soins du spa en pierre sombre ouvrant sur une cour privée plantée.',
    },
    notes:
      'Spa occupies the entire lower ground floor, treatments by Officine Universelle Buly 1803.',
  },
  {
    id: 'accommodation-maison-villeroy-bar',
    src: '/images/accommodation-maison-villeroy-bar.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'Bar Jean Goujon, its gold-leaf ceiling molding original to the 1908 mansion.',
      zh: 'Jean Goujon 酒吧，其金箔天花线脚为1908年宅邸原物。',
      fr: 'Le Bar Jean Goujon, dont les moulures dorées au plafond datent de l’hôtel particulier de 1908.',
    },
    notes: 'Known for an extensive Japanese whisky selection.',
  },
  {
    id: 'accommodation-maison-villeroy-premier-room',
    src: '/images/accommodation-maison-villeroy-premier-room.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A Premier Room in soft greige tones, with panelled walls and a reading chair by the window.',
      zh: '灰米色调的高级客房，护墙板墙面，窗边设有阅读椅。',
      fr: 'Une Premier Room aux tons taupe doux, murs à panneaux et fauteuil de lecture près de la fenêtre.',
    },
    notes: 'One of the four Premier Room-tier accommodations.',
  },
  {
    id: 'accommodation-maison-villeroy-suite-living-room',
    src: '/images/accommodation-maison-villeroy-suite-living-room.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A suite living room with a marble fireplace and its own dressing room visible through the doorway.',
      zh: '套房客厅，设有大理石壁炉，门后可见独立更衣室。',
      fr: 'Le salon d’une suite avec cheminée en marbre et dressing privé visible par la porte.',
    },
    notes: 'Representative of the Grand Premier Suite / apartment tier.',
  },
  {
    id: 'accommodation-maison-villeroy-bathroom',
    src: '/images/accommodation-maison-villeroy-bathroom.jpg',
    sourceUrl: 'https://guide.michelin.com/us/en/hotels-stays/paris/maison-villeroy-9456',
    sourceName: 'MICHELIN Guide (property-supplied photo)',
    author: 'Maison Villeroy',
    license:
      'Unconfirmed — sourced from the property listing on the MICHELIN Guide, commercial-use rights not yet confirmed',
    usageStatus: 'pending-approval',
    altByLocale: {
      en: 'A marble bathroom with a deep soaking tub and a dedicated vanity counter.',
      zh: '大理石浴室，设有深浴缸与独立梳妆台面。',
      fr: 'Une salle de bain en marbre avec une baignoire profonde et un plan vasque dédié.',
    },
    notes: 'Marble bathrooms throughout, per property listing.',
  },
];

function findImage(id: string | undefined): ImageAttribution | undefined {
  return imageAttributions.find((entry) => entry.id === id);
}

// This project deploys via `netlify deploy` (the CLI), not a git-linked
// CI build — confirmed by inspecting the actual env vars a real deploy
// injects: NETLIFY isn't set, but NETLIFY_LOCAL is (server-side Netlify
// CI builds, if this project ever adds one, do set plain NETLIFY — checked
// for too). Absent from a plain `astro dev`/`astro build` run, so this
// keeps local dev images working instead of 404ing against a transform
// endpoint that only exists on deployed infrastructure.
const isNetlifyBuild = Boolean(process.env.NETLIFY_LOCAL || process.env.NETLIFY);
const IMAGE_CDN_MAX_WIDTH = 2400;

/**
 * Routes a local /images/*.jpg path through Netlify's on-demand Image CDN
 * for WebP conversion and a max-width safety cap (see the print-resolution
 * Bulgari images this caught) — real measured savings run 35-50% per image.
 * Every <img> the site renders picks this up for free via getImage()/
 * getImageSafe(); og:image/twitter:image deliberately opt out (see
 * getRawImage()) since not every link-preview crawler fetches WebP
 * reliably.
 */
function toOptimizedSrc(src: string): string {
  if (!isNetlifyBuild || !src.startsWith('/images/')) return src;
  const params = new URLSearchParams({
    url: src,
    w: String(IMAGE_CDN_MAX_WIDTH),
    fm: 'webp',
    q: '82',
  });
  return `/.netlify/images?${params.toString()}`;
}

export function getImage(id: string): ImageAttribution {
  const image = findImage(id);
  if (!image) {
    throw new Error(`Unknown image id "${id}" — add it to src/data/image-attributions.ts first.`);
  }
  return { ...image, src: toOptimizedSrc(image.src) };
}

/**
 * Same lookup, but never throws — content-driven callers (cards, galleries)
 * shouldn't fail a build over one bad image id in a Markdown file. Falls
 * back to the hero image, which always exists.
 */
export function getImageSafe(id: string | undefined, fallbackId = 'hero-home'): ImageAttribution {
  const image = findImage(id);
  return image ? { ...image, src: toOptimizedSrc(image.src) } : getImage(fallbackId);
}

/**
 * The untransformed original — for og:image/twitter:image specifically,
 * never for an <img> tag (use getImage/getImageSafe for those).
 */
export function getRawImage(id: string | undefined, fallbackId = 'hero-home'): ImageAttribution {
  return findImage(id) ?? findImage(fallbackId)!;
}
