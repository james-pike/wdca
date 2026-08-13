import {
  $,
  component$,
  QRL,
  Slot,
  useComputed$,
  useSignal,
} from '@builder.io/qwik';
import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemeConfig,
  ThemeFonts,
  ThemeModes,
  ThemePrimaryColors,
  ThemeStyles,
  cn,
} from '@qwik-ui/utils';
import { LuMoon, LuSun } from '@qwikest/icons/lucide';
import { useTheme } from '@qwik-ui/themes';
import { useAppState } from '~/_state/use-app-state';

/** `primary-cyan-600` / `base-slate` → `var(--color-cyan-600)` / `var(--color-slate-500)`. */
const swatch = (token: string | undefined): string => {
  if (!token) return 'transparent';
  const name = token.replace(/^primary-/, '').replace(/^base-/, '');
  // Base tokens have no shade; show them at the 500 step.
  const withShade = /\d/.test(name) ? name : `${name}-500`;
  return `var(--color-${withShade})`;
};

/**
 * The full primary palette, same set the "Make it yours" drawer offers. Ordered
 * hue-major (each hue is a 100→900 shade ramp) with the vivid hues first and the
 * neutral ramps last. The neutral 100/200 near-whites are skipped, matching the
 * drawer, since they'd be invisible on a light background.
 */
const VIVID_HUES = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];
const NEUTRAL_HUES = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
const SHADES = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
const PRIMARY_FULL: string[] = [
  ...VIVID_HUES.flatMap((h) => SHADES.map((s) => `primary-${h}-${s}`)),
  ...NEUTRAL_HUES.flatMap((h) =>
    SHADES.filter((s) => s !== '100' && s !== '200').map((s) => `primary-${h}-${s}`),
  ),
];
const BASE_COLORS = Object.values(ThemeBaseColors);

/**
 * Mobile-only sticky "style bar" for the design tab. It sits directly beneath
 * the hero fold; once scrolled up it sticks to the bottom of the tab bar (top =
 * header + tab-bar heights) and keeps the full theme-string controls in reach
 * while the specimens below restyle live.
 *
 * To fit every control in one non-scrolling row, the base and primary colours
 * are each a single current-colour swatch that opens its full picker in a
 * popover on tap. Everything drives the same 6-part theme string as the "Make
 * it yours" drawer (`font mode style baseColor primaryColor borderRadius`).
 */
export const StyleBar = component$(() => {
  const rootStore = useAppState();
  const { themeSig } = useTheme();
  // Which colour popover is open ('' = none). One at a time.
  const open = useSignal<'base' | 'primary' | ''>('');

  const cfgSig = useComputed$((): ThemeConfig => {
    const value = themeSig.value;
    if (!value || value === 'light' || value === 'dark') {
      return {
        font: ThemeFonts.SANS,
        mode: value === 'dark' ? ThemeModes.DARK : ThemeModes.LIGHT,
        style: ThemeStyles.SIMPLE,
        baseColor: ThemeBaseColors.SLATE,
        primaryColor: ThemePrimaryColors.CYAN600,
        borderRadius: ThemeBorderRadiuses['BORDER-RADIUS-0'],
      };
    }
    const [font, mode, style, baseColor, primaryColor, borderRadius] = Array.isArray(
      value,
    )
      ? value
      : value.split(' ');
    return { font, mode, style, baseColor, primaryColor, borderRadius };
  });

  // Rebuild the theme string from a partial patch over the current config.
  const apply$ = $((patch: Partial<ThemeConfig>) => {
    const c = { ...cfgSig.value, ...patch };
    themeSig.value = [
      c.font,
      c.mode,
      c.style,
      c.baseColor,
      c.primaryColor,
      c.borderRadius,
    ].join(' ');
  });

  const cfg = cfgSig.value;
  const isDark = cfg.mode?.includes('dark');

  return (
    <div
      class={cn(
        'sticky z-[8] flex h-[var(--stylebar-h)] w-full items-center gap-2 px-3',
        'top-[calc(var(--header-h)+var(--tabbar-h))]',
        'border-b bg-background/90 backdrop-blur-md',
        // Mobile only — desktop keeps the "Make it yours" modal.
        'lg:hidden',
      )}
      role="group"
      aria-label="Theme style controls"
    >
      {/* Close any open picker when tapping elsewhere. */}
      {open.value && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick$={() => (open.value = '')}
          class="fixed inset-0 z-40 cursor-default"
        />
      )}

      {/* Light / dark */}
      <button
        type="button"
        aria-label="Toggle dark mode"
        onClick$={() => apply$({ mode: isDark ? ThemeModes.LIGHT : ThemeModes.DARK })}
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {isDark ? <LuMoon class="h-4 w-4" /> : <LuSun class="h-4 w-4" />}
      </button>

      <Divider />

      {/* Base colour — single swatch, opens the 5 neutrals on tap. */}
      <div class="relative shrink-0">
        <button
          type="button"
          aria-label="Base colour"
          aria-expanded={open.value === 'base'}
          onClick$={() => (open.value = open.value === 'base' ? '' : 'base')}
          class={cn(
            'h-6 w-6 rounded-full ring-1 ring-inset ring-black/15 transition-transform hover:scale-110',
            open.value === 'base' && 'ring-2 ring-ring',
          )}
          style={{ background: swatch(cfg.baseColor) }}
        />
        {open.value === 'base' && (
          <Popover label="Base">
            <div class="flex gap-1.5">
              {BASE_COLORS.map((base) => (
                <Chip
                  key={base}
                  color={swatch(base)}
                  active={cfg.baseColor === base}
                  label={base.replace('base-', '')}
                  onSelect$={() => {
                    apply$({ baseColor: base });
                    open.value = '';
                  }}
                />
              ))}
            </div>
          </Popover>
        )}
      </div>

      {/* Primary colour — single swatch, opens the full palette on tap. */}
      <div class="relative shrink-0">
        <button
          type="button"
          aria-label="Primary colour"
          aria-expanded={open.value === 'primary'}
          onClick$={() => (open.value = open.value === 'primary' ? '' : 'primary')}
          class={cn(
            'h-6 w-6 rounded-full ring-1 ring-inset ring-black/15 transition-transform hover:scale-110',
            open.value === 'primary' && 'ring-2 ring-ring',
          )}
          style={{ background: swatch(cfg.primaryColor) }}
        />
        {open.value === 'primary' && (
          <Popover label="Primary">
            <div class="grid max-h-56 w-64 grid-cols-9 gap-1 overflow-y-auto">
              {PRIMARY_FULL.map((color) => (
                <Chip
                  key={color}
                  color={swatch(color)}
                  active={cfg.primaryColor === color}
                  label={color.replace('primary-', '')}
                  onSelect$={() => {
                    apply$({ primaryColor: color });
                    open.value = '';
                  }}
                />
              ))}
            </div>
          </Popover>
        )}
      </div>

      <Divider />

      {/* Corner radius */}
      <div class="flex shrink-0 items-center gap-1">
        {Object.values(ThemeBorderRadiuses).map((radius) => {
          const active = cfg.borderRadius === radius;
          const label =
            radius === 'border-radius-0'
              ? '0'
              : radius === 'border-radius-dot-25'
                ? '.25'
                : radius === 'border-radius-dot-50'
                  ? '.5'
                  : radius === 'border-radius-dot-75'
                    ? '.75'
                    : '1';
          return (
            <button
              key={radius}
              type="button"
              aria-label={`Radius ${label}`}
              aria-pressed={active}
              onClick$={() => apply$({ borderRadius: radius })}
              class={cn(
                'flex h-7 min-w-6 shrink-0 items-center justify-center rounded-md border px-1 text-[11px] font-medium transition-colors',
                active
                  ? 'border-ring bg-accent text-foreground'
                  : 'text-muted-foreground hover:bg-accent/60',
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <Divider />

      {/* Preset — also swaps the body font (sans ↔ mono), matching the drawer. */}
      <select
        aria-label="Preset"
        value={cfg.style}
        onChange$={(_, el) => {
          const style = el.value;
          const font = style === 'brutalist' ? ThemeFonts.MONO : ThemeFonts.SANS;
          apply$({ style, font });
        }}
        class="h-7 shrink-0 rounded-md border bg-background px-1 text-xs font-medium"
      >
        <option value={ThemeStyles.SIMPLE}>Simple</option>
        <option value={ThemeStyles.BRUTALIST}>Brutalist</option>
        {rootStore.featureFlags?.showNeumorphic && (
          <option value={ThemeStyles.NEUMORPHIC}>Neumorphic</option>
        )}
      </select>
    </div>
  );
});

/** Dropdown panel anchored under a colour swatch. */
const Popover = component$<{ label: string }>(({ label }) => (
  <div class="absolute top-[calc(100%+0.5rem)] left-0 z-50 rounded-lg border bg-popover p-2 text-popover-foreground shadow-xl">
    <span class="mb-1.5 block font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground">
      {label.toUpperCase()}
    </span>
    <Slot />
  </div>
));

/** A single selectable colour swatch inside a picker popover. */
const Chip = component$<{
  color: string;
  active: boolean;
  label: string;
  onSelect$: QRL<() => void>;
}>(({ color, active, label, onSelect$ }) => (
  <button
    type="button"
    aria-label={label}
    aria-pressed={active}
    onClick$={onSelect$}
    class={cn(
      'h-5 w-5 shrink-0 rounded-full ring-1 ring-inset ring-black/15 transition-transform hover:scale-110',
      active && 'ring-2 ring-ring',
    )}
    style={{ background: color }}
  />
));

const Divider = component$(() => (
  <span class="h-5 w-px shrink-0 bg-border" aria-hidden="true" />
));

export default StyleBar;
