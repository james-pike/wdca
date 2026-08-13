import { component$, useSignal } from '@builder.io/qwik';
import {
  SectionTabs,
  Band,
  ChatDemo,
  FeatureCards,
  MonogramGrid,
  Comparison,
  MeterList,
  CardCarousel,
  CodeCard,
  Accordion,
  StatGrid,
  TagRow,
  BulletList,
  PricingCards,
} from './section-kit';

/**
 * AI-tab content: the AI features a senior studio ships at webdev.ca — streaming
 * chat assistants grounded in your data, a model line-up you can swap without a
 * rewrite, a library of production prompts, and honest token-based pricing.
 * A sticky {@link SectionTabs} bar switches between the four sub-sections.
 */

const AI_TABS = [
  { id: 'chat', label: 'Chat' },
  { id: 'models', label: 'Models' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'pricing', label: 'Pricing' },
];

export const AiSections = component$(() => {
  const sub = useSignal('chat');

  return (
    <>
      <SectionTabs tabs={AI_TABS} active={sub.value} onSelect$={(id) => (sub.value = id)} />

      {/* ----------------------------------------------------------- Chat */}
      {sub.value === 'chat' && (
        <>
          <Band
            eyebrow="CHAT · webdev.ca"
            title="Assistants that know your product"
            lead="Not a chatbot bolted onto a FAQ — a streaming assistant grounded in your docs, your data and your tools, answering in your voice and stopping when it doesn't know."
          >
            <ChatDemo
              messages={[
                { role: 'user', text: 'Does the Pro plan include SSO?' },
                { role: 'ai', text: 'Yes — SAML and OIDC single sign-on ship on Pro and above. Want me to point you at the setup guide?' },
                { role: 'user', text: 'Please. And can I scope it to one team?' },
                { role: 'ai', text: 'You can. SSO is enforced per workspace, and each team can pin its own identity provider. Here is the doc — I pulled it from your live knowledge base, so it is current.' },
              ]}
            />
          </Band>

          <Band title="What the assistant can actually do" lead="Every one of these is wired up in production, not a demo toggle.">
            <FeatureCards
              cols={3}
              items={[
                { icon: 'zap', title: 'Token streaming', body: 'Responses render token-by-token over server-sent events, so the first word lands in well under a second instead of after a full generation.' },
                { icon: 'wrench', title: 'Tool calling', body: 'The model calls your functions — search orders, book a slot, hit an internal API — then folds the result back into a natural answer.' },
                { icon: 'boxes', title: 'Structured output', body: 'Constrained JSON that validates against your schema every time, so an assistant reply drops straight into your database or UI.' },
                { icon: 'database', title: 'Retrieval (RAG)', body: 'Answers are grounded in your own content through vector search, with citations, so responses stay current and quotable.' },
                { icon: 'shield', title: 'Guardrails', body: 'System prompts, allow-lists and refusal handling keep it on-topic. It says "I do not know" instead of inventing an answer.' },
                { icon: 'clock', title: 'Memory & context', body: 'Conversation history, user profile and session state carry across turns without leaking one customer into another.' },
              ]}
            />
          </Band>

          <Band title="A grounded, tool-using turn — end to end">
            <div class="grid gap-4 lg:grid-cols-2">
              <CodeCard
                title="chat.ts"
                lang="typescript"
                lines={[
                  { t: 'com', text: '// stream a grounded, tool-enabled reply' },
                  { t: 'key', text: 'const stream = await ai.chat({' },
                  { t: 'str', text: "  system: 'You are the webdev.ca assistant.'," },
                  { t: 'ctx', text: '  messages,' },
                  { t: 'ctx', text: '  tools: [searchDocs, createTicket],' },
                  { t: 'ctx', text: '  response_format: TicketSchema,' },
                  { t: 'add', text: '  stream: true,' },
                  { t: 'key', text: '})' },
                  { t: 'com', text: '// first token in ~300ms, cited sources' },
                  { t: 'fn', text: 'for await (const chunk of stream) yield chunk' },
                ]}
              />
              <BulletList
                items={[
                  'Streaming keeps time-to-first-token low even on frontier models with long context.',
                  'Tool calls run server-side, so keys and internal APIs never reach the browser.',
                  'Structured output is schema-validated before it ever touches your UI or database.',
                  'Every grounded answer carries citations back to the source document.',
                ]}
              />
            </div>
          </Band>

          <Band title="Chat, in numbers">
            <StatGrid
              stats={[
                { value: '~300ms', label: 'time to first token' },
                { value: '128k+', label: 'tokens of context' },
                { value: '99.9%', label: 'schema-valid output' },
                { value: '24/7', label: 'no-queue answers' },
              ]}
            />
          </Band>
        </>
      )}

      {/* --------------------------------------------------------- Models */}
      {sub.value === 'models' && (
        <>
          <Band
            eyebrow="MODELS"
            title="One integration, the whole line-up"
            lead="Models change every quarter; your app shouldn't. We route behind a single interface so you can swap a frontier model for a fast one — or an open one you host yourself — without touching product code."
          >
            <MonogramGrid
              cols={4}
              items={[
                { mono: 'Fr', name: 'Frontier model', note: 'hardest reasoning', color: 'var(--primary)' },
                { mono: 'Fa', name: 'Fast model', note: 'chat & drafts', color: '#2563eb' },
                { mono: 'Op', name: 'Open model', note: 'self-hosted', color: '#15803d' },
                { mono: 'Vi', name: 'Vision model', note: 'images & docs', color: '#7c3aed' },
                { mono: 'Em', name: 'Embeddings', note: 'search & RAG', color: '#0891b2' },
                { mono: 'Rr', name: 'Reranker', note: 'sharper retrieval', color: '#c05621' },
                { mono: 'Sp', name: 'Speech', note: 'voice in & out', color: '#b7791f' },
                { mono: 'Cd', name: 'Code model', note: 'refactors & tests', color: '#c53030' },
              ]}
            />
          </Band>

          <Band title="Frontier vs. fast" lead="Same interface, different trade-off. Pick per request, not per project.">
            <Comparison
              columns={['Frontier model', 'Fast model', 'Open model']}
              highlight={0}
              rows={[
                { label: 'Context window', values: ['200k tokens', '128k tokens', '128k tokens'] },
                { label: 'Speed', values: ['Deliberate', 'Very fast', 'Fast (your hardware)'] },
                { label: 'Price', values: ['$$$', '$', 'Infra only'] },
                { label: 'Best for', values: ['Hard reasoning', 'Chat & drafts', 'Private data'] },
                { label: 'Tool calling', values: [true, true, true] },
                { label: 'Structured output', values: [true, true, true] },
                { label: 'Self-hostable', values: [false, false, true] },
              ]}
            />
          </Band>

          <Band title="How we route" lead="A request is scored, then sent to the cheapest model that can do the job.">
            <MeterList
              items={[
                { label: 'Simple chat → fast model', pct: 62, note: '62% of traffic' },
                { label: 'Retrieval + synthesis → frontier', pct: 24, note: '24%' },
                { label: 'Private / regulated → open model', pct: 10, note: '10%' },
                { label: 'Vision & documents → vision model', pct: 4, note: '4%' },
              ]}
            />
          </Band>

          <Band title="Capabilities we lean on">
            <TagRow
              tags={[
                'Streaming', '128k+ context', 'Tool use', 'Structured output', 'JSON mode',
                'Vision', 'Embeddings', 'Reranking', 'Function calling', 'Prompt caching',
                'Fine-tuning', 'Self-hosting', 'Failover routing',
              ]}
            />
          </Band>
        </>
      )}

      {/* -------------------------------------------------------- Prompts */}
      {sub.value === 'prompts' && (
        <>
          <Band
            eyebrow="PROMPTS · webdev.ca"
            title="Prompts are code — version them"
            lead="A prompt that works is an asset. We keep them in the repo, test them against real inputs and review changes like any other diff, so quality doesn't drift when a model updates."
          >
            <CardCarousel
              items={[
                {
                  kicker: 'SUPPORT',
                  title: 'Grounded answer',
                  body: 'Answer only from the retrieved context. Cite sources. If the context does not cover it, say so and offer to escalate.',
                  tag: 'RAG',
                },
                {
                  kicker: 'EXTRACT',
                  title: 'Invoice to JSON',
                  body: 'Read an uploaded invoice and return line items, totals and dates as schema-valid JSON. No prose, no guesses on missing fields.',
                  tag: 'structured output',
                },
                {
                  kicker: 'CLASSIFY',
                  title: 'Triage & route',
                  body: 'Label an incoming message by intent and urgency, then hand it to the right tool — refund, bug report or sales.',
                  tag: 'tool use',
                },
                {
                  kicker: 'WRITE',
                  title: 'On-brand draft',
                  body: 'Draft release notes from a changelog in the house voice: plain, warm, no hype. Keep it under 120 words.',
                  tag: 'tone',
                },
                {
                  kicker: 'REVIEW',
                  title: 'Diff summary',
                  body: 'Summarise a pull request for reviewers: what changed, why it is safe, and the one thing to look at closely.',
                  tag: 'code model',
                },
              ]}
            />
          </Band>

          <Band title="A production prompt, in the repo">
            <CodeCard
              title="prompts/support.md"
              lang="prompt"
              lines={[
                { t: 'com', text: '# role' },
                { t: 'str', text: 'You are the webdev.ca support assistant.' },
                { t: 'com', text: '# grounding' },
                { t: 'ctx', text: 'Answer ONLY from <context>. Quote and cite it.' },
                { t: 'del', text: 'Never invent policy, prices or dates.' },
                { t: 'com', text: '# when unsure' },
                { t: 'add', text: 'Say "I am not certain" and offer to escalate.' },
                { t: 'com', text: '# format' },
                { t: 'key', text: 'Return { answer, sources[], confidence }' },
              ]}
            />
          </Band>

          <Band title="How we keep prompts honest" lead="The boring discipline that stops quality drifting.">
            <Accordion
              items={[
                { q: 'How do you stop a prompt regressing when a model updates?', a: 'Every prompt has a small eval set of real inputs and expected shapes. A model or prompt change runs the set in CI, so a regression fails the build instead of shipping to users.' },
                { q: 'Few-shot or fine-tuning?', a: 'Few-shot examples and good instructions solve most problems and change in minutes. We reach for fine-tuning only when a task is high-volume, narrow and stable enough to earn the training cost.' },
                { q: 'How do you handle prompt injection?', a: 'Retrieved and user content is fenced and treated as data, never instructions. Tools are allow-listed and run with least privilege, so a malicious document cannot make the model take an action it should not.' },
                { q: 'Can non-engineers edit prompts?', a: 'Yes — prompts live as reviewable files, and we can put a guarded editor in front of them. Changes still run the eval set before they go live.' },
              ]}
            />
          </Band>
        </>
      )}

      {/* -------------------------------------------------------- Pricing */}
      {sub.value === 'pricing' && (
        <>
          <Band
            eyebrow="PRICING"
            title="Pay for tokens, not seats"
            lead="AI cost is usage, not headcount. We meter it honestly, cache what repeats, and route to the cheapest model that clears the bar — so your bill tracks value, not vanity."
          >
            <PricingCards
              plans={[
                {
                  name: 'Starter',
                  price: '$0',
                  period: 'mo',
                  cta: 'Start free',
                  features: [
                    '50k tokens / month included',
                    'Fast model, streaming chat',
                    'Community prompt library',
                    'Shared rate limits',
                  ],
                },
                {
                  name: 'Studio',
                  price: '$99',
                  period: 'mo',
                  featured: true,
                  cta: 'Start building',
                  features: [
                    '5M tokens / month, then metered',
                    'Frontier + fast + open routing',
                    'Tool calling & structured output',
                    'RAG on your own data',
                    'Prompt caching & evals',
                  ],
                },
                {
                  name: 'Scale',
                  price: 'Custom',
                  cta: 'Talk to us',
                  features: [
                    'Volume token pricing',
                    'Self-hosted open models',
                    'Dedicated capacity & SLAs',
                    'SSO, audit logs, data residency',
                  ],
                },
              ]}
            />
          </Band>

          <Band title="Where a typical bill goes" lead="Routing and caching do most of the saving.">
            <MeterList
              items={[
                { label: 'Fast model (bulk chat)', pct: 46, note: '46% of spend' },
                { label: 'Frontier model (hard reasoning)', pct: 34, note: '34%' },
                { label: 'Embeddings & reranking', pct: 12, note: '12%' },
                { label: 'Vision & speech', pct: 8, note: '8%' },
              ]}
            />
          </Band>

          <Band title="Cost, at a glance">
            <StatGrid
              stats={[
                { value: '~40%', label: 'saved by routing' },
                { value: '90%', label: 'off cached prompts' },
                { value: '1M', label: 'tokens ≈ 750k words' },
                { value: '$0', label: 'idle-time cost' },
              ]}
            />
          </Band>

          <Band title="Straight answers on billing">
            <Accordion
              items={[
                { q: 'What is a token, in plain terms?', a: 'A token is roughly three-quarters of a word. Both the prompt you send and the answer you get back are metered, so shorter prompts and grounded context keep the bill down.' },
                { q: 'How does prompt caching cut cost?', a: 'Repeated context — a system prompt, a knowledge base chunk — is cached on the provider side, so you pay a fraction for the repeated part. On steady workloads that is a large discount.' },
                { q: 'Can we cap spend?', a: 'Yes. Hard monthly caps, per-key budgets and alerts. When a budget is hit we fall back to a cheaper model or a graceful message instead of a surprise invoice.' },
                { q: 'Do we get charged when nobody is using it?', a: 'No. Pricing is per token, so idle time costs nothing — unlike per-seat AI add-ons you pay for whether or not anyone opens them.' },
              ]}
            />
            <div class="mt-6">
              <TagRow
                tags={[
                  'Per-token metering', 'Prompt caching', 'Budget caps', 'Cost alerts',
                  'Model routing', 'Volume discounts', 'No idle cost', 'Transparent usage',
                ]}
              />
            </div>
          </Band>
        </>
      )}
    </>
  );
});

export default AiSections;
