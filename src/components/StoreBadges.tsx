'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * COUNT is pre-launch. Until the real store listings exist, both badges route
 * to the launch-updates email capture. Swap these two values for the real
 * App Store / Google Play URLs at launch — nothing else needs to change.
 */
export const STORE_LINKS = {
  appStore: 'mailto:support@countintimacyjournal.com?subject=COUNT%20iOS%20Launch%20Updates',
  googlePlay: 'mailto:support@countintimacyjournal.com?subject=COUNT%20Android%20Launch%20Updates',
  available: false,
} as const;

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 814 1000" aria-hidden="true" className={className} fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 466 511.98" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z" />
      <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z" />
      <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z" />
      <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z" />
    </svg>
  );
}

function Badge({
  href,
  ariaLabel,
  eyebrow,
  label,
  glyph,
}: {
  href: string;
  ariaLabel: string;
  eyebrow: string;
  label: string;
  glyph: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className="group inline-flex min-h-[3.25rem] cursor-pointer items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-5 py-3 backdrop-blur-xl transition-colors hover:border-[var(--color-primary)]/40"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center text-[var(--color-text-primary)]">
        {glyph}
      </span>
      <span className="flex flex-col text-left leading-none">
        <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
          {eyebrow}
        </span>
        <span className="mt-1 font-heading text-base font-bold text-[var(--color-text-primary)]">
          {label}
        </span>
      </span>
    </motion.a>
  );
}

export function StoreBadges({ className = '' }: { className?: string }) {
  const eyebrow = STORE_LINKS.available ? 'Download on the' : 'Coming soon to';
  const eyebrowGoogle = STORE_LINKS.available ? 'Get it on' : 'Coming soon to';

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Badge
        href={STORE_LINKS.appStore}
        ariaLabel="COUNT — coming soon to the App Store. Get launch updates."
        eyebrow={eyebrow}
        label="App Store"
        glyph={<AppleGlyph className="h-5 w-5" />}
      />
      <Badge
        href={STORE_LINKS.googlePlay}
        ariaLabel="COUNT — coming soon to Google Play. Get launch updates."
        eyebrow={eyebrowGoogle}
        label="Google Play"
        glyph={<GooglePlayGlyph className="h-5 w-5" />}
      />
    </div>
  );
}
