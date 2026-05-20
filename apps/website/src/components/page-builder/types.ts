import type { Component, QRL } from '@builder.io/qwik';

/** A single placed block on the page. `props` holds its editable content/style. */
export interface Block {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

/** Props every block component receives from the canvas. */
export interface BlockViewProps {
  block: Block;
  /** True while the page is in edit mode (show contentEditable, etc.). */
  editing: boolean;
  /** Update one prop on this block. Already bound to the block id. */
  set$: QRL<(key: string, value: unknown) => void>;
}

/**
 * A prebaked component the user can drop onto the page. To add a new one to the
 * library: create a block file that exports a `BlockDefinition` and register it
 * in `registry.tsx`.
 */
export interface BlockDefinition {
  type: string;
  /** Label shown in the “add component” menu. */
  name: string;
  /** Initial props when the block is first inserted. */
  defaultProps: Record<string, unknown>;
  /** The renderer. */
  view: Component<BlockViewProps>;
}
