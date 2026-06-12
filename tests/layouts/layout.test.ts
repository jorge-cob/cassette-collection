import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Helper ───────────────────────────────────────────────────────────────────

const layoutPath = path.resolve('src/layouts/Layout.astro');
const src = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf-8') : '';

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('layouts/Layout.astro', () => {
  it('exists', () => {
    expect(fs.existsSync(layoutPath)).toBe(true);
  });

  it('declares a Props interface with a required title field', () => {
    expect(src).toMatch(/interface\s+Props/);
    expect(src).toContain('title: string');
  });

  it('declares an optional description field with a default value', () => {
    expect(src).toContain('description?:');
    expect(src).toContain("= 'Cassette Workshop'");
  });

  it('renders a valid HTML5 doctype', () => {
    expect(src).toMatch(/<!doctype\s+html>/i);
  });

  it('sets the lang attribute on <html>', () => {
    expect(src).toMatch(/<html\s+lang=/);
  });

  it('includes a UTF-8 charset meta tag', () => {
    expect(src).toMatch(/<meta\s+charset="utf-8"\s*\/>/i);
  });

  it('includes a viewport meta tag', () => {
    expect(src).toMatch(/<meta\s+name="viewport"/);
  });

  it('includes a description meta tag', () => {
    expect(src).toMatch(/<meta\s+name="description"/);
  });

  it('uses the Astro generator meta tag', () => {
    expect(src).toContain('Astro.generator');
  });

  it('sets the page <title> using the title prop', () => {
    expect(src).toMatch(/<title>.*\{title\}.*<\/title>/s);
  });

  it('appends the site name to the <title>', () => {
    expect(src).toContain('My Cassette Workshop');
  });

  it('links the SVG favicon', () => {
    expect(src).toContain('/favicon.svg');
  });

  it('imports global CSS', () => {
    expect(src).toContain("import '../styles/global.css'");
  });

  it('has a <body> element', () => {
    expect(src).toMatch(/<body\b/);
  });

  it('applies dark background class on <body>', () => {
    expect(src).toContain('bg-neutral-950');
  });

  it('provides a <slot /> for page content', () => {
    expect(src).toMatch(/<slot\s*\/>/);
  });
});
