import { component$, useContext } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { ActiveTabContext } from '~/components/tab-bar/tab-context';
import {
  AiHero,
  DesignHero,
  DevelopmentHero,
  HostingHero,
  MarketingHero,
} from '~/components/landing-heroes/landing-heroes';

export default component$(() => {
  const activeTab = useContext(ActiveTabContext);
  const id = activeTab.value;

  return (
    <>
      {id === 'design' && <DesignHero />}
      {id === 'development' && <DevelopmentHero />}
      {id === 'marketing' && <MarketingHero />}
      {id === 'hosting' && <HostingHero />}
      {id === 'ai' && <AiHero />}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI — design, build, market, host & AI',
};
