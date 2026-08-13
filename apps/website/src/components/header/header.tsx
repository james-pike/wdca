import { component$, useComputed$, useSignal, useStyles$ } from '@builder.io/qwik';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useLocation } from '@builder.io/qwik-city';
// eslint-disable-next-line @nx/enforce-module-boundaries
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as styledKitVersion } from '../../../../../packages/kit-styled/package.json';
import { LogoIcon, LogoWithBorders } from '../icons/logo';

import { useTheme } from '@qwik-ui/themes';

import { Modal } from '@qwik-ui/headless';
import { useAppState } from '~/_state/use-app-state';
import { LuMenu, LuX } from '@qwikest/icons/lucide';
import { DocsNavigation } from '../navigation-docs/navigation-docs';
import { useKitMenuItems } from '~/routes/layout';
import { cn } from '@qwik-ui/utils';
import { Button, buttonVariants } from '@qwik-ui/styled';
import MakeItYours from '../make-it-yours/make-it-yours';
import { HeaderTabs } from '../tab-bar/header-tabs';
export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(({ showVersion = false }: HeaderProps) => {
  useStyles$(`
    .sidebar-mobile::backdrop {
      background: rgba(0,0,0,0.5);
    }
  
    .sidebar-mobile {
      animation: sidebarOpen 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile::backdrop {
      animation: sidebarFadeIn 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile.modal-closing {
      animation: sidebarClose 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile.modal-closing::backdrop {
      animation: sidebarFadeOut 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }

    @keyframes sidebarOpen {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    }
  
    @keyframes sidebarClose {
      from {
        opacity: 1;
        transform: translateX(0%);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  
    @keyframes sidebarFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
    @keyframes sidebarFadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    `);

  const { menuItemsGroups } = useKitMenuItems();

  const rootStore = useAppState();
  const isSidebarOpenedSig = useSignal(false);
  const location = useLocation();
  // On the landing route the category nav lives inline in the header; elsewhere
  // the header shows the kit doc links instead.
  const isLanding = location.url.pathname === '/';

  const isDocsActive = (baseHref: string) => {
    const isLinkActive = location.url.pathname.startsWith(baseHref);
    return `
        transition-color ease-step duration-300 ${isLinkActive ? 'font-bold' : ''}`;
  };

  const kitSignal = useComputed$(() => {
    if (location.url.pathname.startsWith('/docs/headless')) {
      return {
        name: 'Headless',
        version: headlessVersion,
      };
    }
    if (location.url.pathname.startsWith('/docs/styled')) {
      return {
        name: 'Styled',
        version: styledKitVersion,
      };
    }
  });

  const { themeSig } = useTheme();

  return (
    <Modal.Root
      class={cn(
        'sticky top-0 z-10 flex h-[var(--header-h)] justify-center border-b bg-background',
        themeSig.value?.includes('brutalist') && 'border-b-2',
      )}
      bind:show={isSidebarOpenedSig}
    >
      <header class="flex w-full items-center gap-2">
        <section class="flex shrink-0 items-center justify-start">
          <a href="/" aria-label="Qwik UI Logo" class="ml-4">
            <LogoWithBorders class="hidden sm:block" />
            <LogoIcon class="block sm:hidden" />
          </a>
          {showVersion && (
            <div class="ml-4 hidden text-xs md:flex">
              {kitSignal.value?.name &&
                kitSignal.value?.name + ' ' + kitSignal.value?.version}
            </div>
          )}
        </section>

        {/* Docs: kit doc links in the middle (landing uses header category nav). */}
        {!isLanding && (
          <div class="ml-6 hidden items-center space-x-8 text-sm lg:flex">
            <a
              class={isDocsActive('/docs/headless/')}
              href="/docs/headless/introduction/"
            >
              Headless
            </a>
            {rootStore.featureFlags?.showStyled && (
              <a class={isDocsActive('/docs/styled/')} href="/docs/styled/introduction/">
                Styled
              </a>
            )}
          </div>
        )}

        <div class="xs:gap-1 mr-2 ml-auto flex min-w-0 items-center gap-0.5 sm:mr-4">
          {/* Landing category nav, grouped with the menu on the right. */}
          {isLanding && <HeaderTabs />}
          {/* Style picker lives in the design Color topic on mobile/tablet. */}
          <div class="hidden shrink-0 lg:block">
            <MakeItYours />
          </div>
          <Button
            type="button"
            aria-label="Toggle navigation"
            onClick$={() => {
              isSidebarOpenedSig.value = !isSidebarOpenedSig.value;
            }}
            size="icon"
            look="ghost"
            class="flex shrink-0 lg:hidden"
          >
            <LuMenu class="h-6 w-6" />
          </Button>
        </div>
      </header>
      <Modal.Panel class="sidebar-mobile rounded-base mr-0 ml-auto h-screen w-sm border-0 bg-background text-foreground shadow-md">
        <div class="mb-2 pt-2 pb-4">
          <DocsNavigation
            linksGroups={
              menuItemsGroups && menuItemsGroups.length > 0 ? menuItemsGroups : undefined
            }
            class="max-w-80 overflow-auto bg-background"
          />
        </div>
        <button
          autoFocus
          onClick$={() => (isSidebarOpenedSig.value = false)}
          class="absolute top-[26px] right-6"
        >
          <LuX class="h-8 w-8" />
        </button>
      </Modal.Panel>
    </Modal.Root>
  );
});
