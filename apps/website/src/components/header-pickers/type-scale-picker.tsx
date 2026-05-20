import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeTypeScales, cn } from '@qwik-ui/utils';
import { Button, Popover } from '@qwik-ui/styled';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const SCALES: Array<{ value: string; label: string; sizePx: number }> = [
  { value: ThemeTypeScales.SM, label: 'S', sizePx: 12 },
  { value: ThemeTypeScales.BASE, label: 'M', sizePx: 15 },
  { value: ThemeTypeScales.LG, label: 'L', sizePx: 18 },
];

export const TypeScalePicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setScale = $((value: string) => {
    themeConfigSig.value.typeScale = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    SCALES.find((s) => s.value === themeConfigSig.value.typeScale) ?? SCALES[1];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose type scale (current: ${current.label})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <span class="flex items-baseline gap-0.5 leading-none font-bold text-foreground">
          <span class="text-[10px]">A</span>
          <span class="text-base">A</span>
        </span>
      </Popover.Trigger>

      <Popover.Panel>
        <div class="mb-2 text-sm font-medium">Text size</div>
        <div class="flex items-center gap-2">
          {SCALES.map((s) => {
            const isActive = current.value === s.value;
            return (
              <Button
                key={s.value}
                look={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick$={() => setScale(s.value)}
                aria-label={`Text size ${s.label}`}
                class="h-12 w-12 flex-col gap-0.5 px-0 py-0"
              >
                <span class="font-bold leading-none" style={{ fontSize: `${s.sizePx}px` }}>
                  A
                </span>
                <span class="text-[10px] leading-none">{s.label}</span>
              </Button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default TypeScalePicker;
