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
  Steps,
  StatGrid,
  Accordion,
  PricingCards,
  VizCard,
  Sparkline,
  Heatmap,
  Donut,
  NetworkGraph,
} from './section-kit';

/**
 * Hosting-tab content: the edge platform behind webdev.ca — a global network of
 * regions, CDN caching and latency budgets, uptime / SLA and incident practice,
 * and the plans that pay for it. A sticky {@link SectionTabs} bar switches
 * between the four sub-sections, each a different mix of the shared blocks.
 */

const HOSTING_TABS = [
  { id: 'network', label: 'Network' },
  { id: 'performance', label: 'Performance' },
  { id: 'reliability', label: 'Reliability' },
  { id: 'plans', label: 'Plans' },
];

export const HostingSections = component$(() => {
  const sub = useSignal('network');

  return (
    <>
      <SectionTabs tabs={HOSTING_TABS} active={sub.value} onSelect$={(id) => (sub.value = id)} />

      {/* -------------------------------------------------------- Network */}
      {sub.value === 'network' && (
        <>
          <Band
            eyebrow="NETWORK · webdev.ca"
            title="Your site, everywhere at once"
            lead="Every deploy is copied to a global fabric of edge regions the moment it goes live. Requests never leave the continent they came from — they terminate at the nearest point of presence and answer from cache in single-digit milliseconds."
          >
            <MonogramGrid
              cols={4}
              items={[
                { mono: 'IAD', name: 'Washington', note: 'us-east · primary', color: '#2563eb' },
                { mono: 'SFO', name: 'San Francisco', note: 'us-west', color: '#0891b2' },
                { mono: 'YYZ', name: 'Toronto', note: 'ca-central', color: '#dc2626' },
                { mono: 'FRA', name: 'Frankfurt', note: 'eu-central', color: '#7c3aed' },
                { mono: 'LHR', name: 'London', note: 'eu-west', color: '#1d4ed8' },
                { mono: 'CDG', name: 'Paris', note: 'eu-west', color: '#2b6cb0' },
                { mono: 'SIN', name: 'Singapore', note: 'ap-southeast', color: '#0e7490' },
                { mono: 'SYD', name: 'Sydney', note: 'ap-southeast', color: '#15803d' },
                { mono: 'NRT', name: 'Tokyo', note: 'ap-northeast', color: '#c05621' },
                { mono: 'GRU', name: 'São Paulo', note: 'sa-east', color: '#b7791f' },
                { mono: 'BOM', name: 'Mumbai', note: 'ap-south', color: '#9333ea' },
                { mono: 'JNB', name: 'Johannesburg', note: 'af-south', color: 'var(--primary)' },
              ]}
            />
          </Band>

          <Band title="The network, drawn" lead="Requests hop to the nearest edge, then home over a private backbone.">
            <VizCard caption="EDGE FABRIC · 12 REGIONS">
              <NetworkGraph
                nodes={[
                  { x: 18, y: 14 }, { x: 40, y: 8 }, { x: 66, y: 12 }, { x: 86, y: 20 },
                  { x: 10, y: 34 }, { x: 50, y: 30 }, { x: 78, y: 40 },
                  { x: 24, y: 52 }, { x: 46, y: 50 }, { x: 70, y: 54 },
                ]}
                edges={[
                  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [5, 8],
                  [4, 7], [5, 6], [7, 8], [8, 9], [6, 9], [3, 6], [5, 9],
                ]}
              />
            </VizCard>
          </Band>

          <Band title="Anycast the whole way down" lead="One IP, the nearest metal answers.">
            <FeatureCards
              cols={3}
              items={[
                { icon: 'globe', title: 'Anycast routing', body: 'A single anycast address announced from every region. BGP steers each visitor to the closest healthy PoP — no DNS tricks, no geo-lookup latency.' },
                { icon: 'network', title: 'Private backbone', body: 'Region-to-region traffic rides a dedicated backbone, not the public internet. Origin fetches and cache fills stay fast and predictable.' },
                { icon: 'server', title: 'Automatic failover', body: 'Health checks drain an unhealthy region in seconds. Traffic reroutes to the next-nearest PoP before a visitor ever notices.' },
                { icon: 'shield', title: 'TLS at the edge', body: 'HTTP/3 and TLS 1.3 terminate at the PoP with automatic certificate issuance and renewal. Zero-config HTTPS on every custom domain.' },
                { icon: 'cloud', title: 'Smart origin shielding', body: 'A regional shield tier collapses duplicate misses into one origin fetch, so a cold cache never stampedes your backend.' },
                { icon: 'zap', title: 'Cold-start-free', body: 'Edge functions stay warm across the fleet. First byte is fast whether you are request one or request one million.' },
              ]}
            />
          </Band>

          <Band title="The fabric in numbers">
            <StatGrid
              stats={[
                { value: '38', label: 'edge regions' },
                { value: '6', label: 'continents' },
                { value: '310 Tbps', label: 'network capacity' },
                { value: '<15 ms', label: 'to 95% of users' },
              ]}
            />
          </Band>
        </>
      )}

      {/* ---------------------------------------------------- Performance */}
      {sub.value === 'performance' && (
        <>
          <Band
            eyebrow="PERFORMANCE · CDN"
            title="Cache first, compute only when you must"
            lead="Static assets and cacheable responses are served straight from the edge; dynamic responses use stale-while-revalidate so nobody ever waits on a revalidation. You set the policy in a header — the network does the rest."
          >
            <CodeCard
              title="response headers"
              lang="http"
              lines={[
                { t: 'com', text: '# static build output — immutable, cache forever' },
                { t: 'key', text: 'Cache-Control: public, max-age=31536000, immutable' },
                { t: 'dim', text: '' },
                { t: 'com', text: '# HTML — always fresh, but serve stale while we refresh' },
                { t: 'key', text: 'Cache-Control: public, s-maxage=60, stale-while-revalidate=86400' },
                { t: 'dim', text: '' },
                { t: 'com', text: '# tag responses so you can purge by key, not by URL' },
                { t: 'add', text: 'Cache-Tag: product:1421, listing:shoes' },
                { t: 'fn', text: 'X-Edge-Cache: HIT · region=IAD · age=12s' },
              ]}
            />
          </Band>

          <Band title="Thirty days of edge" lead="Response time trending down, availability holding at four nines.">
            <div class="grid gap-4 md:grid-cols-3">
              <VizCard caption="P50 TTFB · 30D" value="24ms">
                <Sparkline data={[38, 34, 36, 30, 31, 28, 27, 26, 25, 24, 24, 23]} />
              </VizCard>
              <VizCard caption="CACHE HIT" value="98.6%">
                <div class="flex justify-center">
                  <Donut value={99} label="edge cached" />
                </div>
              </VizCard>
              <VizCard caption="UPTIME · 12 WEEKS">
                <Heatmap
                  cols={12}
                  data={Array.from({ length: 60 }, (_, i) => (i % 17 === 0 ? 1 : 4))}
                />
              </VizCard>
            </div>
          </Band>

          <Band title="Latency you can put in a budget" lead="p50 / p95 / p99 measured from real user traffic, last 30 days.">
            <StatGrid
              stats={[
                { value: '9 ms', label: 'TTFB · p50' },
                { value: '31 ms', label: 'TTFB · p95' },
                { value: '68 ms', label: 'TTFB · p99' },
                { value: '96.4%', label: 'edge cache hit rate' },
              ]}
            />
          </Band>

          <Band title="Where the milliseconds go" lead="A cached edge response, broken down.">
            <MeterList
              items={[
                { label: 'TLS handshake (resumed)', pct: 8, note: '3 ms' },
                { label: 'Cache lookup', pct: 4, note: '1 ms' },
                { label: 'Compression (brotli)', pct: 12, note: '2 ms' },
                { label: 'Edge compute (SWR revalidate)', pct: 22, note: '5 ms' },
                { label: 'First byte on the wire', pct: 96, note: 'p95 · 31 ms' },
              ]}
            />
          </Band>

          <Band title="Turned on by default">
            <TagRow
              tags={[
                'HTTP/3', 'QUIC', 'Brotli', 'Zstd', 'TLS 1.3', 'Early Hints',
                'stale-while-revalidate', 'stale-if-error', 'Image optimization',
                'Edge caching', 'ISR', 'Tag-based purge', 'Streaming SSR',
              ]}
            />
          </Band>
        </>
      )}

      {/* ----------------------------------------------------- Reliability */}
      {sub.value === 'reliability' && (
        <>
          <Band
            eyebrow="RELIABILITY · SLA"
            title="Boring is a feature"
            lead="The best hosting story is no story at all. Multi-region redundancy, automatic rollbacks and a real incident practice mean the platform stays up so you can stay asleep."
          >
            <MeterList
              items={[
                { label: 'Uptime · trailing 90 days', pct: 100, note: '99.99%' },
                { label: 'Uptime · trailing 12 months', pct: 100, note: '99.98%' },
                { label: 'Successful deploys', pct: 99, note: '99.7%' },
                { label: 'Automatic rollback success', pct: 100, note: '100%' },
                { label: 'DDoS events absorbed (no impact)', pct: 100, note: '100%' },
              ]}
            />
          </Band>

          <Band title="Ship it, watch it, undo it" lead="Every push is a preview; every promotion is reversible.">
            <Steps
              items={[
                { title: 'Push a branch', body: 'A commit triggers an immutable build. Nothing mutates in place — each deploy is a new, content-addressed artifact.' },
                { title: 'Get a preview URL', body: 'Every PR gets its own isolated deployment with production data mirrors. Review the real thing, not a screenshot.' },
                { title: 'Promote to production', body: 'A promotion is an atomic pointer swap across all regions. Traffic moves the moment the new build is healthy everywhere.' },
                { title: 'Watch the release', body: 'Real-user monitoring, error rates and p95 latency stream in live. Alerts fire on regressions, not on hunches.' },
                { title: 'Roll back instantly', body: 'A bad release is one click — or one automatic trigger — to the previous known-good artifact. No rebuild, sub-second global swap.' },
              ]}
            />
          </Band>

          <Band title="Protection that is always on">
            <FeatureCards
              cols={3}
              items={[
                { icon: 'shield', title: 'DDoS mitigation', body: 'Layer 3/4 and layer 7 attacks are scrubbed at the edge automatically. Volumetric floods never reach your origin or your bill.' },
                { icon: 'activity', title: 'Health-based routing', body: 'Continuous probes drain failing instances and reroute traffic before error rates climb. Self-healing without a pager.' },
                { icon: 'clock', title: 'Point-in-time rollback', body: 'Every deploy of the last 90 days is retained and instantly restorable. Recovery is a lookup, not a rebuild.' },
                { icon: 'git', title: 'Immutable deploys', body: 'Builds are content-addressed and never overwritten, so the artifact you tested is byte-for-byte the one that serves traffic.' },
                { icon: 'flame', title: 'Rate limiting', body: 'Per-route token buckets and bot fingerprinting keep abusive clients out while real users sail through untouched.' },
                { icon: 'workflow', title: 'Chaos-tested', body: 'We drill region failure and origin loss on a schedule. Failover is rehearsed, not hoped for.' },
              ]}
            />
          </Band>

          <Band title="The questions the on-call actually gets">
            <Accordion
              items={[
                { q: 'What does the SLA actually guarantee?', a: '99.99% monthly uptime on the Business plan, backed by service credits. Uptime is measured against the edge, which is where your users actually connect.' },
                { q: 'How fast is a rollback?', a: 'A rollback is a pointer swap to an artifact that is already warm at every region — typically under a second globally, with no rebuild step.' },
                { q: 'What happens during a regional outage?', a: 'Anycast withdraws the affected region from BGP and visitors are served from the next-nearest PoP. Cached content sees zero impact; origin traffic reroutes automatically.' },
                { q: 'How are DDoS attacks handled?', a: 'Automatically and included on every plan. Traffic is scrubbed at the network edge, so attack volume never counts toward your bandwidth or reaches your functions.' },
                { q: 'Where can I see incident history?', a: 'A public status page reports real-time component health and a full postmortem for every incident. No incident is closed without a written root cause.' },
              ]}
            />
          </Band>
        </>
      )}

      {/* ----------------------------------------------------------- Plans */}
      {sub.value === 'plans' && (
        <>
          <Band
            eyebrow="PLANS · webdev.ca"
            title="Priced for the whole journey"
            lead="Start free on the same global network the big plans run on. Pay only when your traffic — and your revenue — grows into it. No egress surprises, no per-seat tax on your teammates."
            center
          >
            <PricingCards
              plans={[
                {
                  name: 'Hobby',
                  price: '$0',
                  period: 'mo',
                  features: [
                    '100 GB bandwidth / month',
                    'Global edge network',
                    'Automatic HTTPS + preview deploys',
                    'Community support',
                  ],
                  cta: 'Start free',
                },
                {
                  name: 'Pro',
                  price: '$20',
                  period: 'mo',
                  featured: true,
                  features: [
                    '1 TB bandwidth included',
                    'Tag-based cache purge + analytics',
                    'Instant rollbacks & password-protected previews',
                    '99.99% uptime SLA',
                    'Email support · 1-business-day',
                  ],
                  cta: 'Go Pro',
                },
                {
                  name: 'Business',
                  price: 'Custom',
                  features: [
                    'Committed-use bandwidth pricing',
                    'Dedicated regions & origin shielding',
                    'SSO, audit logs & role-based access',
                    '24/7 support with a named engineer',
                  ],
                  cta: 'Talk to sales',
                },
              ]}
            />
          </Band>

          <Band title="Line by line" lead="What each tier actually includes.">
            <Comparison
              columns={['Hobby', 'Pro', 'Business']}
              highlight={1}
              rows={[
                { label: 'Included bandwidth', values: ['100 GB', '1 TB', 'Committed'] },
                { label: 'Edge regions', values: ['All 38', 'All 38', 'All 38 + dedicated'] },
                { label: 'Preview deploys', values: [true, true, true] },
                { label: 'Instant rollback', values: [false, true, true] },
                { label: 'Tag-based cache purge', values: [false, true, true] },
                { label: 'Uptime SLA', values: ['—', '99.99%', '99.99% + credits'] },
                { label: 'DDoS mitigation', values: [true, true, true] },
                { label: 'SSO & audit logs', values: [false, false, true] },
                { label: 'Support', values: ['Community', 'Email · 1 day', '24/7 · named'] },
              ]}
            />
          </Band>

          <Band title="From zero to live in three commands" lead="No dashboard required.">
            <CodeCard
              title="deploy"
              lang="bash"
              lines={[
                { t: 'com', text: '# install the CLI and log in' },
                { t: 'key', text: 'npm i -g @webdev/cli && webdev login' },
                { t: 'dim', text: '' },
                { t: 'com', text: '# link the repo and ship to a preview URL' },
                { t: 'key', text: 'webdev deploy' },
                { t: 'add', text: '✓ built in 11s · 38 regions · https://demo-a1b2.webdev.app' },
                { t: 'dim', text: '' },
                { t: 'com', text: '# promote the current preview to production' },
                { t: 'key', text: 'webdev promote --prod' },
                { t: 'add', text: '✓ live at https://webdev.ca · global swap in 0.4s' },
              ]}
            />
          </Band>

          <Band title="Teams already on the network" lead="Swipe →">
            <CardCarousel
              items={[
                { kicker: 'ECOMMERCE', title: 'Storefront at scale', body: 'Black-Friday traffic served 98% from edge cache, origin untouched, zero downtime.', tag: 'Pro' },
                { kicker: 'MEDIA', title: 'News under load', body: 'Breaking-story spikes absorbed by stale-while-revalidate — no origin stampede.', tag: 'Business' },
                { kicker: 'SAAS', title: 'Global dashboard', body: 'Preview-per-PR workflow took their release cadence from weekly to hourly.', tag: 'Pro' },
                { kicker: 'STARTUP', title: 'Launch day', body: 'Went from a free Hobby project to front-page traffic without touching a config.', tag: 'Hobby' },
              ]}
            />
            <div class="mt-10">
              <LogoMarquee
                labels={[
                  'Northwind', 'Acme Retail', 'Kestrel Media', 'Loop', 'Vantage',
                  'Harbor', 'Fathom', 'Beacon', 'Meridian', 'Cedar', 'Orbit',
                  'Tidewater', 'Grove', 'Lumen', 'Prairie', 'Quorum',
                ]}
              />
            </div>
          </Band>
        </>
      )}
    </>
  );
});

export default HostingSections;
