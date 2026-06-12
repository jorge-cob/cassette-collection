import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cassettesCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/cassettes'
  }),

  schema: z.object({
    title: z.string(),
    artist: z.string(),
    year: z.number(),

    label: z.string(),
    catalogNumber: z.string().optional(),

    genres: z.array(z.string()),

    tapeType: z.enum([
      'Type I',
      'Type II',
      'Type IV'
    ]),

    aesthetics: z.object({
      shellColor: z.string(),
      shellColorSideA: z.string().optional(),
      shellColorSideB: z.string().optional(),
      hasPrismsOrWindows: z.boolean().default(false)
    }),

    media: z.object({
      coverFront: z.string().optional(),
      caseWithTape: z.string().optional(),
      tapeSideA: z.string().optional(),
      tapeSideB: z.string().optional(),
      jcardFullSpread: z.string().optional(),
      jcardExtraPanels: z.array(z.string()).optional()
    }).default({}),

    originType: z.enum([
      'Original',
      'Recorded from Scratch',
      'Transplant / Hi-Fi'
    ]),

    isCustomArt: z.boolean().default(false),

    condition: z.enum([
      'Excellent',
      'Mint Condition',
      'Mechanically Damaged',
      'Missing J-Card',
      'Rescued (Needs Cleaning)'
    ]).default('Mint Condition'),

    shelfSection: z.enum([
      'shelf-1-rogues',
      'shelf-2-olympus',
      'shelf-3-gourmet',
      'shelf-4-heavy-rotation'
    ]).optional(),

    isDonor: z.boolean().default(false),

    tags: z.array(z.string()),

    pendingTasks: z.array(
      z.enum([
        'create-labels',
        'create-jcard',
        'paint-cassette',
        'record-audio',
        'repair-felt',
        'clean-grease'
      ])
    ).optional(),

    packaging: z.object({
      isDoubleBox: z.boolean().default(false),
      isFourTapeBox: z.boolean().default(false),
      isDoubleDuration: z.boolean().default(false)
    }),

    digitalSource: z.object({
      searchQuery: z.string(),
      hasFlacAcquired: z.boolean().default(false),
      isReadyToRecord: z.boolean().default(false)
    }).optional(),

    contentStructure: z.array(
      z.object({
        albumTitle: z.string(),
        artist: z.string(),
        side: z.enum([
          'A',
          'B',
          'Both'
        ]),
        notes: z.string().optional()
      })
    ).optional()
  })
});

export const collections = {
  cassettes: cassettesCollection
};