import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

// These tests validate that the Astro content configuration exists and points to the cassette schema.

describe('content.config.ts', () => {
  const configPath = path.resolve('src/content.config.ts');
  const schemaPath = path.resolve('src/schemas/cassette.schema.ts');
  let source = '';

  it('exists and includes the cassette collection', () => {
    expect(fs.existsSync(configPath)).toBe(true);
    source = fs.readFileSync(configPath, 'utf-8');
    expect(source).toContain('cassettes');
    expect(source).toContain('defineCollection');
  });

  it('loads the cassette schema from src/schemas/cassette.schema.ts', () => {
    expect(source).toContain("./schemas/cassette.schema");
    expect(fs.existsSync(schemaPath)).toBe(true);
  });
});
