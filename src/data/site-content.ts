import type { Locale } from '../i18n/ui';

/**
 * Small, fixed-length lists used by homepage sections that don't warrant a
 * full content collection (they're part of the page layout, not editorial
 * content someone adds/removes items to). English is the approved copy;
 * zh/fr/ru are short drafts pending Phase 3 localization — every non-English
 * entry here should read as clearly provisional, not final marketing copy.
 */

export interface SiteDataItem {
  title: string;
  description: string;
}

export const travelTypes: Record<Locale, SiteDataItem[]> = {
  en: [
    {
      title: 'Wine & Heritage',
      description:
        'Access to leading estates across Bordeaux, Burgundy, Champagne and the Rhône Valley, with owner-level welcomes, vertical tastings, and guidance for those building a serious collection.',
    },
    {
      title: 'Fashion & Couture',
      description:
        'Fashion Week and Haute Couture access, film-festival moments, and ateliers opened for private fittings and appointments.',
    },
    {
      title: 'Education & Legacy',
      description:
        'Priority access to leading European summer schools and academic study tours, alongside private sport, arts and culture programmes for the next generation.',
    },
    {
      title: 'Global Sporting Classics',
      description:
        "Premium hospitality at Europe's major sporting calendar — from Roland-Garros and Wimbledon to Formula 1 — with private coaching sessions arranged on request.",
    },
    {
      title: 'Skiing & Chalet',
      description:
        "Ski-in/ski-out hotels and private chalets in the Alps' most exclusive resorts, with certified private instructors, equipment delivered to the door, and mountain dining reserved in advance.",
    },
    {
      title: 'Business & Connectivity',
      description:
        "Introductions and visits that go beyond itinerary planning, opening doors within Europe's business and innovation landscape.",
    },
  ],
  zh: [
    { title: '葡萄酒与人文', description: '波尔多、勃艮第、香槟区等顶级酒庄的专属通道。（草稿）' },
    { title: '时尚与高定', description: '时装周与高级定制的专属通道。（草稿）' },
    { title: '教育与传承', description: '欧洲顶尖夏校与游学项目优先通道。（草稿）' },
    { title: '国际体育盛事', description: '法网、温网、F1 等顶级赛事贵宾礼遇。（草稿）' },
    { title: '滑雪与山间木屋', description: '阿尔卑斯顶级滑雪度假村与私人教练。（草稿）' },
    { title: '商务与人脉', description: '超越行程规划的欧洲商务引荐。（草稿）' },
  ],
  fr: [
    {
      title: 'Vin & Patrimoine',
      description: 'Accès privilégié aux grands domaines viticoles français. (brouillon)',
    },
    {
      title: 'Mode & Haute Couture',
      description: 'Accès à la Fashion Week et à la haute couture. (brouillon)',
    },
    {
      title: 'Éducation & Legs',
      description: 'Accès prioritaire aux meilleures écoles d’été européennes. (brouillon)',
    },
    {
      title: 'Grands Événements Sportifs',
      description:
        'Hospitalité premium lors des grands rendez-vous sportifs européens. (brouillon)',
    },
    {
      title: 'Ski & Chalet',
      description: 'Hôtels ski-in/ski-out et chalets privés dans les Alpes. (brouillon)',
    },
    {
      title: 'Business & Connexions',
      description: 'Des mises en relation au-delà de la simple planification. (brouillon)',
    },
  ],
  ru: [
    {
      title: 'Вино и наследие',
      description: 'Доступ к ведущим винодельческим хозяйствам Франции. (черновик)',
    },
    {
      title: 'Мода и от-кутюр',
      description: 'Доступ к Неделе моды и showroom’ам от-кутюр. (черновик)',
    },
    {
      title: 'Образование и наследие',
      description: 'Приоритетный доступ к летним школам Европы. (черновик)',
    },
    {
      title: 'Спортивные события',
      description: 'Премиальное гостеприимство на главных спортивных событиях Европы. (черновик)',
    },
    {
      title: 'Горные лыжи и шале',
      description: 'Отели ski-in/ski-out и частные шале в Альпах. (черновик)',
    },
    {
      title: 'Бизнес и связи',
      description: 'Деловые знакомства, выходящие за рамки планирования поездки. (черновик)',
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
    { title: '发起咨询', description: '告诉我们出行日期、目的地与您最看重的需求。（草稿）' },
    { title: '方案设计', description: '团队依托法国与欧洲网络，为您定制专属方案。（草稿）' },
    { title: '确认行程', description: '确认每一处细节后再出发。（草稿）' },
    { title: '全程支持', description: '行程期间全天候支持，直至旅程结束。（草稿）' },
  ],
  fr: [
    {
      title: 'Votre demande',
      description: 'Partagez vos dates, votre destination et vos priorités. (brouillon)',
    },
    {
      title: 'Notre proposition',
      description: 'Nous concevons une offre sur mesure grâce à notre réseau. (brouillon)',
    },
    {
      title: 'Confirmation',
      description: 'Chaque détail est validé avant votre départ. (brouillon)',
    },
    {
      title: 'À vos côtés',
      description: 'Un accompagnement continu du départ au retour. (brouillon)',
    },
  ],
  ru: [
    { title: 'Запрос', description: 'Расскажите о датах, направлении и приоритетах. (черновик)' },
    { title: 'Разработка', description: 'Команда готовит индивидуальное предложение. (черновик)' },
    {
      title: 'Подтверждение',
      description: 'Каждая деталь согласовывается перед поездкой. (черновик)',
    },
    { title: 'Сопровождение', description: 'Поддержка на протяжении всей поездки. (черновик)' },
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
      description: '时尚与艺术之都，通向奢侈品牌高层与私人活动的资源渠道。（草稿）',
    },
    { title: '欧洲网络', description: '英国、瑞士、意大利、西班牙等地的可信赖合作伙伴。（草稿）' },
    { title: '合规与隐私', description: '遵循欧洲职业道德，严格保护客户隐私。（草稿）' },
  ],
  fr: [
    {
      title: 'France',
      description: 'La patrie de la mode et de l’art, avec un accès privilégié. (brouillon)',
    },
    {
      title: 'Réseau européen',
      description: 'Des partenaires de confiance au Royaume-Uni, en Suisse, en Italie… (brouillon)',
    },
    {
      title: 'Conformité & confidentialité',
      description: 'Éthique professionnelle européenne et confidentialité stricte. (brouillon)',
    },
  ],
  ru: [
    {
      title: 'Франция',
      description: 'Родина моды и искусства, с привилегированным доступом. (черновик)',
    },
    {
      title: 'Европейская сеть',
      description:
        'Надёжные партнёры в Великобритании, Швейцарии, Италии и других странах. (черновик)',
    },
    {
      title: 'Комплаенс и конфиденциальность',
      description: 'Европейская профессиональная этика и строгая конфиденциальность. (черновик)',
    },
  ],
};
