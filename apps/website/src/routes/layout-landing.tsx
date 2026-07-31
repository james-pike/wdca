import { component$, Slot, useContextProvider, useSignal } from '@builder.io/qwik';
import Header from '~/components/header/header';
import TabBar from '~/components/tab-bar/tab-bar';
import { ActiveTabContext } from '~/components/tab-bar/tab-context';
import { Footer } from '~/components/footer/footer';

export default component$(() => {
  // Shared active-tab state: the tab bar sets it, the landing page renders the
  // matching hero. Switching is instant client-side state — no navigation.
  const activeTab = useSignal('design');
  useContextProvider(ActiveTabContext, activeTab);

  return (
    <>
      <Header />
      <TabBar />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
