export const languages = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  ru: 'Русский',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.bespokeTravel': 'Bespoke Travel',
    'nav.hotelsVillas': 'Hotels & Villas',
    'nav.experiences': 'Private Experiences',
    'nav.contact': 'Contact Us',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.legalNotice': 'Legal Notice',
    'footer.rightsReserved': 'All rights reserved.',
    'common.cta': 'Request Bespoke Service',
    'common.languageLabel': 'Language',
    'common.cookieNotice':
      'This site uses only essential cookies required for it to function. No tracking cookies are used.',
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.services': '服务',
    'nav.bespokeTravel': '定制旅行',
    'nav.hotelsVillas': '酒店与别墅',
    'nav.experiences': '私人体验',
    'nav.contact': '联系我们',
    'footer.privacyPolicy': '隐私政策',
    'footer.legalNotice': '法律声明',
    'footer.rightsReserved': '版权所有。',
    'common.cta': '预约专属礼宾服务',
    'common.languageLabel': '语言',
    'common.cookieNotice': '本网站仅使用维持网站运行所必需的基本 Cookie，不使用任何追踪类 Cookie。',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.bespokeTravel': 'Voyage sur mesure',
    'nav.hotelsVillas': 'Hôtels & Villas',
    'nav.experiences': 'Expériences privées',
    'nav.contact': 'Contact',
    'footer.privacyPolicy': 'Politique de confidentialité',
    'footer.legalNotice': 'Mentions légales',
    'footer.rightsReserved': 'Tous droits réservés.',
    'common.cta': 'Demander un service sur mesure',
    'common.languageLabel': 'Langue',
    'common.cookieNotice':
      "Ce site utilise uniquement les cookies essentiels à son fonctionnement. Aucun cookie de suivi n'est utilisé.",
  },
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.bespokeTravel': 'Индивидуальные путешествия',
    'nav.hotelsVillas': 'Отели и виллы',
    'nav.experiences': 'Частные впечатления',
    'nav.contact': 'Контакты',
    'footer.privacyPolicy': 'Политика конфиденциальности',
    'footer.legalNotice': 'Юридическая информация',
    'footer.rightsReserved': 'Все права защищены.',
    'common.cta': 'Запросить персональный сервис',
    'common.languageLabel': 'Язык',
    'common.cookieNotice':
      'Этот сайт использует только необходимые для работы файлы cookie. Отслеживающие cookie не используются.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

export function isLocale(value: string): value is Locale {
  return value in languages;
}

export function useTranslations(locale: string) {
  const resolved: Locale = isLocale(locale) ? locale : defaultLocale;
  return function t(key: UiKey): string {
    return ui[resolved][key] ?? ui[defaultLocale][key];
  };
}
