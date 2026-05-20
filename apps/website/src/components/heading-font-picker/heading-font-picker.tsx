import { $, component$, useComputed$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/styled';
import { ThemeHeadingFontFamilies, cn } from '@qwik-ui/utils';
import { useTheme } from '@qwik-ui/themes';
import {
  parseThemeString,
  serializeThemeConfig,
} from '../header-pickers/theme-helpers';

type HeadingFontEntry = {
  name: string;
  value: string;
  family: string;
};

const HEADING_FONTS: HeadingFontEntry[] = [
  { name: 'Same as body', value: ThemeHeadingFontFamilies.INHERIT, family: '' },
  { name: 'System Default', value: ThemeHeadingFontFamilies.SYSTEM, family: '' },
  { name: 'Inter', value: ThemeHeadingFontFamilies.INTER, family: 'Inter' },
  { name: 'Roboto', value: ThemeHeadingFontFamilies.ROBOTO, family: 'Roboto' },
  { name: 'Open Sans', value: ThemeHeadingFontFamilies.OPEN_SANS, family: 'Open Sans' },
  { name: 'Poppins', value: ThemeHeadingFontFamilies.POPPINS, family: 'Poppins' },
  { name: 'Montserrat', value: ThemeHeadingFontFamilies.MONTSERRAT, family: 'Montserrat' },
  { name: 'DM Sans', value: ThemeHeadingFontFamilies.DM_SANS, family: 'DM Sans' },
  {
    name: 'Space Grotesk',
    value: ThemeHeadingFontFamilies.SPACE_GROTESK,
    family: 'Space Grotesk',
  },
  { name: 'Nunito', value: ThemeHeadingFontFamilies.NUNITO, family: 'Nunito' },
  { name: 'Work Sans', value: ThemeHeadingFontFamilies.WORK_SANS, family: 'Work Sans' },
  { name: 'Lora', value: ThemeHeadingFontFamilies.LORA, family: 'Lora' },
  {
    name: 'Playfair Display',
    value: ThemeHeadingFontFamilies.PLAYFAIR_DISPLAY,
    family: 'Playfair Display',
  },
  {
    name: 'Merriweather',
    value: ThemeHeadingFontFamilies.MERRIWEATHER,
    family: 'Merriweather',
  },
  {
    name: 'JetBrains Mono',
    value: ThemeHeadingFontFamilies.JETBRAINS_MONO,
    family: 'JetBrains Mono',
  },
  {
    name: 'Fira Code',
    value: ThemeHeadingFontFamilies.FIRA_CODE,
    family: 'Fira Code',
  },
];

const fontStack = (family: string) =>
  family ? `'${family}', system-ui, sans-serif` : '';

export const HeadingFontPicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setHeadingFont = $((value: string) => {
    themeConfigSig.value.headingFontFamily = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    HEADING_FONTS.find((f) => f.value === themeConfigSig.value.headingFontFamily) ??
    HEADING_FONTS[0];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose heading font (current: ${current.name})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <span
          class="text-base leading-none font-bold"
          style={current.family ? { fontFamily: fontStack(current.family) } : undefined}
        >
          H
        </span>
      </Popover.Trigger>
      <Popover.Panel class="!w-72 max-w-[calc(100vw-1rem)]">
        <div class="mb-2 text-sm font-medium">Heading font</div>
        <div class="flex max-h-80 flex-col gap-1 overflow-auto pr-1">
          {HEADING_FONTS.map((font) => {
            const isActive = current.value === font.value;
            return (
              <button
                key={font.value}
                type="button"
                onClick$={() => setHeadingFont(font.value)}
                class={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors hover:bg-accent',
                  isActive && 'bg-accent ring-1 ring-ring',
                )}
                style={
                  font.family ? { fontFamily: fontStack(font.family) } : undefined
                }
              >
                <span class="text-base">{font.name}</span>
                <span class="text-sm text-muted-foreground">Ag</span>
              </button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default HeadingFontPicker;
