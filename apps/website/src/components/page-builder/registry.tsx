import type { Block, BlockDefinition } from './types';
import { heroBlock } from './blocks/hero-block';
import { kitsBlock } from './blocks/kits-block';
import { ctaBlock } from './blocks/cta-block';
import { textBlock } from './blocks/text-block';

/**
 * The component library. Add a prebaked component by importing its
 * `BlockDefinition` and appending it here — it then shows up in the “+” menu
 * automatically.
 */
export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  heroBlock,
  kitsBlock,
  ctaBlock,
  textBlock,
];

export const REGISTRY: Record<string, BlockDefinition> = Object.fromEntries(
  BLOCK_DEFINITIONS.map((d) => [d.type, d]),
);

/** Blocks the user can insert from the “+” menu (the hero/kits are seed-only). */
export const INSERTABLE_TYPES = ['cta', 'text'];

/** The initial page. Stable ids so SSR and client hydration match. */
export function createInitialBlocks(): Block[] {
  return [
    { id: 'seed-hero', type: 'hero', props: { ...heroBlock.defaultProps } },
    { id: 'seed-kits', type: 'kits', props: { ...kitsBlock.defaultProps } },
  ];
}
