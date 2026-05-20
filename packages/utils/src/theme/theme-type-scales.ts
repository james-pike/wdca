import { ObjectValues } from '../type-utils';

/**
 * Global type scale — a multiplier applied to the root font size via the
 * `--font-scale` variable. `BASE` is the default (1x).
 */
export const ThemeTypeScales = {
  SM: 'scale-sm',
  BASE: 'scale-base',
  LG: 'scale-lg',
} as const;

export type ThemeTypeScale = ObjectValues<typeof ThemeTypeScales>;
