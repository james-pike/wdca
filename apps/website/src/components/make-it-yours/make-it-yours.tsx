import { $, PropsOf, component$, useComputed$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { LuSlidersHorizontal, LuX } from '@qwikest/icons/lucide';
import { useTheme } from '@qwik-ui/themes';

import { Button, Modal, buttonVariants } from '~/components/ui';

import CopyCssConfig from '../copy-css-config/copy-css-config';
import {
  parseThemeString,
  serializeThemeConfig,
} from '../header-pickers/theme-helpers';

export default component$<PropsOf<typeof Button>>(() => {
  const { themeSig } = useTheme();

  const themeComputedObjectSig = useComputed$(() =>
    parseThemeString(themeSig.value),
  );

  const themeStoreToThemeClasses$ = $((): string =>
    serializeThemeConfig(themeComputedObjectSig.value),
  );
  return (
    <Modal.Root>
      <Modal.Trigger
        class={cn(
          buttonVariants({ size: 'sm', look: 'outline' }),
          'flex sm:mr-2 sm:h-10',
        )}
      >
        <LuSlidersHorizontal class={cn('h-4 w-4 sm:mr-2')} />
        <span class={cn('hidden', 'sm:block')}>Make it yours</span>
      </Modal.Trigger>
      <Modal.Panel position="right">
        <header class="flex w-full">
          <h2 class="justify-self-start text-lg font-bold">Edit Profile</h2>
        </header>
        <div class="mt-8 mb-2 py-4">
          <div>
            Dark Mode{' '}
            <input
              type="checkbox"
              checked={themeComputedObjectSig.value.mode === 'dark'}
              onClick$={async () => {
                themeComputedObjectSig.value.mode =
                  themeComputedObjectSig.value.mode?.includes('light') ? 'dark' : 'light';

                themeSig.value = await themeStoreToThemeClasses$();
              }}
            />
          </div>
        </div>

        <footer class="flex w-full justify-between gap-4">
          <Button
            look="ghost"
            onClick$={() => {
              themeSig.value = themeSig.value?.includes('dark') ? 'dark' : 'light';
            }}
          >
            Reset
          </Button>
          <CopyCssConfig />
        </footer>
        <Modal.Close
          class={cn(buttonVariants({ size: 'sm', look: 'link' }), 'fixed top-5 right-4')}
        >
          <LuX class="h-8 w-8" />
        </Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
