import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeMotions, cn } from '@qwik-ui/utils';
import { Button, Popover } from '@qwik-ui/styled';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const MOTIONS: Array<{ value: string; label: string }> = [
  { value: ThemeMotions.FULL, label: 'Full' },
  { value: ThemeMotions.REDUCED, label: 'Reduced' },
  { value: ThemeMotions.NONE, label: 'None' },
];

export const MotionPicker = component$(() => {
  const { themeSig } = useTheme();
  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setMotion = $((value: string) => {
    themeConfigSig.value.motion = value;
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current =
    MOTIONS.find((m) => m.value === themeConfigSig.value.motion) ?? MOTIONS[0];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose motion (current: ${current.label})`}
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
          <circle cx="6" cy="12" r="2.5" />
          <path d="M11 12 H20" />
          <path d="M15 8 L20 12 L15 16" fill="none" />
        </svg>
      </Popover.Trigger>

      <Popover.Panel>
        <div class="mb-2 text-sm font-medium">Motion</div>
        <div class="flex items-center gap-2">
          {MOTIONS.map((m) => {
            const isActive = current.value === m.value;
            return (
              <Button
                key={m.value}
                look={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick$={() => setMotion(m.value)}
                aria-label={`Motion ${m.label}`}
                class="h-10 px-3"
              >
                <span class="text-xs leading-none">{m.label}</span>
              </Button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default MotionPicker;
