import { component$, Slot, useStyles$, type QRL } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import {
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuQuote,
  LuRocket,
  LuZap,
  LuGauge,
  LuGlobe,
  LuServer,
  LuCpu,
  LuDatabase,
  LuGitBranch,
  LuShield,
  LuClock,
  LuCloud,
  LuNetwork,
  LuActivity,
  LuMessageSquare,
  LuWorkflow,
  LuPackage,
  LuPuzzle,
  LuLayers,
  LuBoxes,
  LuTerminal,
  LuCode,
  LuSparkles,
  LuUsers,
  LuTrendingUp,
  LuWrench,
  LuContainer,
  LuFlame,
  LuFeather,
} from '@qwikest/icons/lucide';

/**
 * Shared building blocks for the landing tabs' content sections. Everything here
 * is token-driven (primary / border / radius / shadow / card colours), so all
 * sections respond to the theme pickers just like the design tab's specimens.
 *
 * Data is passed as plain string/number/boolean arrays (never component refs),
 * which keeps Qwik SSR serialization happy. Icons are selected by string key
 * from {@link ICONS} inside the block, so callers pass an icon name, not a ref.
 */

const ICONS: Record<string, typeof LuSparkles> = {
  rocket: LuRocket, zap: LuZap, gauge: LuGauge, globe: LuGlobe, server: LuServer,
  cpu: LuCpu, database: LuDatabase, git: LuGitBranch, shield: LuShield, clock: LuClock,
  cloud: LuCloud, network: LuNetwork, activity: LuActivity, message: LuMessageSquare,
  workflow: LuWorkflow, package: LuPackage, puzzle: LuPuzzle, layers: LuLayers,
  boxes: LuBoxes, terminal: LuTerminal, code: LuCode, sparkles: LuSparkles,
  users: LuUsers, trending: LuTrendingUp, wrench: LuWrench, container: LuContainer,
  flame: LuFlame, feather: LuFeather, arrow: LuArrowRight,
};

/**
 * The theme's accent palette. These default to the primary colour, so a
 * one-colour theme stays monochrome; when a colour-harmony mode is active the
 * secondary/tertiary/quad slots diverge and multi-item components pick them up
 * automatically by cycling `ACCENTS[i % 4]`.
 */
const ACCENTS: { bg: string; fg: string }[] = [
  { bg: 'var(--primary)', fg: 'var(--primary-foreground)' },
  { bg: 'var(--secondary)', fg: 'var(--secondary-foreground)' },
  { bg: 'var(--tertiary)', fg: 'var(--tertiary-foreground)' },
  { bg: 'var(--quad)', fg: 'var(--quad-foreground)' },
];

const CODE_CLASS: Record<string, string> = {
  ctx: 'text-foreground',
  com: 'text-muted-foreground italic',
  key: 'text-primary',
  str: 'text-emerald-500',
  add: 'text-emerald-500',
  del: 'text-red-400',
  fn: 'text-sky-500',
  dim: 'text-muted-foreground',
};

const SNAP_CSS = `
  .snap-row { scrollbar-width: none; }
  .snap-row::-webkit-scrollbar { display: none; }
`;
const ACC_CSS = `
  .acc summary::-webkit-details-marker { display: none; }
  .acc[open] .chev { transform: rotate(180deg); }
`;
const MARQUEE_CSS = `
  .marquee-track { animation: kitMarq 32s linear infinite; }
  @keyframes kitMarq { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
`;

/* ------------------------------------------------------------------ layout */

/** Sticky secondary tab bar for a landing section — mirrors the design style bar. */
export const SectionTabs = component$<{
  tabs: { id: string; label: string }[];
  active: string;
  onSelect$: QRL<(id: string) => void>;
}>(({ tabs, active, onSelect$ }) => (
  <div
    role="tablist"
    class={cn(
      // Second-level nav: the active category's topics. Docks at the bottom of
      // the hero fold and sticks directly under the header (categories now live
      // in the header itself).
      'sticky z-[9] flex h-[var(--tabbar-h)] w-full items-stretch',
      'top-[var(--header-h)]',
      'border-b bg-background/90 backdrop-blur-md',
      'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    )}
  >
    {tabs.map((t) => {
      const on = t.id === active;
      return (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={on}
          onClick$={() => onSelect$(t.id)}
          class={cn(
            'relative inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap px-4 text-xs font-medium transition-colors',
            on ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t.label}
          <span
            class={cn(
              'pointer-events-none absolute inset-x-2 bottom-0 h-0.5 bg-primary transition-opacity',
              on ? 'opacity-100' : 'opacity-0',
            )}
          />
        </button>
      );
    })}
  </div>
));

/** Section wrapper: mono eyebrow + heading + lead, then projected content. */
export const Band = component$<{
  eyebrow?: string;
  title?: string;
  lead?: string;
  center?: boolean;
}>(({ eyebrow, title, lead, center }) => (
  <section class={cn('mx-auto w-full max-w-5xl px-6 py-14 sm:py-20', center && 'text-center')}>
    {eyebrow && (
      <p class="mb-3 font-mono text-xs tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
    )}
    {title && <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>}
    {lead && (
      <p class={cn('mt-3 max-w-2xl text-base text-muted-foreground', center && 'mx-auto')}>
        {lead}
      </p>
    )}
    <div class="mt-8">
      <Slot />
    </div>
  </section>
));

/* ------------------------------------------------------------------ blocks */

/** Horizontal snap carousel of text cards. */
export const CardCarousel = component$<{
  items: { kicker?: string; title: string; body: string; tag?: string }[];
}>(({ items }) => {
  useStyles$(SNAP_CSS);
  return (
    <div class="snap-row -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
      {items.map((it, i) => (
        <article
          key={i}
          class="w-72 shrink-0 snap-start rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-5 text-card-foreground shadow-sm"
        >
          {it.kicker && (
            <p
              class="font-mono text-[0.65rem] tracking-widest"
              style={{ color: ACCENTS[i % 4].bg }}
            >
              {it.kicker}
            </p>
          )}
          <h3 class="mt-1 text-lg font-semibold">{it.title}</h3>
          <p class="mt-2 text-sm text-muted-foreground">{it.body}</p>
          {it.tag && (
            <span class="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
              {it.tag}
            </span>
          )}
        </article>
      ))}
    </div>
  );
});

/** Compact metric tiles. */
export const StatGrid = component$<{ stats: { value: string; label: string }[] }>(({ stats }) => (
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
    {stats.map((s, i) => (
      <div
        key={i}
        class="rounded-[calc(var(--border-radius)+0.375rem)] border bg-card p-4 text-center"
      >
        <div class="text-2xl font-bold sm:text-3xl" style={{ color: ACCENTS[i % 4].bg }}>
          {s.value}
        </div>
        <div class="mt-1 text-xs text-muted-foreground">{s.label}</div>
      </div>
    ))}
  </div>
));

/** Icon feature cards (icon by string key). */
export const FeatureCards = component$<{
  items: { icon?: string; title: string; body: string }[];
  cols?: number;
}>(({ items, cols = 3 }) => (
  <div class={cn('grid gap-4 sm:grid-cols-2', cols === 3 && 'lg:grid-cols-3')}>
    {items.map((it, i) => {
      const Icon = ICONS[it.icon ?? ''] ?? LuSparkles;
      return (
        <div
          key={i}
          class="rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-5 text-card-foreground shadow-sm"
        >
          <span
            class="flex h-9 w-9 items-center justify-center rounded-[var(--border-radius)]"
            style={{ background: ACCENTS[i % 4].bg, color: ACCENTS[i % 4].fg }}
          >
            <Icon class="h-5 w-5" />
          </span>
          <h3 class="mt-3 font-semibold">{it.title}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{it.body}</p>
        </div>
      );
    })}
  </div>
));

/** FAQ-style accordion (native <details>, no JS needed). */
export const Accordion = component$<{ items: { q: string; a: string }[] }>(({ items }) => {
  useStyles$(ACC_CSS);
  return (
    <div class="divide-y rounded-[calc(var(--border-radius)+0.5rem)] border">
      {items.map((it, i) => (
        <details key={i} class="acc group">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium">
            {it.q}
            <LuChevronDown class="chev h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </summary>
          <p class="px-5 pb-4 text-sm text-muted-foreground">{it.a}</p>
        </details>
      ))}
    </div>
  );
});

/** Numbered vertical timeline. */
export const Steps = component$<{ items: { title: string; body: string }[] }>(({ items }) => (
  <ol class="relative ml-3 space-y-6 border-l-2 border-border pl-6">
    {items.map((it, i) => (
      <li key={i} class="relative">
        <span class="absolute -left-[2.15rem] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {i + 1}
        </span>
        <h3 class="font-semibold">{it.title}</h3>
        <p class="mt-1 text-sm text-muted-foreground">{it.body}</p>
      </li>
    ))}
  </ol>
));

/** Pricing / plan cards. */
export const PricingCards = component$<{
  plans: {
    name: string;
    price: string;
    period?: string;
    features: string[];
    featured?: boolean;
    cta?: string;
  }[];
}>(({ plans }) => (
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {plans.map((p, i) => (
      <div
        key={i}
        class={cn(
          'flex flex-col rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-6 text-card-foreground shadow-sm',
          p.featured && 'border-primary ring-2 ring-primary',
        )}
      >
        {p.featured && (
          <span class="mb-2 self-start rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
            Popular
          </span>
        )}
        <h3 class="font-semibold">{p.name}</h3>
        <div class="mt-2">
          <span class="text-3xl font-bold">{p.price}</span>
          {p.period && <span class="text-sm text-muted-foreground">/{p.period}</span>}
        </div>
        <ul class="mt-4 flex-1 space-y-2 text-sm">
          {p.features.map((f, j) => (
            <li key={j} class="flex items-center gap-2">
              <LuCheck class="h-4 w-4 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>
        <button
          class={cn(
            'mt-6 inline-flex h-10 items-center justify-center rounded-[var(--border-radius)] px-4 text-sm font-semibold transition-colors',
            p.featured
              ? 'bg-primary text-primary-foreground'
              : 'border hover:bg-accent',
          )}
        >
          {p.cta ?? 'Choose plan'}
        </button>
      </div>
    ))}
  </div>
));

/** Testimonial snap carousel. */
export const Testimonials = component$<{
  items: { quote: string; name: string; role: string }[];
}>(({ items }) => {
  useStyles$(SNAP_CSS);
  return (
    <div class="snap-row -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
      {items.map((t, i) => (
        <figure
          key={i}
          class="w-80 shrink-0 snap-start rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-6 text-card-foreground shadow-sm"
        >
          <LuQuote class="h-6 w-6 text-primary" />
          <blockquote class="mt-3 text-sm leading-relaxed">{t.quote}</blockquote>
          <figcaption class="mt-4 text-xs">
            <span class="font-semibold">{t.name}</span>
            <span class="text-muted-foreground"> · {t.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
});

/** Infinite marquee of pill labels (logos / tech names). */
export const LogoMarquee = component$<{ labels: string[] }>(({ labels }) => {
  useStyles$(MARQUEE_CSS);
  const row = [...labels, ...labels];
  return (
    <div class="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div class="marquee-track flex w-max gap-3">
        {row.map((l, i) => (
          <span
            key={i}
            class="shrink-0 rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
});

/** Feature comparison table; boolean values render as check / dash. */
export const Comparison = component$<{
  columns: string[];
  rows: { label: string; values: (string | boolean)[] }[];
  highlight?: number;
}>(({ columns, rows, highlight }) => (
  <div class="-mx-6 overflow-x-auto px-6">
    <table class="w-full min-w-[34rem] border-collapse text-sm">
      <thead>
        <tr>
          <th class="p-3 text-left font-medium text-muted-foreground"></th>
          {columns.map((c, i) => (
            <th key={i} class={cn('p-3 text-center font-semibold', highlight === i && 'text-primary')}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} class="border-t">
            <td class="p-3 font-medium">{r.label}</td>
            {r.values.map((v, j) => (
              <td key={j} class={cn('p-3 text-center', highlight === j && 'bg-primary/5')}>
                {typeof v === 'boolean' ? (
                  v ? (
                    <LuCheck class="mx-auto h-4 w-4 text-primary" />
                  ) : (
                    <span class="text-muted-foreground">—</span>
                  )
                ) : (
                  v
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

/** Chat bubble demo. */
export const ChatDemo = component$<{ messages: { role: 'user' | 'ai'; text: string }[] }>(
  ({ messages }) => (
    <div class="mx-auto max-w-md space-y-3 rounded-[calc(var(--border-radius)+0.5rem)] border bg-card p-4 shadow-sm">
      {messages.map((m, i) => (
        <div key={i} class={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
          <div
            class={cn(
              'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
              m.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground',
            )}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  ),
);

/** Faux terminal / code card with line-level colour hints. */
export const CodeCard = component$<{
  title?: string;
  lang?: string;
  lines: { t?: string; text: string }[];
}>(({ title, lang, lines }) => (
  <div class="overflow-hidden rounded-[calc(var(--border-radius)+0.5rem)] border bg-card shadow-sm">
    <div class="flex items-center gap-2 border-b px-4 py-2">
      <span class="h-3 w-3 rounded-full bg-red-400" />
      <span class="h-3 w-3 rounded-full bg-amber-400" />
      <span class="h-3 w-3 rounded-full bg-green-400" />
      <span class="ml-2 font-mono text-xs text-muted-foreground">
        {title ?? 'snippet'}
        {lang ? ` · ${lang}` : ''}
      </span>
    </div>
    <pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
      <code>
        {lines.map((l, i) => (
          <div key={i} class={CODE_CLASS[l.t ?? 'ctx'] ?? 'text-foreground'}>
            {l.text || ' '}
          </div>
        ))}
      </code>
    </pre>
  </div>
));

/** Labelled progress meters. */
export const MeterList = component$<{
  items: { label: string; pct: number; note?: string }[];
}>(({ items }) => (
  <div class="space-y-3">
    {items.map((m, i) => (
      <div key={i}>
        <div class="mb-1 flex items-center justify-between text-xs">
          <span class="font-medium">{m.label}</span>
          <span class="text-muted-foreground">{m.note ?? `${m.pct}%`}</span>
        </div>
        <div class="h-2 overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full"
            style={{ width: `${m.pct}%`, background: ACCENTS[i % 4].bg }}
          />
        </div>
      </div>
    ))}
  </div>
));

/** Grid of monogram badges (languages, tools). `color` tints the badge. */
export const MonogramGrid = component$<{
  items: { mono: string; name: string; note?: string; color?: string }[];
  cols?: number;
}>(({ items, cols = 3 }) => (
  <div class={cn('grid grid-cols-2 gap-3 sm:grid-cols-3', cols === 4 && 'lg:grid-cols-4')}>
    {items.map((it, i) => {
      const color = it.color ?? 'var(--primary)';
      return (
        <div
          key={i}
          class="flex items-center gap-3 rounded-[calc(var(--border-radius)+0.375rem)] border bg-card p-3"
        >
          <span
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--border-radius)] font-mono text-sm font-bold"
            style={{ color, background: `color-mix(in oklab, ${color} 16%, transparent)` }}
          >
            {it.mono}
          </span>
          <div class="min-w-0">
            <div class="truncate text-sm font-semibold">{it.name}</div>
            {it.note && <div class="truncate text-xs text-muted-foreground">{it.note}</div>}
          </div>
        </div>
      );
    })}
  </div>
));

/** Simple check-marked bullet list. */
export const BulletList = component$<{ items: string[] }>(({ items }) => (
  <ul class="space-y-2 text-sm">
    {items.map((t, i) => (
      <li key={i} class="flex items-start gap-2">
        <LuCheck class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
));

/** Row of pill tags. */
export const TagRow = component$<{ tags: string[] }>(({ tags }) => (
  <div class="flex flex-wrap gap-2">
    {tags.map((t, i) => (
      <span
        key={i}
        class="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
      >
        {t}
      </span>
    ))}
  </div>
));
