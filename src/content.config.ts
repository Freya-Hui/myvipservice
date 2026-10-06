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

// Services' highlights are plain text, or {text, image?, href?} — same
// image-pairing shape as accommodations/journeys highlightItem, plus an
// optional link to the real journey/page that highlight is describing, so a
// claim like "wine itineraries across Bordeaux and Burgundy" can carry a
// photo and point straight at the real journey rather than sitting as an
// unlinked, unillustrated bullet.
const serviceHighlightItem = z.union([
  z.string(),
  z.object({ text: z.string(), image: z.string().optional(), href: z.string().optional() }),
]);

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    /** Matches an id in src/data/image-attributions.ts */
    image: z.string().optional(),
    /** Additional images shown in a gallery on the detail page — each id
     *  must match an entry in src/data/image-attributions.ts. */
    gallery: z.array(z.string()).default([]),
    /**
     * Optional image+text article sections, each paired with its own
     * photo (alternating sides) instead of a flat image gallery followed
     * by unillustrated prose. When present, the detail page renders these
     * in place of the gallery grid + full markdown body.
     */
    storyFeatures: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          /** Matches an id in src/data/image-attributions.ts */
          imageId: z.string(),
        }),
      )
      .default([]),
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
        'Private Transportation',
        'Concierge & Lifestyle',
        'Groups & Corporate',
      ])
      .optional(),
    /** Phase 2D: concrete inclusions shown as a bullet list on the detail page. */
    highlights: z.array(serviceHighlightItem).default([]),
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

// Site-logic-realignment: sub-topic detail pages nested one level under the
// private-transportation service (chauffeur / private jet / airport arrival
// / private terminal), each with room for more detail than fits as an H2 on
// the parent page. Same flat-glob-by-folder id shape as `services` (no
// slug/translationKey — nothing links to these cross-locale except the
// parent hub page, which already knows the locale it's rendering).
const transportationTopics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/transportation-topics' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    /** Matches an id in src/data/image-attributions.ts */
    image: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    /** Indicative price, shown only where set — omitted for zh, same
     *  editorial policy as quickServices in site-content.ts. */
    price: z.string().optional(),
    /** Small-print caveat shown next to the price, e.g. seasonal variation. */
    priceNote: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const locale = z.enum(['en', 'zh', 'fr']);
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

// A highlight can be a plain string (all existing content) or paired with an
// image id so the template can render image-then-text, matching the same
// rhythm the Courchevel journal article uses for its hotel-by-hotel section.
// Declared here (before `destinations`, its first consumer) rather than
// where accommodations/journeys originally defined it — referencing a
// `const` before its declaration is a TDZ error, not just a lint nit.
const highlightItem = z.union([
  z.string(),
  z.object({ text: z.string(), image: z.string().optional() }),
]);

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
    /**
     * Optional image+text article sections, each paired with its own
     * photo (alternating sides) instead of a flat image gallery followed
     * by unillustrated prose. Same shape as services' storyFeatures.
     */
    storyFeatures: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          /** Matches an id in src/data/image-attributions.ts */
          imageId: z.string(),
        }),
      )
      .default([]),
    highlights: z.array(highlightItem).default([]),
    travelNotes: z.string().optional(),
    /** translationKey values of accommodations/experiences/journeys collections */
    relatedAccommodationKeys: z.array(z.string()).default([]),
    relatedExperienceKeys: z.array(z.string()).default([]),
    relatedJournalKeys: z.array(z.string()).default([]),
    relatedJourneyKeys: z.array(z.string()).default([]),
    /** `id` values from `travelStyles` — which audience segments this place
     *  suits, so a travel-style detail page can recommend real destinations
     *  instead of an empty section. Optional/empty by default; only backfilled
     *  where a destination genuinely fits one of the published styles. */
    travelStyleKeys: z.array(z.string()).default([]),
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
    highlights: z.array(highlightItem).default([]),
    /** Room/suite categories — same {text, image} shape as highlights, kept
     *  as its own section so an article-style page reads intro → features →
     *  room types → who it suits, instead of one undifferentiated list. */
    roomTypes: z.array(highlightItem).default([]),
    /** Locale-relative path (no leading locale segment) to a dedicated
     *  booking page for this property, e.g. 'accommodations/foo/book/' —
     *  when set, the detail page's quote CTA links here instead of the
     *  generic contact form. Most properties don't have one yet. */
    bookingHref: z.string().optional(),
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

// 2026-09-25 client-requested focus themes: six pillars the site should
// foreground on journeys/experiences (fashion, skiing, wine, South of
// France, Paris, kids' summer camps) — a classification pass over existing
// content, not a new content type. An item can carry zero, one or several;
// most existing entries won't match any of these six, and that's expected
// (nothing is deleted or moved for not matching — see focusThemeKeys below).
const focusTheme = z.enum([
  'Fashion',
  'Skiing',
  'Wine',
  'South of France',
  'Paris',
  'Kids Summer Camp',
]);

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
    /** 2026-09-25: which of the six client-requested focus themes this
     *  experience genuinely fits — see `focusTheme` above. Empty is normal. */
    focusThemeKeys: z.array(focusTheme).default([]),
    featured: z.boolean().default(false),
    status: contentStatus,
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    duration: z.string().optional(),
    suitableFor: z.array(z.string()).default([]),
    familySuitable: z.boolean().optional(),
    ageNotes: z.string().optional(),
    languages: z.array(z.string()).default([]),
    /** Plain string or {text, image} — same shape as accommodations'/journeys'
     *  highlightItem, so a highlight can carry a photo via MediaHighlightList. */
    highlights: z.array(highlightItem).default([]),
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
    /** Plain string or {text, image} — same shape as accommodations'
     *  highlightItem, so a highlight can carry a photo via MediaHighlightList. */
    highlights: z.array(highlightItem).default([]),
    /**
     * Day-by-day shape of the route — no fixed hotel/meal plan, since a
     * bespoke journey's accommodation and pacing flex per client (unlike a
     * fixed-departure group tour). Just the route and what happens each day.
     * `image` is optional per day — not every day needs one (a transfer day
     * rarely has a distinctive photo), but text-image interleaving is the
     * default expectation, not the exception.
     */
    itinerary: z
      .array(
        z.object({
          day: z.number(),
          title: z.string(),
          body: z.string(),
          image: z.string().optional(),
        }),
      )
      .default([]),
    customisationNotes: z.string().optional(),
    /** `id` values from `travelStyles` — same field/shape as experiences'
     *  travelStyleKeys, so a travel-style detail page can pull real
     *  itineraries into its "featured journeys" section. */
    travelStyleKeys: z.array(z.string()).default([]),
    /** 2026-09-25: which of the six client-requested focus themes this
     *  journey genuinely fits — see `focusTheme` above. Empty is normal;
     *  a journey that doesn't match any of the six stays in Journeys
     *  unchanged, it just isn't tagged into one of them. */
    focusThemeKeys: z.array(focusTheme).default([]),
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
    /** `id` values from `travelStyles`, per content-architecture.md §7's
     *  planned "relatedTravelStyleKeys-driven related articles" hook —
     *  only set where an article is genuinely relevant to a published
     *  style, not backfilled for every entry. */
    relatedTravelStyleKeys: z.array(z.string()).default([]),
    /** Up to three entries across the whole collection should carry this at
     *  any time — whichever articles are the current primary promotions
     *  (e.g. "ski season booking is open") get surfaced as a short list in
     *  the homepage Hero, in addition to their normal place in the Journal
     *  listing. The homepage only ever renders the first three, so a
     *  fourth would just be silently dropped there — not enforced by the
     *  schema, a manual convention. */
    featured: z.boolean().default(false),
    /** Embeds the matching enquiry form (anchor `#enquiry`) right after the
     *  article body. Only articles whose topic is a single bookable thing
     *  carry this — e.g. the Ducasse sur Seine dinner. */
    enquiryForm: z.enum(['ducasse-dinner']).optional(),
    /** 2–3 short bullets specific to THIS article's own content — shown on
     *  hover/focus over its homepage Hero card when `featured` is true.
     *  Only meaningful on a featured entry; harmless (just unused) on any
     *  other. Not a generic "why book with us" list — that already exists
     *  as site-content.ts#whyUsPoints for the separate "how it works"
     *  section elsewhere on the homepage. */
    heroHighlights: z.array(z.string()).default([]),
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

// "Who we design for" — the homepage's audience-segment cards, upgraded
// from a plain data-file entry (src/data/site-content.ts#travelTypes) into
// real detail pages per docs/url-conventions.md's already-planned
// `/travel-styles/{slug}/` route. Only the 4 already-live segments
// (family-journeys / romantic-escapes / celebrations / business-vip) get
// real entries for now — the other 12 candidate styles stay as a plain
// backlog list in site-content.ts until there's a decision to build them
// out too; this collection doesn't need placeholder files for them.
const travelStyles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/travel-styles',
    generateId: localeSlugId,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale,
    translationKey: z.string(),
    /** Punchier "For ___" card label — same role as the old TravelType.shortLabel. */
    shortLabel: z.string(),
    /** Card/hero subtitle — written for the "who is this for" framing, not
     *  copied from the linked service's own summary (see the
     *  travel-audience-segments skill's lesson on this). */
    description: z.string(),
    /** Which accommodations.travelFit enum value this style corresponds
     *  to, for the accommodations-matching RelatedContent section. Not
     *  every style will have a clean 1:1 mapping — optional. */
    travelFitTag: z
      .enum([
        'Family',
        'Romantic',
        'Business',
        'Wellness',
        'Ski',
        'Beach',
        'Long Stay',
        'Celebration',
      ])
      .optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    status: contentStatus,
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    storyFeatures: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          imageId: z.string(),
        }),
      )
      .default([]),
    /** "What this includes" — same shape as services' highlights. */
    highlights: z.array(highlightItem).default([]),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    /** `slug` values from the `services` collection (services share one slug
     *  across all locales, so a plain string works here) — the real,
     *  bookable services relevant to this audience. A travel style is a
     *  "who", a service is a "what"; one audience is usually relevant to
     *  several services, not just one. */
    relatedServiceKeys: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  services,
  transportationTopics,
  destinations,
  accommodations,
  experiences,
  journeys,
  about,
  journal,
  legal,
  travelStyles,
};
