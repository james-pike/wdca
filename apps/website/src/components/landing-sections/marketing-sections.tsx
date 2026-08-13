import { component$, useSignal } from '@builder.io/qwik';
import {
  SectionTabs,
  Band,
  CardCarousel,
  FeatureCards,
  StatGrid,
  MeterList,
  Comparison,
  Testimonials,
  LogoMarquee,
  PricingCards,
  Accordion,
  TagRow,
  BulletList,
  Steps,
  VizCard,
  Sparkline,
  BarChart,
  Donut,
} from './section-kit';

/**
 * Marketing-tab content: how webdev.ca turns traffic into revenue — the campaign
 * channels we run, the measurable results they produce, the social proof behind
 * them, and transparent pricing. A sticky {@link SectionTabs} bar switches
 * between the four sub-sections.
 */

const MKT_TABS = [
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'results', label: 'Results' },
  { id: 'social', label: 'Social proof' },
  { id: 'pricing', label: 'Pricing' },
];

export const MarketingSections = component$(() => {
  const sub = useSignal('campaigns');

  return (
    <>
      <SectionTabs tabs={MKT_TABS} active={sub.value} onSelect$={(id) => (sub.value = id)} />

      {/* ------------------------------------------------------ Campaigns */}
      {sub.value === 'campaigns' && (
        <>
          <Band
            eyebrow="CAMPAIGNS · webdev.ca"
            title="Every channel, pulling in one direction"
            lead="Marketing that isn't measured is decoration. We run acquisition, lifecycle and retention as one funnel — landing pages, paid media, SEO and email all feeding the same revenue number, not competing for credit."
          >
            <FeatureCards
              cols={3}
              items={[
                { icon: 'rocket', title: 'Landing pages', body: 'Conversion-first pages built in Qwik — sub-second loads, one clear action, wired to analytics from line one.' },
                { icon: 'trending', title: 'Paid search & social', body: 'Google, Meta and LinkedIn campaigns with tight audiences, honest attribution and a weekly spend review.' },
                { icon: 'globe', title: 'SEO & content', body: 'Technical fixes, topic clusters and internal linking that compound — traffic you don\'t have to keep buying.' },
                { icon: 'message', title: 'Email & lifecycle', body: 'Welcome flows, cart recovery and win-back sequences that run themselves and quietly print revenue.' },
                { icon: 'gauge', title: 'A/B testing', body: 'Hypothesis, variant, significance — no HiPPO opinions. We ship the version the data actually prefers.' },
                { icon: 'activity', title: 'Analytics & CRO', body: 'Event tracking, funnels and session insight so every dollar of spend is traceable to a signup or sale.' },
              ]}
            />
          </Band>

          <Band title="How a campaign actually launches" lead="From brief to first conversion in weeks, not quarters.">
            <Steps
              items={[
                { title: 'Audit & goals', body: 'We baseline current traffic, conversion rate and cost per acquisition, then agree on the one number that defines success.' },
                { title: 'Landing & offer', body: 'A dedicated, fast landing page with a single call to action — message-matched to each ad and audience.' },
                { title: 'Instrument everything', body: 'Events, goals and UTM discipline wired up before a single dollar is spent, so nothing runs dark.' },
                { title: 'Launch small', body: 'A controlled budget across two or three channels to find what converts before we scale spend.' },
                { title: 'Test & iterate', body: 'Weekly A/B tests on headlines, hero and CTA. Keep the winners, kill the losers, document why.' },
                { title: 'Scale what works', body: 'Pour budget into the channel and creative with the best CAC, and cut the rest without sentiment.' },
              ]}
            />
          </Band>

          <Band title="Channels we run" lead="Swipe →">
            <CardCarousel
              items={[
                {
                  kicker: 'PPC',
                  title: 'Paid search',
                  body: 'High-intent Google Search and Shopping campaigns. Tight match types, negative keywords and landing pages that match the query word for word.',
                  tag: 'Google Ads',
                },
                {
                  kicker: 'PAID SOCIAL',
                  title: 'Meta & LinkedIn',
                  body: 'Creative-led prospecting and retargeting. We test ten hooks to find the one, then scale it before fatigue sets in.',
                  tag: 'Meta · LinkedIn',
                },
                {
                  kicker: 'SEO',
                  title: 'Organic search',
                  body: 'Core Web Vitals, schema, and content built around real search demand. Rankings that keep paying after the invoice clears.',
                  tag: 'compounding',
                },
                {
                  kicker: 'EMAIL',
                  title: 'Lifecycle automation',
                  body: 'Segmented flows triggered by behaviour — onboarding, abandonment, re-engagement. The cheapest channel you own outright.',
                  tag: 'owned audience',
                },
                {
                  kicker: 'CRO',
                  title: 'Conversion optimisation',
                  body: 'We don\'t just send more traffic — we make the traffic you already have convert harder, one tested change at a time.',
                  tag: 'test-driven',
                },
              ]}
            />
          </Band>
        </>
      )}

      {/* -------------------------------------------------------- Results */}
      {sub.value === 'results' && (
        <>
          <Band
            eyebrow="RESULTS"
            title="Numbers we're happy to be judged on"
            lead="Averages across the last twelve months of client engagements. Not vanity metrics — pipeline, conversion rate and cost per acquisition, the figures that show up on a P&L."
          >
            <StatGrid
              stats={[
                { value: '+164%', label: 'avg. organic traffic' },
                { value: '3.8×', label: 'return on ad spend' },
                { value: '−41%', label: 'cost per acquisition' },
                { value: '2.1s→0.6s', label: 'median LCP' },
              ]}
            />
          </Band>

          <Band title="Twelve months, blended" lead="Revenue, channel mix and conversion across recent engagements.">
            <div class="grid gap-4 md:grid-cols-3">
              <VizCard caption="REVENUE · 12 MO" value="+64%">
                <Sparkline data={[20, 24, 22, 28, 30, 34, 33, 40, 44, 47, 52, 60]} />
              </VizCard>
              <VizCard caption="CHANNEL MIX">
                <BarChart
                  bars={[
                    { label: 'PPC', value: 72 },
                    { label: 'SEO', value: 88 },
                    { label: 'Social', value: 54 },
                    { label: 'Email', value: 63 },
                  ]}
                />
              </VizCard>
              <VizCard caption="CONVERSION">
                <div class="flex justify-center">
                  <Donut value={18} label="visit → paid" />
                </div>
              </VizCard>
            </div>
          </Band>

          <Band title="Where the lift comes from" lead="Median improvement across engagements after 90 days.">
            <MeterList
              items={[
                { label: 'Landing page conversion rate', pct: 88, note: '+88%' },
                { label: 'Email click-through rate', pct: 62, note: '+62%' },
                { label: 'Organic click-through (SERP)', pct: 54, note: '+54%' },
                { label: 'Paid search quality score', pct: 47, note: '+47%' },
                { label: 'Add-to-cart rate', pct: 39, note: '+39%' },
                { label: 'Return-visitor rate', pct: 33, note: '+33%' },
              ]}
            />
          </Band>

          <Band title="Us vs. the set-and-forget agency" lead="What retainer money should actually buy.">
            <Comparison
              columns={['webdev.ca', 'Typical agency']}
              highlight={0}
              rows={[
                { label: 'Landing pages built for you', values: [true, false] },
                { label: 'Weekly A/B tests', values: ['Every week', 'Rarely'] },
                { label: 'Attribution to revenue', values: [true, false] },
                { label: 'Core Web Vitals tuning', values: [true, false] },
                { label: 'Reporting cadence', values: ['Live dashboard', 'Monthly PDF'] },
                { label: 'Locked-in ad platform', values: [false, true] },
                { label: 'Owns your accounts & data', values: ['You do', 'They do'] },
              ]}
            />
          </Band>
        </>
      )}

      {/* --------------------------------------------------- Social proof */}
      {sub.value === 'social' && (
        <>
          <Band
            eyebrow="SOCIAL PROOF"
            title="Clients who let us near the budget again"
            lead="The best marketing metric is a renewed contract. Here's what the people who write the cheques actually say."
          >
            <Testimonials
              items={[
                { quote: 'They rebuilt our landing pages in Qwik and our paid conversion rate nearly doubled in six weeks. The ad spend didn\'t change — the pages just stopped leaking.', name: 'Dana Reyes', role: 'Head of Growth, Northwind SaaS' },
                { quote: 'Finally an agency that shows its working. Every test has a hypothesis and a result, and I can see the funnel live instead of waiting for a monthly deck.', name: 'Marcus Lee', role: 'Founder, Cedar & Co.' },
                { quote: 'Our cost per lead dropped 40% in the first quarter. They cut the channels that weren\'t working without me having to argue for it.', name: 'Priya Nair', role: 'VP Marketing, Loop Health' },
                { quote: 'SEO used to be a black box. Now organic is our biggest channel and it keeps growing without us buying every click.', name: 'Tom Brandt', role: 'Ecommerce Lead, Trailhead Gear' },
              ]}
            />
          </Band>

          <Band title="Trusted across industries" lead="A few of the teams we've run campaigns for.">
            <LogoMarquee
              labels={[
                'Northwind SaaS', 'Cedar & Co.', 'Loop Health', 'Trailhead Gear', 'Brightpath',
                'Meridian Labs', 'Harbor & Vine', 'Statera', 'Foxglove', 'Kindling',
                'Wavelength', 'Ironwood', 'Lumen Retail', 'Parcel', 'Northstar Legal',
                'Verdant', 'Cobalt Studio', 'Ripple Finance', 'Almanac', 'Beacon HQ',
              ]}
            />
          </Band>

          <Band title="What working with us looks like">
            <BulletList
              items={[
                'A named strategist, not a rotating cast of account managers you re-brief every month.',
                'You keep ownership of every ad account, analytics property and email list — always.',
                'A shared live dashboard, so you never wait for a report to know how spend is doing.',
                'Plain-English weekly notes: what we tested, what won, and what we\'re trying next.',
                'A 90-day exit clause — we earn the retainer every quarter or you walk, no penalty.',
              ]}
            />
          </Band>
        </>
      )}

      {/* --------------------------------------------------------- Pricing */}
      {sub.value === 'pricing' && (
        <>
          <Band
            eyebrow="PRICING"
            title="Plans that scale with the spend they manage"
            lead="Flat monthly retainers, no percentage-of-ad-spend games that punish you for growing. Cancel with 30 days' notice — the work has to earn its keep."
          >
            <PricingCards
              plans={[
                {
                  name: 'Launch',
                  price: '$1,900',
                  period: 'mo',
                  features: [
                    'One channel (search or social)',
                    'Two landing pages built & hosted',
                    'Monthly A/B test',
                    'Conversion tracking setup',
                    'Live performance dashboard',
                  ],
                  cta: 'Start with Launch',
                },
                {
                  name: 'Growth',
                  price: '$3,800',
                  period: 'mo',
                  featured: true,
                  features: [
                    'Up to three channels',
                    'Unlimited landing pages',
                    'Weekly A/B tests',
                    'SEO & content programme',
                    'Lifecycle email flows',
                    'Fortnightly strategy call',
                  ],
                  cta: 'Choose Growth',
                },
                {
                  name: 'Scale',
                  price: 'Custom',
                  features: [
                    'All channels, managed',
                    'Dedicated growth strategist',
                    'CRO & experimentation programme',
                    'Custom attribution modelling',
                    'Priority build queue',
                    'Weekly executive reporting',
                  ],
                  cta: 'Talk to us',
                },
              ]}
            />
          </Band>

          <Band title="What every plan includes" lead="No surprises billed as add-ons later.">
            <TagRow
              tags={[
                'Analytics setup', 'UTM discipline', 'Core Web Vitals tuning', 'Ad account audit',
                'Conversion tracking', 'Live dashboard', 'A/B testing', 'Monthly reporting',
                'You own the accounts', '30-day cancellation',
              ]}
            />
          </Band>

          <Band title="Questions before you commit">
            <Accordion
              items={[
                { q: 'Is the ad budget included in the retainer?', a: 'No — the retainer covers our strategy, builds and management. You set and control your own media budget, paid directly to Google, Meta or LinkedIn, so you always own the accounts.' },
                { q: 'Do you charge a percentage of ad spend?', a: 'Never. Percentage-of-spend models reward agencies for spending more of your money. A flat retainer keeps our incentives on results, not budget size.' },
                { q: 'How long until we see results?', a: 'Paid channels and landing-page changes move within weeks. SEO and content compound over three to six months — we\'ll tell you honestly which lever is which for your goals.' },
                { q: 'What if it isn\'t working?', a: 'Every plan is month-to-month with 30 days\' notice. We\'d rather earn the renewal each quarter than lock you into a contract you resent.' },
                { q: 'Can we upgrade or downgrade?', a: 'Any time. Most clients start on Launch to prove a channel, then move to Growth once the numbers justify more surface area.' },
              ]}
            />
          </Band>
        </>
      )}
    </>
  );
});

export default MarketingSections;
