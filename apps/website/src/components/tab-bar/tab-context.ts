import { createContextId, type Signal } from '@builder.io/qwik';

export interface TabBarTab {
  id: string;
  label: string;
}

/** The landing tabs. Switching is instant client-side state — no navigation. */
export const LANDING_TABS: TabBarTab[] = [
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'hosting', label: 'Hosting' },
  { id: 'ai', label: 'AI' },
];

/** Active landing tab id, provided by `layout-landing`, shared by the tab bar
 *  and the page that renders the matching hero. */
export const ActiveTabContext = createContextId<Signal<string>>(
  'landing.active-tab',
);
