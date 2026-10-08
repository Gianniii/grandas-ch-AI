// @ts-check
import { defineConfig } from 'astro/config';

// SITE and BASE can be overridden by the deploy workflow, e.g. to publish a
// preview under https://gianniii.github.io/grandas-ch-AI/ before the custom
// domain is moved to this repository.
export default defineConfig({
  site: process.env.SITE ?? 'https://www.grandas.ch',
  base: process.env.BASE ?? '/',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'it'],
    routing: { prefixDefaultLocale: false },
  },
});
