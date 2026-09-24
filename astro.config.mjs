// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://myvipservice.com',
  // Content that was published and then removed — kept permanently, see
  // docs/url-conventions.md's redirect policy.
  redirects: {
    '/en/experiences/private-london-family-museum-morning/': '/en/destinations/london/',
    '/zh/experiences/private-london-family-museum-morning/': '/zh/destinations/london/',
    '/fr/experiences/private-london-family-museum-morning/': '/fr/destinations/london/',
  },
  i18n: {
    locales: ['en', 'zh', 'fr'],
    defaultLocale: 'en',
    routing: {
      // Keep /en/ visible like the other locales — no bare, prefix-less URLs.
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      // Password-protected internal tool, not public content — already
      // noindex'd per-page, but shouldn't be listed as "pages to index"
      // in the sitemap we submit to search engines either.
      filter: (page) => !page.includes('/admin/'),
      i18n: {
        locales: { en: 'en', zh: 'zh', fr: 'fr' },
        defaultLocale: 'en',
      },
    }),
  ],
});
