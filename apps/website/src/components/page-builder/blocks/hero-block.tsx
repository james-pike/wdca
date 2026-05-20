import { component$ } from '@builder.io/qwik';
import type { BlockDefinition, BlockViewProps } from '../types';
import { EditableText } from '../editable-text';

const HeroView = component$<BlockViewProps>(({ block, editing, set$ }) => {
  const p = block.props as {
    badge: string;
    title: string;
    subtitle: string;
    body: string;
  };

  return (
    <div class="relative isolate overflow-hidden px-6 py-20 md:py-28">
      <DotGrid />
      <BlurredBlobs />

      <div class="relative mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <EditableText value={p.badge} field="badge" set$={set$} editing={editing} />
        </span>

        <EditableText
          tag="h1"
          value={p.title}
          field="title"
          set$={set$}
          editing={editing}
          class="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-5xl leading-[1.05] font-extrabold tracking-tight text-transparent drop-shadow-[0_0_30px_color-mix(in_oklab,var(--primary)_45%,transparent)] md:text-7xl lg:text-8xl"
        />

        <EditableText
          tag="h2"
          value={p.subtitle}
          field="subtitle"
          set$={set$}
          editing={editing}
          multiline
          class="max-w-3xl text-xl leading-snug font-semibold md:text-3xl"
        />

        <EditableText
          tag="p"
          value={p.body}
          field="body"
          set$={set$}
          editing={editing}
          multiline
          class="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        />
      </div>
    </div>
  );
});

export const heroBlock: BlockDefinition = {
  type: 'hero',
  name: 'Hero',
  defaultProps: {
    badge: 'Resumable. Accessible. Beautiful.',
    title: 'Qwik UI',
    subtitle: 'Headless & styled copy-paste components, automatically optimized for you.',
    body: 'Build the future of the web with components that ship zero JavaScript by default. Choose a kit and start shipping ⚡',
  },
  view: HeroView,
};

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
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
    <div class="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary opacity-25 blur-3xl" />
    <div class="absolute top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-secondary opacity-20 blur-3xl" />
  </div>
));
