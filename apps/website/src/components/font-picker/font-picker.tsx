import {
  $,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Popover } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';

type FontEntry = {
  name: string;
  family: string;
  weights?: string;
};

const FONTS: FontEntry[] = [
  { name: 'System Default', family: '' },
  { name: 'Inter', family: 'Inter', weights: '300;400;500;600;700' },
  { name: 'Roboto', family: 'Roboto', weights: '400;500;700' },
  { name: 'Open Sans', family: 'Open Sans', weights: '400;500;600;700' },
  { name: 'Poppins', family: 'Poppins', weights: '400;500;600;700' },
  { name: 'Montserrat', family: 'Montserrat', weights: '400;500;600;700' },
  { name: 'DM Sans', family: 'DM Sans', weights: '400;500;700' },
  { name: 'Space Grotesk', family: 'Space Grotesk', weights: '400;500;700' },
  { name: 'Nunito', family: 'Nunito', weights: '400;500;600;700' },
  { name: 'Work Sans', family: 'Work Sans', weights: '400;500;600;700' },
  { name: 'Lora', family: 'Lora', weights: '400;500;600;700' },
  { name: 'Playfair Display', family: 'Playfair Display', weights: '400;500;700' },
  { name: 'Merriweather', family: 'Merriweather', weights: '400;700' },
  { name: 'JetBrains Mono', family: 'JetBrains Mono', weights: '400;500;700' },
  { name: 'Fira Code', family: 'Fira Code', weights: '400;500;700' },
];

const STORAGE_KEY = 'qui-font';
const COMBINED_LINK_ID = 'qui-google-fonts';

const fontStack = (family: string) =>
  family ? `'${family}', system-ui, sans-serif` : '';

const buildCombinedUrl = () => {
  const parts = FONTS.filter((f) => f.family).map(
    (f) => `family=${encodeURIComponent(f.family).replace(/%20/g, '+')}:wght@${f.weights ?? '400;700'}`,
  );
  return `https://fonts.googleapis.com/css2?${parts.join('&')}&display=swap`;
};

const applyFontToDocument = (family: string) => {
  if (family) {
    document.documentElement.style.setProperty('--font-sans', fontStack(family));
    document.documentElement.style.fontFamily = fontStack(family);
  } else {
    document.documentElement.style.removeProperty('--font-sans');
    document.documentElement.style.fontFamily = '';
  }
};

export const FontPicker = component$(() => {
  const currentSig = useSignal('System Default');

  // eslint-disable-next-line qwik/no-use-visible-task -- needs to inject font link + read localStorage on client
  useVisibleTask$(() => {
    if (!document.getElementById(COMBINED_LINK_ID)) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);

      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);

      const link = document.createElement('link');
      link.id = COMBINED_LINK_ID;
      link.rel = 'stylesheet';
      link.href = buildCombinedUrl();
      document.head.appendChild(link);
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const match = FONTS.find((f) => f.name === saved);
      if (match) {
        currentSig.value = match.name;
        applyFontToDocument(match.family);
      }
    }
  });

  const pick = $((font: FontEntry) => {
    applyFontToDocument(font.family);
    localStorage.setItem(STORAGE_KEY, font.name);
    currentSig.value = font.name;
  });

  const currentFont = FONTS.find((f) => f.name === currentSig.value) ?? FONTS[0];

  return (
    <Popover.Root flip floating="bottom-end" gutter={8}>
      <Popover.Trigger
        aria-label={`Choose font (current: ${currentFont.name})`}
        class={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
        )}
      >
        <span
          class="text-base leading-none font-bold"
          style={
            currentFont.family
              ? { fontFamily: fontStack(currentFont.family) }
              : undefined
          }
        >
          Aa
        </span>
      </Popover.Trigger>
      <Popover.Panel class="!w-72 max-w-[calc(100vw-1rem)]">
        <div class="mb-2 text-sm font-medium">Font</div>
        <div class="flex max-h-80 flex-col gap-1 overflow-auto pr-1">
          {FONTS.map((font) => {
            const isActive = currentSig.value === font.name;
            return (
              <button
                key={font.name}
                type="button"
                onClick$={() => pick(font)}
                class={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors hover:bg-accent',
                  isActive && 'bg-accent ring-1 ring-ring',
                )}
                style={
                  font.family ? { fontFamily: fontStack(font.family) } : undefined
                }
              >
                <span class="text-base">{font.name}</span>
                <span class="text-sm text-muted-foreground">Ag</span>
              </button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});

export default FontPicker;
