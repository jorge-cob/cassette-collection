import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Helper ───────────────────────────────────────────────────────────────────

function readPage(relativePath: string): string {
  const fullPath = path.resolve(relativePath);
  if (!fs.existsSync(fullPath)) return '';
  return fs.readFileSync(fullPath, 'utf-8');
}

// ─── Index page ───────────────────────────────────────────────────────────────

describe('pages/index.astro', () => {
  const src = readPage('src/pages/index.astro');

  it('exists', () => {
    expect(fs.existsSync(path.resolve('src/pages/index.astro'))).toBe(true);
  });

  it('imports the Layout component', () => {
    expect(src).toContain("import Layout from '../layouts/Layout.astro'");
  });

  it('renders a <Layout> with a title prop', () => {
    expect(src).toMatch(/<Layout\s+title=/);
  });

  it('contains a top-level heading', () => {
    expect(src).toMatch(/<h1/);
  });

  it('mentions "Cassette Library"', () => {
    expect(src).toContain('Cassette Library');
  });
});

// ─── Cassette detail page ─────────────────────────────────────────────────────

describe('pages/cassettes/[slug].astro', () => {
  const src = readPage('src/pages/cassettes/[slug].astro');

  it('exists', () => {
    expect(fs.existsSync(path.resolve('src/pages/cassettes/[slug].astro'))).toBe(true);
  });

  it('imports getCollection from astro:content', () => {
    expect(src).toMatch(/getCollection/);
  });

  it('imports render from astro:content', () => {
    expect(src).toMatch(/\brender\b/);
  });

  it('exports getStaticPaths', () => {
    expect(src).toContain('getStaticPaths');
  });

  it('maps slug from cassette.id', () => {
    expect(src).toContain('cassette.id');
  });

  it('renders cassette title in an <h1>', () => {
    expect(src).toMatch(/<h1[^>]*>.*cassette\.data\.title.*<\/h1>/s);
  });

  it('renders artist and year', () => {
    expect(src).toContain('cassette.data.artist');
    expect(src).toContain('cassette.data.year');
  });

  it('renders the markdown <Content />', () => {
    expect(src).toMatch(/<Content\s*\/>/);
  });
});

// ─── Admin – new cassette page ────────────────────────────────────────────────

describe('pages/admin/new.astro', () => {
  const src = readPage('src/pages/admin/new.astro');

  it('exists', () => {
    expect(fs.existsSync(path.resolve('src/pages/admin/new.astro'))).toBe(true);
  });

  it('imports the Layout component', () => {
    expect(src).toContain("import Layout from '../../layouts/Layout.astro'");
  });

  it('renders a <Layout> with "Add Cassette" title', () => {
    expect(src).toContain('Add Cassette');
  });

  it('contains an <h1> heading', () => {
    expect(src).toMatch(/<h1/);
  });
});

// ─── Admin – edit cassette page ───────────────────────────────────────────────

describe('pages/admin/edit/[slug].astro', () => {
  const src = readPage('src/pages/admin/edit/[slug].astro');

  it('exists', () => {
    expect(fs.existsSync(path.resolve('src/pages/admin/edit/[slug].astro'))).toBe(true);
  });

  it('imports getCollection from astro:content', () => {
    expect(src).toMatch(/getCollection/);
  });

  it('exports getStaticPaths', () => {
    expect(src).toContain('getStaticPaths');
  });

  it('maps slug from cassette.id', () => {
    expect(src).toContain('cassette.id');
  });

  it('renders cassette title in the heading', () => {
    expect(src).toContain('cassette.data.title');
  });

  it('prefixes the page title with "Edit:"', () => {
    expect(src).toMatch(/Edit:/);
  });
});
