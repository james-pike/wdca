import { $, type QRL, component$, useComputed$ } from '@builder.io/qwik';
import {
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

  const renderGrid = (
    entries: string[],
    prefix: string,
    activeValue: string,
    onPick: QRL<(value: string) => void>,
    roleLabel: string,
  ) => (
    <div class="grid grid-cols-[repeat(22,0fr)] gap-0.5">
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
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label="Choose primary and secondary colors"
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
        <Tabs.Root>
          <Tabs.List class="mb-2 grid w-full grid-cols-2">
            <Tabs.Tab>Primary</Tabs.Tab>
            <Tabs.Tab>Secondary</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel>
            {renderGrid(
              Object.values(ThemePrimaryColors),
              'primary-',
              themeConfigSig.value.primaryColor ?? '',
              setPrimary,
              'primary',
            )}
          </Tabs.Panel>
          <Tabs.Panel>
            {renderGrid(
              Object.values(ThemeSecondaryColors),
              'secondary-',
              themeConfigSig.value.secondaryColor ?? '',
              setSecondary,
              'secondary',
            )}
          </Tabs.Panel>
        </Tabs.Root>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default ColorPickers;
