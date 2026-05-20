import { ObjectValues } from '../type-utils';

/**
 * Max content width, applied via the `--container-max` variable.
 * `LG` is the default.
 */
export const ThemeContainerWidths = {
  SM: 'container-sm',
  MD: 'container-md',
  LG: 'container-lg',
  FULL: 'container-full',
} as const;

export type ThemeContainerWidth = ObjectValues<typeof ThemeContainerWidths>;
