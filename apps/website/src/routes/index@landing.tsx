import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="relative isolate overflow-hidden px-6 py-20 md:py-28">
      <DotGrid />
      <BlurredBlobs />
      <FloatingShapes />

      <div class="relative mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Resumable. Accessible. Beautiful.
        </span>

        <h1 class="text-5xl leading-[1.05] font-extrabold tracking-tight md:text-7xl lg:text-8xl">
          <span class="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_30px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
            Qwik UI
          </span>
        </h1>

        <h2 class="max-w-3xl text-xl leading-snug font-semibold md:text-3xl">
          Headless & styled copy-paste components,
          <br class="hidden sm:inline" />{' '}
          <span class="text-primary">automatically optimized</span> for you.
        </h2>

        <p class="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Build the future of the web with components that ship zero JavaScript by
          default. Choose a kit and start shipping{' '}
          <span class="hue-rotate-150">⚡</span>
        </p>
      </div>

      <div class="relative mx-auto mt-20 grid w-full max-w-5xl grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
        <KitCard
          href="/docs/headless/introduction"
          eyebrow="Primitive"
          title="Headless"
          description="Completely unstyled, accessible primitives for the most creative minds. Bring your own CSS — vanilla, Tailwind, Sass, anything."
          variant="headless"
        />
        <KitCard
          href="/docs/styled/introduction"
          eyebrow="Design system"
          title="Styled"
          description="Copy-paste, themeable components built on top of headless. Sensible defaults, full control, ready to ship."
          variant="styled"
        />
      </div>
    </div>
  );
});

const KitCard = component$<{
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  variant: 'headless' | 'styled';
}>(({ href, eyebrow, title, description, variant }) => {
  return (
    <a href={href} class="group block focus-visible:outline-none">
      <div
        class="relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-card/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_60px_-12px_color-mix(in_oklab,var(--primary)_60%,transparent)] focus-visible:-translate-y-1 focus-visible:border-primary/60"
      >
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div
          class={
            variant === 'headless'
              ? 'relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 text-primary'
              : 'relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/10 text-primary'
          }
        >
          {variant === 'headless' ? <HeadlessIcon /> : <StyledIcon />}
        </div>

        <div class="relative border-t border-primary/10 p-6">
          <div class="mb-2 text-xs font-semibold tracking-widest text-primary/70 uppercase">
            {eyebrow}
          </div>
          <h3 class="mb-2 text-2xl font-bold tracking-tight">{title}</h3>
          <p class="text-base text-muted-foreground">{description}</p>

          <div class="mt-5 inline-flex items-center text-sm font-semibold text-primary">
            Explore the kit
            <svg
              class="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
});

const DotGrid = component$(() => (
  <svg
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-30 h-full w-full text-primary opacity-[0.18]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="qui-dots" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="14" cy="14" r="1.1" fill="currentColor" />
      </pattern>
      <radialGradient id="qui-dots-fade" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="white" stop-opacity="1" />
        <stop offset="60%" stop-color="white" stop-opacity="0.5" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </radialGradient>
      <mask id="qui-dots-mask">
        <rect width="100%" height="100%" fill="url(#qui-dots-fade)" />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#qui-dots)" mask="url(#qui-dots-mask)" />
  </svg>
));

const BlurredBlobs = component$(() => (
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
  >
    <div class="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary opacity-25 blur-3xl" />
    <div class="absolute top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-secondary opacity-20 blur-3xl" />
    <div class="absolute top-[40rem] left-1/3 h-96 w-96 rounded-full bg-primary opacity-20 blur-3xl" />
  </div>
));

const FloatingShapes = component$(() => (
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-primary"
  >
    <svg
      class="absolute -top-32 -right-32 h-[28rem] w-[28rem] opacity-[0.12]"
      viewBox="0 0 200 200"
    >
      <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" stroke-width="0.5" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" stroke-width="0.5" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" stroke-width="0.5" />
      <circle cx="100" cy="100" r="26" fill="none" stroke="currentColor" stroke-width="0.5" />
    </svg>

    <svg
      class="absolute top-28 left-6 h-14 w-14 opacity-30 md:left-16"
      viewBox="0 0 40 40"
    >
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="6"
        fill="currentColor"
        opacity="0.18"
      />
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>

    <svg
      class="absolute top-64 right-8 h-12 w-12 opacity-30 md:right-24"
      viewBox="0 0 40 40"
    >
      <polygon points="20,4 36,32 4,32" fill="currentColor" opacity="0.15" />
      <polygon
        points="20,4 36,32 4,32"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>

    <svg class="absolute top-44 left-1/4 h-6 w-6 opacity-50" viewBox="0 0 24 24">
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>

    <svg class="absolute top-96 right-1/3 h-4 w-4 opacity-60" viewBox="0 0 24 24">
      <path
        d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"
        fill="currentColor"
      />
    </svg>

    <svg class="absolute top-[36rem] left-12 h-8 w-8 opacity-40" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1" />
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>
  </div>
));

const HeadlessIcon = component$(() => (
  <svg
    aria-hidden="true"
    viewBox="0 0 400 300"
    class="absolute inset-0 h-full w-full"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
  >
    <defs>
      <pattern
        id="hl-grid"
        width="14"
        height="14"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(0)"
      >
        <circle cx="7" cy="7" r="0.8" fill="currentColor" opacity="0.4" />
      </pattern>
    </defs>

    <rect width="400" height="300" fill="url(#hl-grid)" opacity="0.4" />

    <g opacity="0.25">
      <rect x="48" y="36" width="220" height="170" rx="14" stroke-width="1.2" />
    </g>
    <g opacity="0.55">
      <rect x="80" y="58" width="220" height="170" rx="14" stroke-width="1.4" />
      <line x1="100" y1="86" x2="220" y2="86" stroke-width="2" opacity="0.7" />
      <line x1="100" y1="100" x2="270" y2="100" stroke-width="1.5" opacity="0.5" />
    </g>

    <g>
      <rect x="112" y="80" width="220" height="170" rx="14" stroke-width="2" />
      <line x1="132" y1="108" x2="248" y2="108" stroke-width="3.5" />
      <line
        x1="132"
        y1="124"
        x2="298"
        y2="124"
        stroke-width="1.6"
        opacity="0.55"
      />
      <line
        x1="132"
        y1="136"
        x2="260"
        y2="136"
        stroke-width="1.6"
        opacity="0.55"
      />

      <rect x="132" y="156" width="80" height="28" rx="6" stroke-width="2" />
      <rect x="220" y="156" width="80" height="28" rx="6" stroke-width="2" />

      <rect x="132" y="198" width="52" height="22" rx="11" stroke-width="2" />
      <circle cx="143" cy="209" r="7" stroke-width="2" />
      <line
        x1="200"
        y1="206"
        x2="298"
        y2="206"
        stroke-width="1.6"
        opacity="0.55"
      />
      <line
        x1="200"
        y1="216"
        x2="258"
        y2="216"
        stroke-width="1.6"
        opacity="0.55"
      />

      <rect x="132" y="232" width="168" height="24" rx="6" stroke-width="2" />
      <line x1="190" y1="244" x2="242" y2="244" stroke-width="2.5" />
    </g>

    <line
      x1="48"
      y1="36"
      x2="80"
      y2="58"
      stroke-width="0.8"
      stroke-dasharray="2 3"
      opacity="0.45"
    />
    <line
      x1="80"
      y1="58"
      x2="112"
      y2="80"
      stroke-width="0.8"
      stroke-dasharray="2 3"
      opacity="0.45"
    />

    <circle cx="36" cy="252" r="6" fill="currentColor" stroke="none" opacity="0.45" />
    <circle cx="370" cy="48" r="4" fill="currentColor" stroke="none" opacity="0.55" />
    <circle cx="370" cy="270" r="3" fill="currentColor" stroke="none" opacity="0.4" />
    <path
      d="M360 252 L370 242 L380 252"
      stroke-width="2"
      stroke-linejoin="round"
      opacity="0.45"
    />
  </svg>
));

const StyledIcon = component$(() => (
  <svg
    aria-hidden="true"
    viewBox="0 0 400 300"
    class="absolute inset-0 h-full w-full"
  >
    <defs>
      <linearGradient id="st-card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0.4" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0.18" />
      </linearGradient>
      <radialGradient id="st-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0.5" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
      </radialGradient>
      <filter id="st-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>

    <ellipse cx="220" cy="150" rx="160" ry="100" fill="url(#st-glow)" />

    <g opacity="0.45">
      <rect
        x="48"
        y="36"
        width="220"
        height="170"
        rx="14"
        fill="currentColor"
        opacity="0.15"
      />
      <rect
        x="48"
        y="36"
        width="220"
        height="170"
        rx="14"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        opacity="0.5"
      />
    </g>
    <g opacity="0.7">
      <rect
        x="80"
        y="58"
        width="220"
        height="170"
        rx="14"
        fill="currentColor"
        opacity="0.18"
      />
      <rect
        x="80"
        y="58"
        width="220"
        height="170"
        rx="14"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        opacity="0.55"
      />
    </g>

    <g>
      <rect
        x="116"
        y="84"
        width="220"
        height="170"
        rx="14"
        fill="currentColor"
        opacity="0.18"
        filter="url(#st-shadow)"
      />
      <rect
        x="112"
        y="80"
        width="220"
        height="170"
        rx="14"
        fill="url(#st-card)"
      />
      <rect
        x="112"
        y="80"
        width="220"
        height="170"
        rx="14"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        opacity="0.7"
      />

      <rect
        x="132"
        y="102"
        width="110"
        height="14"
        rx="7"
        fill="currentColor"
      />
      <rect
        x="132"
        y="124"
        width="170"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.45"
      />
      <rect
        x="132"
        y="136"
        width="130"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.45"
      />

      <rect x="132" y="156" width="80" height="28" rx="6" fill="currentColor" />
      <rect
        x="220"
        y="156"
        width="80"
        height="28"
        rx="6"
        fill="currentColor"
        opacity="0.28"
      />

      <rect x="132" y="198" width="52" height="22" rx="11" fill="currentColor" />
      <circle cx="173" cy="209" r="7" fill="white" />
      <rect
        x="200"
        y="204"
        width="98"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.45"
      />
      <rect
        x="200"
        y="214"
        width="68"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.32"
      />

      <rect x="132" y="232" width="168" height="24" rx="6" fill="currentColor" />
      <rect
        x="190"
        y="240"
        width="52"
        height="8"
        rx="4"
        fill="white"
        opacity="0.95"
      />
    </g>

    <circle cx="36" cy="252" r="8" fill="currentColor" opacity="0.6" />
    <circle cx="370" cy="48" r="5" fill="currentColor" opacity="0.75" />
    <circle cx="370" cy="270" r="3" fill="currentColor" opacity="0.55" />
    <path
      d="M360 252 L370 242 L380 252"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
      opacity="0.55"
    />
    <path
      d="M30 60 L40 50 L50 60 L40 70 Z"
      fill="currentColor"
      opacity="0.5"
    />
  </svg>
));

export const head: DocumentHead = {
  title: "Qwik UI - The world's fastest loading UI components library",
};
