import { ThemeBaseColors } from './theme-base-colors';
import { ThemeBorderRadiuses } from './theme-border-radiuses';
import { ThemeBorderWidths } from './theme-border-widths';
import { type ThemeConfig } from './theme-config.type';
import { ThemeShadows } from './theme-shadows';
import { ThemeContainerWidths } from './theme-container-widths';
import { ThemeFontFamilies } from './theme-font-families';
import { ThemeFonts } from './theme-fonts';
import { ThemeHeadingFontFamilies } from './theme-heading-font-families';
import { ThemeModes } from './theme-modes';
import { ThemeMotions } from './theme-motions';
import { ThemePrimaryColors } from './theme-primary-colors';
import { ThemeSecondaryColors } from './theme-secondary-colors';
import { ThemeStyles } from './theme-styles';
import { ThemeTrackings } from './theme-trackings';
import { ThemeTypeScales } from './theme-type-scales';

/**
 * Version marker for the portable theme string. It is a storage/transport
 * concern only — it is stripped on parse and never applied as a CSS class.
 */
export const THEME_STRING_VERSION = 'v2';

/**
 * The single source of truth for the theme schema.
 *
 * Each field maps to exactly one token in the theme string. A token is matched
 * back to its field either by `prefix` (most fields) or by exact membership in
 * `values` (the "bare" enums `mode` and `style`, which have no shared prefix).
 *
 * All prefixes are mutually exclusive — none is a prefix of another — so token
 * matching is order-independent and a positional layout is not needed.
 *
 * The array order defines the order tokens are emitted in `serializeThemeConfig`
 * and `toPortableString`. To add a new style dimension: add an enum file, add
 * its default to `DEFAULT_LIGHT`, append one entry here, and add its CSS.
 */
type FieldSpec = {
  key: keyof ThemeConfig;
  prefix?: string;
  values?: readonly string[];
};

const FIELDS: readonly FieldSpec[] = [
  { key: 'mode', values: Object.values(ThemeModes) },
  { key: 'font', prefix: 'font-' },
  { key: 'style', values: Object.values(ThemeStyles) },
  { key: 'baseColor', prefix: 'base-' },
  { key: 'primaryColor', prefix: 'primary-' },
  { key: 'secondaryColor', prefix: 'secondary-' },
  { key: 'borderRadius', prefix: 'border-radius-' },
  { key: 'borderWidth', prefix: 'border-width-' },
  { key: 'shadow', prefix: 'shadow-' },
  { key: 'fontFamily', prefix: 'qfont-' },
  { key: 'headingFontFamily', prefix: 'headfont-' },
  { key: 'typeScale', prefix: 'scale-' },
  { key: 'tracking', prefix: 'tracking-' },
  { key: 'containerWidth', prefix: 'container-' },
  { key: 'motion', prefix: 'motion-' },
] as const;

export const DEFAULT_LIGHT: Required<ThemeConfig> = {
  font: ThemeFonts.SANS,
  mode: ThemeModes.LIGHT,
  style: ThemeStyles.SIMPLE,
  baseColor: ThemeBaseColors.SLATE,
  primaryColor: ThemePrimaryColors.CYAN600,
  secondaryColor: ThemeSecondaryColors.FUCHSIA500,
  borderRadius: ThemeBorderRadiuses['BORDER-RADIUS-0'],
  borderWidth: ThemeBorderWidths.AUTO,
  shadow: ThemeShadows.AUTO,
  fontFamily: ThemeFontFamilies.SYSTEM,
  headingFontFamily: ThemeHeadingFontFamilies.INHERIT,
  typeScale: ThemeTypeScales.BASE,
  tracking: ThemeTrackings.NORMAL,
  containerWidth: ThemeContainerWidths.LG,
  motion: ThemeMotions.FULL,
};

export const DEFAULT_DARK: Required<ThemeConfig> = {
  ...DEFAULT_LIGHT,
  mode: ThemeModes.DARK,
};

/** Find the field a single token belongs to, or undefined if unrecognized. */
function fieldForToken(token: string): FieldSpec | undefined {
  return FIELDS.find((f) =>
    f.prefix ? token.startsWith(f.prefix) : f.values?.includes(token),
  );
}

/**
 * Parse any theme string into a fully-populated config. Accepts every format
 * we have ever produced:
 *  - the `'light'` / `'dark'` shorthands,
 *  - legacy positional strings (v1),
 *  - the full class list stored in the theme signal,
 *  - the sparse `v2` portable string (defaults omitted).
 *
 * Tokens are matched by prefix/membership, so order does not matter and
 * unrecognized tokens (e.g. the `v2` marker, or future fields) are ignored.
 * Missing fields fall back to their default.
 */
export function parseThemeString(
  value: string | string[] | undefined,
): Required<ThemeConfig> {
  if (!value || value === ThemeModes.LIGHT) return { ...DEFAULT_LIGHT };
  if (value === ThemeModes.DARK) return { ...DEFAULT_DARK };

  const tokens = Array.isArray(value) ? value : value.split(' ');
  // A dark token anywhere means we start from the dark defaults.
  const base = tokens.includes(ThemeModes.DARK) ? DEFAULT_DARK : DEFAULT_LIGHT;
  const config: Required<ThemeConfig> = { ...base };

  for (const token of tokens) {
    if (!token || token === THEME_STRING_VERSION) continue;
    const field = fieldForToken(token);
    if (field) config[field.key] = token;
  }
  return config;
}

/**
 * Serialize to the full, ordered class list applied to the DOM and persisted in
 * the theme signal. Every field is emitted (including defaults) because the CSS
 * relies on the class being present — e.g. the base `--border-radius` default
 * differs from the `border-radius-0` default class.
 */
export function serializeThemeConfig(config: ThemeConfig): string {
  return FIELDS.map((f) => config[f.key]).filter(Boolean).join(' ');
}

/** Alias clarifying intent at DOM/storage call sites. */
export const deriveClassList = serializeThemeConfig;

/**
 * Serialize to the compact, shareable `v2` string: version-tagged and with
 * default values omitted, so its length tracks the choices a user actually made
 * rather than the number of style options offered. Use this for share URLs,
 * export, and the external content API — not for the DOM class list.
 */
export function toPortableString(config: ThemeConfig): string {
  const tokens: string[] = [THEME_STRING_VERSION];
  for (const f of FIELDS) {
    const value = config[f.key];
    if (value && value !== DEFAULT_LIGHT[f.key]) tokens.push(value);
  }
  return tokens.join(' ');
}
