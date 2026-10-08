// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.grandas.ch',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'it'],
    routing: { prefixDefaultLocale: false },
  },
});
