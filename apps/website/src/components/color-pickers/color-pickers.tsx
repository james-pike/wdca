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
          <Tabs.List class="mb-2 grid w-full grid-cols-3">
            <Tabs.Tab>Primary</Tabs.Tab>
            <Tabs.Tab>Secondary</Tabs.Tab>
            <Tabs.Tab>Base</Tabs.Tab>
          </Tabs.List>

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
