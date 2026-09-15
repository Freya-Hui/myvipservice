// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://myvipservice.com',
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
      i18n: {
        locales: { en: 'en', zh: 'zh', fr: 'fr' },
        defaultLocale: 'en',
      },
    }),
  ],
});
