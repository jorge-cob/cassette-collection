import { z } from 'zod';

// Reusable small schemas
const shellSchema = z.object({
  color: z.string().optional(),
  transparency: z.enum(['opaque', 'translucent', 'transparent']).optional(),
  specialFeatures: z.array(z.string()).optional()
});

const physicalPropertiesSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  tapeType: z.enum(['Type I', 'Type II', 'Type IV']).optional(),
  shell: shellSchema.optional(),
  condition: z.enum([
    'Excellent',
    'Mint Condition',
    'Mechanically Damaged',
    'Missing J-Card',
    'Rescued (Needs Cleaning)'
  ]).optional(),
  notes: z.string().optional()
});

const sideItemSchema = z.object({
  artist: z.string(),
  title: z.string(),
  type: z.string().optional(),
  notes: z.string().optional(),
  duration: z.string().optional()
});

const recordingContentSchema = z.object({
  type: z.enum(['original', 'album-copy', 'mixtape', 'personal-recording', 'compilation']).optional(),
  sides: z.object({
    A: z.array(sideItemSchema).optional(),
    B: z.array(sideItemSchema).optional()
  }).optional()
});

const jcardSchema = z.object({
  status: z.enum(['missing', 'handwritten', 'designed', 'printed']).optional(),
  images: z.object({ front: z.string().optional(), back: z.string().optional() }).optional(),
  handwrittenText: z.string().optional()
});

const labelSchema = z.object({
  type: z.string().optional(),
  image: z.string().optional(),
  text: z.string().optional()
});

const artworkSchema = z.object({
  jcard: jcardSchema.optional(),
  labels: z.object({ sideA: labelSchema.optional(), sideB: labelSchema.optional() }).optional()
});

const historyItemSchema = z.object({
  type: z.string(),
  date: z.string().optional(),
  description: z.string()
});

const taskSchema = z.object({
  type: z.string(),
  status: z.enum(['pending', 'in_progress', 'done', 'blocked']).default('pending'),
  notes: z.string().optional(),
  createdAt: z.string().optional(),
  dueDate: z.string().optional()
});

const locationSchema = z.object({
  physical: z.object({ shelf: z.string().optional(), box: z.string().optional(), position: z.number().optional() }).optional(),
  virtualCollections: z.record(z.string()).optional()
});

const metadataSchema = z.object({
  genres: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  recordLabel: z.string().optional(),
  catalogNumber: z.string().optional(),
  notes: z.string().optional(),
  legacy: z.record(z.any()).optional()
});

export const cassetteSchema = z.object({
  // Keep core identifiers at top-level for compatibility
  title: z.string(),
  artist: z.string(),
  year: z.number(),

  // New structured areas
  physicalProperties: physicalPropertiesSchema.optional(),
  recordingContent: recordingContentSchema.optional(),
  artwork: artworkSchema.optional(),
  history: z.array(historyItemSchema).optional(),
  tasks: z.array(taskSchema).optional(),
  location: locationSchema.optional(),
  metadata: metadataSchema.optional(),

  // Compatibility / convenience top-level fields (optional) kept for existing pages/tests
  genres: z.array(z.string()).optional(),
  tapeType: z.enum(['Type I', 'Type II', 'Type IV']).optional(),
  aesthetics: z.object({
    shellColor: z.string().optional(),
    shellColorSideA: z.string().optional(),
    shellColorSideB: z.string().optional(),
    hasPrismsOrWindows: z.boolean().default(false)
  }).optional(),
  originType: z.enum(['Original', 'Recorded from Scratch', 'Transplant']).optional(),
  tags: z.array(z.string()).optional(),
  packaging: z.object({
    isDoubleBox: z.boolean().default(false),
    isFourTapeBox: z.boolean().default(false),
    isDoubleDuration: z.boolean().default(false)
  }).optional(),
  transplantDetails: z.object({
    tapeSource: z.enum(['Used/Old Tape', 'New Blank Tape']).optional(),
    recordedOver: z.boolean().default(false),
    notes: z.string().optional()
  }).optional(),
  // Compatibility: old shelving field (kept as optional for migration)
  shelving: z.object({
    physical: z.object({ name: z.string().optional(), shelf: z.string().optional(), position: z.number().optional() }).optional(),
    byGenre: z.string().optional(),
    byArtist: z.string().optional(),
    byYear: z.string().optional(),
    byMood: z.string().optional(),
    byCondition: z.string().optional(),
    custom1: z.string().optional(),
    custom2: z.string().optional(),
    custom3: z.string().optional()
  }).optional(),
  pendingTasks: z.array(z.enum([
    'create-labels',
    'create-jcard',
    'paint-cassette',
    'record-audio',
    'repair-felt',
    'clean-grease'
  ])).optional(),
  isDonor: z.boolean().optional(),
  isCustomArt: z.boolean().optional(),
  digitalSource: z.object({
    searchQuery: z.string().optional(),
    hasFlacAcquired: z.boolean().default(false),
    isReadyToRecord: z.boolean().default(false)
  }).optional(),
  contentStructure: z.array(
    z.object({
      albumTitle: z.string(),
      artist: z.string(),
      side: z.enum(['A','B','Both']),
      notes: z.string().optional()
    })
  ).optional()
});

export default cassetteSchema;
