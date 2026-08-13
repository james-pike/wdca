import { component$, useContext } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import {
  LuPalette,
  LuCode2,
  LuMegaphone,
  LuServer,
  LuSparkles,
} from '@qwikest/icons/lucide';
import { ActiveTabContext, LANDING_TABS } from './tab-context';

/** Category → icon. Kept here (not in tab-context) so the data stays plain. */
const ICONS: Record<string, typeof LuPalette> = {
  design: LuPalette,
  development: LuCode2,
  marketing: LuMegaphone,
  hosting: LuServer,
  ai: LuSparkles,
};

/**
 * The landing category nav, rendered inline in the site header as icons
 * (Design, Development, Marketing, Hosting, AI). Switching sets the shared
 * active-tab signal — no navigation. Only mounted on the landing route, where
 * {@link ActiveTabContext} is provided.
 */
export const HeaderTabs = component$(() => {
  const activeTab = useContext(ActiveTabContext);

  return (
    <nav role="tablist" aria-label="Sections" class="flex items-center gap-0.5">
      {LANDING_TABS.map((tab) => {
        const on = activeTab.value === tab.id;
        const Icon = ICONS[tab.id] ?? LuSparkles;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={on}
            aria-label={tab.label}
            title={tab.label}
            onClick$={() => (activeTab.value = tab.id)}
            class={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors',
              on
                ? 'bg-accent text-primary'
                : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
            )}
          >
            <Icon class="h-5 w-5" />
          </button>
        );
      })}
    </nav>
  );
});

export default HeaderTabs;
