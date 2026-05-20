// The theme codec now lives in @qwik-ui/utils so it can be unit-tested and
// reused (e.g. by the future external content API). Re-exported here to keep
// the existing `../header-pickers/theme-helpers` import paths working.
export {
  DEFAULT_DARK,
  DEFAULT_LIGHT,
  THEME_STRING_VERSION,
  deriveClassList,
  parseThemeString,
  serializeThemeConfig,
  toPortableString,
} from '@qwik-ui/utils';
