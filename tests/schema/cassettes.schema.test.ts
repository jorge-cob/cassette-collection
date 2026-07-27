import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// ─── Mirrors the schema defined in src/content.config.ts ─────────────────────
// We redeclare the schema here so tests remain independent of Astro's
// content-collection runtime while still exercising the exact same rules.

const aestheticsSchema = z.object({
  shellColor: z.string(),
  shellColorSideA: z.string().optional(),
  shellColorSideB: z.string().optional(),
  hasPrismsOrWindows: z.boolean().default(false)
});

const mediaSchema = z.object({
  coverFront: z.string().optional(),
  caseWithTape: z.string().optional(),
  tapeSideA: z.string().optional(),
  tapeSideB: z.string().optional(),
  jcardFullSpread: z.string().optional(),
  jcardExtraPanels: z.array(z.string()).optional()
}).default({});

const packagingSchema = z.object({
  isDoubleBox: z.boolean().default(false),
  isFourTapeBox: z.boolean().default(false),
  isDoubleDuration: z.boolean().default(false)
});

const digitalSourceSchema = z.object({
  searchQuery: z.string(),
  hasFlacAcquired: z.boolean().default(false),
  isReadyToRecord: z.boolean().default(false)
}).optional();

const contentStructureItemSchema = z.object({
  albumTitle: z.string(),
  artist: z.string(),
  side: z.enum(['A', 'B', 'Both']),
  notes: z.string().optional()
});

const cassetteSchema = z.object({
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
  tapeType: z.enum(['Type I', 'Type II', 'Type IV']),
  aesthetics: aestheticsSchema,
  media: mediaSchema,
  originType: z.enum(['Original', 'Recorded from Scratch', 'Transplant']),
  transplantDetails: z.object({
    tapeSource: z.enum(['Used/Old Tape', 'New Blank Tape']),
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
  pendingTasks: z.array(z.enum([
    'create-labels',
    'create-jcard',
    'paint-cassette',
    'record-audio',
    'repair-felt',
    'clean-grease'
  ])).optional(),
  packaging: packagingSchema,
  digitalSource: digitalSourceSchema,
  contentStructure: z.array(contentStructureItemSchema).optional()
});

// ─── Fixture helpers ──────────────────────────────────────────────────────────

const minimalValidCassette = {
  title: 'Loveless',
  artist: 'My Bloody Valentine',
  year: 1991,
  genres: ['Shoegaze', 'Alternative Rock'],
  tapeType: 'Type II' as const,
  aesthetics: { shellColor: 'white' },
  originType: 'Original' as const,
  tags: ['shoegaze', 'essential'],
  packaging: {}
};

// ─── Required fields ──────────────────────────────────────────────────────────

describe('cassette schema – required fields', () => {
  it('parses a minimal valid cassette', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
  });

  it('fails when title is missing', () => {
    const { title: _title, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('fails when artist is missing', () => {
    const { artist: _artist, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('fails when year is missing', () => {
    const { year: _year, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  // recordLabel is now optional, removed this test

  it('fails when genres is missing', () => {
    const { genres: _genres, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('fails when tapeType is missing', () => {
    const { tapeType: _tapeType, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('fails when aesthetics is missing', () => {
    const { aesthetics: _aesthetics, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('fails when originType is missing', () => {
    const { originType: _originType, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('fails when tags is missing', () => {
    const { tags: _tags, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('fails when packaging is missing', () => {
    const { packaging: _packaging, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });
});

// ─── tapeType enum ────────────────────────────────────────────────────────────

describe('cassette schema – tapeType enum', () => {
  it.each(['Type I', 'Type II', 'Type IV'] as const)('accepts tapeType "%s"', (tapeType) => {
    expect(cassetteSchema.safeParse({ ...minimalValidCassette, tapeType }).success).toBe(true);
  });

  it('rejects an unknown tape type', () => {
    expect(
      cassetteSchema.safeParse({ ...minimalValidCassette, tapeType: 'Type III' }).success
    ).toBe(false);
  });
});

// ─── originType enum ──────────────────────────────────────────────────────────

describe('cassette schema – originType enum', () => {
  it.each(['Original', 'Recorded from Scratch', 'Transplant'] as const)(
    'accepts originType "%s"',
    (originType) => {
      expect(cassetteSchema.safeParse({ ...minimalValidCassette, originType }).success).toBe(true);
    }
  );

  it('rejects an unknown originType', () => {
    expect(
      cassetteSchema.safeParse({ ...minimalValidCassette, originType: 'Copy' }).success
    ).toBe(false);
  });
});

// ─── condition enum & default ─────────────────────────────────────────────────

describe('cassette schema – condition', () => {
  it('defaults condition to "Mint Condition" when omitted', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.condition).toBe('Mint Condition');
  });

  it.each([
    'Excellent',
    'Mint Condition',
    'Mechanically Damaged',
    'Missing J-Card',
    'Rescued (Needs Cleaning)'
  ] as const)('accepts condition "%s"', (condition) => {
    expect(cassetteSchema.safeParse({ ...minimalValidCassette, condition }).success).toBe(true);
  });

  it('rejects an unknown condition value', () => {
    expect(
      cassetteSchema.safeParse({ ...minimalValidCassette, condition: 'Poor' }).success
    ).toBe(false);
  });
});

// ─── shelfSection enum (optional) ────────────────────────────────────────────

describe('cassette schema – shelving', () => {
  it('is absent when not provided', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.shelving).toBeUndefined();
  });

  it('accepts shelving with physical.name', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      shelving: { physical: { name: 'Trap Shelf' } }
    });
    expect(result.success).toBe(true);
  });

  it('accepts multiple classification systems', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      shelving: {
        physical: { name: 'Trap Shelf' },
        byGenre: 'Trap',
        byArtist: 'Cecilio G'
      }
    });
    expect(result.success).toBe(true);
  });
});

// ─── boolean defaults ─────────────────────────────────────────────────────────

describe('cassette schema – boolean defaults', () => {
  it('defaults isCustomArt to false', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.isCustomArt).toBe(false);
  });

  it('defaults isDonor to false', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.isDonor).toBe(false);
  });

  it('accepts explicit isCustomArt true', () => {
    const result = cassetteSchema.safeParse({ ...minimalValidCassette, isCustomArt: true });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.isCustomArt).toBe(true);
  });
});

// ─── aesthetics sub-object ────────────────────────────────────────────────────

describe('cassette schema – aesthetics', () => {
  it('requires shellColor', () => {
    expect(
      cassetteSchema.safeParse({ ...minimalValidCassette, aesthetics: {} }).success
    ).toBe(false);
  });

  it('defaults hasPrismsOrWindows to false', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.aesthetics.hasPrismsOrWindows).toBe(false);
  });

  it('accepts optional shellColorSideA and shellColorSideB', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      aesthetics: {
        shellColor: 'black',
        shellColorSideA: 'red',
        shellColorSideB: 'blue',
        hasPrismsOrWindows: true
      }
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.aesthetics.shellColorSideA).toBe('red');
      expect(result.data.aesthetics.shellColorSideB).toBe('blue');
    }
  });
});

// ─── media sub-object ────────────────────────────────────────────────────────

describe('cassette schema – media', () => {
  it('defaults to an empty object when omitted', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.media).toEqual({});
  });

  it('accepts all optional media fields', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      media: {
        coverFront: '/img/cover.jpg',
        caseWithTape: '/img/case.jpg',
        tapeSideA: '/img/side-a.jpg',
        tapeSideB: '/img/side-b.jpg',
        jcardFullSpread: '/img/jcard.jpg',
        jcardExtraPanels: ['/img/extra1.jpg', '/img/extra2.jpg']
      }
    });
    expect(result.success).toBe(true);
  });
});

// ─── packaging sub-object ────────────────────────────────────────────────────

describe('cassette schema – packaging', () => {
  it('defaults all packaging flags to false', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.packaging.isDoubleBox).toBe(false);
      expect(result.data.packaging.isFourTapeBox).toBe(false);
      expect(result.data.packaging.isDoubleDuration).toBe(false);
    }
  });

  it('accepts explicit packaging flags', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      packaging: { isDoubleBox: true, isFourTapeBox: false, isDoubleDuration: true }
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.packaging.isDoubleBox).toBe(true);
      expect(result.data.packaging.isDoubleDuration).toBe(true);
    }
  });
});

// ─── pendingTasks enum array ──────────────────────────────────────────────────

describe('cassette schema – pendingTasks', () => {
  it('is absent when not provided', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.pendingTasks).toBeUndefined();
  });

  it('accepts all valid task values', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      pendingTasks: [
        'create-labels',
        'create-jcard',
        'paint-cassette',
        'record-audio',
        'repair-felt',
        'clean-grease'
      ]
    });
    expect(result.success).toBe(true);
  });

  it('rejects an unknown task value', () => {
    expect(
      cassetteSchema.safeParse({
        ...minimalValidCassette,
        pendingTasks: ['create-labels', 'unknown-task']
      }).success
    ).toBe(false);
  });
});

// ─── digitalSource sub-object (optional) ─────────────────────────────────────

describe('cassette schema – digitalSource', () => {
  it('is absent when not provided', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.digitalSource).toBeUndefined();
  });

  it('requires searchQuery when digitalSource is provided', () => {
    expect(
      cassetteSchema.safeParse({
        ...minimalValidCassette,
        digitalSource: { hasFlacAcquired: true }
      }).success
    ).toBe(false);
  });

  it('defaults hasFlacAcquired and isReadyToRecord to false', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      digitalSource: { searchQuery: 'My Bloody Valentine Loveless FLAC' }
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.digitalSource?.hasFlacAcquired).toBe(false);
      expect(result.data.digitalSource?.isReadyToRecord).toBe(false);
    }
  });

  it('accepts a fully specified digitalSource', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      digitalSource: {
        searchQuery: 'My Bloody Valentine Loveless FLAC',
        hasFlacAcquired: true,
        isReadyToRecord: true
      }
    });
    expect(result.success).toBe(true);
  });
});

// ─── contentStructure array (optional) ───────────────────────────────────────

describe('cassette schema – contentStructure', () => {
  it('is absent when not provided', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.contentStructure).toBeUndefined();
  });

  it('accepts valid content structure entries', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      contentStructure: [
        { albumTitle: 'Loveless', artist: 'My Bloody Valentine', side: 'A' },
        { albumTitle: 'Loveless (cont.)', artist: 'My Bloody Valentine', side: 'B', notes: 'Continues' }
      ]
    });
    expect(result.success).toBe(true);
  });

  it.each(['A', 'B', 'Both'] as const)(
    'accepts side "%s" in contentStructure',
    (side) => {
      const result = cassetteSchema.safeParse({
        ...minimalValidCassette,
        contentStructure: [{ albumTitle: 'Album', artist: 'Artist', side }]
      });
      expect(result.success).toBe(true);
    }
  );

  it('rejects an invalid side value in contentStructure', () => {
    expect(
      cassetteSchema.safeParse({
        ...minimalValidCassette,
        contentStructure: [{ albumTitle: 'Album', artist: 'Artist', side: 'C' }]
      }).success
    ).toBe(false);
  });

  it('requires albumTitle in each contentStructure entry', () => {
    expect(
      cassetteSchema.safeParse({
        ...minimalValidCassette,
        contentStructure: [{ artist: 'Artist', side: 'A' }]
      }).success
    ).toBe(false);
  });
});

// ─── catalogNumber (optional) ────────────────────────────────────────────────

describe('cassette schema – catalogNumber', () => {
  it('is absent when not provided', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.catalogNumber).toBeUndefined();
  });

  it('accepts a string catalogNumber', () => {
    const result = cassetteSchema.safeParse({ ...minimalValidCassette, catalogNumber: 'CRELMC076' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.catalogNumber).toBe('CRELMC076');
  });
});

// ─── year type validation ─────────────────────────────────────────────────────

describe('cassette schema – year', () => {
  it('rejects a string year', () => {
    expect(
      cassetteSchema.safeParse({ ...minimalValidCassette, year: '1991' }).success
    ).toBe(false);
  });

  it('accepts a float year (schema uses z.number() without .int())', () => {
    // The schema declares year as z.number(), which allows floats.
    // A stricter .int() constraint is not present in content.config.ts.
    expect(
      cassetteSchema.safeParse({ ...minimalValidCassette, year: 1991.5 }).success
    ).toBe(true);
  });
});

// ─── genres array ─────────────────────────────────────────────────────────────

describe('cassette schema – genres', () => {
  it('accepts multiple genres', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      genres: ['Shoegaze', 'Noise Rock', 'Dream Pop']
    });
    expect(result.success).toBe(true);
  });

  it('rejects a non-array genres value', () => {
    expect(
      cassetteSchema.safeParse({ ...minimalValidCassette, genres: 'Shoegaze' }).success
    ).toBe(false);
  });
});
