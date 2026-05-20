import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeTrackings, cn } from '@qwik-ui/utils';
import { Button, Popover } from '@qwik-ui/styled';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const TRACKINGS: Array<{ value: string; label: string; em: string }> = [
  { value: ThemeTrackings.TIGHT, label: 'Tight', em: '-0.015em' },
  { value: ThemeTrackings.NORMAL, label: 'Normal', em: 'normal' },
  { value: ThemeTrackings.WIDE, label: 'Wide', em: '0.04em' },
];

export const TrackingPicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setTracking = $((value: string) => {
    themeConfigSig.value.tracking = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    TRACKINGS.find((t) => t.value === themeConfigSig.value.tracking) ?? TRACKINGS[1];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose letter spacing (current: ${current.label})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <span class="text-sm font-bold text-foreground" style={{ letterSpacing: '0.12em' }}>
          AV
        </span>
      </Popover.Trigger>

      <Popover.Panel>
        <div class="mb-2 text-sm font-medium">Letter spacing</div>
        <div class="flex items-center gap-2">
          {TRACKINGS.map((t) => {
            const isActive = current.value === t.value;
            return (
              <Button
                key={t.value}
                look={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick$={() => setTracking(t.value)}
                aria-label={`Letter spacing ${t.label}`}
                class="h-12 flex-col gap-0.5 px-3 py-0"
              >
                <span
                  class="text-sm font-bold leading-none"
                  style={{ letterSpacing: t.em }}
                >
                  Aa
                </span>
                <span class="text-[10px] leading-none">{t.label}</span>
              </Button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default TrackingPicker;
