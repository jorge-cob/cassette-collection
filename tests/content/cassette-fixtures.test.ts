import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import * as fs from 'node:fs';
import * as path from 'node:path';

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const result: Record<string, unknown> = {};
  let currentKey = '';
  let arrayBuffer: unknown[] | null = null;

  for (const line of lines) {
    const kvMatch = line.match(/^([a-zA-Z][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
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
      if (itemMatch) arrayBuffer.push(itemMatch[1].trim().replace(/^['\"]|['\"]$/g, ''));
    }
  }

  if (arrayBuffer !== null && currentKey) result[currentKey] = arrayBuffer;
  return result;
}

function coerce(value: string): unknown {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+$/.test(value)) return parseInt(value, 10);
  return value.replace(/^['\"]|['\"]$/g, '');
}

const cassetteFrontmatterSchema = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  year: z.number().int().gte(1900).lte(new Date().getFullYear() + 1)
});

function getCassetteFiles(): string[] {
  const dir = path.resolve('src/content/cassettes');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => path.join(dir, f));
}

describe('cassette fixture files', () => {
  const files = getCassetteFiles();

  it('src/content/cassettes exists', () => {
    expect(fs.existsSync(path.resolve('src/content/cassettes'))).toBe(true);
  });

  if (files.length === 0) {
    it.skip('no cassette .md files found – skipping fixture validation', () => {});
    return;
  }

  for (const file of files) {
    const basename = path.basename(file);
    describe(basename, () => {
      const raw = fs.readFileSync(file, 'utf-8');
      const fm = parseFrontmatter(raw);

      it('contains frontmatter', () => {
        expect(raw.trim().startsWith('---')).toBe(true);
      });

      it('has a title', () => {
        expect(typeof fm.title).toBe('string');
        expect((fm.title as string).length).toBeGreaterThan(0);
      });

      it('has an artist', () => {
        expect(typeof fm.artist).toBe('string');
        expect((fm.artist as string).length).toBeGreaterThan(0);
      });

      it('has a valid year', () => {
        expect(typeof fm.year).toBe('number');
        expect((fm.year as number) >= 1900).toBe(true);
      });

      it('has a valid top-level frontmatter structure', () => {
        const result = cassetteFrontmatterSchema.safeParse(fm);
        if (!result.success) {
          console.error(result.error.format());
        }
        expect(result.success).toBe(true);
      });
    });
  }
});
