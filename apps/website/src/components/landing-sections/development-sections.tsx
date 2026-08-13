import { component$, useSignal } from '@builder.io/qwik';
import {
  SectionTabs,
  Band,
  MonogramGrid,
  MeterList,
  CardCarousel,
  FeatureCards,
  LogoMarquee,
  TagRow,
  Comparison,
  CodeCard,
  BulletList,
  Steps,
  StatGrid,
  Accordion,
} from './section-kit';

/**
 * Development-tab content: a senior developer's working toolkit at webdev.ca —
 * the languages they reach for, the frameworks they build on, a featured
 * Qwik-vs-hydration comparison, how a senior actually works, and the full stack.
 * A sticky {@link SectionTabs} bar switches between the five sub-sections.
 */

const DEV_TABS = [
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'qwik', label: 'Qwik vs React' },
  { id: 'workflow', label: 'How I work' },
  { id: 'stack', label: 'Stack' },
];

export const DevelopmentSections = component$(() => {
  const sub = useSignal('languages');

  return (
    <>
      <SectionTabs tabs={DEV_TABS} active={sub.value} onSelect$={(id) => (sub.value = id)} />

      {/* ------------------------------------------------------ Languages */}
      {sub.value === 'languages' && (
        <>
          <Band
            eyebrow="LANGUAGES · webdev.ca"
            title="Right language for the job"
            lead="Fifteen years in, you stop having a favourite language and start having the right one for the problem in front of you — systems in Rust, data in Python, product in TypeScript."
          >
            <MonogramGrid
              cols={4}
              items={[
                { mono: 'Rs', name: 'Rust', note: 'systems · wasm · speed', color: '#c05621' },
                { mono: 'Py', name: 'Python', note: 'data · scripting · AI', color: '#2b6cb0' },
                { mono: 'TS', name: 'TypeScript', note: 'the daily driver', color: '#2563eb' },
                { mono: 'JS', name: 'JavaScript', note: 'runs everywhere', color: '#b7791f' },
                { mono: '<>', name: 'HTML', note: 'semantic & a11y-first', color: '#dd4b25' },
                { mono: '#', name: 'CSS', note: 'layout · tokens · motion', color: '#1d4ed8' },
                { mono: 'Go', name: 'Go', note: 'services · CLIs', color: '#0e7490' },
                { mono: 'SQL', name: 'SQL', note: 'Postgres, mostly', color: '#7c3aed' },
              ]}
            />
          </Band>

          <Band title="Fluency, not buzzwords" lead="Where the hours actually went.">
            <MeterList
              items={[
                { label: 'TypeScript / JavaScript', pct: 98 },
                { label: 'HTML & CSS', pct: 96 },
                { label: 'Python', pct: 92 },
                { label: 'SQL', pct: 90 },
                { label: 'Rust', pct: 84 },
                { label: 'Go', pct: 78 },
              ]}
            />
          </Band>

          <Band title="How a senior actually reaches for each" lead="Swipe →">
            <CardCarousel
              items={[
                {
                  kicker: 'RUST',
                  title: 'When it must not break',
                  body: 'Hot paths, WASM modules, CLI tooling. The borrow checker pays for itself the first time a data race never happens.',
                  tag: 'zero-cost abstractions',
                },
                {
                  kicker: 'PYTHON',
                  title: 'When you need answers fast',
                  body: 'Data pipelines, glue scripts, ML prototypes, one-off automation. Batteries included, ship by lunch.',
                  tag: 'pandas · fastapi',
                },
                {
                  kicker: 'TYPESCRIPT',
                  title: 'When it has to last',
                  body: 'Product code end to end — DB to DOM, one type-safe language. Refactors you can trust at 2am.',
                  tag: 'strict mode, always',
                },
                {
                  kicker: 'HTML / CSS',
                  title: 'When craft shows',
                  body: 'Semantic markup, accessible by default, token-driven styling. The 20% users actually feel.',
                  tag: 'a11y first',
                },
                {
                  kicker: 'GO',
                  title: 'When it must scale simply',
                  body: 'Small binaries, honest concurrency, boring deploys. Great for services that just need to stay up.',
                  tag: 'goroutines',
                },
              ]}
            />
          </Band>
        </>
      )}

      {/* ----------------------------------------------------- Frameworks */}
      {sub.value === 'frameworks' && (
        <>
          <Band
            eyebrow="FRAMEWORKS"
            title="The tools on the bench"
            lead="Frameworks are opinions with a runtime. Knowing several means picking the opinion that fits the project, not forcing every project through one."
          >
            <FeatureCards
              cols={3}
              items={[
                { icon: 'zap', title: 'Frontend', body: 'Qwik, React, Next.js, Svelte, Vue, Astro, SolidJS.' },
                { icon: 'server', title: 'Backend', body: 'Node/Express, NestJS, FastAPI, Django, Rails, Axum, Actix.' },
                { icon: 'layers', title: 'Fullstack', body: 'Next.js, Remix, SvelteKit, Qwik City, Laravel, Phoenix.' },
                { icon: 'database', title: 'Data', body: 'PostgreSQL, Redis, Prisma, Drizzle, GraphQL, SQLite.' },
                { icon: 'container', title: 'Infra', body: 'Docker, Kubernetes, Terraform, GitHub Actions, Nx.' },
                { icon: 'feather', title: 'Styling', body: 'Tailwind CSS, CSS Modules, vanilla-extract, design tokens.' },
              ]}
            />
          </Band>

          <Band title="Seen on every job description" lead="And most of my résumé.">
            <LogoMarquee
              labels={[
                'React', 'Next.js', 'Qwik', 'Vue', 'Svelte', 'Angular', 'SolidJS', 'Astro',
                'Node.js', 'Express', 'NestJS', 'Django', 'FastAPI', 'Flask', 'Rails',
                'Laravel', 'Spring', '.NET', 'Actix', 'Axum', 'Tailwind', 'GraphQL',
                'PostgreSQL', 'Redis', 'Prisma', 'Docker', 'Kubernetes', 'AWS', 'Vercel',
              ]}
            />
          </Band>

          <Band title="Pick by fit, not by hype">
            <TagRow
              tags={[
                'SSR', 'SSG', 'ISR', 'Edge', 'RSC', 'Islands', 'Resumability',
                'REST', 'GraphQL', 'tRPC', 'WebSockets', 'Queues', 'Cron', 'Serverless',
              ]}
            />
          </Band>
        </>
      )}

      {/* --------------------------------------------------- Qwik vs React */}
      {sub.value === 'qwik' && (
        <>
          <Band
            eyebrow="FEATURED · RESUMABILITY"
            title="Qwik vs. hydration-based frameworks"
            lead="React, Next, Vue and friends hydrate: the server renders HTML, then the browser re-runs your whole app to wire it back up. Qwik resumes — it picks up exactly where the server left off, downloading code only when a user actually interacts."
          >
            <FeatureCards
              cols={2}
              items={[
                { icon: 'zap', title: 'Resumable, not hydrated', body: 'No replay of the app on load. Qwik serializes the framework state into the HTML and resumes from it — O(1) startup, no matter how big the app grows.' },
                { icon: 'gauge', title: 'Instant Time-to-Interactive', body: 'Hydration cost scales with page size; resumability does not. Interactive on first paint, even on a mid-range phone.' },
                { icon: 'feather', title: 'Lazy by default', body: 'Every event handler is its own lazy-loaded chunk. The browser downloads a click handler when you click — not before.' },
                { icon: 'trending', title: 'Scales down and up', body: 'Ships ~1kb of JS to start. A hydration framework ships — and executes — your whole component tree up front.' },
              ]}
            />
          </Band>

          <Band title="Head to head" lead="Same app, two startup models.">
            <Comparison
              columns={['Qwik', 'React / Next.js']}
              highlight={0}
              rows={[
                { label: 'Startup model', values: ['Resumable', 'Hydration'] },
                { label: 'JS executed on load', values: ['~1 kb constant', 'Grows with app'] },
                { label: 'Time to interactive', values: ['Instant', 'Scales with page'] },
                { label: 'Code splitting', values: ['Automatic, per-listener', 'Manual / per-route'] },
                { label: 'Prefetch', values: ['Speculative, on idle', 'Route-level'] },
                { label: 'Server rendering', values: [true, true] },
                { label: 'Reuses React ecosystem', values: [false, true] },
              ]}
            />
          </Band>

          <Band title="The difference in one idea">
            <div class="grid gap-4 lg:grid-cols-2">
              <CodeCard
                title="hydration"
                lang="react"
                lines={[
                  { t: 'com', text: '// server renders HTML…' },
                  { t: 'com', text: '// then the browser re-runs everything:' },
                  { t: 'key', text: 'hydrateRoot(el, <App />)' },
                  { t: 'dim', text: '  ↳ rebuild vdom' },
                  { t: 'dim', text: '  ↳ re-attach every listener' },
                  { t: 'del', text: '  ↳ cost grows with app size' },
                ]}
              />
              <CodeCard
                title="resumability"
                lang="qwik"
                lines={[
                  { t: 'com', text: '// server serializes state into HTML…' },
                  { t: 'com', text: '// browser resumes — runs nothing yet:' },
                  { t: 'key', text: 'onClick$={() => count.value++}' },
                  { t: 'dim', text: '  ↳ handler is its own chunk' },
                  { t: 'dim', text: '  ↳ downloaded on first click' },
                  { t: 'add', text: '  ↳ startup stays O(1)' },
                ]}
              />
            </div>
          </Band>

          <Band title="Why it matters on real devices">
            <BulletList
              items={[
                'Users on slow phones get an interactive page immediately, not after a hydration spike.',
                'Bundle size stops being a startup tax — you only pay for interactions people make.',
                'Core Web Vitals (INP, TBT) improve without hand-tuned code-splitting.',
                'You keep JSX, components and signals — the mental model stays familiar.',
              ]}
            />
          </Band>
        </>
      )}

      {/* ------------------------------------------------------- Workflow */}
      {sub.value === 'workflow' && (
        <>
          <Band
            eyebrow="HOW I WORK · webdev.ca"
            title="How a senior actually ships"
            lead="The code is the easy part. The value is in the decisions before and after it."
          >
            <Steps
              items={[
                { title: 'Discovery', body: 'Understand the business, the users and the constraints before touching an editor. Cheapest place to change your mind.' },
                { title: 'Architecture', body: 'Pick the boring, provable stack. Draw the data model. Decide what not to build.' },
                { title: 'Build in thin slices', body: 'Ship a walking skeleton end-to-end, then flesh it out. Always demoable, never a big-bang merge.' },
                { title: 'Test where it counts', body: 'Types, unit tests on logic, a few honest end-to-end paths. Confidence, not coverage theatre.' },
                { title: 'Ship & observe', body: 'Preview deploys per PR, feature flags, real user monitoring. Roll forward, not back.' },
                { title: 'Iterate', body: 'Measure, cut what nobody uses, harden what everybody does. Repeat.' },
              ]}
            />
          </Band>

          <Band title="Fifteen years, roughly">
            <StatGrid
              stats={[
                { value: '15+', label: 'years shipping' },
                { value: '120+', label: 'projects delivered' },
                { value: '8', label: 'languages in anger' },
                { value: '99.9%', label: 'uptime targets met' },
              ]}
            />
          </Band>

          <Band title="What clients ask first">
            <Accordion
              items={[
                { q: 'Which framework should we use?', a: 'Whichever your team can own after I leave. I optimise for the crew that maintains it, not for my résumé — often that is TypeScript with Next.js or Qwik.' },
                { q: 'Can you work with our existing codebase?', a: 'Yes. Most senior work is brownfield — reading, refactoring and de-risking code that already exists, not greenfield rewrites.' },
                { q: 'How do you keep things fast?', a: 'Measure first. Ship less JavaScript, cache aggressively at the edge, lazy-load by default, and pick resumable frameworks like Qwik where startup cost matters.' },
                { q: 'Do you do the boring parts?', a: 'CI/CD, observability, accessibility, docs and handover — that is the senior part. The demo is easy; the decade of maintenance is the job.' },
              ]}
            />
          </Band>
        </>
      )}

      {/* ---------------------------------------------------------- Stack */}
      {sub.value === 'stack' && (
        <>
          <Band
            eyebrow="STACK"
            title="The full stack, end to end"
            lead="From the database to the deploy pipeline — a stack chosen to be fast to build on and cheap to keep alive."
          >
            <MonogramGrid
              cols={4}
              items={[
                { mono: 'Ts', name: 'TypeScript', note: 'app language', color: '#2563eb' },
                { mono: 'Qc', name: 'Qwik City', note: 'meta-framework', color: 'var(--primary)' },
                { mono: 'Tw', name: 'Tailwind', note: 'styling', color: '#0891b2' },
                { mono: 'Pg', name: 'PostgreSQL', note: 'primary datastore', color: '#2b6cb0' },
                { mono: 'Rd', name: 'Redis', note: 'cache & queues', color: '#c53030' },
                { mono: 'Dr', name: 'Drizzle', note: 'type-safe ORM', color: '#15803d' },
                { mono: 'Dk', name: 'Docker', note: 'packaging', color: '#2563eb' },
                { mono: 'Vc', name: 'Vercel', note: 'edge hosting', color: 'var(--foreground)' },
              ]}
            />
          </Band>

          <Band title="Why this stack" lead="Boring on purpose.">
            <FeatureCards
              cols={3}
              items={[
                { icon: 'code', title: 'One language', body: 'TypeScript from the schema to the UI — one mental model, shared types, fearless refactors.' },
                { icon: 'gauge', title: 'Fast by default', body: 'Resumable rendering, edge caching and lazy loading, so speed is the starting point, not a project.' },
                { icon: 'shield', title: 'Cheap to run', body: 'Serverless where it fits, a single Postgres where it counts. No cluster to babysit.' },
              ]}
            />
          </Band>

          <Band title="Recent work" lead="Swipe →">
            <CardCarousel
              items={[
                { kicker: 'SAAS', title: 'Multi-tenant dashboard', body: 'Qwik City + Postgres, row-level tenancy, sub-100ms edge responses.', tag: 'TypeScript' },
                { kicker: 'DATA', title: 'ETL & reporting', body: 'Python pipelines feeding a Postgres warehouse and a live analytics UI.', tag: 'Python' },
                { kicker: 'PERF', title: 'WASM image tooling', body: 'A Rust core compiled to WASM, wrapped in a tiny Qwik front-end.', tag: 'Rust' },
                { kicker: 'API', title: 'Public REST + GraphQL', body: 'Go services behind an edge gateway, rate-limited and cached.', tag: 'Go' },
              ]}
            />
          </Band>
        </>
      )}
    </>
  );
});

export default DevelopmentSections;
