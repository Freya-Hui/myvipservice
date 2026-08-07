import type { Locale } from './ui';

/**
 * Every page slug that exists in all four locales right now. Used by the
 * language switcher to decide whether it can preserve the current page or
 * must fall back to the target locale's homepage. Update this list whenever
 * a new page is added under src/pages/[locale]/.
 */
export const KNOWN_PAGE_SLUGS = [
  '',
  'about',
  'services',
  'contact',
  'privacy-policy',
  'legal-notice',
  'destinations',
  'accommodations',
  'experiences',
] as const;

/**
 * Language-switch target for a static page (i.e. not a content detail page —
 * those use getDetailSwitchUrl in lib/content.ts instead): keep the current
 * path if it's a page every locale has, otherwise fall back to that locale's
 * homepage. Shared by LanguageSwitcher (the interactive dropdown) and
 * Footer's plain-text language links, so both fall back the same way.
 *
 * Services detail pages (`services/{slug}`) are handled here too, not via
 * getDetailSwitchUrl — unlike destinations/accommodations/experiences,
 * services intentionally keep the same slug across all four locales (see
 * content-naming.md), so the path can be preserved directly with no
 * translationKey lookup needed.
 */
export function getStaticLocaleHref(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const rest = segments.slice(1).join('/');
  const isKnownPage = (KNOWN_PAGE_SLUGS as readonly string[]).includes(rest);
  const isServiceDetail = segments[1] === 'services' && segments.length === 3;
  return `/${targetLocale}/${isKnownPage || isServiceDetail ? rest : ''}`;
}
