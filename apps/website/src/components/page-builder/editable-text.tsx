import { component$, type QRL } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export interface EditableTextProps {
  /** Current text value (the source of truth lives in the block's props). */
  value: string;
  /** Which prop key on the block this maps to. */
  field: string;
  /** Commit a new value for `field`. Bound to the block by the canvas. */
  set$: QRL<(key: string, value: unknown) => void>;
  editing: boolean;
  /** HTML tag to render. Defaults to a span. */
  tag?: string;
  /** Allow line breaks (Enter). Headings should leave this false. */
  multiline?: boolean;
  class?: string;
}

/**
 * Inline-editable text. In edit mode the element becomes `contentEditable` and
 * commits to the store on blur (committing on blur, not on every keystroke,
 * keeps the caret from jumping when the store re-renders).
 */
export const EditableText = component$<EditableTextProps>((props) => {
  // Capitalized so Qwik treats the string as the intrinsic tag to render.
  const Tag = (props.tag ?? 'span') as 'span';

  return (
    <Tag
      // Re-key per field so Qwik keeps element identity stable across renders.
      key={props.field}
      // `plaintext-only` (paste without markup) is valid HTML but missing from
      // Qwik's contentEditable union, so cast it.
      contentEditable={(props.editing ? 'plaintext-only' : 'false') as 'true'}
      spellcheck={false}
      class={cn(
        props.class,
        props.editing &&
          'cursor-text rounded-sm outline-none ring-offset-2 ring-offset-background transition-shadow hover:ring-1 hover:ring-primary/40 focus:ring-2 focus:ring-primary/70',
      )}
      onKeyDown$={(e) => {
        if (!props.multiline && e.key === 'Enter') e.preventDefault();
      }}
      onBlur$={(_, el) => {
        const text = el.innerText.replace(/\n$/, '');
        if (text !== props.value) props.set$(props.field, text);
      }}
    >
      {props.value}
    </Tag>
  );
});
