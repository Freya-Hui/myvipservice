import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each collection is a flat glob across all four locale sub-folders
// (services/en/*.md, services/zh/*.md, ...), so an entry's `id` is
// always `<locale>/<slug>` — that's how pages filter by language.
//
// Two independent status concepts, don't conflate them:
// - `status: 'draft'` — this content item isn't ready to exist publicly at
//   all (any locale). Excluded from production builds entirely (see
//   src/lib/content.ts#isPublished); still queryable in `astro dev` so
//   authors can preview it.
// - `draft: true` — the item IS published, but *this locale's* copy is a
//   placeholder pending real translation (Phase 3). Still built and shown,
//   just with a visible "draft translation" badge.

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

const locale = z.enum(['en', 'zh', 'fr', 'ru']);
const contentStatus = z.enum(['published', 'draft']).default('published');

// The glob loader's default id generation prefers `data.slug` when present,
// which collapses e.g. en/paris.md and fr/paris.md (same slug) into one id.
// We need the locale folder in the id (everything downstream splits on it),
// so override id generation for the three collections that have a `slug`
// field: keep it locale-prefixed, sourced from the folder, not the file name.
function localeSlugId({ entry, data }: { entry: string; data: Record<string, unknown> }) {
  const entryLocale = entry.split('/')[0];
  return `${entryLocale}/${data.slug}`;
}

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations', generateId: localeSlugId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    /** Stable cross-locale identity — never derive relations from slug alone. */
    translationKey: z.string(),
    description: z.string(),
    region: z.enum(['Europe', 'Asia', 'Middle East', 'Indian Ocean', 'Americas', 'Africa']),
    featured: z.boolean().default(false),
    status: contentStatus,
    /** Matches an id in src/data/image-attributions.ts */
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    bestTime: z.string().optional(),
    suggestedStay: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    travelNotes: z.string().optional(),
    /** translationKey values of accommodations/experiences collections */
    relatedAccommodationKeys: z.array(z.string()).default([]),
    relatedExperienceKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const accommodations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/accommodations', generateId: localeSlugId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    translationKey: z.string(),
    description: z.string(),
    type: z.enum(['hotel', 'villa']),
    /** translationKey of the destinations entry this property is in */
    destinationKey: z.string(),
    city: z.string(),
    country: z.string(),
    featured: z.boolean().default(false),
    status: contentStatus,
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    suitableFor: z.array(z.string()).default([]),
    familyNotes: z.string().optional(),
    diningWellness: z.string().optional(),
    /** The "MYVIPSERVICE Perspective" section */
    servicePerspective: z.string().optional(),
    relatedExperienceKeys: z.array(z.string()).default([]),
    relatedAccommodationKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences', generateId: localeSlugId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    translationKey: z.string(),
    description: z.string(),
    category: z.enum([
      'Art & Culture',
      'Food & Wine',
      'Family',
      'Wellness',
      'Nature',
      'Fashion',
      'Celebration',
      'Private Access',
    ]),
    /** translationKey of the destinations entry, if this experience is tied to one place */
    destinationKey: z.string().optional(),
    featured: z.boolean().default(false),
    status: contentStatus,
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    duration: z.string().optional(),
    suitableFor: z.array(z.string()).default([]),
    familySuitable: z.boolean().optional(),
    languages: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    customisationNotes: z.string().optional(),
    relatedAccommodationKeys: z.array(z.string()).default([]),
    relatedExperienceKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
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
  accommodations,
  experiences,
  about,
  caseStudies,
  legal,
};
