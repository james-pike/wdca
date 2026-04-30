import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { ThemeFonts, ThemeStyles, cn } from '@qwik-ui/utils';
import { Popover } from '@qwik-ui/styled';
import { useAppState } from '~/_state/use-app-state';
import { parseThemeString, serializeThemeConfig } from './theme-helpers';

const STYLES: Array<{ value: string; label: string; letter: string }> = [
  { value: ThemeStyles.SIMPLE, label: 'Simple', letter: 'S' },
  { value: ThemeStyles.BRUTALIST, label: 'Brutalist', letter: 'B' },
  { value: ThemeStyles.NEUMORPHIC, label: 'Neumorphic', letter: 'N' },
];

export const StylePicker = component$(() => {
  const { themeSig } = useTheme();
  const rootStore = useAppState();

  const themeConfigSig = useComputed$(() => parseThemeString(themeSig.value));

  const setStyle = $((value: string) => {
    themeConfigSig.value.style = value;
    if (value === ThemeStyles.BRUTALIST) {
      themeConfigSig.value.font = ThemeFonts.MONO;
    } else {
      themeConfigSig.value.font = ThemeFonts.SANS;
    }
    themeSig.value = serializeThemeConfig(themeConfigSig.value);
  });

  const current = STYLES.find((s) => s.value === themeConfigSig.value.style) ?? STYLES[0];
  const visible = STYLES.filter(
    (s) => s.value !== ThemeStyles.NEUMORPHIC || rootStore.featureFlags?.showNeumorphic,
  );

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose visual style (current: ${current.label})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <span
          class={cn(
            'text-sm leading-none font-bold',
            current.value === ThemeStyles.BRUTALIST && 'font-mono',
          )}
        >
          {current.letter}
        </span>
      </Popover.Trigger>
      <Popover.Panel class="!w-56">
        <div class="mb-2 text-sm font-medium">Style</div>
        <div class="flex flex-col gap-1">
          {visible.map((s) => {
            const isActive = themeConfigSig.value.style === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick$={() => setStyle(s.value)}
                class={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors hover:bg-accent',
                  isActive && 'bg-accent ring-1 ring-ring',
                )}
              >
                <span
                  class={cn(
                    'text-base',
                    s.value === ThemeStyles.BRUTALIST && 'font-mono font-bold uppercase',
                  )}
                >
                  {s.label}
                </span>
                <span class="text-xs text-muted-foreground">{s.letter}</span>
              </button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default StylePicker;
