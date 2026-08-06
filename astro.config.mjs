// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Netlify custom domain not bound yet (Phase 0) — placeholder, update when domain is confirmed.
  site: 'https://myvipservice.netlify.app',
  i18n: {
    locales: ['en', 'zh', 'fr', 'ru'],
    defaultLocale: 'en',
    routing: {
      // Keep /en/ visible like the other locales — no bare, prefix-less URLs.
      prefixDefaultLocale: true,
    },
  },
});
