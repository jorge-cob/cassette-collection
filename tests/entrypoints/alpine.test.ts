import { describe, it, expect, vi } from 'vitest';
import type { Alpine } from 'alpinejs';
import alpineEntrypoint from '../../src/entrypoints/alpine';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function createAlpineMock(): Alpine {
  return {
    store: vi.fn(),
    data: vi.fn(),
    directive: vi.fn(),
    magic: vi.fn(),
    plugin: vi.fn(),
  } as unknown as Alpine;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('alpine entrypoint', () => {
  it('is a callable function', () => {
    expect(typeof alpineEntrypoint).toBe('function');
  });

  it('executes without throwing', () => {
    const alpine = createAlpineMock();
    expect(() => alpineEntrypoint(alpine)).not.toThrow();
  });

  it('does not register any global stores on a fresh mount', () => {
    const alpine = createAlpineMock();
    alpineEntrypoint(alpine);
    expect(alpine.store).not.toHaveBeenCalled();
  });

  it('does not register any custom directives on a fresh mount', () => {
    const alpine = createAlpineMock();
    alpineEntrypoint(alpine);
    expect(alpine.directive).not.toHaveBeenCalled();
  });

  it('does not register any magic helpers on a fresh mount', () => {
    const alpine = createAlpineMock();
    alpineEntrypoint(alpine);
    expect(alpine.magic).not.toHaveBeenCalled();
  });

  it('does not register any data components on a fresh mount', () => {
    const alpine = createAlpineMock();
    alpineEntrypoint(alpine);
    expect(alpine.data).not.toHaveBeenCalled();
  });

  it('returns undefined (no explicit return value needed)', () => {
    const alpine = createAlpineMock();
    const result = alpineEntrypoint(alpine);
    expect(result).toBeUndefined();
  });
});
