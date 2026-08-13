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
import { LuCheck, LuMoon, LuSun } from '@qwikest/icons/lucide';
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
 * Colour-harmony modes. Each derives the secondary/complementary colour from the
 * primary by rotating its hue on the wheel (see the `.harmony-*` classes in
 * global.css). `expr` mirrors that CSS so the popover can preview the result.
 */
const HARMONIES: { id: string; label: string; expr: string }[] = [
  { id: '', label: 'Default', expr: 'var(--secondary)' },
  { id: 'harmony-complementary', label: 'Complementary', expr: 'oklch(from var(--primary) l c calc(h + 180))' },
  { id: 'harmony-analogous', label: 'Analogous', expr: 'oklch(from var(--primary) l c calc(h + 40))' },
  { id: 'harmony-triadic', label: 'Triadic', expr: 'oklch(from var(--primary) l c calc(h + 120))' },
  { id: 'harmony-split', label: 'Split-complementary', expr: 'oklch(from var(--primary) l c calc(h + 150))' },
  { id: 'harmony-tetradic', label: 'Tetradic', expr: 'oklch(from var(--primary) l c calc(h + 90))' },
  { id: 'harmony-monochrome', label: 'Monochrome', expr: 'oklch(from var(--primary) calc(l * 0.72) c h)' },
];

/** Extract the active `harmony-*` token from a theme string (or '' for none). */
const harmonyOf = (value: string | string[] | undefined): string => {
  const arr = Array.isArray(value) ? value : (value ?? '').split(' ');
  return arr.find((c) => c.startsWith('harmony-')) ?? '';
};

/**
 * How many derived accents each scheme adds beyond the primary — 1 (secondary),
 * 2 (+tertiary) or 3 (+quad). The bar shows exactly this many accent swatches,
 * shrinking them as the count grows so they stay within the same footprint.
 */
const ACCENT_COUNT: Record<string, number> = {
  '': 1,
  'harmony-complementary': 1,
  'harmony-analogous': 2,
  'harmony-triadic': 2,
  'harmony-split': 2,
  'harmony-tetradic': 3,
  'harmony-monochrome': 3,
};
const ACCENT_VARS = ['var(--secondary)', 'var(--tertiary)', 'var(--quad)'];

/** Background styles, amounts and focal positions (see the `.fx-*` classes). */
const BACKDROPS: { id: string; label: string; preview: string }[] = [
  { id: 'fx-mesh', label: 'Mesh', preview: 'radial-gradient(circle at 30% 20%, var(--primary), transparent 55%), radial-gradient(circle at 80% 80%, var(--tertiary), transparent 55%)' },
  { id: 'fx-aurora', label: 'Aurora', preview: 'linear-gradient(115deg, var(--primary), var(--secondary), var(--tertiary))' },
  { id: 'fx-dots', label: 'Dots', preview: 'radial-gradient(var(--primary) 1px, transparent 1.5px) 0 0 / 6px 6px, var(--card)' },
  { id: 'fx-grid', label: 'Grid', preview: 'linear-gradient(var(--primary) 1px, transparent 1px) 0 0 / 8px 8px, linear-gradient(90deg, var(--primary) 1px, transparent 1px) 0 0 / 8px 8px, var(--card)' },
  { id: 'fx-rays', label: 'Rays', preview: 'conic-gradient(from 0deg at 50% 50%, var(--primary), transparent 60deg, var(--secondary) 140deg, transparent 220deg, var(--tertiary) 300deg, var(--primary))' },
  { id: 'fx-glow', label: 'Glow', preview: 'radial-gradient(circle at 50% 40%, var(--primary), transparent 60%)' },
  { id: 'fx-none', label: 'None', preview: 'var(--card)' },
];
const FX_AMOUNTS: { id: string; label: string }[] = [
  { id: 'fxa-1', label: 'Subtle' },
  { id: '', label: 'Medium' },
  { id: 'fxa-2', label: 'Bold' },
];
const FX_POS: { id: string; label: string }[] = [
  { id: 'fxp-tl', label: '↖' },
  { id: 'fxp-tr', label: '↗' },
  { id: 'fxp-c', label: '⊙' },
  { id: 'fxp-bl', label: '↙' },
  { id: 'fxp-br', label: '↘' },
];

/** All non-base theme tokens (harmony + background fx) to carry across edits. */
const extrasOf = (value: string | string[] | undefined): string[] => {
  const arr = Array.isArray(value) ? value : (value ?? '').split(' ');
  return arr.filter((c) => c.startsWith('harmony-') || c.startsWith('fx'));
};
/** First token with the given prefix, or '' — used to read the active fx state. */
const pickToken = (value: string | string[] | undefined, prefix: string): string => {
  const arr = Array.isArray(value) ? value : (value ?? '').split(' ');
  return arr.find((c) => c.startsWith(prefix)) ?? '';
};

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
  const open = useSignal<'base' | 'primary' | 'harmony' | 'bg' | ''>('');

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

  // Rebuild the theme string from a patch, preserving harmony + background fx.
  const apply$ = $((patch: Partial<ThemeConfig>) => {
    const c = { ...cfgSig.value, ...patch };
    themeSig.value = [
      c.font,
      c.mode,
      c.style,
      c.baseColor,
      c.primaryColor,
      c.borderRadius,
      ...extrasOf(themeSig.value),
    ]
      .filter(Boolean)
      .join(' ');
  });

  // Replace one kind of extra token (matched by `drop` prefixes) with `token`,
  // keeping the base config and the other extras. Powers harmony + background.
  const setExtra$ = $((token: string, dropPrefix: string) => {
    const c = cfgSig.value;
    const kept = extrasOf(themeSig.value).filter((x) => !x.startsWith(dropPrefix));
    themeSig.value = [
      c.font,
      c.mode,
      c.style,
      c.baseColor,
      c.primaryColor,
      c.borderRadius,
      ...kept,
      token,
    ]
      .filter(Boolean)
      .join(' ');
  });

  const cfg = cfgSig.value;
  const isDark = cfg.mode?.includes('dark');
  const harmony = harmonyOf(themeSig.value);
  const accentCount = ACCENT_COUNT[harmony] ?? 1;
  const accentVars = ACCENT_VARS.slice(0, accentCount);
  // Shrink each accent swatch as more appear so the cluster keeps its footprint.
  const accentPx = accentCount === 1 ? 24 : accentCount === 2 ? 18 : 14;
  // Background fx state (style defaults to mesh when no token is present).
  const fxStyle = pickToken(themeSig.value, 'fx-') || 'fx-mesh';
  const fxAmt = pickToken(themeSig.value, 'fxa-');
  const fxPos = pickToken(themeSig.value, 'fxp-');
  const fxPreview = BACKDROPS.find((b) => b.id === fxStyle)?.preview ?? BACKDROPS[0].preview;

  return (
    <div
      class={cn(
        'sticky z-[8] flex h-[var(--stylebar-h)] w-full items-center gap-2 px-3',
        'top-[calc(var(--header-h)+var(--tabbar-h))]',
        'border-b bg-background/90 backdrop-blur-md',
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

      {/* Complementary — swatches of the derived accents (secondary, then
          tertiary/quad when the scheme has them); opens the wheel modes. */}
      <div class="relative shrink-0">
        <button
          type="button"
          aria-label="Complementary colour scheme"
          aria-expanded={open.value === 'harmony'}
          onClick$={() => (open.value = open.value === 'harmony' ? '' : 'harmony')}
          class={cn(
            'flex items-center gap-0.5 rounded-full p-0.5 transition-transform hover:scale-105',
            open.value === 'harmony' && 'ring-2 ring-ring',
          )}
        >
          {accentVars.map((v, i) => (
            <span
              key={i}
              class="rounded-full ring-1 ring-inset ring-black/15"
              style={{ width: `${accentPx}px`, height: `${accentPx}px`, background: v }}
            />
          ))}
        </button>
        {open.value === 'harmony' && (
          <Popover label="Complementary">
            <div class="flex w-52 flex-col gap-0.5">
              {HARMONIES.map((h) => (
                <button
                  key={h.id || 'default'}
                  type="button"
                  aria-pressed={harmony === h.id}
                  onClick$={() => {
                    setExtra$(h.id, 'harmony-');
                    open.value = '';
                  }}
                  class="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent"
                >
                  <span
                    class="h-4 w-4 shrink-0 rounded-full ring-1 ring-inset ring-black/15"
                    style={{ background: h.expr }}
                  />
                  <span class="flex-1">{h.label}</span>
                  {harmony === h.id && <LuCheck class="h-3.5 w-3.5 shrink-0 text-primary" />}
                </button>
              ))}
            </div>
          </Popover>
        )}
      </div>

      <Divider />

      {/* Background — gradient/pattern backdrop, amount and focal position. */}
      <div class="relative shrink-0">
        <button
          type="button"
          aria-label="Background style"
          aria-expanded={open.value === 'bg'}
          onClick$={() => (open.value = open.value === 'bg' ? '' : 'bg')}
          class={cn(
            'h-6 w-6 rounded-md ring-1 ring-inset ring-black/15 transition-transform hover:scale-110',
            open.value === 'bg' && 'ring-2 ring-ring',
          )}
          style={{ background: fxPreview }}
        />
        {open.value === 'bg' && (
          <Popover label="Background">
            <div class="w-56 space-y-3">
              <div class="grid grid-cols-4 gap-1.5">
                {BACKDROPS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    aria-pressed={fxStyle === b.id}
                    onClick$={() => setExtra$(b.id, 'fx-')}
                    class={cn(
                      'flex flex-col items-center gap-1 rounded-md p-1 text-[0.6rem] transition-colors hover:bg-accent',
                      fxStyle === b.id ? 'bg-accent text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    <span
                      class="h-8 w-full rounded ring-1 ring-inset ring-black/15"
                      style={{ background: b.preview }}
                    />
                    <span>{b.label}</span>
                  </button>
                ))}
              </div>
              <div>
                <span class="mb-1 block font-mono text-[0.55rem] tracking-widest text-muted-foreground">
                  AMOUNT
                </span>
                <div class="flex gap-1">
                  {FX_AMOUNTS.map((a) => (
                    <button
                      key={a.id || 'med'}
                      type="button"
                      aria-pressed={fxAmt === a.id}
                      onClick$={() => setExtra$(a.id, 'fxa-')}
                      class={cn(
                        'flex-1 rounded-md border px-1 py-1 text-[0.65rem] transition-colors',
                        fxAmt === a.id
                          ? 'border-ring bg-accent text-foreground'
                          : 'text-muted-foreground hover:bg-accent/60',
                      )}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span class="mb-1 block font-mono text-[0.55rem] tracking-widest text-muted-foreground">
                  FOCUS
                </span>
                <div class="flex gap-1">
                  {FX_POS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={fxPos === p.id}
                      onClick$={() => setExtra$(p.id, 'fxp-')}
                      class={cn(
                        'flex h-7 flex-1 items-center justify-center rounded-md border text-xs transition-colors',
                        fxPos === p.id
                          ? 'border-ring bg-accent text-foreground'
                          : 'text-muted-foreground hover:bg-accent/60',
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
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
