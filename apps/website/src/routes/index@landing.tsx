import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PageBuilder } from '~/components/page-builder/page-builder';

export default component$(() => {
  return <PageBuilder />;
});

export const head: DocumentHead = {
  title: "Qwik UI - The world's fastest loading UI components library",
};
