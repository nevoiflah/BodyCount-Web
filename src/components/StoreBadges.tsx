'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { WebsiteCode } from './WebsiteCode';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail, X } from 'lucide-react';

/**
 * Single source of truth for the store badges. Each platform tracks its own
 * availability: when `available` is true the badge opens a download dialog that
 * links to the live store listing (and, for the App Store, shows a QR to scan
 * from a computer); otherwise it opens a "coming soon" dialog that routes to the
 * launch-updates email capture. Flip `available` and swap `href` per platform as
 * each launches.
 *
 * The App Store CTA uses the locked Exp1 listing. The existing QR resolves
 * to the same app using its country-neutral listing URL.
 */
export const STORE_LINKS = {
  appStore: {
    href: 'https://apps.apple.com/us/app/count-personal-journal/id6759260989',
    available: true,
  },
  googlePlay: {
    href: 'mailto:support@countintimacyjournal.com?subject=COUNT%20Android%20Launch%20Updates',
    available: false,
  },
} as const;

/** Existing QR encodes https://apps.apple.com/app/id6759260989 (the same app). */
const APP_STORE_QR = '/appstore-qr.svg';

type StoreKey = keyof typeof STORE_LINKS;

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
  external,
  ariaLabel,
  eyebrow,
  label,
  glyph,
  onOpen,
}: {
  href: string;
  external: boolean;
  ariaLabel: string;
  eyebrow: string;
  label: string;
  glyph: React.ReactNode;
  onOpen: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      // Left-click opens the dialog; middle/right-click still use the href as a fallback.
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        onOpen();
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className="group inline-flex min-h-[3.25rem] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-5 py-3 backdrop-blur-xl transition-colors hover:border-[var(--color-primary)]/40 sm:w-auto sm:justify-start"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--color-text-primary)]">
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

function StoreDialog({ store, onClose }: { store: StoreKey; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isAppStore = store === 'appStore';

  // Lock scroll, restore focus to the trigger, close on Escape.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      trigger?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-default)] p-7 text-center shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]">
          {isAppStore ? <AppleGlyph className="h-5 w-5" /> : <GooglePlayGlyph className="h-5 w-5" />}
        </span>

        {isAppStore ? (
          <>
            <h3 id={titleId} className="mt-5 font-heading text-2xl font-bold text-[var(--color-text-primary)]">
              Download COUNT
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Free on iPhone, iPad, Mac &amp; Apple Vision.
            </p>

            <WebsiteCode />

            <a
              href={STORE_LINKS.appStore.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-5 py-3.5 font-heading text-base font-bold text-[var(--color-bg-default)] transition-opacity hover:opacity-90"
            >
              Open in the App Store
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[var(--color-border)]" />
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                On a computer?
              </span>
              <span className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            <div className="mx-auto w-fit rounded-2xl bg-white p-3 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element -- static, theme-independent QR */}
              <img src={APP_STORE_QR} alt="QR code linking to COUNT on the App Store" className="h-36 w-36" />
            </div>
            <p className="mt-3 font-body text-xs leading-relaxed text-[var(--color-text-secondary)]">
              Scan with your iPhone camera to download.
            </p>
          </>
        ) : (
          <>
            <h3 id={titleId} className="mt-5 font-heading text-2xl font-bold text-[var(--color-text-primary)]">
              Coming soon to Google Play
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
              COUNT is landing on Android soon. Leave your email and we&apos;ll tell you the moment it&apos;s live.
            </p>

            <a
              href={STORE_LINKS.googlePlay.href}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-5 py-3.5 font-heading text-base font-bold text-[var(--color-bg-default)] transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Get launch updates
            </a>
            <p className="mt-3 font-body text-xs leading-relaxed text-[var(--color-text-secondary)]">
              Already on iPhone, iPad &amp; Mac via the App Store.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export function StoreBadges({ className = '' }: { className?: string }) {
  const { appStore, googlePlay } = STORE_LINKS;
  const [openStore, setOpenStore] = useState<StoreKey | null>(null);

  return (
    <>
      <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row ${className}`}>
        <Badge
          href={appStore.href}
          external={appStore.available}
          ariaLabel={
            appStore.available
              ? 'Download COUNT on the App Store'
              : 'COUNT — coming soon to the App Store. Get launch updates.'
          }
          eyebrow={appStore.available ? 'Download on the' : 'Coming soon to'}
          label="App Store"
          glyph={<AppleGlyph className="h-7 w-7" />}
          onOpen={() => setOpenStore('appStore')}
        />
        <Badge
          href={googlePlay.href}
          external={googlePlay.available}
          ariaLabel={
            googlePlay.available
              ? 'Get COUNT on Google Play'
              : 'COUNT — coming soon to Google Play. Get launch updates.'
          }
          eyebrow={googlePlay.available ? 'Get it on' : 'Coming soon to'}
          label="Google Play"
          glyph={<GooglePlayGlyph className="h-7 w-7" />}
          onOpen={() => setOpenStore('googlePlay')}
        />
      </div>

      <AnimatePresence>
        {openStore && <StoreDialog store={openStore} onClose={() => setOpenStore(null)} />}
      </AnimatePresence>
    </>
  );
}
