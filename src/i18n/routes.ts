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
] as const;
