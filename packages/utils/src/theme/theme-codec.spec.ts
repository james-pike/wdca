import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DARK,
  DEFAULT_LIGHT,
  deriveClassList,
  parseThemeString,
  serializeThemeConfig,
  toPortableString,
} from './theme-codec';

describe('parseThemeString', () => {
  it('returns light defaults for empty / "light"', () => {
    expect(parseThemeString(undefined)).toEqual(DEFAULT_LIGHT);
    expect(parseThemeString('')).toEqual(DEFAULT_LIGHT);
    expect(parseThemeString('light')).toEqual(DEFAULT_LIGHT);
  });

  it('returns dark defaults for "dark"', () => {
    expect(parseThemeString('dark')).toEqual(DEFAULT_DARK);
  });

  it('parses a legacy v1 positional string (backward compat)', () => {
    const legacy =
      'font-sans light simple base-slate primary-cyan-600 border-radius-0 secondary-fuchsia-500 qfont-system';
    expect(parseThemeString(legacy)).toEqual(DEFAULT_LIGHT);
  });

  it('parses a legacy v1 string with non-default values', () => {
    const legacy =
      'font-serif dark brutalist base-zinc primary-red-500 border-radius-1 secondary-lime-400 qfont-inter';
    const cfg = parseThemeString(legacy);
    expect(cfg).toMatchObject({
      font: 'font-serif',
      mode: 'dark',
      style: 'brutalist',
      baseColor: 'base-zinc',
      primaryColor: 'primary-red-500',
      borderRadius: 'border-radius-1',
      secondaryColor: 'secondary-lime-400',
      fontFamily: 'qfont-inter',
    });
    // New fields fall back to defaults when absent from an old string.
    expect(cfg.headingFontFamily).toBe(DEFAULT_LIGHT.headingFontFamily);
    expect(cfg.motion).toBe(DEFAULT_LIGHT.motion);
  });

  it('is order-independent and tolerates unknown tokens', () => {
    const shuffled = 'primary-red-500 v2 dark some-future-token base-zinc';
    const cfg = parseThemeString(shuffled);
    expect(cfg.mode).toBe('dark');
    expect(cfg.primaryColor).toBe('primary-red-500');
    expect(cfg.baseColor).toBe('base-zinc');
  });

  it('accepts a string[] (as stored in the theme signal)', () => {
    expect(parseThemeString(['dark', 'primary-red-500'])).toMatchObject({
      mode: 'dark',
      primaryColor: 'primary-red-500',
    });
  });

  it('does not confuse font / fontFamily / headingFontFamily prefixes', () => {
    const cfg = parseThemeString('font-mono qfont-inter headfont-lora');
    expect(cfg.font).toBe('font-mono');
    expect(cfg.fontFamily).toBe('qfont-inter');
    expect(cfg.headingFontFamily).toBe('headfont-lora');
  });

  it('does not confuse border-radius / border-width prefixes', () => {
    const cfg = parseThemeString('border-radius-1 border-width-2');
    expect(cfg.borderRadius).toBe('border-radius-1');
    expect(cfg.borderWidth).toBe('border-width-2');
  });

  it('parses the shadow override', () => {
    expect(parseThemeString('shadow-strong').shadow).toBe('shadow-strong');
  });
});

describe('serializeThemeConfig (full class list)', () => {
  it('emits every field including defaults', () => {
    const out = serializeThemeConfig(DEFAULT_LIGHT).split(' ');
    expect(out).toContain('border-radius-0');
    expect(out).toContain('qfont-system');
    expect(out).toContain('motion-full');
    expect(out).toContain('light');
  });

  it('deriveClassList is the same function', () => {
    expect(deriveClassList).toBe(serializeThemeConfig);
  });
});

describe('toPortableString (sparse v2)', () => {
  it('emits only the version marker for an all-default config', () => {
    expect(toPortableString(DEFAULT_LIGHT)).toBe('v2');
  });

  it('emits only non-default choices', () => {
    const cfg = { ...DEFAULT_LIGHT, primaryColor: 'primary-red-500', motion: 'motion-none' };
    expect(toPortableString(cfg)).toBe('v2 primary-red-500 motion-none');
  });

  it('emits the dark mode token (non-default)', () => {
    expect(toPortableString(DEFAULT_DARK)).toBe('v2 dark');
  });
});

describe('round-trip', () => {
  it('config -> portable -> config is stable', () => {
    const cfg = {
      ...DEFAULT_LIGHT,
      mode: 'dark',
      style: 'neumorphic',
      primaryColor: 'primary-violet-600',
      headingFontFamily: 'headfont-playfair-display',
      typeScale: 'scale-lg',
      tracking: 'tracking-wide',
      containerWidth: 'container-sm',
      motion: 'motion-reduced',
    };
    expect(parseThemeString(toPortableString(cfg))).toEqual(cfg);
  });

  it('config -> full class list -> config is stable', () => {
    const cfg = {
      ...DEFAULT_LIGHT,
      baseColor: 'base-stone',
      fontFamily: 'qfont-roboto',
    };
    expect(parseThemeString(serializeThemeConfig(cfg))).toEqual(cfg);
  });

  it('portable string stays short even with several non-default choices', () => {
    const cfg = {
      ...DEFAULT_LIGHT,
      primaryColor: 'primary-red-500',
      secondaryColor: 'secondary-lime-400',
      borderRadius: 'border-radius-1',
      motion: 'motion-none',
    };
    // 4 choices + version marker — far below any URL/storage ceiling.
    expect(toPortableString(cfg).length).toBeLessThan(80);
  });
});
