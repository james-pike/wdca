import { $, type QRL, component$, useComputed$ } from '@builder.io/qwik';
import {
  ThemeBaseColors,
  ThemePrimaryColors,
  ThemeSecondaryColors,
  cn,
} from '@qwik-ui/utils';
import { useTheme } from '@qwik-ui/themes';
import { Button, Popover, Tabs } from '@qwik-ui/styled';
import {
  parseThemeString,
  serializeThemeConfig,
} from '../header-pickers/theme-helpers';

const BASE_SWATCH_CLASS: Record<string, string> = {
  'base-slate': 'bg-slate-500',
  'base-gray': 'bg-gray-500',
  'base-neutral': 'bg-neutral-500',
  'base-zinc': 'bg-zinc-500',
  'base-stone': 'bg-stone-500',
};

interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
}

/**
 * Curated primary+secondary pairings grouped by classic colour-theory
 * relationships on the wheel (Tailwind hue order ≈ red→rose). Each applies both
 * roles at once so users get a balanced palette in one click.
 */
const PRESET_GROUPS: Array<{ group: string; hint: string; items: ColorPreset[] }> = [
  {
    group: 'Complementary',
    hint: 'Opposite hues — high contrast',
    items: [
      { name: 'Ocean', primary: 'primary-blue-600', secondary: 'secondary-orange-500' },
      { name: 'Regal', primary: 'primary-indigo-600', secondary: 'secondary-amber-500' },
      { name: 'Garden', primary: 'primary-emerald-600', secondary: 'secondary-rose-500' },
      { name: 'Grape', primary: 'primary-violet-600', secondary: 'secondary-lime-500' },
      { name: 'Lagoon', primary: 'primary-teal-600', secondary: 'secondary-pink-500' },
      { name: 'Flame', primary: 'primary-red-600', secondary: 'secondary-cyan-500' },
    ],
  },
  {
    group: 'Analogous',
    hint: 'Neighbouring hues — calm, harmonious',
    items: [
      { name: 'Tide', primary: 'primary-blue-600', secondary: 'secondary-cyan-500' },
      { name: 'Orchid', primary: 'primary-violet-600', secondary: 'secondary-fuchsia-500' },
      { name: 'Pine', primary: 'primary-emerald-600', secondary: 'secondary-teal-500' },
      { name: 'Ember', primary: 'primary-orange-600', secondary: 'secondary-amber-500' },
    ],
  },
  {
    group: 'Triadic',
    hint: 'Evenly spaced — vibrant, balanced',
    items: [
      { name: 'Circus', primary: 'primary-red-600', secondary: 'secondary-blue-500' },
      { name: 'Jewel', primary: 'primary-violet-600', secondary: 'secondary-emerald-500' },
      { name: 'Fiesta', primary: 'primary-cyan-600', secondary: 'secondary-rose-500' },
    ],
  },
];

/** `primary-blue-600` / `secondary-orange-500` → `var(--color-blue-600)`. */
const tokenColor = (token: string) =>
  `var(--color-${token.replace(/^(primary|secondary)-/, '')})`;

export const ColorPickers = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setPrimary = $((color: string) => {
    themeConfigSig.value.primaryColor = color;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const setSecondary = $((color: string) => {
    themeConfigSig.value.secondaryColor = color;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const setBase = $((color: string) => {
    themeConfigSig.value.baseColor = color;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const applyPreset = $((primary: string, secondary: string) => {
    themeConfigSig.value.primaryColor = primary;
    themeConfigSig.value.secondaryColor = secondary;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const renderShadeGrid = (
    entries: string[],
    prefix: string,
    activeValue: string,
    onPick: QRL<(value: string) => void>,
    roleLabel: string,
  ) => (
    <div class="grid grid-cols-[repeat(22,0.75rem)] gap-0.5">
      {entries.map((value) => {
        const shade = value.replace(prefix, '');
        if (shade.endsWith('-100') || shade.endsWith('-200')) {
          return <span key={value} />;
        }
        const isActive = activeValue === value;
        return (
          <Button
            key={value}
            look="ghost"
            size="icon"
            onClick$={() => onPick(value)}
            class={cn('h-3 w-3 rounded-none', isActive && 'border border-ring')}
            aria-label={`Set ${roleLabel} to ${shade}`}
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

  return (
    <Popover.Root flip shift floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label="Choose primary, secondary, and base colors"
        class={cn(
          'inline-flex h-10 w-16 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <span class="flex flex-col gap-px overflow-hidden rounded-sm border border-black/10 shadow-inner">
          <span
            class="block h-4 w-10"
            style={{ backgroundColor: 'var(--primary)' }}
            aria-hidden="true"
          />
          <span
            class="block h-2 w-10"
            style={{ backgroundColor: 'var(--secondary)' }}
            aria-hidden="true"
          />
          <span
            class="block h-1 w-10"
            style={{ backgroundColor: 'var(--base-swatch, var(--muted-foreground))' }}
            aria-hidden="true"
          />
        </span>
      </Popover.Trigger>

      <Popover.Panel class="w-[22rem] max-w-[calc(100vw-1rem)]">
        <Tabs.Root>
          <Tabs.List class="mb-2 grid w-full grid-cols-4">
            <Tabs.Tab>Presets</Tabs.Tab>
            <Tabs.Tab>Primary</Tabs.Tab>
            <Tabs.Tab>Secondary</Tabs.Tab>
            <Tabs.Tab>Base</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel>
            <div class="max-h-[20rem] space-y-3 overflow-auto pr-1">
              {PRESET_GROUPS.map((group) => (
                <div key={group.group}>
                  <div class="text-sm font-medium">{group.group}</div>
                  <div class="mb-1.5 text-[11px] leading-tight text-muted-foreground">
                    {group.hint}
                  </div>
                  <div class="grid grid-cols-4 gap-1">
                    {group.items.map((preset) => {
                      const isActive =
                        themeConfigSig.value.primaryColor === preset.primary &&
                        themeConfigSig.value.secondaryColor === preset.secondary;
                      return (
                        <Button
                          key={preset.name}
                          look="ghost"
                          onClick$={() => applyPreset(preset.primary, preset.secondary)}
                          aria-label={`Apply ${preset.name} palette`}
                          class={cn(
                            'flex h-auto flex-col items-center gap-1 rounded-md px-1 py-1.5',
                            isActive && 'ring-2 ring-ring',
                          )}
                        >
                          <span class="relative flex h-7 w-12 overflow-hidden rounded-md border border-black/10 shadow-inner">
                            <span
                              class="absolute inset-0"
                              style={{ backgroundColor: tokenColor(preset.primary) }}
                            />
                            <span
                              class="absolute right-0 bottom-0 h-4 w-7 rounded-tl-lg border-t border-l border-white/50"
                              style={{ backgroundColor: tokenColor(preset.secondary) }}
                            />
                          </span>
                          <span class="text-[10px] leading-none text-muted-foreground">
                            {preset.name}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Panel>

          <Tabs.Panel>
            {renderShadeGrid(
              Object.values(ThemePrimaryColors),
              'primary-',
              themeConfigSig.value.primaryColor ?? '',
              setPrimary,
              'primary',
            )}
          </Tabs.Panel>

          <Tabs.Panel>
            {renderShadeGrid(
              Object.values(ThemeSecondaryColors),
              'secondary-',
              themeConfigSig.value.secondaryColor ?? '',
              setSecondary,
              'secondary',
            )}
          </Tabs.Panel>

          <Tabs.Panel>
            <div class="flex items-center gap-2 py-1">
              {Object.values(ThemeBaseColors).map((bc: string) => {
                const isActive = themeConfigSig.value.baseColor === bc;
                return (
                  <Button
                    key={bc}
                    look="ghost"
                    size="icon"
                    onClick$={() => setBase(bc)}
                    aria-label={`Set base to ${bc.replace('base-', '')}`}
                    class={cn(
                      'flex h-8 w-8 items-center justify-center rounded-md',
                      isActive && 'ring-2 ring-ring',
                    )}
                  >
                    <span
                      class={cn(
                        'flex h-5 w-5 rounded-sm border border-black/10',
                        BASE_SWATCH_CLASS[bc],
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          </Tabs.Panel>
        </Tabs.Root>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default ColorPickers;
