import {
  $,
  component$,
  Fragment,
  type QRL,
  Slot,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { cn } from '@qwik-ui/utils';
import {
  LuPlus,
  LuTrash2,
  LuArrowUp,
  LuArrowDown,
  LuPencil,
  LuEye,
  LuAlignLeft,
  LuAlignCenter,
  LuRotateCcw,
} from '@qwikest/icons/lucide';
import type { Block } from './types';
import { INSERTABLE_TYPES, REGISTRY, createInitialBlocks } from './registry';

/**
 * Two-tier persistence:
 *  - cookie: read by the route's `usePageBlocks` loader so SSR renders the saved
 *    layout directly (no flash). Capped at ~4 KB by the browser.
 *  - localStorage: the durable copy with no size cap; adopted on the client if
 *    the cookie ever comes back stale or oversized, so edits can't silently
 *    vanish on large pages.
 */
export const STORAGE_KEY = 'qwikui-page-blocks';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

interface BuilderState {
  blocks: Block[];
  selectedId: string | null;
  editing: boolean;
}

export const PageBuilder = component$<{ initialBlocks: Block[] }>(({ initialBlocks }) => {
  const state = useStore<BuilderState>({
    // Seeded from the server loader, so SSR already renders the saved layout.
    blocks: initialBlocks.length ? initialBlocks : createInitialBlocks(),
    selectedId: null,
    editing: true,
  });

  // Persist on any change. JSON.stringify in track() subscribes to every nested
  // prop, so inline text edits are saved too.
  useTask$(({ track }) => {
    const serialized = track(() => JSON.stringify(state.blocks));
    if (isServer) return;
    localStorage.setItem(STORAGE_KEY, serialized);
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(serialized)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  });

  // The cookie is the SSR source of truth, so when it's present we trust the
  // server-rendered layout and do NOT touch state — that's what keeps refresh
  // flash-free. Only fall back to localStorage when the cookie is missing (e.g.
  // it was dropped for exceeding ~4 KB), so big layouts still recover.
  // eslint-disable-next-line qwik/no-use-visible-task -- recover layout only when the cookie was dropped
  useVisibleTask$(() => {
    if (document.cookie.includes(`${STORAGE_KEY}=`)) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || saved === JSON.stringify(state.blocks)) return;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) state.blocks = parsed as Block[];
    } catch {
      /* ignore malformed storage */
    }
  });

  const updateProp$ = $((id: string, key: string, value: unknown) => {
    const block = state.blocks.find((b) => b.id === id);
    if (block) block.props[key] = value;
  });

  const insertAt$ = $((index: number, type: string) => {
    const def = REGISTRY[type];
    if (!def) return;
    const block: Block = {
      id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      props: { ...def.defaultProps },
    };
    state.blocks = [
      ...state.blocks.slice(0, index),
      block,
      ...state.blocks.slice(index),
    ];
    state.selectedId = block.id;
  });

  const remove$ = $((id: string) => {
    state.blocks = state.blocks.filter((b) => b.id !== id);
    if (state.selectedId === id) state.selectedId = null;
  });

  const move$ = $((id: string, dir: -1 | 1) => {
    const i = state.blocks.findIndex((b) => b.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= state.blocks.length) return;
    const next = [...state.blocks];
    [next[i], next[j]] = [next[j], next[i]];
    state.blocks = next;
  });

  return (
    <div
      class="relative"
      onClick$={() => {
        if (state.editing) state.selectedId = null;
      }}
    >
      {state.editing && <InsertBar index={0} onInsert$={insertAt$} />}

      {state.blocks.map((block, i) => (
        <Fragment key={block.id}>
          <BlockWrapper
            block={block}
            editing={state.editing}
            selected={state.selectedId === block.id}
            canMoveUp={i > 0}
            canMoveDown={i < state.blocks.length - 1}
            onSelect$={$(() => (state.selectedId = block.id))}
            onUpdate$={updateProp$}
            onRemove$={$(() => remove$(block.id))}
            onMove$={$((dir: -1 | 1) => move$(block.id, dir))}
          />
          {state.editing && <InsertBar index={i + 1} onInsert$={insertAt$} />}
        </Fragment>
      ))}

      <BuilderControls state={state} />
    </div>
  );
});

interface WrapperProps {
  block: Block;
  editing: boolean;
  selected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect$: QRL<() => void>;
  onUpdate$: QRL<(id: string, key: string, value: unknown) => void>;
  onRemove$: QRL<() => void>;
  onMove$: QRL<(dir: -1 | 1) => void>;
}

const BlockWrapper = component$<WrapperProps>((props) => {
  const def = REGISTRY[props.block.type];
  // Bind the generic updater to this block so block authors call set$(key, val).
  const set$ = $((key: string, value: unknown) =>
    props.onUpdate$(props.block.id, key, value),
  );

  if (!def) {
    return (
      <div class="p-4 text-center text-sm text-alert">
        Unknown block type: {props.block.type}
      </div>
    );
  }

  const View = def.view;
  const hasAlign = 'align' in props.block.props;

  return (
    <div
      class={cn(
        'relative',
        props.editing &&
          'transition-[outline] outline-2 outline-offset-[-2px] hover:outline-primary/40',
        props.editing && props.selected && 'outline-primary hover:outline-primary',
      )}
      onClick$={(e) => {
        if (!props.editing) return;
        e.stopPropagation();
        props.onSelect$();
      }}
    >
      {props.editing && props.selected && (
        <div
          class="absolute top-2 right-2 z-30 flex items-center gap-0.5 rounded-lg border border-input bg-popover/95 p-1 shadow-md backdrop-blur"
          onClick$={(e) => e.stopPropagation()}
        >
          <span class="px-2 text-xs font-medium text-muted-foreground">{def.name}</span>
          {hasAlign && (
            <>
              <ToolbarButton
                label="Align left"
                onClick$={() => set$('align', 'left')}
              >
                <LuAlignLeft class="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                label="Align center"
                onClick$={() => set$('align', 'center')}
              >
                <LuAlignCenter class="h-4 w-4" />
              </ToolbarButton>
            </>
          )}
          <ToolbarButton
            label="Move up"
            disabled={!props.canMoveUp}
            onClick$={() => props.onMove$(-1)}
          >
            <LuArrowUp class="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Move down"
            disabled={!props.canMoveDown}
            onClick$={() => props.onMove$(1)}
          >
            <LuArrowDown class="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Delete" onClick$={props.onRemove$}>
            <LuTrash2 class="h-4 w-4 text-alert" />
          </ToolbarButton>
        </div>
      )}

      <View block={props.block} editing={props.editing} set$={set$} />
    </div>
  );
});

const ToolbarButton = component$<{
  label: string;
  disabled?: boolean;
  onClick$: QRL<() => void>;
}>(({ label, disabled, onClick$ }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    disabled={disabled}
    onClick$={onClick$}
    class="flex h-7 w-7 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-30"
  >
    <Slot />
  </button>
));

const InsertBar = component$<{
  index: number;
  onInsert$: QRL<(index: number, type: string) => void>;
}>((props) => {
  const open = useSignal(false);
  return (
    <div
      class="relative z-20 flex h-0 items-center justify-center"
      onClick$={(e) => e.stopPropagation()}
    >
      <div class="absolute flex -translate-y-1/2 flex-col items-center">
        <button
          type="button"
          aria-label="Add component here"
          onClick$={() => (open.value = !open.value)}
          class={cn(
            'flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-background text-primary opacity-40 shadow-sm transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:opacity-100',
            open.value && 'scale-110 bg-primary text-primary-foreground opacity-100',
          )}
        >
          <LuPlus class="h-4 w-4" />
        </button>
        {open.value && (
          <div class="mt-2 w-48 overflow-hidden rounded-lg border border-input bg-popover p-1 text-popover-foreground shadow-lg">
            <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Add component
            </div>
            {INSERTABLE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick$={() => {
                  props.onInsert$(props.index, type);
                  open.value = false;
                }}
                class="block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {REGISTRY[type].name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

const BuilderControls = component$<{ state: BuilderState }>(({ state }) => (
  <div class="fixed bottom-4 left-4 z-40 flex items-center gap-1 rounded-xl border border-input bg-popover/95 p-1.5 shadow-lg backdrop-blur">
    <button
      type="button"
      onClick$={(e) => {
        e.stopPropagation();
        state.editing = !state.editing;
        state.selectedId = null;
      }}
      class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
    >
      {state.editing ? <LuEye class="h-4 w-4" /> : <LuPencil class="h-4 w-4" />}
      {state.editing ? 'Preview' : 'Edit'}
    </button>
    <button
      type="button"
      aria-label="Reset page"
      title="Reset to default"
      onClick$={(e) => {
        e.stopPropagation();
        localStorage.removeItem(STORAGE_KEY);
        document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax`;
        state.blocks = createInitialBlocks();
        state.selectedId = null;
      }}
      class="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-accent"
    >
      <LuRotateCcw class="h-4 w-4" />
    </button>
  </div>
));
