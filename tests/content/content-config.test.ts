import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Tests ────────────────────────────────────────────────────────────────────
// These tests validate the content configuration file's structural integrity
// without importing Astro-specific runtime modules (astro:content).

describe('content.config.ts – file structure', () => {
  const configPath = path.resolve('src/content.config.ts');
  let source = '';

  it('content.config.ts exists', () => {
    expect(fs.existsSync(configPath)).toBe(true);
    source = fs.readFileSync(configPath, 'utf-8');
  });

  it('exports a named "collections" object', () => {
    expect(source).toMatch(/export\s+const\s+collections/);
  });

  it('defines the "cassettes" collection', () => {
    expect(source).toMatch(/cassettes\s*:/);
  });

  it('uses defineCollection', () => {
    expect(source).toMatch(/defineCollection\s*\(/);
  });

  it('uses the glob loader', () => {
    expect(source).toMatch(/glob\s*\(/);
  });

  it('points the glob to the correct base directory', () => {
    expect(source).toContain('./src/content/cassettes');
  });

  it('matches *.md files in the glob pattern', () => {
    expect(source).toMatch(/\*\*\/\*\.md/);
  });

  it('imports zod for schema validation', () => {
    expect(source).toMatch(/from\s+['"]astro:content['"]/);
    expect(source).toMatch(/\bz\b/);
  });
});

describe('content.config.ts – schema fields', () => {
  const configPath = path.resolve('src/content.config.ts');
  const source = fs.existsSync(configPath)
    ? fs.readFileSync(configPath, 'utf-8')
    : '';

  const requiredFields = [
    'title',
    'artist',
    'year',
    'genres',
    'tapeType',
    'aesthetics',
    'originType',
    'tags',
    'packaging'
  ];

  for (const field of requiredFields) {
    it(`schema declares required field "${field}"`, () => {
      expect(source).toContain(field);
    });
  }

  it('schema declares the tapeType enum with Type I, Type II, Type IV', () => {
    expect(source).toContain('Type I');
    expect(source).toContain('Type II');
    expect(source).toContain('Type IV');
  });

  it('schema declares all condition variants', () => {
    expect(source).toContain('Excellent');
    expect(source).toContain('Mint Condition');
    expect(source).toContain('Mechanically Damaged');
    expect(source).toContain('Missing J-Card');
    expect(source).toContain('Rescued (Needs Cleaning)');
  });

  it('schema declares shelving structure with flexible classifications', () => {
    expect(source).toContain('shelving');
    expect(source).toContain('physical');
    expect(source).toContain('byGenre');
    expect(source).toContain('byArtist');
    });  it('schema declares all pending task values', () => {
    const tasks = [
      'create-labels',
      'create-jcard',
      'paint-cassette',
      'record-audio',
      'repair-felt',
      'clean-grease'
    ];
    for (const task of tasks) {
      expect(source).toContain(task);
    }
  });

  it('schema declares isDonor boolean', () => {
    expect(source).toContain('isDonor');
  });

  it('schema declares isCustomArt boolean', () => {
    expect(source).toContain('isCustomArt');
  });

  it('schema declares digitalSource as optional', () => {
    expect(source).toContain('digitalSource');
    expect(source).toContain('optional');
  });

  it('schema declares contentStructure as optional', () => {
    expect(source).toContain('contentStructure');
  });
});
