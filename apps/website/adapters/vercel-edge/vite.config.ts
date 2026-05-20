import { vercelEdgeAdapter } from '@builder.io/qwik-city/adapters/vercel-edge/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import { fileURLToPath } from 'node:url';

// The base config reads this to place the SSR bundle inside the Vercel Build
// Output dir (`.vercel/output`) at the repo root. Must be set before baseConfig
// is evaluated, hence above the import.
process.env.QWIK_SSR_OUTDIR = '../../.vercel/output/functions/_qwik-city.func';

// eslint-disable-next-line import/first
import baseConfig from '../../vite.config';

// Absolute path so rollup resolves the entry regardless of the build CWD
// (nx runs the build from the repo root, but the vite root is apps/website).
const entry = fileURLToPath(new URL('../../src/entry.vercel-edge.tsx', import.meta.url));

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: [entry, '@qwik-city-plan'],
      },
      outDir: '../../.vercel/output/functions/_qwik-city.func',
    },
    plugins: [vercelEdgeAdapter()],
  };
});
