import { $, PropsOf, component$, useComputed$ } from '@builder.io/qwik';
import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemeConfig,
  ThemeFonts,
  ThemeModes,
  ThemePrimaryColors,
  ThemeSecondaryColors,
  ThemeStyles,
  cn,
} from '@qwik-ui/utils';
import { LuSlidersHorizontal, LuX } from '@qwikest/icons/lucide';
import { useTheme } from '@qwik-ui/themes';

import { Button, Modal, buttonVariants } from '~/components/ui';

import { useAppState } from '~/_state/use-app-state';
import CopyCssConfig from '../copy-css-config/copy-css-config';

export default component$<PropsOf<typeof Button>>(() => {
  const rootStore = useAppState();

  const { themeSig } = useTheme();

  const themeComputedObjectSig = useComputed$((): ThemeConfig => {
    if (!themeSig.value || themeSig.value === 'light') {
      return {
        font: ThemeFonts.SANS,
        mode: ThemeModes.LIGHT,
        style: ThemeStyles.SIMPLE,
        baseColor: ThemeBaseColors.SLATE,
        primaryColor: ThemePrimaryColors.CYAN600,
        secondaryColor: ThemeSecondaryColors.FUCHSIA500,
        borderRadius: ThemeBorderRadiuses['BORDER-RADIUS-0'],
      };
    }

    if (themeSig.value === 'dark') {
      return {
        font: ThemeFonts.SANS,
        mode: ThemeModes.DARK,
        style: ThemeStyles.SIMPLE,
        baseColor: ThemeBaseColors.SLATE,
        primaryColor: ThemePrimaryColors.CYAN600,
        secondaryColor: ThemeSecondaryColors.FUCHSIA500,
        borderRadius: ThemeBorderRadiuses['BORDER-RADIUS-0'],
      };
    }

    const themeArray = Array.isArray(themeSig.value)
      ? themeSig.value
      : themeSig.value.split(' ');
    return {
      font: themeArray[0],
      mode: themeArray[1],
      style: themeArray[2],
      baseColor: themeArray[3],
      primaryColor: themeArray[4],
      borderRadius: themeArray[5],
      // Backward compat: themes saved before secondary picker existed have 6
      // entries; default to fuchsia so the hero gradient stays warm.
      secondaryColor: themeArray[6] ?? ThemeSecondaryColors.FUCHSIA500,
    };
  });

  const themeStoreToThemeClasses$ = $((): string => {
    const { font, mode, style, baseColor, primaryColor, secondaryColor, borderRadius } =
      themeComputedObjectSig.value;
    return [
      font,
      mode,
      style,
      baseColor,
      primaryColor,
      borderRadius,
      secondaryColor,
    ].join(' ');
  });
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
          <label class="mb-1 block font-medium">Preset</label>
          <select
            class="rounded-base h-12 w-full border bg-background p-2"
            value={themeComputedObjectSig.value.style}
            onChange$={async (e, el) => {
              if (el.value === 'simple') {
                themeComputedObjectSig.value.font = ThemeFonts.SANS;
              }
              if (el.value === 'brutalist') {
                themeComputedObjectSig.value.font = ThemeFonts.MONO;
              }
              if (el.value === 'neumorphic') {
                themeComputedObjectSig.value.font = ThemeFonts.SANS;
              }
              themeComputedObjectSig.value.style = el.value;
              themeSig.value = await themeStoreToThemeClasses$();
            }}
          >
            <option value={'simple'}>Simple</option>
            <option value={'brutalist'}>Brutalist</option>
            {rootStore.featureFlags?.showNeumorphic && (
              <option value={'neumorphic'}>Neumorphic</option>
            )}
          </select>

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

          <div>
            <label class="mt-8 mb-1 block font-medium">Radius</label>
            <div class="flex h-12 space-x-3">
              {Object.values(ThemeBorderRadiuses).map((borderRadius: string) => {
                const isActive =
                  themeComputedObjectSig.value.borderRadius === borderRadius;
                return (
                  <Button
                    key={borderRadius}
                    look="outline"
                    onClick$={async () => {
                      themeComputedObjectSig.value.borderRadius = borderRadius;
                      themeSig.value = await themeStoreToThemeClasses$();
                    }}
                    class={cn('w-12', isActive && 'mb-2 border-ring')}
                  >
                    {borderRadius === 'border-radius-0' && 0}
                    {borderRadius === 'border-radius-dot-25' && '.25'}
                    {borderRadius === 'border-radius-dot-50' && '.5'}
                    {borderRadius === 'border-radius-dot-75' && '.75'}
                    {borderRadius === 'border-radius-1' && 1}
                  </Button>
                );
              })}
            </div>
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
