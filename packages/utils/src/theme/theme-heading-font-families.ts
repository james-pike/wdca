import { ObjectValues } from '../type-utils';

/**
 * Heading font family, independent of the body `ThemeFontFamilies`. Uses the
 * `headfont-` prefix so it never collides with the body `qfont-` tokens in the
 * theme string. `INHERIT` means "use the body font" and is the default.
 */
export const ThemeHeadingFontFamilies = {
  INHERIT: 'headfont-inherit',
  SYSTEM: 'headfont-system',
  INTER: 'headfont-inter',
  ROBOTO: 'headfont-roboto',
  OPEN_SANS: 'headfont-open-sans',
  POPPINS: 'headfont-poppins',
  MONTSERRAT: 'headfont-montserrat',
  DM_SANS: 'headfont-dm-sans',
  SPACE_GROTESK: 'headfont-space-grotesk',
  NUNITO: 'headfont-nunito',
  WORK_SANS: 'headfont-work-sans',
  LORA: 'headfont-lora',
  PLAYFAIR_DISPLAY: 'headfont-playfair-display',
  MERRIWEATHER: 'headfont-merriweather',
  JETBRAINS_MONO: 'headfont-jetbrains-mono',
  FIRA_CODE: 'headfont-fira-code',
} as const;

export type ThemeHeadingFontFamily = ObjectValues<typeof ThemeHeadingFontFamilies>;
