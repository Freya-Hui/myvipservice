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
    /**
     * Phase 2D: user-task grouping for the Services overview page, per
     * AGENTS.md principle 5 ("产品架构从用户任务出发") — was defined but
     * never actually assigned to any service or rendered anywhere; this is
     * the first real use. Display grouping only — no URL/slug changes.
     */
    group: z
      .enum([
        'Private Travel',
        'Hotels & Villas',
        'Private Chauffeur',
        'Concierge & Lifestyle',
        'Groups & Corporate',
      ])
      .optional(),
    /** Phase 2D: concrete inclusions shown as a bullet list on the detail page. */
    highlights: z.array(z.string()).default([]),
    /**
     * Site-logic-realignment Phase B: a coarse, non-numeric scale signal
     * (no confirmed pricing exists to publish real "from €X" figures) so a
     * visitor can tell a single-item request apart from a fully managed
     * programme before enquiring.
     */
    investmentTier: z.enum(['light', 'standard', 'bespoke']).optional(),
    /** Phase 2C: forward-looking relation fields, unused by any page yet. */
    relatedExperienceKeys: z.array(z.string()).default([]),
    relatedJournalKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
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
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/destinations',
    generateId: localeSlugId,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    /** Stable cross-locale identity — never derive relations from slug alone. */
    translationKey: z.string(),
    description: z.string(),
    region: z.enum(['Europe', 'Asia', 'Middle East', 'Indian Ocean', 'Americas', 'Africa']),
    /**
     * Phase 2C: optional 3-level hierarchy support (see
     * docs/content-architecture.md#destinations). `parentKey` points at
     * another destination's `translationKey`; `destinationType` says which
     * level this entry is. Both optional so existing flat content (all
     * currently `city`-equivalent, no parent) keeps working unchanged —
     * nothing consumes these fields yet.
     */
    destinationType: z.enum(['country', 'region', 'city', 'sub-destination']).default('city'),
    parentKey: z.string().optional(),
    /** ISO 3166-1 alpha-2, e.g. 'FR'. Optional until content is backfilled. */
    countryCode: z.string().length(2).optional(),
    /** Sort weight for future per-list ordering; unused by current pages,
     *  which still sort via destinationCountryGroups in site-content.ts. */
    priority: z.number().default(0),
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
    relatedJournalKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const accommodations = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/accommodations',
    generateId: localeSlugId,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    translationKey: z.string(),
    description: z.string(),
    // Widened in Phase 2C to cover the property types named in
    // docs/taxonomy.md; 'hotel'/'villa' (all current content) stay valid.
    type: z.enum(['hotel', 'villa', 'chalet', 'apartment', 'château', 'estate', 'resort']),
    /** translationKey of the destinations entry this property is in */
    destinationKey: z.string(),
    city: z.string(),
    country: z.string(),
    /** Phase 2C taxonomy fields — both multi-select, both optional/empty by
     *  default so no existing content needs updating. See docs/taxonomy.md. */
    positioning: z
      .array(
        z.enum([
          'Palace',
          'Luxury',
          'Boutique',
          'Family-Friendly',
          'Design-Led',
          'Private Residence',
        ]),
      )
      .default([]),
    travelFit: z
      .array(
        z.enum([
          'Family',
          'Romantic',
          'Business',
          'Wellness',
          'Ski',
          'Beach',
          'Long Stay',
          'Celebration',
        ]),
      )
      .default([]),
    featured: z.boolean().default(false),
    status: contentStatus,
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    /**
     * Site-logic-realignment: a trademarked brand logo (e.g. a named partner
     * hotel), not photography — served straight from /public, not the
     * Unsplash-photography-only image-attributions.ts registry.
     */
    logo: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    suitableFor: z.array(z.string()).default([]),
    familyNotes: z.string().optional(),
    diningWellness: z.string().optional(),
    locationNotes: z.string().optional(),
    /** The "MYVIPSERVICE Perspective" section */
    servicePerspective: z.string().optional(),
    relatedExperienceKeys: z.array(z.string()).default([]),
    relatedAccommodationKeys: z.array(z.string()).default([]),
    relatedJournalKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// Widened in Phase 2C with 'Seasonal' and 'Sports' (see docs/taxonomy.md);
// all 8 previously-existing values stay valid.
const experienceCategory = z.enum([
  'Art & Culture',
  'Food & Wine',
  'Family',
  'Wellness',
  'Nature',
  'Fashion',
  'Celebration',
  'Private Access',
  'Seasonal',
  'Sports',
]);

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences', generateId: localeSlugId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    translationKey: z.string(),
    description: z.string(),
    category: experienceCategory,
    /** Phase 2C: a secondary category is allowed but optional/empty by default. */
    secondaryCategories: z.array(experienceCategory).default([]),
    /** translationKey of the destinations entry, if this experience is tied to one place */
    destinationKey: z.string().optional(),
    /** Phase 2C: plural companion to destinationKey for experiences valid
     *  across several destinations (e.g. a touring wine tasting). Optional,
     *  additive — destinationKey remains the primary single-place link. */
    destinationKeys: z.array(z.string()).default([]),
    /** translationKey values matching future Travel Styles entries; the data
     *  file today lives at src/data/site-content.ts#travelTypes. */
    travelStyleKeys: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    status: contentStatus,
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    duration: z.string().optional(),
    suitableFor: z.array(z.string()).default([]),
    familySuitable: z.boolean().optional(),
    ageNotes: z.string().optional(),
    languages: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    customisationNotes: z.string().optional(),
    availabilityNotes: z.string().optional(),
    relatedAccommodationKeys: z.array(z.string()).default([]),
    relatedExperienceKeys: z.array(z.string()).default([]),
    relatedJournalKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// Site-logic-realignment: themed multi-experience journeys, the primary
// way the site now presents Experiences (a client request — browse by
// themed journey, not a flat grid of single bookings). A journey never
// invents its own activities: `includedExperienceKeys` must resolve to
// real, already-published entries in the `experiences` collection.
const journeys = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journeys', generateId: localeSlugId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    translationKey: z.string(),
    description: z.string(),
    /** Free-text theme/region label, e.g. "South of France" — not an enum,
     *  journeys don't need to share a fixed taxonomy the way destinations do. */
    theme: z.string(),
    /** translationKey values of the destinations collection this journey spans. */
    destinationKeys: z.array(z.string()).default([]),
    /** translationKey values of real experiences.md entries this journey bundles. */
    includedExperienceKeys: z.array(z.string()).default([]),
    relatedJournalKeys: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    status: contentStatus,
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    duration: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    customisationNotes: z.string().optional(),
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

// Renamed from the Phase 1 `caseStudies` placeholder per
// docs/content-architecture.md#7-journal — editorial content (guides,
// inspiration, seasonal pieces), not customer case studies. Unlike the
// core pages, Journal doesn't require all 4 locales for every entry: a
// translationKey can exist in only one language.
const journalCategory = z.enum([
  'Destination Guides',
  'Hotel Inspiration',
  'Private Experiences',
  'Family Travel',
  'Food & Dining',
  'Seasonal Travel',
  'Art & Culture',
  'Fashion & Shopping',
  'Travel Advice',
  'MYVIPSERVICE Stories',
]);

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal', generateId: localeSlugId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    translationKey: z.string(),
    category: journalCategory,
    excerpt: z.string(),
    author: z.string().optional(),
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    relatedDestinationKeys: z.array(z.string()).default([]),
    relatedAccommodationKeys: z.array(z.string()).default([]),
    relatedExperienceKeys: z.array(z.string()).default([]),
    /** Added post-spec: docs/content-architecture.md predates the `journeys` collection. */
    relatedJourneyKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    status: contentStatus,
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
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
  journeys,
  about,
  journal,
  legal,
};
