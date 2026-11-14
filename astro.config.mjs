// @ts-check
import { defineConfig } from 'astro/config';

// The site is served from https://www.grandas.ch/. SITE and BASE can be
// overridden at build time, e.g. to publish a preview under a sub-path.
export default defineConfig({
  site: process.env.SITE ?? 'https://www.grandas.ch',
  base: process.env.BASE ?? '/',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'it'],
    routing: { prefixDefaultLocale: false },
  },
});
