import { component$, useSignal } from '@builder.io/qwik';
import { SectionTabs, Band } from './section-kit';
import { StyleBar } from '../style-bar/style-bar';
import { TokenSpecimens } from '../style-bar/token-specimens';
import { LogoIcon, LogoWithBorders } from '../icons/logo';

/**
 * Design-tab content, one topic per design-system axis. "Color" carries the
 * live style controls (the {@link StyleBar}, now including the complementary /
 * colour-harmony picker) plus specimens; the other topics document the spacing
 * grid, the type scale and the logo. A sticky {@link SectionTabs} bar switches
 * between them.
 */

const DESIGN_TABS = [
  { id: 'color', label: 'Color' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'type', label: 'Type' },
  { id: 'logo', label: 'Logo' },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64];
const RADII = [
  { label: '0', v: '0px' },
  { label: '.25', v: '0.25rem' },
  { label: '.5', v: '0.5rem' },
  { label: '.75', v: '0.75rem' },
  { label: '1', v: '1rem' },
];

export const DesignSections = component$(() => {
  const sub = useSignal('color');

  return (
    <>
      <SectionTabs tabs={DESIGN_TABS} active={sub.value} onSelect$={(id) => (sub.value = id)} />

      {/* ---------------------------------------------------------- Color */}
      {sub.value === 'color' && (
        <>
          <StyleBar />
          <TokenSpecimens />
          <Band
            eyebrow="COMPLEMENTARY · COLOUR WHEEL"
            title="Primary, and its partners"
            lead="The complementary picker in the bar derives a whole palette from your primary by rotating its hue on the wheel — complementary (2), triadic & split (3) and tetradic (4). Components across the site pick these up automatically."
          >
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { v: 'var(--primary)', label: '--primary' },
                { v: 'var(--secondary)', label: '--secondary' },
                { v: 'var(--tertiary)', label: '--tertiary' },
                { v: 'var(--quad)', label: '--quad' },
              ].map((c) => (
                <div
                  key={c.label}
                  class="rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-4 text-card-foreground shadow-sm"
                >
                  <span
                    class="mb-3 block h-16 w-full rounded-[var(--border-radius)]"
                    style={{ background: c.v }}
                  />
                  <span class="font-mono text-xs text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
            <div
              class="mt-4 h-8 w-full rounded-[var(--border-radius)]"
              style={{
                background:
                  'linear-gradient(90deg, var(--primary), var(--secondary), var(--tertiary), var(--quad))',
              }}
            />
          </Band>
        </>
      )}

      {/* -------------------------------------------------------- Spacing */}
      {sub.value === 'spacing' && (
        <>
          <Band
            eyebrow="SPACING · 8PX GRID"
            title="Everything on the grid"
            lead="Spacing steps from a single 8px rhythm. Consistent gaps are what make an interface feel designed rather than assembled."
          >
            <div class="space-y-3">
              {SPACING.map((px) => (
                <div key={px} class="flex items-center gap-4">
                  <span class="w-14 shrink-0 font-mono text-xs text-muted-foreground">{px}px</span>
                  <div
                    class="h-4 rounded-[var(--border-radius)] bg-primary"
                    style={{ width: `${px * 3}px` }}
                  />
                </div>
              ))}
            </div>
          </Band>

          <Band title="Corner radius" lead="One token scales every corner in the system.">
            <div class="flex flex-wrap items-end gap-4">
              {RADII.map((r) => (
                <div key={r.label} class="text-center">
                  <div
                    class="h-16 w-16 border-2 border-primary bg-primary/10"
                    style={{ borderRadius: r.v }}
                  />
                  <span class="mt-1 block font-mono text-xs text-muted-foreground">{r.label}</span>
                </div>
              ))}
            </div>
          </Band>
        </>
      )}

      {/* ----------------------------------------------------------- Type */}
      {sub.value === 'type' && (
        <Band
          eyebrow="TYPE · SCALE"
          title="A scale you can read"
          lead="One family, a handful of steps. Display for impact, body for reading, mono for the technical bits."
        >
          <div class="space-y-5">
            <div>
              <span class="font-mono text-[0.6rem] tracking-widest text-muted-foreground">DISPLAY · 3rem</span>
              <p class="text-5xl font-extrabold tracking-tight">Everything is a token</p>
            </div>
            <div>
              <span class="font-mono text-[0.6rem] tracking-widest text-muted-foreground">HEADING · 1.875rem</span>
              <p class="text-3xl font-bold">Design that scales</p>
            </div>
            <div>
              <span class="font-mono text-[0.6rem] tracking-widest text-muted-foreground">SUBHEAD · 1.25rem</span>
              <p class="text-xl font-semibold">Consistent, legible, intentional</p>
            </div>
            <div>
              <span class="font-mono text-[0.6rem] tracking-widest text-muted-foreground">BODY · 1rem</span>
              <p class="max-w-prose text-base text-muted-foreground">
                The quick brown fox jumps over the lazy dog. Body copy sets the reading rhythm —
                comfortable line length, generous line height, honest contrast.
              </p>
            </div>
            <div>
              <span class="font-mono text-[0.6rem] tracking-widest text-muted-foreground">MONO · 0.875rem</span>
              <p class="font-mono text-sm text-primary">const token = "font mode style base primary radius";</p>
            </div>
          </div>
        </Band>
      )}

      {/* ----------------------------------------------------------- Logo */}
      {sub.value === 'logo' && (
        <Band
          eyebrow="LOGO · BRAND"
          title="One mark, two forms"
          lead="A full lockup for room to breathe, a compact icon for tight spaces — both drawn from the same geometry and tinted by the theme."
        >
          <div class="flex flex-wrap items-center gap-10 rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-8">
            <LogoWithBorders class="h-12 w-auto" />
            <LogoIcon class="h-12 w-12" />
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div class="rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-5">
              <h3 class="font-semibold">Clear space</h3>
              <p class="mt-1 text-sm text-muted-foreground">
                Keep at least the height of the mark as padding on every side.
              </p>
            </div>
            <div class="rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-5">
              <h3 class="font-semibold">Minimum size</h3>
              <p class="mt-1 text-sm text-muted-foreground">
                Use the compact icon below 32px; the full lockup above it.
              </p>
            </div>
          </div>
        </Band>
      )}
    </>
  );
});

export default DesignSections;
