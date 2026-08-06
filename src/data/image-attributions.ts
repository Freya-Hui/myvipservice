/**
 * Registry of every non-original image used on the site. Every entry here
 * must have a matching row in docs/image-asset-register.md — keep both in
 * sync. `usageStatus: 'temporary'` means: fine to ship as a Phase 1 visual
 * placeholder, but swap for commissioned/licensed photography before this
 * goes further than an internal review.
 */

export type ImageUsageStatus = 'temporary' | 'licensed' | 'pending-approval';

export interface ImageAttribution {
  id: string;
  /** Local path served from /public — never hot-link the original source. */
  src: string;
  sourceUrl: string;
  sourceName: string;
  author: string;
  license: string;
  usageStatus: ImageUsageStatus;
  alt: string;
  notes?: string;
}

export const imageAttributions: ImageAttribution[] = [
  {
    id: 'hero-paris',
    src: '/images/hero-paris.jpg',
    sourceUrl:
      'https://unsplash.com/photos/eiffel-tower-paris-across-body-of-water-during-daytime-m-sVLnrjFxY',
    sourceName: 'Unsplash',
    author: 'Svetlana Gumerova',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'The Eiffel Tower seen across the Seine at dusk.',
    notes:
      'Homepage hero and About Us hero. Replace with commissioned photography before public launch.',
  },
  {
    id: 'destination-paris',
    src: '/images/hero-paris.jpg',
    sourceUrl:
      'https://unsplash.com/photos/eiffel-tower-paris-across-body-of-water-during-daytime-m-sVLnrjFxY',
    sourceName: 'Unsplash',
    author: 'Svetlana Gumerova',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'The Eiffel Tower seen across the Seine at dusk.',
    notes:
      'Reuses the hero-paris file for the Featured Destinations grid — same licence, no separate download needed.',
  },
  {
    id: 'destination-french-riviera',
    src: '/images/destination-french-riviera.jpg',
    sourceUrl:
      'https://unsplash.com/photos/coastal-town-nestled-by-the-blue-sea-and-mountains-aoFr17pnyrs',
    sourceName: 'Unsplash',
    author: 'Kamilla Isalieva',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'A coastal town on the French Riviera, nestled between the sea and hills.',
  },
  {
    id: 'destination-french-alps',
    src: '/images/destination-french-alps.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-snow-covered-mountain-with-a-ski-lodge-in-the-foreground-0zwzo_v2ZHQ',
    sourceName: 'Unsplash',
    author: 'Nicola Fittipaldi',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'A snow-covered mountain with a ski lodge in the foreground, in the French Alps.',
  },
  {
    id: 'destination-provence',
    src: '/images/destination-provence.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-village-on-top-of-a-hill-surrounded-by-trees-vLJDVNSywA0',
    sourceName: 'Unsplash',
    author: 'Simon Spring',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'A hilltop village in Provence, surrounded by trees.',
  },
  {
    id: 'service-hotels-villas',
    src: '/images/service-hotels-villas.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-hotel-lobby-with-a-chandelier-hanging-from-the-ceiling-WR1bkBstInw',
    sourceName: 'Unsplash',
    author: 'Quang Nguyen Vinh',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'A hotel lobby with a chandelier hanging from the ceiling.',
    notes:
      'Generic — does not depict any named, real property. Do not caption with a specific hotel name.',
  },
  {
    id: 'service-private-experiences',
    src: '/images/service-private-experiences.jpg',
    sourceUrl:
      'https://unsplash.com/photos/a-table-is-set-with-candles-and-plates-of-food-HCFqhYC_Hvw',
    sourceName: 'Unsplash',
    author: 'Zac Cain',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'A candlelit dinner table set with plates of food.',
  },
  {
    id: 'journal-preview-paris-cafe',
    src: '/images/journal-preview-paris-cafe.jpg',
    sourceUrl:
      'https://unsplash.com/photos/people-sitting-on-chair-near-building-during-daytime-bOICdD-Gulk',
    sourceName: 'Unsplash',
    author: 'Alex Harmuth',
    license: 'Unsplash License',
    usageStatus: 'temporary',
    alt: 'People sitting at a café terrace on a Paris street.',
  },
];

export function getImage(id: string): ImageAttribution {
  const image = imageAttributions.find((entry) => entry.id === id);
  if (!image) {
    throw new Error(`Unknown image id "${id}" — add it to src/data/image-attributions.ts first.`);
  }
  return image;
}
