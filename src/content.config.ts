import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each collection is a flat glob across all four locale sub-folders
// (services/en/*.md, services/zh/*.md, ...), so an entry's `id` is
// always `<locale>/<slug>` — that's how pages filter by language.

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
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
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    updatedDate: z.date().optional(),
  }),
});

export const collections = { services, hotels, experiences, caseStudies, legal };
