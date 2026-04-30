import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeBorderRadiuses, cn } from '@qwik-ui/utils';
import { Popover } from '@qwik-ui/styled';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const RADII: Array<{ value: string; label: string; rxPx: number }> = [
  { value: ThemeBorderRadiuses['BORDER-RADIUS-0'], label: '0', rxPx: 0 },
  { value: ThemeBorderRadiuses['BORDER-RADIUS-DOT-25'], label: '.25', rxPx: 2 },
  { value: ThemeBorderRadiuses['BORDER-RADIUS-DOT-50'], label: '.5', rxPx: 4 },
  { value: ThemeBorderRadiuses['BORDER-RADIUS-DOT-75'], label: '.75', rxPx: 6 },
  { value: ThemeBorderRadiuses['BORDER-RADIUS-1'], label: '1', rxPx: 9 },
];

export const RadiusPicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setRadius = $((value: string) => {
    themeConfigSig.value.borderRadius = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    RADII.find((r) => r.value === themeConfigSig.value.borderRadius) ?? RADII[0];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose border radius (current: ${current.label})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          class="text-foreground"
        >
          <rect
            x="2"
            y="2"
            width="16"
            height="16"
            rx={current.rxPx}
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </Popover.Trigger>
      <Popover.Panel class="!w-auto">
        <div class="mb-2 text-sm font-medium">Radius</div>
        <div class="flex items-center gap-2">
          {RADII.map((r) => {
            const isActive = themeConfigSig.value.borderRadius === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick$={() => setRadius(r.value)}
                aria-label={`Border radius ${r.label}`}
                class={cn(
                  'flex h-10 w-10 items-center justify-center border border-input bg-background text-xs font-medium transition-colors hover:bg-accent',
                  isActive && 'border-ring ring-1 ring-ring',
                )}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <rect
                    x="2"
                    y="2"
                    width="16"
                    height="16"
                    rx={r.rxPx}
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default RadiusPicker;
