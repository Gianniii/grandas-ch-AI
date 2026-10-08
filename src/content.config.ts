import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One YAML file per service in src/content/services/.
// Each file lists its photos once and carries the text in all 4 languages.
const text = z.object({
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  tip: z.string().optional(),
});

const services = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      images: z
        .array(
          z.object({
            src: image(),
            // alt text per language (optional: falls back to the service title)
            alt: z.object({ fr: z.string(), en: z.string(), de: z.string(), it: z.string() }).partial().optional(),
          }),
        )
        .min(1),
      fr: text,
      en: text,
      de: text,
      it: text,
    }),
});

export const collections = { services };
