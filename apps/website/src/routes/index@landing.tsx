import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PageBuilder, STORAGE_KEY } from '~/components/page-builder/page-builder';
import { createInitialBlocks } from '~/components/page-builder/registry';
import type { Block } from '~/components/page-builder/types';

/**
 * Read the saved layout from its cookie on the server so SSR renders the user's
 * actual page (no flash of the default layout on refresh). Falls back to the
 * seed layout when there's no cookie yet.
 */
export const usePageBlocks = routeLoader$<Block[]>(({ cookie }) => {
  // Qwik City already URI-decodes the cookie value, so parse it directly.
  const raw = cookie.get(STORAGE_KEY)?.value;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed as Block[];
    } catch {
      /* ignore malformed cookie */
    }
  }
  return createInitialBlocks();
});

export default component$(() => {
  const blocks = usePageBlocks();
  return <PageBuilder initialBlocks={blocks.value} />;
});

export const head: DocumentHead = {
  title: "Qwik UI - The world's fastest loading UI components library",
};
