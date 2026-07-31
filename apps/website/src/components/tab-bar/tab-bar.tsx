import { component$, useContext } from '@builder.io/qwik';
import { useTheme } from '@qwik-ui/themes';
import { cn } from '@qwik-ui/utils';
import { ActiveTabContext, LANDING_TABS } from './tab-context';

/**
 * Horizontal tab bar under the site header. Tabs switch the landing hero
 * instantly via shared state (no navigation, no refresh). Its bottom border and
 * the dividers between tabs use the same border utilities as the header's bottom
 * border, so they share the theme's `--border` colour and width. The bar scrolls
 * horizontally (scrollbar hidden) rather than overflowing the page.
 */
export const TabBar = component$(() => {
  const { themeSig } = useTheme();
  const activeTab = useContext(ActiveTabContext);

  return (
    <nav
      role="tablist"
      aria-label="Page tabs"
      class={cn(
        'sticky top-[var(--header-h)] z-[9] flex h-[var(--tabbar-h)] w-full items-stretch bg-background',
        // Scroll the tabs horizontally instead of overflowing the page; hide
        // the scrollbar so it stays a clean bar.
        'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        'border-b',
        themeSig.value?.includes('brutalist') && 'border-b-2',
      )}
    >
      {LANDING_TABS.map((tab, i) => {
        const isActive = activeTab.value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick$={() => {
              activeTab.value = tab.id;
            }}
            class={cn(
              'relative inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap px-4 text-sm font-medium transition-colors',
              'hover:bg-accent/60 hover:text-foreground',
              isActive ? 'text-foreground' : 'text-muted-foreground',
              // 1px divider between tabs, matching the header bottom border.
              i < LANDING_TABS.length - 1 && 'border-r',
            )}
          >
            {tab.label}
            <span
              class={cn(
                'pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-primary transition-opacity',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
            />
          </button>
        );
      })}
    </nav>
  );
});

export default TabBar;
