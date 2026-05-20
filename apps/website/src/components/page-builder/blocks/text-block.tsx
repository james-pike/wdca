import { component$ } from '@builder.io/qwik';
import type { BlockDefinition, BlockViewProps } from '../types';
import { EditableText } from '../editable-text';

/** The plain “add a div” block: a heading + paragraph section. */
const TextView = component$<BlockViewProps>(({ block, editing, set$ }) => {
  const p = block.props as { heading: string; body: string };
  return (
    <div class="mx-auto max-w-3xl px-6 py-12">
      <EditableText
        tag="h2"
        value={p.heading}
        field="heading"
        set$={set$}
        editing={editing}
        class="mb-3 text-2xl font-bold tracking-tight md:text-3xl"
      />
      <EditableText
        tag="p"
        value={p.body}
        field="body"
        set$={set$}
        editing={editing}
        multiline
        class="text-base leading-relaxed text-muted-foreground"
      />
    </div>
  );
});

export const textBlock: BlockDefinition = {
  type: 'text',
  name: 'Text section',
  defaultProps: {
    heading: 'New section',
    body: 'Click this text to edit it. Use the + button to add more components above or below.',
  },
  view: TextView,
};
