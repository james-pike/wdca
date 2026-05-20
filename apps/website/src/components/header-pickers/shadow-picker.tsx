import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeShadows, cn } from '@qwik-ui/utils';
import { Button, Popover } from '@qwik-ui/styled';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const SHADOWS: Array<{ value: string; label: string; preview: string }> = [
  { value: ThemeShadows.AUTO, label: 'Auto', preview: 'none' },
  { value: ThemeShadows.NONE, label: 'None', preview: 'none' },
  { value: ThemeShadows.SOFT, label: 'Soft', preview: '0 4px 12px rgb(0 0 0 / 0.18)' },
  { value: ThemeShadows.STRONG, label: 'Strong', preview: '0 8px 16px rgb(0 0 0 / 0.4)' },
];

export const ShadowPicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setShadow = $((value: string) => {
    themeConfigSig.value.shadow = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    SHADOWS.find((s) => s.value === themeConfigSig.value.shadow) ?? SHADOWS[0];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose shadow (current: ${current.label})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" class="text-foreground">
          <rect x="4" y="3" width="13" height="13" rx="2.5" fill="currentColor" opacity="0.25" />
          <rect x="7" y="7" width="13" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </Popover.Trigger>

      <Popover.Panel>
        <div class="mb-2 text-sm font-medium">Shadow</div>
        <div class="flex items-center gap-2">
          {SHADOWS.map((s) => {
            const isActive = current.value === s.value;
            return (
              <Button
                key={s.value}
                look={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick$={() => setShadow(s.value)}
                aria-label={`Shadow ${s.label}`}
                class="h-14 w-14 flex-col gap-1.5 px-0 py-0"
              >
                <span
                  class="block h-5 w-5 rounded-md bg-background"
                  style={{ boxShadow: s.preview, border: '1px solid var(--border)' }}
                />
                <span class="text-[10px] leading-none">{s.label}</span>
              </Button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default ShadowPicker;
