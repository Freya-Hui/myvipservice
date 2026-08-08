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
    id: 'hero-paris',
    src: '/images/hero-paris.jpg',
    sourceUrl:
      'https://unsplash.com/photos/eiffel-tower-paris-across-body-of-water-during-daytime-m-sVLnrjFxY',
    sourceName: 'Unsplash',
    author: 'Svetlana Gumerova',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The Eiffel Tower seen across the Seine at dusk.',
      zh: '黄昏时分，隔着塞纳河眺望埃菲尔铁塔。',
      fr: 'La tour Eiffel vue depuis la Seine au crépuscule.',
      ru: 'Эйфелева башня на закате, вид через Сену.',
    },
    notes:
      'Homepage hero and About Us hero. Replace with commissioned photography before public launch.',
  },
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
      ru: 'Крыши Парижа с базиликой Сакре-Кёр вдали.',
    },
    notes:
      'Homepage hero — deliberately not the Eiffel Tower (avoids the tourist-postcard cliché per the brand design principles); a quieter "insider view" composition.',
  },
  {
    id: 'destination-paris',
    src: '/images/hero-paris.jpg',
    sourceUrl:
      'https://unsplash.com/photos/eiffel-tower-paris-across-body-of-water-during-daytime-m-sVLnrjFxY',
    sourceName: 'Unsplash',
    author: 'Svetlana Gumerova',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    altByLocale: {
      en: 'The Eiffel Tower seen across the Seine at dusk.',
      zh: '黄昏时分，隔着塞纳河眺望埃菲尔铁塔。',
      fr: 'La tour Eiffel vue depuis la Seine au crépuscule.',
      ru: 'Эйфелева башня на закате, вид через Сену.',
    },
    notes:
      'Reuses the hero-paris file for the Featured Destinations grid — same licence, no separate download needed.',
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
      ru: 'Прибрежный городок на Французской Ривьере, расположенный между морем и холмами.',
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
      ru: 'Заснеженная гора с лыжным домиком на переднем плане во Французских Альпах.',
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
      ru: 'Деревня на вершине холма в Провансе, окружённая деревьями.',
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
      ru: 'Лобби отеля с люстрой, свисающей с потолка.',
    },
    notes:
      'Generic — does not depict any named, real property. Do not caption with a specific hotel name.',
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
      ru: 'Стол при свечах, сервированный блюдами.',
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
      ru: 'Люди сидят на террасе кафе на парижской улице.',
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
      ru: 'Вид на Женеву, Швейцария, с высоты птичьего полёта утром.',
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
      ru: 'Пагода рядом с храмом Киёмидзу-дэра в Киото, Япония.',
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
      ru: 'Сад виллы с бассейном и шезлонгами.',
    },
    notes: 'Generic villa exterior — does not depict any named, real property.',
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
      ru: 'Большая картина, выставленная в художественной галерее музея.',
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
      ru: 'Чёрный люксовый автомобиль с водителем у элегантного входа в отель.',
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
      ru: 'Изысканное блюдо на ресторанном столе с бокалами вина и хлебом.',
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
      ru: 'Пустой зрительный зал театра с рядами красных кресел напротив сцены.',
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
      ru: 'Семья из трёх человек, держась за руки, идёт вдоль берега моря.',
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
      ru: 'Стойка регистрации отеля с тёплой деревянной отделкой и современной мебелью.',
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
      ru: 'Современный конференц-зал с панорамным видом на городской пейзаж.',
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
      ru: 'Очки на развёрнутой туристической карте рядом с блокнотом и ручкой.',
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
      ru: 'Минималистичный бутик одежды со стеной вешалок с одеждой.',
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
      ru: 'Стол при свечах, накрытый на двоих, на террасе на закате.',
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
      ru: 'Роскошные яхты, пришвартованные в солнечной средиземноморской гавани.',
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
      ru: 'Виноградники и усадьба, снято в Лурмарене, Прованс.',
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
      ru: 'Роскошный деревянный интерьер шале со столовой и гостиной зонами.',
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
      ru: 'Парусная лодка на Женевском озере на фоне города.',
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
      ru: 'Наливание горячей воды во время традиционной японской чайной церемонии.',
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
      ru: 'Многосоставная японская трапеза в стиле кайсэки, поданная на подносах.',
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
      ru: 'Миланский собор (Дуомо ди Милано), Италия.',
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
      ru: 'Башня Елизаветы (Биг-Бен) в Лондоне, Англия.',
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
      ru: 'Вид с воздуха на яхты в гавани Монте-Карло, Монако.',
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
      ru: 'Марина Пуэрто-Банус в Марбелье, Испания, заполненная лодками.',
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
      ru: 'Афинский Акрополь, Греция, в золотой час.',
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
      ru: 'Императорский дворец Хофбург в Вене, Австрия.',
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
      ru: 'Виноградник недалеко от Бордо, Франция, с деревенской церковью вдали.',
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
      ru: 'Замок Шенонсо, стоящий над рекой Шер в долине Луары, Франция.',
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
      ru: 'Историческое здание в Дижоне, столице Бургундии, Франция.',
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
      ru: 'Фасад и навесы у входа отеля Ritz Paris на Вандомской площади.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      ru: 'Вход в отель Four Seasons George V на авеню Georges V в Париже.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      zh: '巴黎协和广场上丽兹卡尔顿·丽晶酒店（Hôtel de Crillon）的柱廊立面。',
      fr: "La façade à colonnes de l'Hôtel de Crillon, place de la Concorde, à Paris.",
      ru: 'Колоннада фасада отеля Crillon на площади Согласия в Париже.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      zh: '巴黎里沃利街上勒梅里斯酒店的拱廊立面。',
      fr: 'La façade à arcades du Meurice, rue de Rivoli, à Paris.',
      ru: 'Аркадный фасад отеля Le Meurice на улице Риволи в Париже.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      ru: 'Фирменные красные навесы отеля Plaza Athénée на авеню Монтень в Париже.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      ru: 'Вывеска у входа в отель Mandarin Oriental Paris на улице Сент-Оноре.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      ru: 'Навес у входа в отель Shangri-La Paris, бывшую резиденцию Бонапарта.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      ru: 'Отель The Peninsula Paris, отреставрированное здание 1908 года в стиле Belle Époque, в сумерках.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      ru: 'Фасад отеля-особняка La Réserve Paris с фирменной красной дверью.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
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
      ru: 'Восстановленное здание универмага Самаритен в стиле ар-деко на Сене, где находится отель Cheval Blanc Paris.',
    },
    notes:
      'A genuine, identifiable exterior photo of this specific property — not a generic stand-in.',
  },
];

export function getImage(id: string): ImageAttribution {
  const image = imageAttributions.find((entry) => entry.id === id);
  if (!image) {
    throw new Error(`Unknown image id "${id}" — add it to src/data/image-attributions.ts first.`);
  }
  return image;
}

/**
 * Same lookup, but never throws — content-driven callers (cards, galleries)
 * shouldn't fail a build over one bad image id in a Markdown file. Falls
 * back to the hero image, which always exists.
 */
export function getImageSafe(id: string | undefined, fallbackId = 'hero-paris'): ImageAttribution {
  const image = imageAttributions.find((entry) => entry.id === id);
  return image ?? getImage(fallbackId);
}
