import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

/**
 * Content types that cross-link to each other via translationKey and share
 * the same status/draft/locale/slug shape. Services, about and legal don't
 * participate in this — they're simpler and don't need cross-collection
 * relations.
 */
export type LinkableCollection =
  'destinations' | 'accommodations' | 'experiences' | 'journeys' | 'journal' | 'travelStyles';

/**
 * The collection name doubles as its URL segment everywhere except
 * `travelStyles` — its route is `/travel-styles/`, kebab-case. Every other
 * entry here is a no-op (the identity mapping), kept explicit so a URL
 * builder never has to assume collection name === path segment.
 */
const COLLECTION_PATH: Record<LinkableCollection, string> = {
  destinations: 'destinations',
  accommodations: 'accommodations',
  experiences: 'experiences',
  journeys: 'journeys',
  journal: 'journal',
  travelStyles: 'travel-styles',
};

/**
 * `status: 'draft'` hides an item from production builds entirely (it's not
 * ready to exist publicly, in any locale) while still being queryable in
 * `astro dev` so it can be previewed. This is unrelated to the per-locale
 * `draft` field, which marks placeholder *translations* of published items.
 */
function isPublished(status: 'published' | 'draft'): boolean {
  return status === 'published' || import.meta.env.DEV;
}

function localeOf(entry: { id: string }): string {
  return entry.id.split('/')[0];
}

/** All published entries of a collection, in one locale. */
export async function getLocaleEntries<C extends LinkableCollection>(
  collection: C,
  locale: Locale,
): Promise<CollectionEntry<C>[]> {
  return getCollection(
    collection,
    (entry) => localeOf(entry) === locale && isPublished(entry.data.status),
  );
}

/** Find the one entry in `locale` whose translationKey matches. */
export async function getEntryByTranslationKey<C extends LinkableCollection>(
  collection: C,
  locale: Locale,
  translationKey: string,
): Promise<CollectionEntry<C> | undefined> {
  const entries = await getLocaleEntries(collection, locale);
  return entries.find((entry) => entry.data.translationKey === translationKey);
}

/**
 * Resolve a list of translationKeys (e.g. `destination.relatedAccommodationKeys`)
 * to actual published entries in the current locale. Keys with no match in
 * this locale are silently dropped — callers never mix in another locale's
 * copy, and an empty result means "don't render this section".
 */
export async function resolveRelated<C extends LinkableCollection>(
  collection: C,
  locale: Locale,
  keys: string[],
  excludeTranslationKey?: string,
): Promise<CollectionEntry<C>[]> {
  if (keys.length === 0) return [];
  const entries = await getLocaleEntries(collection, locale);
  const byKey = new Map(entries.map((entry) => [entry.data.translationKey, entry]));
  const seen = new Set<string>();
  const result: CollectionEntry<C>[] = [];
  for (const key of keys) {
    if (key === excludeTranslationKey || seen.has(key)) continue;
    const match = byKey.get(key);
    if (match) {
      result.push(match);
      seen.add(key);
    }
  }
  return result;
}

/**
 * Destinations have no `relatedDestinationKeys` field (same-type relations
 * are auto-derived, not manually curated) — same region first, then other
 * destinations, excluding self, capped at `limit`.
 */
export async function getRelatedDestinations(
  locale: Locale,
  currentTranslationKey: string,
  region: string,
  limit = 3,
): Promise<CollectionEntry<'destinations'>[]> {
  const entries = await getLocaleEntries('destinations', locale);
  const others = entries.filter((entry) => entry.data.translationKey !== currentTranslationKey);
  const sameRegion = others.filter((entry) => entry.data.region === region);
  const rest = others.filter((entry) => entry.data.region !== region);
  return [...sameRegion, ...rest].slice(0, limit);
}

/**
 * Reverse lookup: accommodations/experiences/journeys tied to a given
 * destination, for when a destination page wants to feature everything
 * linked to it without maintaining a manual key list. Accommodations and
 * experiences carry a single `destinationKey`; journeys carry a
 * `destinationKeys` array (a themed journey can span several places), so
 * the match logic branches by collection rather than assuming one shape.
 */
export async function getEntriesByDestination<
  C extends 'accommodations' | 'experiences' | 'journeys',
>(collection: C, locale: Locale, destinationKey: string): Promise<CollectionEntry<C>[]> {
  const entries = await getLocaleEntries(collection, locale);
  if (collection === 'journeys') {
    return entries.filter((entry) =>
      (entry.data as CollectionEntry<'journeys'>['data']).destinationKeys.includes(destinationKey),
    );
  }
  return entries.filter(
    (entry) =>
      (entry.data as CollectionEntry<'accommodations'>['data']).destinationKey === destinationKey,
  );
}

/**
 * Reverse lookup for a `travelStyles` detail page's "featured for this
 * style" sections. Experiences, journeys and destinations all carry a
 * `travelStyleKeys` array keyed by the style's own `id` (matches the old
 * site-content.ts#travelTypes ids); accommodations instead carry the
 * older, differently-shaped `travelFit` enum array, so matching them needs
 * the style's mapped `travelFitTag` rather than its id — pass both and the
 * function picks the right one per collection, same branching pattern as
 * `getEntriesByDestination`.
 */
export async function getEntriesByTravelStyle<
  C extends 'accommodations' | 'experiences' | 'journeys' | 'destinations',
>(
  collection: C,
  locale: Locale,
  styleId: string,
  travelFitTag?: string,
): Promise<CollectionEntry<C>[]> {
  const entries = await getLocaleEntries(collection, locale);
  if (collection === 'accommodations') {
    if (!travelFitTag) return [];
    return entries.filter((entry) =>
      (entry.data as CollectionEntry<'accommodations'>['data']).travelFit.includes(
        travelFitTag as CollectionEntry<'accommodations'>['data']['travelFit'][number],
      ),
    );
  }
  return entries.filter((entry) =>
    (entry.data as CollectionEntry<'experiences'>['data']).travelStyleKeys.includes(styleId),
  );
}

/**
 * Builds `getStaticPaths()` output for a `[locale]/<collection>/[slug]/index.astro`
 * detail page — every published entry, in every locale, keyed by its own
 * `data.slug` (not the filename) so content authoring doesn't have to keep
 * filenames and slugs in sync.
 */
export async function getDetailStaticPaths<C extends LinkableCollection>(collection: C) {
  const entries = await getCollection(collection, (entry) => isPublished(entry.data.status));
  return entries.map((entry) => ({
    params: { locale: localeOf(entry), slug: entry.data.slug },
    props: { entry },
  }));
}

/**
 * Language-switch target for a detail page: the same content in another
 * locale if it exists (and is published there), otherwise that locale's
 * list page — never a 404, never a redirect loop.
 */
export async function getDetailSwitchUrl(
  collection: LinkableCollection,
  targetLocale: Locale,
  translationKey: string,
): Promise<string> {
  const match = await getEntryByTranslationKey(collection, targetLocale, translationKey);
  const path = COLLECTION_PATH[collection];
  return match ? `/${targetLocale}/${path}/${match.data.slug}/` : `/${targetLocale}/${path}/`;
}

/**
 * Drops related-content items whose card would show an image already
 * visible elsewhere on this same page (the hero/gallery) — many
 * experiences/journal pieces borrow their destination's photo rather than
 * having their own, so without this a "related" card can look like the
 * exact same thing you're already looking at. Pass the current page's own
 * `[data.coverImage, ...data.gallery]` as `shownImageIds`.
 */
export function excludeShownImages<T extends { data: { coverImage: string } }>(
  items: T[],
  shownImageIds: string[],
): T[] {
  const shown = new Set(shownImageIds);
  return items.filter((item) => !shown.has(item.data.coverImage));
}
