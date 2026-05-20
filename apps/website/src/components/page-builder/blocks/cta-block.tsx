import { component$ } from '@builder.io/qwik';
import type { BlockDefinition, BlockViewProps } from '../types';
import { EditableText } from '../editable-text';

/**
 * Sample prebaked component. Use this as the template for the future component
 * library: a self-contained block with editable text fields and a couple of
 * style props (here, text alignment, toggled from the block toolbar).
 */
const CtaView = component$<BlockViewProps>(({ block, editing, set$ }) => {
  const p = block.props as {
    heading: string;
    body: string;
    buttonLabel: string;
    align: 'left' | 'center';
  };
  const alignClass = p.align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div class="px-6 py-12">
      <div
        class={`mx-auto flex max-w-4xl flex-col gap-5 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/40 to-secondary/10 p-10 backdrop-blur-md ${alignClass}`}
      >
        <EditableText
          tag="h2"
          value={p.heading}
          field="heading"
          set$={set$}
          editing={editing}
          class="text-3xl font-bold tracking-tight md:text-4xl"
        />
        <EditableText
          tag="p"
          value={p.body}
          field="body"
          set$={set$}
          editing={editing}
          multiline
          class="max-w-2xl text-base text-muted-foreground md:text-lg"
        />
        <span class="mt-2 inline-flex w-fit items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm">
          <EditableText
            value={p.buttonLabel}
            field="buttonLabel"
            set$={set$}
            editing={editing}
          />
        </span>
      </div>
    </div>
  );
});

export const ctaBlock: BlockDefinition = {
  type: 'cta',
  name: 'Call to action',
  defaultProps: {
    heading: 'Ready to build something fast?',
    body: 'Drop in components, edit the text right on the page, and ship in minutes.',
    buttonLabel: 'Get started',
    align: 'center',
  },
  view: CtaView,
};
