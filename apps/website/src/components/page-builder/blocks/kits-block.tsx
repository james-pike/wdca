import { component$, type QRL } from '@builder.io/qwik';
import type { BlockDefinition, BlockViewProps } from '../types';
import { EditableText } from '../editable-text';

interface CardFields {
  eyebrowField: string;
  titleField: string;
  descField: string;
}

const KitsView = component$<BlockViewProps>(({ block, editing, set$ }) => {
  const p = block.props as Record<string, string>;
  return (
    <div class="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-6 pb-20 sm:gap-10 md:grid-cols-2">
      <KitCard
        href={p.href1}
        eyebrow={p.eyebrow1}
        title={p.title1}
        description={p.desc1}
        variant="headless"
        fields={{ eyebrowField: 'eyebrow1', titleField: 'title1', descField: 'desc1' }}
        editing={editing}
        set$={set$}
      />
      <KitCard
        href={p.href2}
        eyebrow={p.eyebrow2}
        title={p.title2}
        description={p.desc2}
        variant="styled"
        fields={{ eyebrowField: 'eyebrow2', titleField: 'title2', descField: 'desc2' }}
        editing={editing}
        set$={set$}
      />
    </div>
  );
});

const KitCard = component$<{
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  variant: 'headless' | 'styled';
  fields: CardFields;
  editing: boolean;
  set$: QRL<(key: string, value: unknown) => void>;
}>(({ href, eyebrow, title, description, variant, fields, editing, set$ }) => {
  return (
    <a
      href={editing ? undefined : href}
      // Don't navigate away while editing the card's text.
      preventdefault:click={editing}
      class="group block focus-visible:outline-none"
    >
      <div class="relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-card/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 focus-visible:-translate-y-1 focus-visible:border-primary/60">
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
          <EditableText
            tag="div"
            value={eyebrow}
            field={fields.eyebrowField}
            set$={set$}
            editing={editing}
            class="mb-2 text-xs font-semibold tracking-widest text-primary/70 uppercase"
          />
          <EditableText
            tag="h3"
            value={title}
            field={fields.titleField}
            set$={set$}
            editing={editing}
            class="mb-2 text-2xl font-bold tracking-tight"
          />
          <EditableText
            tag="p"
            value={description}
            field={fields.descField}
            set$={set$}
            editing={editing}
            multiline
            class="text-base text-muted-foreground"
          />
        </div>
      </div>
    </a>
  );
});

export const kitsBlock: BlockDefinition = {
  type: 'kits',
  name: 'Kit cards',
  defaultProps: {
    href1: '/docs/headless/introduction',
    eyebrow1: 'Primitive',
    title1: 'Headless',
    desc1:
      'Completely unstyled, accessible primitives for the most creative minds. Bring your own CSS — vanilla, Tailwind, Sass, anything.',
    href2: '/docs/styled/introduction',
    eyebrow2: 'Design system',
    title2: 'Styled',
    desc2:
      'Copy-paste, themeable components built on top of headless. Sensible defaults, full control, ready to ship.',
  },
  view: KitsView,
};

const HeadlessIcon = component$(() => (
  <svg
    aria-hidden="true"
    viewBox="0 0 400 300"
    class="absolute inset-0 h-full w-full"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
  >
    <rect x="112" y="80" width="220" height="170" rx="14" stroke-width="2" />
    <line x1="132" y1="108" x2="248" y2="108" stroke-width="3.5" />
    <line x1="132" y1="124" x2="298" y2="124" stroke-width="1.6" opacity="0.55" />
    <rect x="132" y="156" width="80" height="28" rx="6" stroke-width="2" />
    <rect x="220" y="156" width="80" height="28" rx="6" stroke-width="2" />
  </svg>
));

const StyledIcon = component$(() => (
  <svg aria-hidden="true" viewBox="0 0 400 300" class="absolute inset-0 h-full w-full">
    <rect x="112" y="80" width="220" height="170" rx="14" fill="currentColor" opacity="0.16" />
    <rect x="132" y="102" width="110" height="14" rx="7" fill="currentColor" />
    <rect x="132" y="124" width="170" height="6" rx="3" fill="currentColor" opacity="0.45" />
    <rect x="132" y="156" width="80" height="28" rx="6" fill="currentColor" />
    <rect x="220" y="156" width="80" height="28" rx="6" fill="currentColor" opacity="0.28" />
  </svg>
));
