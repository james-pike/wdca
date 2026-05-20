import { ObjectValues } from '../type-utils';

/**
 * Border width override. `AUTO` is the default and defers to whatever the style
 * preset (simple/brutalist/neumorphic) sets. The explicit values override the
 * preset's `--border-width` (via `!important` in CSS). Distinct `border-width-`
 * prefix so it never collides with the `border-radius-` tokens.
 */
export const ThemeBorderWidths = {
  AUTO: 'border-width-auto',
  NONE: 'border-width-0',
  THIN: 'border-width-1',
  THICK: 'border-width-2',
} as const;

export type ThemeBorderWidth = ObjectValues<typeof ThemeBorderWidths>;
