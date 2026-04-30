import { $, component$, useComputed$ } from '@builder.io/qwik';
import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemeConfig,
  ThemeFonts,
  ThemeModes,
  ThemePrimaryColors,
  ThemeSecondaryColors,
  ThemeStyles,
  cn,
} from '@qwik-ui/utils';
import { useTheme } from '@qwik-ui/themes';
import { Button, Popover } from '@qwik-ui/styled';

const ROLE = {
  primary: {
    label: 'Primary',
    enumObj: ThemePrimaryColors,
    prefix: 'primary-',
  },
  secondary: {
    label: 'Secondary',
    enumObj: ThemeSecondaryColors,
    prefix: 'secondary-',
  },
} as const;

export const ColorPickers = component$(() => {
  const { themeSig } = useTheme();

  const themeComputedObjectSig = useComputed$((): ThemeConfig => {
    if (!themeSig.value || themeSig.value === 'light') {
      return {
        font: ThemeFonts.SANS,
        mode: ThemeModes.LIGHT,
        style: ThemeStyles.SIMPLE,
        baseColor: ThemeBaseColors.SLATE,
        primaryColor: ThemePrimaryColors.CYAN600,
        secondaryColor: ThemeSecondaryColors.FUCHSIA500,
        borderRadius: ThemeBorderRadiuses['BORDER-RADIUS-0'],
      };
    }
    if (themeSig.value === 'dark') {
      return {
        font: ThemeFonts.SANS,
        mode: ThemeModes.DARK,
        style: ThemeStyles.SIMPLE,
        baseColor: ThemeBaseColors.SLATE,
        primaryColor: ThemePrimaryColors.CYAN600,
        secondaryColor: ThemeSecondaryColors.FUCHSIA500,
        borderRadius: ThemeBorderRadiuses['BORDER-RADIUS-0'],
      };
    }
    const arr = Array.isArray(themeSig.value)
      ? themeSig.value
      : themeSig.value.split(' ');
    return {
      font: arr[0],
      mode: arr[1],
      style: arr[2],
      baseColor: arr[3],
      primaryColor: arr[4],
      borderRadius: arr[5],
      secondaryColor: arr[6] ?? ThemeSecondaryColors.FUCHSIA500,
    };
  });

  const buildThemeString$ = $(() => {
    const c = themeComputedObjectSig.value;
    return [
      c.font,
      c.mode,
      c.style,
      c.baseColor,
      c.primaryColor,
      c.borderRadius,
      c.secondaryColor,
    ].join(' ');
  });

  const renderGrid = (role: 'primary' | 'secondary') => {
    const meta = ROLE[role];
    return (
      <div class="grid grid-cols-[repeat(22,0fr)] gap-0.5">
        {Object.values(meta.enumObj).map((value: string) => {
          const isActive =
            (role === 'primary'
              ? themeComputedObjectSig.value.primaryColor
              : themeComputedObjectSig.value.secondaryColor) === value;
          const shade = value.replace(meta.prefix, '');
          if (shade.endsWith('-100') || shade.endsWith('-200')) {
            return <span key={value} />;
          }
          return (
            <Button
              key={value}
              look="ghost"
              size="icon"
              onClick$={async () => {
                if (role === 'primary') {
                  themeComputedObjectSig.value.primaryColor = value;
                } else {
                  themeComputedObjectSig.value.secondaryColor = value;
                }
                themeSig.value = await buildThemeString$();
              }}
              class={cn('h-3 w-3 rounded-none', isActive && 'border border-ring')}
              aria-label={`Set ${meta.label.toLowerCase()} to ${shade}`}
            >
              <span
                class="flex h-[10px] w-[10px] shrink-0 rounded-none"
                style={{ backgroundColor: `var(--color-${shade})` }}
              />
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Primary swatch trigger */}
      <Popover.Root flip floating="bottom-end" gutter={8}>
        <Popover.Trigger
          aria-label="Choose primary color"
          class={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
          )}
        >
          <span
            class="h-5 w-5 rounded-sm border border-black/10 shadow-inner"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </Popover.Trigger>
        <Popover.Panel class="!w-auto max-w-[calc(100vw-1rem)]">
          <div class="mb-2 text-sm font-medium">Primary</div>
          {renderGrid('primary')}
        </Popover.Panel>
      </Popover.Root>

      {/* Secondary double-wide trigger (left half = primary, right half = secondary) */}
      <Popover.Root flip floating="bottom-end" gutter={8}>
        <Popover.Trigger
          aria-label="Choose secondary color"
          class={cn(
            'inline-flex h-10 w-20 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
          )}
        >
          <span class="flex h-5 w-12 overflow-hidden rounded-sm border border-black/10 shadow-inner">
            <span
              class="block h-full w-1/2"
              style={{ backgroundColor: 'var(--primary)' }}
            />
            <span
              class="block h-full w-1/2"
              style={{ backgroundColor: 'var(--secondary)' }}
            />
          </span>
        </Popover.Trigger>
        <Popover.Panel class="!w-auto max-w-[calc(100vw-1rem)]">
          <div class="mb-2 text-sm font-medium">Secondary</div>
          {renderGrid('secondary')}
        </Popover.Panel>
      </Popover.Root>
    </>
  );
});

export default ColorPickers;
