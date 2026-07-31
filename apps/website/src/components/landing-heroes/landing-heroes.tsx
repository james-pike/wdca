import { component$ } from '@builder.io/qwik';
import { LuArrowRight } from '@qwikest/icons/lucide';
import { SpecHero } from '~/components/spec-hero/spec-hero';

/**
 * The five landing heroes, each a distinct "technical specimen sheet" built on
 * the shared {@link SpecHero} frame. They are plain components (not routes) so
 * the tab bar can switch between them instantly via shared state.
 */

export const DesignHero = component$(() => (
  <SpecHero
    dimLabel="100SVH − 108PX"
    baseline={['8PX GRID', 'FOLD = 100SVH − 108PX', 'THEME · v2']}
  >
    <p class="hero-eyebrow hero-rise hero-r1 font-mono">
      <span style="color:var(--primary)">primary</span>
      <span class="hero-dot"> · </span>base
      <span class="hero-dot"> · </span>border-1
      <span class="hero-dot"> · </span>radius-2
      <span class="hero-dot"> · </span>100svh
    </p>

    <h1 class="hero-title hero-rise hero-r2">
      Everything
      <br />
      is a <span class="hero-outline">token</span>.
    </h1>

    <p class="hero-sub hero-rise hero-r3">
      Colour, border, spacing, type — every choice is one value in a string you
      can theme, share and fork in real time.
    </p>

    <div class="hero-rise hero-r4 mt-9 flex flex-wrap items-center gap-3">
      <a href="#" class="hero-btn hero-btn--primary">
        Make it yours
        <LuArrowRight class="h-4 w-4" />
      </a>
      <a href="#" class="hero-btn hero-btn--ghost font-mono">
        Copy theme string
      </a>
    </div>

    <div q:slot="rail">
      <div>
        <span class="hero-spec-label font-mono">PALETTE</span>
        <div class="hero-swatches">
          <span
            class="hero-swatch"
            style="background:color-mix(in oklab, var(--primary) 50%, var(--background))"
          />
          <span class="hero-swatch" style="background:var(--primary)" />
          <span
            class="hero-swatch"
            style="background:color-mix(in oklab, var(--primary) 68%, #000)"
          />
        </div>
      </div>

      <div>
        <span class="hero-spec-label font-mono">BORDER</span>
        <div class="hero-ramp">
          <span class="hero-ramp__bar" style="border-bottom-width:1px">
            <i class="font-mono">1</i>
          </span>
          <span class="hero-ramp__bar" style="border-bottom-width:2px">
            <i class="font-mono">2</i>
          </span>
          <span class="hero-ramp__bar" style="border-bottom-width:3px">
            <i class="font-mono">3</i>
          </span>
          <span class="hero-ramp__bar" style="border-bottom-width:4px">
            <i class="font-mono">4</i>
          </span>
        </div>
      </div>

      <div>
        <span class="hero-spec-label font-mono">CHROME</span>
        <dl class="hero-measures font-mono">
          <div>
            <dt>header</dt>
            <dd>64px</dd>
          </div>
          <div>
            <dt>tabs</dt>
            <dd>44px</dd>
          </div>
          <div>
            <dt>grid</dt>
            <dd>8px</dd>
          </div>
        </dl>
      </div>
    </div>
  </SpecHero>
));

export const DevelopmentHero = component$(() => (
  <SpecHero dimLabel="COMMIT → SHIP" baseline={['TYPE-SAFE', 'HMR < 50MS', 'BUILD 1.2S']}>
    <p class="hero-eyebrow hero-rise hero-r1 font-mono">
      <span style="color:var(--primary)">main</span>
      <span class="hero-dot"> · </span>+1,204 −318
      <span class="hero-dot"> · </span>214 tests ✓
      <span class="hero-dot"> · </span>1.2s
    </p>

    <h1 class="hero-title hero-rise hero-r2">
      Commit. Push.
      <br />
      <span class="hero-outline">Ship</span>.
    </h1>

    <p class="hero-sub hero-rise hero-r3">
      Type-safe from the database to the DOM. Hot reload in milliseconds, deploys
      in seconds, and zero config getting in your way.
    </p>

    <div class="hero-rise hero-r4 mt-9 flex flex-wrap items-center gap-3">
      <a href="#" class="hero-btn hero-btn--primary">
        Read the docs
        <LuArrowRight class="h-4 w-4" />
      </a>
      <a href="#" class="hero-btn hero-btn--ghost font-mono">
        View on GitHub
      </a>
    </div>

    <div q:slot="rail">
      <div>
        <span class="hero-spec-label font-mono">DIFF</span>
        <pre class="hero-diff font-mono">
<span class="ctx">  export const cta =</span>
<span class="del">- slow(props)</span>
<span class="add">+ fast(props)</span></pre>
      </div>

      <div>
        <span class="hero-spec-label font-mono">BUILD</span>
        <dl class="hero-measures font-mono">
          <div>
            <dt>install</dt>
            <dd>0.9s</dd>
          </div>
          <div>
            <dt>build</dt>
            <dd>1.2s</dd>
          </div>
          <div>
            <dt>deploy</dt>
            <dd>4s</dd>
          </div>
        </dl>
      </div>

      <div>
        <span class="hero-spec-label font-mono">TESTS</span>
        <dl class="hero-measures font-mono">
          <div>
            <dt>passing</dt>
            <dd>214</dd>
          </div>
          <div>
            <dt>failing</dt>
            <dd>0</dd>
          </div>
          <div>
            <dt>coverage</dt>
            <dd>98%</dd>
          </div>
        </dl>
      </div>
    </div>
  </SpecHero>
));

export const MarketingHero = component$(() => (
  <SpecHero dimLabel="VISIT → PAID" baseline={['A/B TESTED', 'CTR +38%', 'p < 0.05']}>
    <p class="hero-eyebrow hero-rise hero-r1 font-mono">
      <span style="color:var(--primary)">variant-b</span>
      <span class="hero-dot"> · </span>+38% ctr
      <span class="hero-dot"> · </span>12.4k reach
      <span class="hero-dot"> · </span>p&lt;0.05
    </p>

    <h1 class="hero-title hero-rise hero-r2">
      Make them
      <br />
      <span class="hero-outline">click</span>.
    </h1>

    <p class="hero-sub hero-rise hero-r3">
      Landing pages, A/B tests and analytics built in. Launch a campaign in an
      afternoon and watch, in real time, exactly what works.
    </p>

    <div class="hero-rise hero-r4 mt-9 flex flex-wrap items-center gap-3">
      <a href="#" class="hero-btn hero-btn--primary">
        Start a campaign
        <LuArrowRight class="h-4 w-4" />
      </a>
      <a href="#" class="hero-btn hero-btn--ghost font-mono">
        See analytics
      </a>
    </div>

    <div q:slot="rail">
      <div>
        <span class="hero-spec-label font-mono">A / B</span>
        <div class="hero-meter font-mono">
          <div>
            <i>A · 62%</i>
            <b class="dim" style="width:62%" />
          </div>
          <div>
            <i>B · 86%</i>
            <b style="width:86%" />
          </div>
        </div>
      </div>

      <div>
        <span class="hero-spec-label font-mono">FUNNEL</span>
        <div class="hero-meter font-mono">
          <div>
            <i>visit</i>
            <b style="width:100%" />
          </div>
          <div>
            <i>signup</i>
            <b style="width:42%" />
          </div>
          <div>
            <i>paid</i>
            <b style="width:18%" />
          </div>
        </div>
      </div>

      <div>
        <span class="hero-spec-label font-mono">LIFT</span>
        <dl class="hero-measures font-mono">
          <div>
            <dt>ctr</dt>
            <dd>+38%</dd>
          </div>
          <div>
            <dt>cvr</dt>
            <dd>+12%</dd>
          </div>
          <div>
            <dt>cac</dt>
            <dd>−24%</dd>
          </div>
        </dl>
      </div>
    </div>
  </SpecHero>
));

export const HostingHero = component$(() => (
  <SpecHero dimLabel="3 EDGE REGIONS" baseline={['EDGE CACHED', '99.99% UPTIME', '24MS P50']}>
    <p class="hero-eyebrow hero-rise hero-r1 font-mono">
      <span style="color:var(--primary)">iad1</span>
      <span class="hero-dot"> · </span>3 regions
      <span class="hero-dot"> · </span>99.99%
      <span class="hero-dot"> · </span>24ms p50
    </p>

    <h1 class="hero-title hero-rise hero-r2">
      Served from
      <br />
      the <span class="hero-outline">edge</span>.
    </h1>

    <p class="hero-sub hero-rise hero-r3">
      Your site replicated to every region, cached at the edge, and online 99.99%
      of the time. Global by default, fast by design.
    </p>

    <div class="hero-rise hero-r4 mt-9 flex flex-wrap items-center gap-3">
      <a href="#" class="hero-btn hero-btn--primary">
        Deploy now
        <LuArrowRight class="h-4 w-4" />
      </a>
      <a href="#" class="hero-btn hero-btn--ghost font-mono">
        View status
      </a>
    </div>

    <div q:slot="rail">
      <div>
        <span class="hero-spec-label font-mono">EDGE</span>
        <svg class="hero-nodes" viewBox="0 0 200 96" fill="none" aria-hidden="true">
          <line x1="42" y1="30" x2="150" y2="22" />
          <line x1="42" y1="30" x2="96" y2="72" />
          <line x1="150" y1="22" x2="96" y2="72" />
          <line x1="150" y1="22" x2="176" y2="60" />
          <circle class="dim" cx="176" cy="60" r="3" />
          <circle cx="42" cy="30" r="5" />
          <circle class="ping" cx="42" cy="30" r="9" />
          <circle cx="150" cy="22" r="5" />
          <circle cx="96" cy="72" r="5" />
        </svg>
      </div>

      <div>
        <span class="hero-spec-label font-mono">UPTIME · 99.99%</span>
        <div class="hero-ticks">
          <b /><b /><b /><b class="down" /><b /><b /><b /><b /><b /><b /><b /><b />
        </div>
      </div>

      <div>
        <span class="hero-spec-label font-mono">LATENCY</span>
        <dl class="hero-measures font-mono">
          <div>
            <dt>p50</dt>
            <dd>24ms</dd>
          </div>
          <div>
            <dt>p95</dt>
            <dd>60ms</dd>
          </div>
          <div>
            <dt>p99</dt>
            <dd>120ms</dd>
          </div>
        </dl>
      </div>
    </div>
  </SpecHero>
));

export const AiHero = component$(() => (
  <SpecHero dimLabel="PROMPT → TOKENS" baseline={['STREAMING', '128K CONTEXT', 'STRUCTURED OUT']}>
    <p class="hero-eyebrow hero-rise hero-r1 font-mono">
      <span style="color:var(--primary)">model</span>
      <span class="hero-dot"> · </span>temp 0.7
      <span class="hero-dot"> · </span>128k ctx
      <span class="hero-dot"> · </span>42 tok/s
    </p>

    <h1 class="hero-title hero-rise hero-r2">
      Prompt to
      <br />
      <span class="hero-outline">product</span>.
    </h1>

    <p class="hero-sub hero-rise hero-r3">
      Generate copy, components and whole pages from a prompt. The latest models,
      wired in — streaming, structured, and ready to ship.
    </p>

    <div class="hero-rise hero-r4 mt-9 flex flex-wrap items-center gap-3">
      <a href="#" class="hero-btn hero-btn--primary">
        Try a prompt
        <LuArrowRight class="h-4 w-4" />
      </a>
      <a href="#" class="hero-btn hero-btn--ghost font-mono">
        Read the guide
      </a>
    </div>

    <div q:slot="rail">
      <div>
        <span class="hero-spec-label font-mono">STREAM</span>
        <div class="hero-stream font-mono">
          <span class="hero-token">&lt;section</span>
          <span class="hero-token">class</span>
          <span class="hero-token hot">"hero"</span>
          <span class="hero-token">&gt;</span>
          <span class="hero-token">Make</span>
          <span class="hero-token">it</span>
          <span class="hero-token hot">yours</span>
          <span class="hero-token">▍</span>
        </div>
      </div>

      <div>
        <span class="hero-spec-label font-mono">MODEL</span>
        <dl class="hero-measures font-mono">
          <div>
            <dt>context</dt>
            <dd>128k</dd>
          </div>
          <div>
            <dt>temp</dt>
            <dd>0.7</dd>
          </div>
          <div>
            <dt>speed</dt>
            <dd>42 t/s</dd>
          </div>
        </dl>
      </div>

      <div>
        <span class="hero-spec-label font-mono">OUTPUT</span>
        <dl class="hero-measures font-mono">
          <div>
            <dt>format</dt>
            <dd>JSX</dd>
          </div>
          <div>
            <dt>schema</dt>
            <dd>typed</dd>
          </div>
          <div>
            <dt>stream</dt>
            <dd>on</dd>
          </div>
        </dl>
      </div>
    </div>
  </SpecHero>
));
