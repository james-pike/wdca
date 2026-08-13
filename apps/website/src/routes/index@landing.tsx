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
import { DesignSections } from '~/components/landing-sections/design-sections';
import { DevelopmentSections } from '~/components/landing-sections/development-sections';
import { MarketingSections } from '~/components/landing-sections/marketing-sections';
import { HostingSections } from '~/components/landing-sections/hosting-sections';
import { AiSections } from '~/components/landing-sections/ai-sections';

export default component$(() => {
  const activeTab = useContext(ActiveTabContext);
  const id = activeTab.value;

  // Category switching lives in the header (HeaderTabs). Each category renders
  // its hero (fills the fold) followed by its sections, which open with a
  // sticky topics bar docked at the bottom of the fold.
  return (
    <>
      {id === 'design' && (
        <>
          <DesignHero />
          <DesignSections />
        </>
      )}
      {id === 'development' && (
        <>
          <DevelopmentHero />
          <DevelopmentSections />
        </>
      )}
      {id === 'marketing' && (
        <>
          <MarketingHero />
          <MarketingSections />
        </>
      )}
      {id === 'hosting' && (
        <>
          <HostingHero />
          <HostingSections />
        </>
      )}
      {id === 'ai' && (
        <>
          <AiHero />
          <AiSections />
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI — design, build, market, host & AI',
};
