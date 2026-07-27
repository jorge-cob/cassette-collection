import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Lightweight front-matter parser ─────────────────────────────────────────
// Astro's loader is not available in unit-test scope, so we parse the YAML
// front-matter ourselves with a simple extractor – no extra dependencies needed.

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  // Convert the minimal YAML subset used in fixture files
  const lines = match[1].split('\n');
  const result: Record<string, unknown> = {};
  let currentKey = '';
  let arrayBuffer: string[] | null = null;

  for (const line of lines) {
    const kvMatch = line.match(/^([a-zA-Z][a-zA-Z0-9_]*):\s*(.*)$/);
    if (kvMatch) {
      if (arrayBuffer !== null && currentKey) {
        result[currentKey] = arrayBuffer;
        arrayBuffer = null;
      }
      const [, key, value] = kvMatch;
      currentKey = key;
      if (value.trim() === '') {
        arrayBuffer = [];
      } else {
        result[key] = coerce(value.trim());
      }
    } else if (arrayBuffer !== null) {
      const itemMatch = line.match(/^\s+-\s+(.+)$/);
      if (itemMatch) arrayBuffer.push(itemMatch[1].trim().replace(/^['"]|['"]$/g, ''));
    }
  }
  if (arrayBuffer !== null && currentKey) result[currentKey] = arrayBuffer;
  return result;
}

function coerce(value: string): unknown {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  return value.replace(/^['"]|['"]$/g, '');
}

// ─── Minimal schema used for fixture validation ───────────────────────────────
// We only assert the top-level required primitives to avoid re-implementing
// the full nested-object YAML parser; the nested rules are covered by
// tests/schema/cassettes.schema.test.ts.

const cassetteFrontmatterSchema = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  year: z.number().int().gte(1900).lte(new Date().getFullYear() + 1),
  tapeType: z.enum(['Type I', 'Type II', 'Type IV']),
  originType: z.enum(['Original', 'Recorded from Scratch', 'Transplant'])
});

// ─── Helper ───────────────────────────────────────────────────────────────────

function getCassetteFiles(): string[] {
  const dir = path.resolve('src/content/cassettes');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(dir, f));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('cassette fixture files', () => {
  const files = getCassetteFiles();

  it('content/cassettes directory exists', () => {
    expect(fs.existsSync(path.resolve('src/content/cassettes'))).toBe(true);
  });

  if (files.length === 0) {
    it.skip('no cassette .md files found – skipping fixture validation', () => {});
    return;
  }

  for (const file of files) {
    const basename = path.basename(file);

    describe(`fixture: ${basename}`, () => {
      const raw = fs.readFileSync(file, 'utf-8');
      const fm = parseFrontmatter(raw);

      it('has a valid front-matter block', () => {
        expect(raw.trim().startsWith('---')).toBe(true);
      });

      it('has a title', () => {
        expect(typeof fm.title).toBe('string');
        expect((fm.title as string).length).toBeGreaterThan(0);
      });

      it('has a valid year', () => {
        expect(typeof fm.year).toBe('number');
        expect(fm.year as number).toBeGreaterThanOrEqual(1900);
      });

      it('has a valid tapeType', () => {
        expect(['Type I', 'Type II', 'Type IV']).toContain(fm.tapeType);
      });

      it('has a valid originType', () => {
        expect([
          'Original',
          'Recorded from Scratch',
          'Transplant'
        ]).toContain(fm.originType);
      });

      it('passes the cassette front-matter schema', () => {
        const result = cassetteFrontmatterSchema.safeParse(fm);
        if (!result.success) {
          // Surface Zod error messages to make failures readable
          console.error(result.error.format());
        }
        expect(result.success).toBe(true);
      });
    });
  }
});
