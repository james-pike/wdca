import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeBorderWidths, cn } from '@qwik-ui/utils';
import { Button, Popover } from '@qwik-ui/styled';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const WIDTHS: Array<{ value: string; label: string; strokePx: number }> = [
  { value: ThemeBorderWidths.AUTO, label: 'Auto', strokePx: 1.5 },
  { value: ThemeBorderWidths.NONE, label: '0', strokePx: 0 },
  { value: ThemeBorderWidths.THIN, label: '1', strokePx: 1.5 },
  { value: ThemeBorderWidths.THICK, label: '2', strokePx: 3 },
];

export const BorderWidthPicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setWidth = $((value: string) => {
    themeConfigSig.value.borderWidth = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    WIDTHS.find((w) => w.value === themeConfigSig.value.borderWidth) ?? WIDTHS[0];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose border width (current: ${current.label})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" class="text-foreground">
          <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2.5" />
        </svg>
      </Popover.Trigger>

      <Popover.Panel>
        <div class="mb-2 text-sm font-medium">Border width</div>
        <div class="flex items-center gap-2">
          {WIDTHS.map((w) => {
            const isActive = current.value === w.value;
            return (
              <Button
                key={w.value}
                look={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick$={() => setWidth(w.value)}
                aria-label={`Border width ${w.label}`}
                class="h-12 w-12 flex-col gap-0.5 px-0 py-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width={w.strokePx}
                    stroke-dasharray={w.value === ThemeBorderWidths.AUTO ? '3 3' : undefined}
                  />
                </svg>
                <span class="text-[10px] leading-none">{w.label}</span>
              </Button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default BorderWidthPicker;
