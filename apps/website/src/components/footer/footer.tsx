import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { GitHubIcon } from '../icons/GitHubIcon';
import { LogoIcon } from '../icons/logo';

/**
 * Footer drawn on the same "technical specimen sheet" frame as the hero — the
 * graph-paper grid, corner registration marks, a primary glow and a mono
 * baseline strip — so the page opens and closes on the same visual system.
 * Everything is token-driven, so it responds to the theme pickers.
 */
export const Footer = component$(() => {
  useStyles$(FOOTER_CSS);

  return (
    <footer class="footer-grid relative overflow-hidden border-t">
      <span class="foot-cross foot-cross--tl" aria-hidden="true" />
      <span class="foot-cross foot-cross--tr" aria-hidden="true" />

      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-12">
        {/* Brand */}
        <div>
          <div class="flex items-center gap-2">
            <LogoIcon class="h-7 w-7" />
            <span class="text-lg font-bold tracking-tight">webdev.ca</span>
          </div>
          <p class="mt-3 max-w-xs text-sm text-muted-foreground">
            Design, build, market, host &amp; AI — every choice is one value in a
            string you can theme, share and fork.
          </p>
          <a
            target="_blank"
            href="https://github.com/qwikifiers/qwik-ui"
            aria-label="GitHub repository"
            class="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-[var(--border-radius)] border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <GitHubIcon />
          </a>
        </div>

        <FootCol title="KITS">
          <FootLink href="/docs/headless/introduction">Headless Kit</FootLink>
          <FootLink href="/docs/styled/introduction">Styled Kit</FootLink>
        </FootCol>

        <FootCol title="RESOURCES">
          <FootLink href="https://qwik.dev/docs" external>
            Qwik Docs
          </FootLink>
          <FootLink
            href="https://www.w3.org/standards/webdesign/accessibility"
            external
          >
            Accessibility
          </FootLink>
        </FootCol>

        <FootCol title="CONNECT">
          <FootLink href="https://github.com/qwikifiers/qwik-ui" external>
            GitHub
          </FootLink>
          <FootLink href="/docs/headless/introduction">Contribute</FootLink>
        </FootCol>
      </div>

      {/* mono baseline strip, echoing the hero */}
      <div class="foot-baseline font-mono" aria-hidden="true">
        <span>8PX GRID</span>
        <span class="foot-baseline__mid">webdev.ca · THEME v2</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
});

const FootCol = component$<{ title: string }>(({ title }) => (
  <div>
    <p class="mb-3 font-mono text-[0.66rem] tracking-[0.2em] text-muted-foreground">
      {title}
    </p>
    <ul class="space-y-2">
      <Slot />
    </ul>
  </div>
));

const FootLink = component$<{ href: string; external?: boolean }>(
  ({ href, external }) => (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        class="text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <Slot />
      </a>
    </li>
  ),
);

export default Footer;

const FOOTER_CSS = `
  .footer-grid {
    background-color: var(--background);
    color: var(--foreground);
    isolation: isolate;
  }
  /* graph-paper grid: fine 8px + major 64px, faded toward the far corner */
  .footer-grid::before {
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
    -webkit-mask-image: radial-gradient(120% 130% at 82% 0%, #000 0%, #000 46%, transparent 100%);
    mask-image: radial-gradient(120% 130% at 82% 0%, #000 0%, #000 46%, transparent 100%);
  }
  /* primary glow, lower-left */
  .footer-grid::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 48vmax;
    height: 48vmax;
    left: -18vmax;
    bottom: -26vmax;
    background: radial-gradient(circle, color-mix(in oklab, var(--primary) 20%, transparent), transparent 62%);
    pointer-events: none;
  }
  .foot-cross {
    position: absolute;
    width: 12px;
    height: 12px;
    z-index: 1;
    opacity: 0.5;
  }
  .foot-cross::before,
  .foot-cross::after {
    content: "";
    position: absolute;
    background: var(--muted-foreground);
  }
  .foot-cross::before { left: 50%; top: 0; width: 1px; height: 100%; transform: translateX(-0.5px); }
  .foot-cross::after { top: 50%; left: 0; height: 1px; width: 100%; transform: translateY(-0.5px); }
  .foot-cross--tl { top: 16px; left: 16px; }
  .foot-cross--tr { top: 16px; right: 16px; }

  .foot-baseline {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem clamp(1.5rem, 4vw, 3rem);
    border-top: 1px solid var(--border);
    background: color-mix(in oklab, var(--background) 72%, transparent);
    backdrop-filter: blur(3px);
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    color: var(--muted-foreground);
  }
  @media (max-width: 520px) {
    .foot-baseline__mid { display: none; }
  }
`;
