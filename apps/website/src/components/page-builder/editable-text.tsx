import { component$, type QRL, useSignal, useVisibleTask$ } from '@builder.io/qwik';
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
 * Inline-editable text.
 *
 * Commits on every keystroke so a refresh mid-edit never loses the change. The
 * tricky part is the caret: if the live value were rendered as reactive JSX
 * children, each commit would make Qwik reconcile the text node and reset the
 * caret to the start. So the rendered children are a one-time snapshot taken at
 * mount (enough for SSR / no-flash), and the *current* value is consumed only
 * inside a tracked task that writes the DOM imperatively — and never while the
 * element is focused. The element the user types into is therefore left alone.
 */
export const EditableText = component$<EditableTextProps>((props) => {
  // Capitalized so Qwik treats the string as the intrinsic tag to render.
  const Tag = (props.tag ?? 'span') as 'span';
  const ref = useSignal<HTMLElement>();
  const focused = useSignal(false);
  // Snapshot for the initial (SSR) render only; not updated reactively.
  const initial = useSignal(props.value);

  // Reflect external value changes (reset, or edits made elsewhere) into the
  // DOM — but never while focused, so the caret is never disturbed mid-edit.
  // eslint-disable-next-line qwik/no-use-visible-task -- imperative DOM sync to protect the caret
  useVisibleTask$(({ track }) => {
    const v = track(() => props.value);
    const el = ref.value;
    if (el && !focused.value && el.innerText !== v) el.innerText = v;
  });

  return (
    <Tag
      ref={ref}
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
      onFocus$={() => (focused.value = true)}
      onKeyDown$={(e) => {
        if (!props.multiline && e.key === 'Enter') e.preventDefault();
      }}
      onInput$={(_, el) => props.set$(props.field, el.innerText.replace(/\n$/, ''))}
      onBlur$={(_, el) => {
        focused.value = false;
        props.set$(props.field, el.innerText.replace(/\n$/, ''));
      }}
    >
      {initial.value}
    </Tag>
  );
});
