import { ObjectValues } from '../type-utils';

/**
 * Letter spacing (tracking), applied via the `--tracking` variable.
 * `NORMAL` is the default (0).
 */
export const ThemeTrackings = {
  TIGHT: 'tracking-tight',
  NORMAL: 'tracking-normal',
  WIDE: 'tracking-wide',
} as const;

export type ThemeTracking = ObjectValues<typeof ThemeTrackings>;
