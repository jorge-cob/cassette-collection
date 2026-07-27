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

    recordLabel: z.string().optional(),
    catalogNumber: z.string().optional(),

    physicalLabels: z.object({
      sideA: z.object({
        text: z.string().optional(),
        image: z.string().optional()
      }).optional(),
      sideB: z.object({
        text: z.string().optional(),
        image: z.string().optional()
      }).optional()
    }).optional(),

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
      'Transplant'
    ]),

    transplantDetails: z.object({
      tapeSource: z.enum([
        'Used/Old Tape',
        'New Blank Tape'
      ]),
      recordedOver: z.boolean().default(false),
      notes: z.string().optional()
    }).optional(),

    isCustomArt: z.boolean().default(false),

    condition: z.enum([
      'Excellent',
      'Mint Condition',
      'Mechanically Damaged',
      'Missing J-Card',
      'Rescued (Needs Cleaning)'
    ]).default('Mint Condition'),

    shelving: z.object({
      physical: z.object({
        name: z.string(),
        shelf: z.string().optional(),
        position: z.number().optional()
      }).optional(),
      byGenre: z.string().optional(),
      byArtist: z.string().optional(),
      byYear: z.string().optional(),
      byMood: z.string().optional(),
      byCondition: z.string().optional(),
      custom1: z.string().optional(),
      custom2: z.string().optional(),
      custom3: z.string().optional()
    }).optional(),

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