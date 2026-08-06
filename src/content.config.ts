import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each collection is a flat glob across all four locale sub-folders
// (services/en/*.md, services/zh/*.md, ...), so an entry's `id` is
// always `<locale>/<slug>` — that's how pages filter by language.
// `draft: true` marks non-English placeholder copy pending real
// localization (Phase 3) — never render draft copy as if it were final.

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    /** Matches an id in src/data/image-attributions.ts */
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: z.object({
    name: z.string(),
    region: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    /** Matches an id in src/data/image-attributions.ts */
    image: z.string(),
    draft: z.boolean().default(false),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    brandStoryTitle: z.string(),
    brandStoryBody: z.string(),
    philosophyTitle: z.string(),
    philosophyBody: z.string(),
    whatWeDoTitle: z.string(),
    whatWeDoBody: z.string(),
    networkTitle: z.string(),
    networkBody: z.string(),
    howWeWorkTitle: z.string(),
    howWeWorkBody: z.string(),
    privacyTitle: z.string(),
    privacyBody: z.string(),
    draft: z.boolean().default(false),
  }),
});

const hotels = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hotels' }),
  schema: z.object({
    name: z.string(),
    city: z.string(),
    country: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    coverImage: z.string().optional(),
    order: z.number().default(0),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    updatedDate: z.date().optional(),
  }),
});

export const collections = {
  services,
  destinations,
  about,
  hotels,
  experiences,
  caseStudies,
  legal,
};
