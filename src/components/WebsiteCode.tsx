'use client';

import { useSyncExternalStore } from 'react';

declare global {
  interface Window {
    countFirstTouch?: { websiteCode: () => string | null };
  }
}

const subscribe = () => () => {};
const readCode = () => window.countFirstTouch?.websiteCode() ?? null;
const serverCode = () => null;

export function WebsiteCode() {
  const code = useSyncExternalStore(subscribe, readCode, serverCode);
  if (!code) return null;
  return (
    <div className="mt-5 rounded-xl border border-[var(--color-border)] p-4 font-body text-sm">
      <p>Your website code: <strong className="select-all tracking-widest">{code}</strong></p>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        After installing, enter this optional code on the signup screen.
      </p>
    </div>
  );
}
