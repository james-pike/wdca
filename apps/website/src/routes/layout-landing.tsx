import { component$, Slot, useContextProvider, useSignal } from '@builder.io/qwik';
import Header from '~/components/header/header';
import { ActiveTabContext } from '~/components/tab-bar/tab-context';
import { Footer } from '~/components/footer/footer';

export default component$(() => {
  // Shared active-tab state: the tab bar sets it, the landing page renders the
  // matching hero. Switching is instant client-side state — no navigation.
  // The tab bar itself now lives inside the landing page (index@landing), docked
  // at the bottom of the hero fold so it rises and sticks under the header.
  const activeTab = useSignal('design');
  useContextProvider(ActiveTabContext, activeTab);

  return (
    <>
      {/* Themed gradient/pattern backdrop behind the whole page. */}
      <div class="site-backdrop" aria-hidden="true" />
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
