import { component$ } from '@builder.io/qwik';
import { LuArrowRight, LuCheck, LuStar } from '@qwikest/icons/lucide';

/**
 * A short strip of token-driven specimens shown under the mobile {@link StyleBar}
 * on the design tab. Everything here reads from the live theme tokens (primary,
 * border, radius, shadow, base), so scrolling this section while the sticky bar
 * stays in reach shows each pick restyle the components in real time — the
 * hero's "everything is a token" claim, made tactile. Mobile only.
 */
export const TokenSpecimens = component$(() => (
  <section class="mx-auto w-full max-w-2xl px-6 py-10 lg:hidden">
    <p class="mb-6 font-mono text-xs tracking-widest text-muted-foreground">
      LIVE SPECIMENS · tweak the bar above
    </p>

    <div class="flex flex-col gap-8">
      {/* Buttons */}
      <div>
        <span class="mb-2 block font-mono text-[0.66rem] tracking-[0.2em] text-muted-foreground">
          BUTTONS
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <button class="inline-flex h-10 items-center gap-2 rounded-[var(--border-radius)] bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md">
            Primary
            <LuArrowRight class="h-4 w-4" />
          </button>
          <button class="inline-flex h-10 items-center rounded-[var(--border-radius)] border bg-background px-4 text-sm font-medium text-foreground shadow-xs">
            Outline
          </button>
          <button class="inline-flex h-10 items-center rounded-[var(--border-radius)] bg-accent px-4 text-sm font-medium text-accent-foreground">
            Soft
          </button>
        </div>
      </div>

      {/* Card */}
      <div>
        <span class="mb-2 block font-mono text-[0.66rem] tracking-[0.2em] text-muted-foreground">
          CARD
        </span>
        <div class="rounded-[calc(var(--border-radius)+0.375rem)] border bg-card p-5 text-card-foreground shadow-lg">
          <div class="flex items-center gap-2">
            <span class="flex h-8 w-8 items-center justify-center rounded-[var(--border-radius)] bg-primary text-primary-foreground">
              <LuStar class="h-4 w-4" />
            </span>
            <h3 class="text-base font-semibold">Themed by string</h3>
          </div>
          <p class="mt-3 text-sm text-muted-foreground">
            Colour, border, radius and shadow are all tokens. Change one in the bar
            and every specimen updates at once.
          </p>
          <div class="mt-4 flex items-center gap-2 text-sm text-primary">
            <LuCheck class="h-4 w-4" />
            <span class="font-medium">Live preview</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div>
        <span class="mb-2 block font-mono text-[0.66rem] tracking-[0.2em] text-muted-foreground">
          INPUT
        </span>
        <input
          type="text"
          placeholder="you@example.com"
          class="h-10 w-full rounded-[var(--border-radius)] border bg-background px-3 text-sm shadow-xs outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Badges */}
      <div>
        <span class="mb-2 block font-mono text-[0.66rem] tracking-[0.2em] text-muted-foreground">
          BADGES
        </span>
        <div class="flex flex-wrap gap-2">
          <span class="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            primary
          </span>
          <span class="rounded-full border px-3 py-1 text-xs font-medium text-foreground">
            outline
          </span>
          <span class="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            accent
          </span>
          <span class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            muted
          </span>
        </div>
      </div>
    </div>
  </section>
));

export default TokenSpecimens;
