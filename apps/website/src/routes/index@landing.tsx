import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Card } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';

export default component$(() => {
  return (
    <div class="relative flex flex-col items-center gap-8 px-6 py-24">
      <svg
        aria-hidden="true"
        class="pointer-events-none absolute top-16 left-1/2 -z-10 h-80 w-[140%] -translate-x-1/2 text-primary opacity-10 blur-3xl"
        viewBox="0 0 800 240"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="220" cy="80" r="120" fill="currentColor" />
        <circle cx="580" cy="150" r="140" fill="currentColor" opacity="0.7" />
      </svg>

      <h1 class="text-center text-4xl leading-normal lg:text-5xl">
        <span class="font-extrabold tracking-wide text-primary">Qwik</span>{' '}
        <span class="font-extrabold tracking-wide text-secondary">UI</span>
      </h1>
      <h2 class="text-center text-xl leading-normal font-bold lg:text-3xl">
        Headless & styled copy-paste components
        <br />
        <span class="leading-normal text-primary">automatically optimized for you</span>
      </h2>
      <p class="text-center text-lg lg:text-xl">
        Choose a kit and start building the future <span class="hue-rotate-150">⚡</span>
      </p>

      <div class="mt-4 flex w-full flex-wrap justify-center gap-8 sm:gap-14">
        <a
          href={`/docs/headless/introduction`}
          class="block w-full max-w-md focus-visible:outline-none"
        >
          <Card.Root
            class={cn(
              'ease-step relative block h-full overflow-hidden rounded-lg shadow-lg outline-1 duration-150 hover:scale-[1.025] focus:scale-[1.025]',
            )}
          >
            <div class="relative aspect-square w-full overflow-hidden bg-primary/5 p-10 text-primary">
              <HeadlessIcon />
            </div>
            <Card.Header>
              <Card.Title class="text-xl">Headless</Card.Title>
              <Card.Description class="text-lg">
                A headless component library of completely unstyled, accessible, and
                resumable components for the most creative minds.
              </Card.Description>
            </Card.Header>
          </Card.Root>
        </a>
        <a
          href={`/docs/styled/introduction`}
          class="block w-full max-w-md focus-visible:outline-none"
        >
          <Card.Root class="ease-step relative block h-full overflow-hidden rounded-lg shadow-lg outline-1 duration-150 hover:scale-[1.025] focus:scale-[1.025]">
            <div class="relative aspect-square w-full overflow-hidden bg-primary/10 p-10 text-primary">
              <StyledIcon />
            </div>
            <Card.Header>
              <Card.Title class="text-xl">Styled</Card.Title>
              <Card.Description class="text-lg">
                A design system of copy-paste, reusable, styled components built on top of
                headless. Easy to use, easy to customize.
              </Card.Description>
            </Card.Header>
          </Card.Root>
        </a>
      </div>
    </div>
  );
});

const HeadlessIcon = component$(() => (
  <svg
    aria-hidden="true"
    viewBox="0 0 300 300"
    class="h-full w-full"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
  >
    <rect x="36" y="36" width="228" height="228" rx="14" stroke-width="2.5" />
    <line x1="60" y1="76" x2="172" y2="76" stroke-width="4" />
    <line x1="60" y1="96" x2="216" y2="96" stroke-width="2" opacity="0.55" />
    <line x1="60" y1="110" x2="180" y2="110" stroke-width="2" opacity="0.55" />
    <rect x="60" y="138" width="86" height="34" rx="7" stroke-width="2.5" />
    <rect x="158" y="138" width="86" height="34" rx="7" stroke-width="2.5" />
    <rect x="60" y="190" width="62" height="26" rx="13" stroke-width="2.5" />
    <circle cx="73" cy="203" r="9" stroke-width="2.5" />
    <line x1="140" y1="200" x2="244" y2="200" stroke-width="2" opacity="0.5" />
    <line x1="140" y1="210" x2="206" y2="210" stroke-width="2" opacity="0.5" />
    <rect x="60" y="232" width="184" height="32" rx="7" stroke-width="2.5" />
    <line x1="120" y1="248" x2="184" y2="248" stroke-width="3" />
  </svg>
));

const StyledIcon = component$(() => (
  <svg aria-hidden="true" viewBox="0 0 300 300" class="h-full w-full">
    <rect
      x="36"
      y="36"
      width="228"
      height="228"
      rx="14"
      fill="currentColor"
      opacity="0.12"
    />
    <rect
      x="36"
      y="36"
      width="228"
      height="228"
      rx="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      opacity="0.35"
    />
    <rect x="60" y="70" width="120" height="14" rx="7" fill="currentColor" />
    <rect x="60" y="92" width="170" height="8" rx="4" fill="currentColor" opacity="0.4" />
    <rect x="60" y="106" width="130" height="8" rx="4" fill="currentColor" opacity="0.4" />
    <rect x="60" y="138" width="86" height="34" rx="7" fill="currentColor" />
    <rect
      x="158"
      y="138"
      width="86"
      height="34"
      rx="7"
      fill="currentColor"
      opacity="0.25"
    />
    <rect x="60" y="190" width="62" height="26" rx="13" fill="currentColor" />
    <circle cx="109" cy="203" r="9" fill="white" />
    <rect
      x="140"
      y="196"
      width="104"
      height="7"
      rx="3.5"
      fill="currentColor"
      opacity="0.4"
    />
    <rect
      x="140"
      y="208"
      width="72"
      height="7"
      rx="3.5"
      fill="currentColor"
      opacity="0.3"
    />
    <rect x="60" y="232" width="184" height="32" rx="7" fill="currentColor" />
    <rect
      x="120"
      y="244"
      width="64"
      height="8"
      rx="4"
      fill="white"
      opacity="0.9"
    />
  </svg>
));

export const head: DocumentHead = {
  title: "Qwik UI - The world's fastest loading UI components library",
};
