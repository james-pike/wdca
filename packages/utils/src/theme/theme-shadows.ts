import { ObjectValues } from '../type-utils';

/**
 * Elevation / shadow scale. `AUTO` is the default and defers to the style
 * preset's shadow scale. `NONE` flattens everything; `SOFT` and `STRONG`
 * replace the whole `--shadow-*` scale (via `!important`) with a diffuse or a
 * punchier set, independent of the preset.
 */
export const ThemeShadows = {
  AUTO: 'shadow-auto',
  NONE: 'shadow-none',
  SOFT: 'shadow-soft',
  STRONG: 'shadow-strong',
} as const;

export type ThemeShadow = ObjectValues<typeof ThemeShadows>;
