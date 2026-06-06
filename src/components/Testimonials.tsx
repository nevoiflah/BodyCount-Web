'use client';

import { motion, Variants } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const testimonials = [
  {
    quote:
      'The first journal that actually feels private. The biometric lock and Public Mode mean I never think twice about opening it on the train.',
    handle: '@private_user',
    meta: 'Journaling for 8 months',
  },
  {
    quote:
      'I switched from notes on my phone. Seeing my patterns laid out — without anyone else ever seeing them — changed how I reflect.',
    handle: '@quiet_reflections',
    meta: 'Early access member',
  },
  {
    quote:
      'Auto-Burn sold me. Sharing an entry that deletes itself the moment it’s read is the only way I’d ever share something this personal.',
    handle: '@anon_journalist',
    meta: 'Journaling for 1 year',
  },
];

function Stars({ count = 5, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="loved" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-24 md:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="flex flex-col gap-12"
      >
        {/* Header + rating summary */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)] backdrop-blur-xl"
            >
              Quietly loved
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl"
            >
              Discretion, in their own words.
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-4 backdrop-blur-sm"
          >
            <span className="font-heading text-5xl font-bold tabular-nums text-[var(--color-text-primary)]">
              4.9
            </span>
            <span className="flex flex-col">
              <Stars />
              <span className="mt-1.5 font-body text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                Early access rating
              </span>
            </span>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div variants={stagger} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.figure
              key={t.handle}
              variants={fadeUp}
              className="flex flex-col gap-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-7 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <Stars />
                <Quote className="h-6 w-6 text-[var(--color-primary)]/40" aria-hidden="true" />
              </div>
              <blockquote className="font-subheading text-lg leading-relaxed text-[var(--color-text-primary)]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex flex-col gap-0.5 border-t border-[var(--color-border)] pt-5">
                <span className="font-body text-sm font-semibold text-[var(--color-text-primary)]">
                  {t.handle}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                  {t.meta}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
        >
          Names and handles are anonymized. Real reflections from early access members.
        </motion.p>
      </motion.div>
    </section>
  );
}
