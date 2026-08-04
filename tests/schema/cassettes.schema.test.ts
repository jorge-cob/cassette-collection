import { describe, it, expect } from 'vitest';
import cassetteSchema from '../../src/schemas/cassette.schema';

const minimalValidCassette = {
  title: 'Ceci Jay Simpson',
  artist: 'Cecilio G',
  year: 2022,
  recordingContent: {
    type: 'personal-recording',
    sideA: [],
    sideB: []
  }
};

describe('cassette schema', () => {
  it('parses a minimal valid cassette', () => {
    const result = cassetteSchema.safeParse(minimalValidCassette);
    expect(result.success).toBe(true);
  });

  it('rejects missing title', () => {
    const { title, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('rejects missing artist', () => {
    const { artist, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('rejects missing year', () => {
    const { year, ...rest } = minimalValidCassette;
    expect(cassetteSchema.safeParse(rest).success).toBe(false);
  });

  it('rejects non-integer year', () => {
    expect(cassetteSchema.safeParse({ ...minimalValidCassette, year: 2022.5 }).success).toBe(false);
  });

  it('accepts optional physical properties', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      physicalProperties: {
        brand: 'Maxell',
        model: 'XLII 90',
        tapeType: 'Type II',
        shell: { color: 'Black', transparent: true },
        condition: 'Excellent',
        notes: 'Freshly restored shell'
      }
    });
    expect(result.success).toBe(true);
  });

  it('accepts recording items with tracks', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      recordingContent: {
        type: 'compilation',
        sideA: [
          {
            type: 'mixtape',
            title: 'Side A Mix',
            artist: 'Various Artists',
            notes: 'A curated mix',
            duration: '45:00',
            tracks: [
              { title: 'Track 1', duration: '3:45' },
              { title: 'Track 2', artist: 'Artist B', duration: '4:20' }
            ]
          }
        ],
        sideB: []
      }
    });
    expect(result.success).toBe(true);
  });

  it('accepts artwork with jcard and labels', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      artwork: {
        jcard: { status: 'designed', image: '/cassettes/jcard.jpg', text: 'Handwritten notes' },
        labels: {
          sideA: { status: 'designed', text: 'Side A', image: '/cassettes/label-a.jpg' },
          sideB: { status: 'designed', text: 'Side B', image: '/cassettes/label-b.jpg' }
        }
      }
    });
    expect(result.success).toBe(true);
  });

  it('accepts history entries', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      history: [
        { type: 'restoration', date: '2026-08-04', description: 'Cleaned tape path' }
      ]
    });
    expect(result.success).toBe(true);
  });

  it('accepts project details and tasks', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      project: {
        status: 'in_progress',
        notes: 'Waiting for new J-card design',
        tasks: [
          { type: 'design-jcard', status: 'in_progress' },
          { type: 'print-label', status: 'pending' }
        ]
      }
    });
    expect(result.success).toBe(true);
  });

  it('accepts physical and virtual location data', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      location: {
        physical: { shelf: 'Trap', box: 'Box 1', position: 3 },
        virtualCollections: { genre: 'Trap Rap', restored: ['yes'] }
      }
    });
    expect(result.success).toBe(true);
  });

  it('accepts metadata with genres and tags', () => {
    const result = cassetteSchema.safeParse({
      ...minimalValidCassette,
      metadata: { genres: ['Trap Rap'], tags: ['custom tape', 'project'] }
    });
    expect(result.success).toBe(true);
  });
});
