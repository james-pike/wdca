import { ObjectValues } from '../type-utils';

export const ThemeFontFamilies = {
  SYSTEM: 'qfont-system',
  INTER: 'qfont-inter',
  ROBOTO: 'qfont-roboto',
  OPEN_SANS: 'qfont-open-sans',
  POPPINS: 'qfont-poppins',
  MONTSERRAT: 'qfont-montserrat',
  DM_SANS: 'qfont-dm-sans',
  SPACE_GROTESK: 'qfont-space-grotesk',
  NUNITO: 'qfont-nunito',
  WORK_SANS: 'qfont-work-sans',
  LORA: 'qfont-lora',
  PLAYFAIR_DISPLAY: 'qfont-playfair-display',
  MERRIWEATHER: 'qfont-merriweather',
  JETBRAINS_MONO: 'qfont-jetbrains-mono',
  FIRA_CODE: 'qfont-fira-code',
} as const;

export type ThemeFontFamily = ObjectValues<typeof ThemeFontFamilies>;
