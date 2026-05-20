/*
 * WHAT IS THIS FILE?
 *
 * It's the  entry point for cloudflare-pages when building for production.
 *
 * Learn more about the cloudflare integration here:
 * - https://qwik.builder.io/integrations/deployments/cloudflare-pages/
 *
 */
import { createQwikCity } from '@builder.io/qwik-city/middleware/cloudflare-pages';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';

// The `QwikCityPlatform` global is intentionally not declared here: multiple
// adapter entries (vercel-edge, cloudflare-pages) coexist in this project and
// only one may declare the global, or typecheck fails with a duplicate.

const fetch = createQwikCity({ render, qwikCityPlan });

export { fetch };
