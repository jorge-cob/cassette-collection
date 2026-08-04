import { z } from 'zod';

const shellSchema = z.object({
  color: z.string().optional(),
  transparent: z.boolean().optional(),
  specialFeatures: z.array(z.string()).optional()
});

const physicalPropertiesSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  recordLabel: z.string().optional(),
  catalogNumber: z.string().optional(),
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

const trackSchema = z.object({
  title: z.string(),
  artist: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional()
});

const recordingItemSchema = z.object({
  type: z.string(),
  title: z.string(),
  artist: z.string().optional(),
  notes: z.string().optional(),
  duration: z.string().optional(),
  tracks: z.array(trackSchema).optional()
});

const recordingContentSchema = z.object({
  type: z.enum(['original', 'album-copy', 'mixtape', 'personal-recording', 'compilation']).optional(),
  sideA: z.array(recordingItemSchema).optional(),
  sideB: z.array(recordingItemSchema).optional()
});

const jcardSchema = z.object({
  status: z.enum(['missing', 'handwritten', 'designed', 'printed']).optional(),
  image: z.string().optional(),
  text: z.string().optional()
});

const labelSchema = z.object({
  status: z.enum(['missing', 'handwritten', 'designed', 'printed']).optional(),
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
  notes: z.string().optional()
});

const projectSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'done', 'blocked']).default('pending'),
  tasks: z.array(taskSchema).optional(),
  notes: z.string().optional(),
  completedAt: z.string().optional()
});

const locationSchema = z.object({
  physical: z.object({
    shelf: z.string().optional(),
    box: z.string().optional(),
    position: z.number().optional()
  }).optional(),
  virtualCollections: z.record(z.union([z.string(), z.array(z.string())])).optional()
});

const metadataSchema = z.object({
  genres: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional()
});

export const cassetteSchema = z.object({
  title: z.string(),
  artist: z.string(),
  year: z.number().int(),

  physicalProperties: physicalPropertiesSchema.optional(),
  recordingContent: recordingContentSchema,
  artwork: artworkSchema.optional(),
  history: z.array(historyItemSchema).optional(),
  project: projectSchema.optional(),
  location: locationSchema.optional(),
  metadata: metadataSchema.optional()
});

export default cassetteSchema;
