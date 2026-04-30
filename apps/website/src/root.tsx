import { component$, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';

import { APP_STATE_CONTEXT_ID } from './_state/app-state-context-id';
import { AppState } from './_state/app-state.type';
import { RouterHead } from './components/router-head/router-head';

import global from './global.css?inline';

import { ThemeProvider } from '@qwik-ui/themes';

import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemeFontFamilies,
  ThemeFonts,
  ThemeModes,
  ThemePrimaryColors,
  ThemeSecondaryColors,
  ThemeStyles,
} from '@qwik-ui/utils';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  useStyles$(global);

  const appState = useStore<AppState>({
    featureFlags: {
      showStyled: true,
      showNeumorphic: true,
    },
  });

  useContextProvider(APP_STATE_CONTEXT_ID, appState);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Nunito:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Playfair+Display:wght@400;500;700&family=Merriweather:wght@400;700&family=JetBrains+Mono:wght@400;500;700&family=Fira+Code:wght@400;500;700&display=swap"
        />
        <RouterHead />
        <script dangerouslySetInnerHTML={`(${collectSymbols})()`} />
        {/* <Insights publicApiKey={'j748wqs70n'} /> */}
      </head>
      <body lang="en">
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          themes={[
            ...Object.values(ThemeFonts),
            ...Object.values(ThemeModes),
            ...Object.values(ThemeStyles),
            ...Object.values(ThemeBaseColors),
            ...Object.values(ThemePrimaryColors),
            ...Object.values(ThemeSecondaryColors),
            ...Object.values(ThemeBorderRadiuses),
            ...Object.values(ThemeFontFamilies),
          ]}
        >
          <RouterOutlet />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={`
            window.addEventListener('initPagefind', async () => {
              const pagefind = await import("/pagefind/pagefind.js");
              await pagefind.init();
              window.pagefind = pagefind;
            });
          `}
        ></script>
      </body>
    </QwikCityProvider>
  );
});

export function collectSymbols() {
  (window as any).symbols = [];
  document.addEventListener('qsymbol', (e) =>
    (window as any).symbols.push((e as any).detail.symbol),
  );
}
