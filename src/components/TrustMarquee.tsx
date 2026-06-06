'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Fingerprint,
  ImageOff,
  Eye,
  Flame,
  Lock,
  HardDriveDownload,
  type LucideIcon,
} from 'lucide-react';

const guarantees: { icon: LucideIcon; label: string }[] = [
  { icon: Lock, label: 'End-to-end encrypted' },
  { icon: Fingerprint, label: 'Biometric lock' },
  { icon: ImageOff, label: 'Screenshot-protected' },
  { icon: Eye, label: 'Public Mode' },
  { icon: Flame, label: 'Auto-Burn sharing' },
  { icon: HardDriveDownload, label: 'Local-first storage' },
];

function Pill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 px-7">
      <Icon className="h-4 w-4 text-[var(--color-primary)]" strokeWidth={1.75} aria-hidden="true" />
      <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
        {label}
      </span>
      <span className="ml-7 h-1 w-1 rounded-full bg-[var(--color-primary)]/40" aria-hidden="true" />
    </span>
  );
}

export function TrustMarquee() {
  const shouldReduceMotion = useReducedMotion();
  // Two identical tracks animate -50% to create a seamless loop.
  const track = [...guarantees, ...guarantees];

  return (
    <section
      aria-label="Privacy guarantees"
      className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-surface)] py-5 backdrop-blur-sm"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg-default)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg-default)] to-transparent" />

      {shouldReduceMotion ? (
        <div className="flex flex-wrap items-center justify-center gap-y-3 px-6">
          {guarantees.map((g) => (
            <Pill key={g.label} icon={g.icon} label={g.label} />
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {track.map((g, i) => (
            <Pill key={`${g.label}-${i}`} icon={g.icon} label={g.label} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
