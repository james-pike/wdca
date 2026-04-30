import { $, PropsOf, component$, useComputed$ } from '@builder.io/qwik';
import { ThemeBaseColors, cn } from '@qwik-ui/utils';
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

          <label class="mt-8 mb-1 block font-medium">Base</label>
          <div class="flex">
            {Object.values(ThemeBaseColors).map((baseColor: string) => {
              const isActive = themeComputedObjectSig.value.baseColor === baseColor;

              return (
                <Button
                  key={baseColor}
                  look="ghost"
                  size="icon"
                  onClick$={async () => {
                    themeComputedObjectSig.value.baseColor = baseColor;

                    themeSig.value = await themeStoreToThemeClasses$();
                  }}
                  class={cn(
                    'flex h-3 w-3 items-center justify-center rounded-none',
                    isActive && 'border-2 border-ring',
                  )}
                >
                  <span
                    class={cn(
                      'flex h-[10px] w-[10px] shrink-0 rounded-none',
                      baseColor === 'base-slate' && 'bg-slate-500',
                      baseColor === 'base-gray' && 'bg-gray-500',
                      baseColor === 'base-neutral' && 'bg-neutral-500',
                      baseColor === 'base-zinc' && 'bg-zinc-500',
                      baseColor === 'base-stone' && 'bg-stone-500',
                    )}
                  />
                </Button>
              );
            })}
          </div>

          <div class="mt-8">
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
