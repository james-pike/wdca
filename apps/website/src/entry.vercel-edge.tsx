/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Vercel Edge runtime when building for production.
 *
 * Learn more about the Vercel integration here:
 * - https://qwik.dev/docs/deployments/vercel-edge/
 *
 */
import { createQwikCity } from '@builder.io/qwik-city/middleware/vercel-edge';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';

// Note: the `QwikCityPlatform` global is already declared by
// entry.cloudflare-pages.tsx; re-declaring it here would be a duplicate, and we
// don't need platform-typed APIs in this entry.

export default createQwikCity({ render, qwikCityPlan, manifest });
