import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeContainerWidths, cn } from '@qwik-ui/utils';
import { Button, Popover } from '@qwik-ui/styled';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const WIDTHS: Array<{ value: string; label: string; barW: number }> = [
  { value: ThemeContainerWidths.SM, label: 'S', barW: 8 },
  { value: ThemeContainerWidths.MD, label: 'M', barW: 12 },
  { value: ThemeContainerWidths.LG, label: 'L', barW: 16 },
  { value: ThemeContainerWidths.FULL, label: 'Full', barW: 20 },
];

export const ContainerWidthPicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setWidth = $((value: string) => {
    themeConfigSig.value.containerWidth = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    WIDTHS.find((w) => w.value === themeConfigSig.value.containerWidth) ?? WIDTHS[2];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose content width (current: ${current.label})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="text-foreground"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M4 5 V19" />
          <path d="M20 5 V19" />
          <path d="M8 12 H16" />
          <path d="M8 9 L5 12 L8 15" />
          <path d="M16 9 L19 12 L16 15" />
        </svg>
      </Popover.Trigger>

      <Popover.Panel>
        <div class="mb-2 text-sm font-medium">Content width</div>
        <div class="flex items-center gap-2">
          {WIDTHS.map((w) => {
            const isActive = current.value === w.value;
            return (
              <Button
                key={w.value}
                look={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick$={() => setWidth(w.value)}
                aria-label={`Content width ${w.label}`}
                class="h-12 w-12 flex-col gap-1 px-0 py-0"
              >
                <span
                  class="block h-1.5 rounded-full bg-current"
                  style={{ width: `${w.barW}px` }}
                />
                <span class="text-[10px] leading-none">{w.label}</span>
              </Button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default ContainerWidthPicker;
