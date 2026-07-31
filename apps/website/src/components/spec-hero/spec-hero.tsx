import { component$, Slot, useStyles$ } from '@builder.io/qwik';

/**
 * Shared "technical specimen sheet" hero frame used across the landing tabs.
 * It supplies the family DNA — graph-paper grid, corner registration marks, a
 * left dimension line, the mono baseline strip and the load-in animation — and
 * projects each tab's own message (default slot) and specimen rail (`rail`
 * slot). Everything is drawn from the live theme tokens so all five heroes stay
 * one system and respond to the theme pickers.
 */
export const SpecHero = component$<{ dimLabel: string; baseline: string[] }>(
  ({ dimLabel, baseline }) => {
    useStyles$(HERO_CSS);

    return (
      <section class="fill-fold hero relative flex w-full items-center overflow-hidden">
        <span class="hero-cross hero-cross--tl" aria-hidden="true" />
        <span class="hero-cross hero-cross--tr" aria-hidden="true" />
        <span class="hero-cross hero-cross--bl" aria-hidden="true" />
        <span class="hero-cross hero-cross--br" aria-hidden="true" />

        <div class="hero-dim" aria-hidden="true">
          <span class="hero-dim__label">{dimLabel}</span>
        </div>

        <div class="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1fr_auto] md:px-12">
          <div class="relative max-w-2xl">
            <Slot />
          </div>
          <aside class="hero-rail hero-rise hero-r4">
            <Slot name="rail" />
          </aside>
        </div>

        <div class="hero-baseline font-mono" aria-hidden="true">
          <span>{baseline[0]}</span>
          <span class="hero-baseline__mid">{baseline[1]}</span>
          <span>{baseline[2]}</span>
        </div>
      </section>
    );
  },
);

export default SpecHero;

const HERO_CSS = `
  .hero {
    background-color: var(--background);
    color: var(--foreground);
    isolation: isolate;
  }

  /* graph-paper grid: fine 8px + major 64px, faded toward the edges */
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    background-image:
      linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px),
      linear-gradient(to right, color-mix(in oklab, var(--foreground) 4%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 4%, transparent) 1px, transparent 1px);
    background-size: 64px 64px, 64px 64px, 8px 8px, 8px 8px;
    -webkit-mask-image: radial-gradient(125% 105% at 20% 32%, #000 0%, #000 42%, transparent 100%);
    mask-image: radial-gradient(125% 105% at 20% 32%, #000 0%, #000 42%, transparent 100%);
  }

  /* primary glow, upper-right */
  .hero::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 62vmax;
    height: 62vmax;
    right: -20vmax;
    top: -24vmax;
    background: radial-gradient(circle, color-mix(in oklab, var(--primary) 24%, transparent), transparent 62%);
    pointer-events: none;
  }

  .hero-eyebrow {
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    color: var(--muted-foreground);
    margin: 0 0 1.5rem;
  }
  .hero-dot { opacity: 0.4; }

  .hero-title {
    margin: 0;
    font-weight: 800;
    font-size: clamp(2.75rem, 9vw, 6.5rem);
    line-height: 0.9;
    letter-spacing: -0.035em;
  }

  /* the accent word drawn as a border — transparent fill, primary stroke */
  .hero-outline {
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: clamp(2px, 0.45vw, 4px) var(--primary);
    text-stroke: clamp(2px, 0.45vw, 4px) var(--primary);
    paint-order: stroke fill;
  }

  .hero-sub {
    margin: 1.6rem 0 0;
    max-width: 36ch;
    font-size: clamp(1.05rem, 1.5vw, 1.3rem);
    line-height: 1.5;
    color: var(--muted-foreground);
  }

  .hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 2.75rem;
    padding: 0 1.15rem;
    border-radius: 0.55rem;
    font-weight: 600;
    font-size: 0.95rem;
    transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
  }
  .hero-btn--primary {
    background: var(--primary);
    color: var(--primary-foreground);
  }
  .hero-btn--primary:hover { transform: translateY(-2px); }
  .hero-btn--ghost {
    border: 1px solid var(--border);
    color: var(--foreground);
    font-size: 0.82rem;
    letter-spacing: 0.01em;
  }
  .hero-btn--ghost:hover {
    background: color-mix(in oklab, var(--foreground) 6%, transparent);
  }

  .hero-rail {
    display: none;
    flex-direction: column;
    gap: 1.9rem;
    padding-left: 2.25rem;
    border-left: 1px solid var(--border);
  }
  @media (min-width: 768px) {
    .hero-rail { display: flex; }
  }
  .hero-spec-label {
    display: block;
    margin-bottom: 0.7rem;
    font-size: 0.66rem;
    letter-spacing: 0.2em;
    color: var(--muted-foreground);
  }

  /* palette swatches */
  .hero-swatches { display: flex; gap: 0.45rem; }
  .hero-swatch {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.4rem;
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 14%, transparent);
  }

  /* border ramp 1-4px */
  .hero-ramp { display: flex; gap: 0.55rem; align-items: flex-end; }
  .hero-ramp__bar {
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border-bottom-style: solid;
    border-bottom-color: var(--foreground);
  }
  .hero-ramp__bar i {
    position: absolute;
    top: 0;
    left: 0;
    font-style: normal;
    font-size: 0.62rem;
    color: var(--muted-foreground);
  }

  /* key/value stat list */
  .hero-measures { display: flex; flex-direction: column; gap: 0.3rem; min-width: 11rem; }
  .hero-measures div {
    display: flex;
    justify-content: space-between;
    gap: 1.4rem;
    font-size: 0.75rem;
  }
  .hero-measures dt { color: var(--muted-foreground); }
  .hero-measures dd { margin: 0; color: var(--foreground); }

  /* labelled horizontal meter (A/B, funnel) */
  .hero-meter { display: flex; flex-direction: column; gap: 0.55rem; min-width: 11rem; }
  .hero-meter div { display: flex; align-items: center; gap: 0.6rem; font-size: 0.7rem; color: var(--muted-foreground); }
  .hero-meter i { font-style: normal; width: 3.2rem; flex-shrink: 0; }
  .hero-meter b { height: 0.5rem; border-radius: 3px; background: var(--primary); display: block; }
  .hero-meter b.dim { background: color-mix(in oklab, var(--primary) 45%, transparent); }

  /* uptime ticks */
  .hero-ticks { display: flex; gap: 3px; align-items: flex-end; }
  .hero-ticks b {
    width: 4px;
    height: 1.5rem;
    border-radius: 1px;
    display: block;
    background: color-mix(in oklab, var(--primary) 80%, var(--foreground));
  }
  .hero-ticks b.down { height: 0.9rem; background: color-mix(in oklab, var(--foreground) 22%, transparent); }

  /* edge node map (svg) */
  .hero-nodes { width: 12.5rem; height: auto; overflow: visible; }
  .hero-nodes line { stroke: var(--border); stroke-width: 1; }
  .hero-nodes circle { fill: var(--primary); }
  .hero-nodes circle.dim { fill: color-mix(in oklab, var(--foreground) 28%, transparent); }
  .hero-nodes circle.ping { fill: none; stroke: var(--primary); stroke-width: 1; opacity: 0.5; }

  /* token stream (AI) */
  .hero-stream { display: flex; flex-wrap: wrap; gap: 0.35rem; max-width: 12.5rem; }
  .hero-token {
    font-size: 0.62rem;
    padding: 0.15rem 0.42rem;
    border: 1px solid var(--border);
    border-radius: 0.32rem;
    color: var(--muted-foreground);
    opacity: 0;
    animation: heroTok 0.3s forwards;
  }
  .hero-token.hot { border-color: var(--primary); color: var(--foreground); }
  .hero-token:nth-child(1) { animation-delay: 0.55s; }
  .hero-token:nth-child(2) { animation-delay: 0.65s; }
  .hero-token:nth-child(3) { animation-delay: 0.75s; }
  .hero-token:nth-child(4) { animation-delay: 0.85s; }
  .hero-token:nth-child(5) { animation-delay: 0.95s; }
  .hero-token:nth-child(6) { animation-delay: 1.05s; }
  .hero-token:nth-child(7) { animation-delay: 1.15s; }
  .hero-token:nth-child(8) { animation-delay: 1.25s; }
  @keyframes heroTok { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }

  /* code diff (development) */
  .hero-diff {
    font-size: 0.68rem;
    line-height: 1.55;
    border: 1px solid var(--border);
    border-radius: 0.4rem;
    padding: 0.5rem 0.65rem;
    background: color-mix(in oklab, var(--foreground) 3%, transparent);
    min-width: 11rem;
  }
  .hero-diff .add { color: #3fb950; }
  .hero-diff .del { color: #f85149; }
  .hero-diff .ctx { color: var(--muted-foreground); }

  /* corner registration marks */
  .hero-cross {
    position: absolute;
    width: 13px;
    height: 13px;
    z-index: 1;
    opacity: 0.5;
  }
  .hero-cross::before,
  .hero-cross::after {
    content: "";
    position: absolute;
    background: var(--muted-foreground);
  }
  .hero-cross::before { left: 50%; top: 0; width: 1px; height: 100%; transform: translateX(-0.5px); }
  .hero-cross::after { top: 50%; left: 0; height: 1px; width: 100%; transform: translateY(-0.5px); }
  .hero-cross--tl { top: 16px; left: 16px; }
  .hero-cross--tr { top: 16px; right: 16px; }
  .hero-cross--bl { bottom: 40px; left: 16px; }
  .hero-cross--br { bottom: 40px; right: 16px; }

  /* left dimension line */
  .hero-dim {
    position: absolute;
    left: 22px;
    top: 24%;
    bottom: 26%;
    width: 1px;
    background: var(--border);
    display: none;
  }
  .hero-dim::before,
  .hero-dim::after {
    content: "";
    position: absolute;
    left: -4px;
    width: 9px;
    height: 1px;
    background: var(--muted-foreground);
  }
  .hero-dim::before { top: 0; }
  .hero-dim::after { bottom: 0; }
  .hero-dim__label {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    writing-mode: vertical-rl;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    color: var(--muted-foreground);
    white-space: nowrap;
  }
  @media (min-width: 1024px) {
    .hero-dim { display: block; }
  }

  /* baseline strip */
  .hero-baseline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.6rem clamp(1.5rem, 4vw, 3rem);
    border-top: 1px solid var(--border);
    background: color-mix(in oklab, var(--background) 72%, transparent);
    backdrop-filter: blur(3px);
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    color: var(--muted-foreground);
  }
  @media (max-width: 520px) {
    .hero-baseline__mid { display: none; }
  }

  /* load-in */
  @keyframes heroRise {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: none; }
  }
  .hero-rise { opacity: 0; animation: heroRise 0.7s cubic-bezier(0.2, 0.65, 0.3, 1) forwards; }
  .hero-r1 { animation-delay: 0.05s; }
  .hero-r2 { animation-delay: 0.16s; }
  .hero-r3 { animation-delay: 0.3s; }
  .hero-r4 { animation-delay: 0.42s; }

  @media (prefers-reduced-motion: reduce) {
    .hero-rise,
    .hero-token { animation: none; opacity: 1; transform: none; }
  }
`;
