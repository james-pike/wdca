import { ObjectValues } from '../type-utils';

/**
 * Motion / transition preference. `motion-none` disables transitions and
 * animations; `motion-reduced` shortens them. `FULL` is the default.
 */
export const ThemeMotions = {
  FULL: 'motion-full',
  REDUCED: 'motion-reduced',
  NONE: 'motion-none',
} as const;

export type ThemeMotion = ObjectValues<typeof ThemeMotions>;
