import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemeConfig,
  ThemeFontFamilies,
  ThemeFonts,
  ThemeModes,
  ThemePrimaryColors,
  ThemeSecondaryColors,
  ThemeStyles,
} from '@qwik-ui/utils';

const DEFAULT_LIGHT: ThemeConfig = {
  font: ThemeFonts.SANS,
  mode: ThemeModes.LIGHT,
  style: ThemeStyles.SIMPLE,
  baseColor: ThemeBaseColors.SLATE,
  primaryColor: ThemePrimaryColors.CYAN600,
  secondaryColor: ThemeSecondaryColors.FUCHSIA500,
  borderRadius: ThemeBorderRadiuses['BORDER-RADIUS-0'],
  fontFamily: ThemeFontFamilies.SYSTEM,
};

const DEFAULT_DARK: ThemeConfig = {
  ...DEFAULT_LIGHT,
  mode: ThemeModes.DARK,
};

export function parseThemeString(
  value: string | string[] | undefined,
): ThemeConfig {
  if (!value || value === 'light') return { ...DEFAULT_LIGHT };
  if (value === 'dark') return { ...DEFAULT_DARK };
  const arr = Array.isArray(value) ? value : value.split(' ');
  return {
    font: arr[0],
    mode: arr[1],
    style: arr[2],
    baseColor: arr[3],
    primaryColor: arr[4],
    borderRadius: arr[5],
    secondaryColor: arr[6] ?? ThemeSecondaryColors.FUCHSIA500,
    fontFamily: arr[7] ?? ThemeFontFamilies.SYSTEM,
  };
}

export function serializeThemeConfig(c: ThemeConfig): string {
  return [
    c.font,
    c.mode,
    c.style,
    c.baseColor,
    c.primaryColor,
    c.borderRadius,
    c.secondaryColor,
    c.fontFamily,
  ].join(' ');
}
