'use client';

import { useEffect, useEffectEvent, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { StoreBadges } from '@/components/StoreBadges';
import { TrustMarquee } from '@/components/TrustMarquee';
import { Testimonials } from '@/components/Testimonials';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronRight,
  EyeOff,
  Flame,
  Globe,
  Info,
  Lock,
  PieChart,
  Plus,
  ScanFace,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  MotionValue,
  Variants,
} from 'framer-motion';

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const featureCopyMotion: Variants = {
  active: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
  inactive: {
    opacity: 0.38,
    x: 20,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

const featureIconMotion: Variants = {
  active: {
    scale: 1.08,
    rotate: 0,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
  inactive: {
    scale: 0.94,
    rotate: -4,
    y: 6,
    transition: { duration: 0.35, ease: smoothEase },
  },
};

const railMotion: Variants = {
  active: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.45, ease: smoothEase },
  },
  inactive: {
    scaleY: 0.18,
    opacity: 0.28,
    transition: { duration: 0.35, ease: smoothEase },
  },
};

const faqData = [
  {
    question: 'Where is my data actually stored?',
    answer:
      'Locally on your device and securely encrypted on the cloud. We never see your entries, and we cannot access your journal. Period.',
  },
  {
    question: 'Is COUNT really free?',
    answer:
      'The core journaling experience is entirely free. In the future, we may introduce a premium tier for advanced analytics and deeper customization, but your existing history will always remain yours to access.',
  },
  {
    question: 'What happens if I lose my phone?',
    answer:
      'Since your data is encrypted and synced with your secure account, you can simply download COUNT on your new device, log in, pass biometric authentication, and your entire history will securely restore.',
  },
  {
    question: 'Why do I need a Biometric Login as well?',
    answer:
      'Because discretion is our highest priority. The app locks immediately upon closing or switching apps, ensuring that your intimate journal remains exclusively yours, even if you hand your unlocked phone to a friend.',
  },
];

function FAQItem({ faq }: { faq: (typeof faqData)[number] }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div variants={fadeUp} className="border-b border-[var(--color-border)] last:border-none">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between py-6 text-left transition-colors hover:text-[var(--color-primary)]"
      >
        <span className="font-heading pr-8 text-lg font-bold md:text-xl">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: smoothEase }}
          className="shrink-0 text-[var(--color-primary)]"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-body text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const featuresDataList = [
  {
    icon: ShieldCheck,
    title: 'Absolute Privacy & Discretion',
    subtitle: 'Bank-level security for your private memories. No one gets in but you.',
    description:
      'Protected by robust Biometric locking. Activate "Public Mode" with a single tap to instantly blur names, faces, and sensitive stats if someone is looking over your shoulder.',
  },
  {
    icon: Info,
    title: 'The Deep Details',
    subtitle: 'Your experiences, captured in full.',
    description:
      'Record every personal experience in depth. Capture dates, names, how you met, and the details that made each connection unique. Reflect on what each experience meant to you, with nuanced personal ratings.',
  },
  {
    icon: PieChart,
    title: 'Advanced Analytics',
    subtitle: 'Your history, elegantly visualized.',
    description:
      'A beautifully designed dashboard that brings your journal to life with real-time insights. Track your personal momentum, review your timeline, and unlock The SCORE — a proprietary reflection metric based on the depth and quality of your entries.',
  },
  {
    icon: Globe,
    title: 'Discreet Networking',
    subtitle: 'A private, screenshot-protected community of Journalists.',
    description:
      'Opt-in to connect with partners using unique usernames. Share specific entries via Auto-Burn technology. The moment a shared entry is viewed, it is permanently deleted.',
  },
  {
    icon: Lock,
    title: 'Premium UI & Customization',
    subtitle: 'Designed like a high-end fashion app, not a spreadsheet.',
    description:
      'Refined aesthetics that adapt flawlessly to Light and Dark Modes. Sort and navigate your journal by score, rating, newest, or oldest — your personal history, beautifully organized.',
  },
];

function HeroCopy() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      <motion.span
        variants={fadeUp}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)] backdrop-blur-xl"
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Private by design
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="[font-family:var(--font-playfair)] text-[clamp(3.5rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[0.08em] text-[var(--color-text-primary)]"
      >
        COUNT
        <span className="[font-family:var(--font-montserrat)] mt-5 block text-[clamp(1rem,3.4vw,2rem)] font-light tracking-[0.24em] text-[var(--color-primary)] md:mt-6">
          Intimacy Journal
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-7 max-w-xl font-body text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl"
      >
        Your private space to reflect on your dating life. Record personal experiences, recognize your
        patterns, and hold on to every connection that mattered.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-9">
        <StoreBadges className="items-center lg:items-start" />
      </motion.div>

      <motion.div variants={fadeUp} className="mt-7 flex items-center gap-2.5">
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
          ))}
        </div>
        <span className="font-body text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
          <span className="font-semibold text-[var(--color-text-primary)]">4.9</span> · loved by early members
        </span>
      </motion.div>
    </motion.div>
  );
}

function WalkthroughIntro() {
  return (
    <div>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
        Product Walkthrough
      </p>
      <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
        Privacy, detail, and analytics should feel seamless together.
      </h2>
      <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-[var(--color-text-secondary)]">
        COUNT pairs biometric protection, rich journaling, and elegant stats in a flow that stays calm on the
        surface and detailed underneath.
      </p>
    </div>
  );
}

/* ─────────────────────────── Phone screen helpers ─────────────────────────── */

/** Smooth (horizontal-tangent) SVG path through points — used for the trend chart. */
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return '';
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

// Mirrors the real dashboard's "Entry Score Trend" curve.
const trendPoints: [number, number][] = [
  [20, 31],
  [70, 73],
  [120, 73],
  [170, 17],
  [220, 59],
];
const trendLabels = ['12/20', '01/24', '02/16', '02/20', '03/24'];

function TrendChart({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const line = smoothPath(trendPoints);
  const area = `${line} L 220 92 L 20 92 Z`;

  return (
    <svg viewBox="0 0 240 100" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#trendFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.35 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: 'easeInOut' }}
      />
      {trendPoints.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3.2"
          fill="var(--color-bg-default)"
          stroke="var(--color-primary)"
          strokeWidth="2"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.9 + i * 0.08, duration: 0.3 }}
        />
      ))}
    </svg>
  );
}

type PhoneTab = 'dashboard' | 'journal' | 'community' | 'profile';

const phoneTabs: { id: PhoneTab; icon: typeof BarChart3; label: string }[] = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { id: 'journal', icon: BookOpen, label: 'Journal' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'profile', icon: User, label: 'Profile' },
];

function PhoneTabBar({ active }: { active: PhoneTab }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-[var(--color-border)] bg-[var(--color-bg-default)]/92 px-2 pb-6 pt-2.5 backdrop-blur-xl">
      {phoneTabs.map((tab) => {
        const on = tab.id === active;
        return (
          <div key={tab.id} className="flex flex-1 flex-col items-center gap-1">
            <tab.icon
              className={on ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}
              size={18}
              strokeWidth={on ? 2.2 : 1.6}
            />
            <span
              className={`text-[8px] tracking-wide ${
                on ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SettingsToggle({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-[11px] font-medium text-[var(--color-text-primary)]">{label}</span>
      <div
        className={`flex h-[18px] w-8 items-center rounded-full p-0.5 ${
          on ? 'justify-end bg-[var(--color-primary)]' : 'justify-start bg-[#3A3A3C]'
        }`}
      >
        <div className="h-[14px] w-[14px] rounded-full bg-white shadow-sm" />
      </div>
    </div>
  );
}

const journalEntries = [
  { name: 'Emma', tag: '#14', when: '2 days ago', rating: 5, score: '8.4' },
  { name: 'Sofia', tag: '#13', when: '1 week ago', rating: 4, score: '7.1' },
  { name: 'Mia', tag: '#12', when: '2 weeks ago', rating: 4, score: '6.8' },
];

function PhoneMockup({
  activeIndex,
  direction,
  shouldReduceMotion,
  unlock,
}: {
  activeIndex: number;
  direction: number;
  shouldReduceMotion: boolean;
  unlock?: { scanY: MotionValue<number>; scanOpacity: MotionValue<number> } | null;
}) {
  const screenTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 30 };

  const tabForIndex: Record<number, PhoneTab> = {
    1: 'journal',
    2: 'dashboard',
    3: 'community',
    4: 'profile',
  };

  return (
    <div className="relative mx-auto h-[584px] w-[300px]">
      <div className="pointer-events-none absolute -left-[2px] top-28 h-10 w-[4px] rounded-full bg-[#2C2E33] shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" />
      <div className="pointer-events-none absolute -left-[2px] top-44 h-20 w-[4px] rounded-full bg-[#2C2E33] shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" />
      <div className="pointer-events-none absolute -left-[2px] top-[17rem] h-20 w-[4px] rounded-full bg-[#2C2E33] shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" />
      <div className="pointer-events-none absolute -right-[2px] top-40 h-28 w-[4px] rounded-full bg-[#2C2E33] shadow-[inset_-1px_0_1px_rgba(255,255,255,0.08)]" />

      <div className="absolute inset-0 rounded-[3.75rem] bg-[linear-gradient(135deg,#5d6168_0%,#24262b_18%,#111214_52%,#2d3035_82%,#686d73_100%)] p-[2px] shadow-[0_36px_90px_rgba(0,0,0,0.34)]">
        <div className="relative h-full w-full overflow-hidden rounded-[3.65rem] bg-[#0A0B0D]">
          <div className="pointer-events-none absolute inset-0 rounded-[3.65rem] border border-white/10" />
          <div className="pointer-events-none absolute inset-[10px] rounded-[3.15rem] border border-white/[0.05]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_16%,transparent_82%,rgba(255,255,255,0.06))]" />

          <div className="absolute inset-[14px] overflow-hidden rounded-[3rem] bg-[#050607] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%)]" />

            <div className="absolute left-1/2 top-3 z-40 flex h-9 w-36 -translate-x-1/2 items-center justify-center gap-3 rounded-full bg-black/80 ring-1 ring-white/5 shadow-[0_10px_26px_rgba(0,0,0,0.45)]">
              <div className="h-2 w-12 rounded-full bg-white/12" />
              <div className="h-3 w-3 rounded-full bg-white/12 shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
            </div>

            <div className="absolute inset-0 bg-[var(--color-bg-default)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-black/16 to-transparent" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: direction >= 0 ? 22 : -22, scale: 0.97 }
                  }
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: direction >= 0 ? -16 : 16, scale: 1.02 }
                  }
                  transition={screenTransition}
                  className="absolute inset-0 flex h-full flex-col px-5 pt-14 pb-[4.75rem]"
                >
                  {/* 0 — Lock / Biometric */}
                  {activeIndex === 0 && (
                    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                      <div className="h-16 w-16 overflow-hidden rounded-[1.3rem] border border-[var(--color-primary)]/30 shadow-lg">
                        <Image
                          src="/journal-icon.png"
                          alt="COUNT app icon"
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                          priority
                        />
                      </div>
                      <div>
                        <h4 className="font-heading text-3xl font-bold tracking-wide text-[var(--color-text-primary)]">
                          COUNT
                        </h4>
                        <p className="mt-2 font-body text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-secondary)]">
                          Intimacy Journal
                        </p>
                      </div>
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
                        }
                        className="mt-2 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-[var(--color-primary)]/60"
                      >
                        <ScanFace className="h-8 w-8 text-[var(--color-primary)]" strokeWidth={1.5} />
                      </motion.div>
                      <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                        Unlock with Face ID
                      </p>
                    </div>
                  )}

                  {/* 1 — Journal */}
                  {activeIndex === 1 && (
                    <div className="flex h-full w-full flex-col gap-3">
                      <h4 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Journal</h4>
                      <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-2 backdrop-blur-sm">
                        <Search className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" />
                        <span className="font-body text-[10px] text-[var(--color-text-secondary)]">
                          Search by name or #14…
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {['Newest', 'Rating', 'Score'].map((chip, i) => (
                          <span
                            key={chip}
                            className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                              i === 0
                                ? 'bg-[var(--color-primary)] text-[var(--color-bg-default)]'
                                : 'border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'
                            }`}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1 flex flex-col gap-2">
                        {journalEntries.map((entry, i) => (
                          <div
                            key={entry.tag}
                            style={{ opacity: 1 - i * 0.26 }}
                            className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3 backdrop-blur-sm"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-default)] font-heading text-sm font-bold text-[var(--color-text-primary)]">
                              {entry.name[0]}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold text-[var(--color-text-primary)]">
                                {entry.name} <span className="text-[var(--color-text-secondary)]">· {entry.tag}</span>
                              </p>
                              <div className="mt-0.5 flex gap-0.5">
                                {Array.from({ length: entry.rating }).map((_, s) => (
                                  <Star
                                    key={s}
                                    className="h-2.5 w-2.5 fill-[var(--color-primary)] text-[var(--color-primary)]"
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-default)] px-2 py-1 font-heading text-xs font-bold tabular-nums text-[var(--color-text-primary)]">
                              {entry.score}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-[5.25rem] right-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-lg">
                        <Plus className="h-5 w-5 text-[var(--color-bg-default)]" />
                      </div>
                    </div>
                  )}

                  {/* 2 — Dashboard (mirrors the real app) */}
                  {activeIndex === 2 && (
                    <div className="flex h-full w-full flex-col gap-3">
                      <h4 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Hi Nevo</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Entry Score', value: '5.9', tone: 'text-[var(--color-text-primary)]' },
                          { label: 'Activity Streak', value: '0', tone: 'text-[var(--color-text-secondary)]' },
                          { label: 'Days Since Last', value: '3', tone: 'text-[#F1C40F]' },
                          { label: 'Total Entries', value: '✦✦✦', tone: 'text-[#2ECC71]' },
                        ].map((stat, i) => (
                          <motion.div
                            key={stat.label}
                            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={
                              shouldReduceMotion ? { duration: 0 } : { delay: 0.1 + i * 0.07, duration: 0.4 }
                            }
                            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-3 backdrop-blur-sm"
                          >
                            <p className={`font-heading text-2xl font-bold tabular-nums ${stat.tone}`}>{stat.value}</p>
                            <p className="mt-1 font-body text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                              {stat.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex flex-1 flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3 backdrop-blur-sm">
                        <p className="font-heading text-xs font-bold text-[var(--color-text-primary)]">
                          Entry Score Trend
                        </p>
                        <div className="mt-2 flex-1">
                          <TrendChart shouldReduceMotion={shouldReduceMotion} />
                        </div>
                        <div className="mt-1 flex justify-between px-1">
                          {trendLabels.map((label) => (
                            <span key={label} className="text-[7px] text-[var(--color-text-secondary)]">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3 — Community (screenshot-protected sharing) */}
                  {activeIndex === 3 && (
                    <div className="flex h-full w-full flex-col gap-3">
                      <h4 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Community</h4>
                      <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3 backdrop-blur-sm">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold text-[var(--color-text-primary)]">@private_user</p>
                          <p className="text-[9px] text-[var(--color-text-secondary)]">3 trusted connections</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-[var(--color-text-secondary)]" />
                      </div>

                      <div className="relative flex-1 overflow-hidden rounded-2xl border border-[var(--color-primary)]/40 bg-[var(--color-bg-surface)] backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-default)] py-2.5">
                          <EyeOff className="h-3.5 w-3.5 animate-pulse text-[#E74C3C]" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#E74C3C]">
                            Screenshot Blocked
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-3 p-5">
                          <div className="h-14 w-14 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-bg-surface)] blur-[2px]" />
                          <div className="h-3 w-3/4 rounded bg-[var(--color-text-secondary)]/25 blur-[1px]" />
                          <div className="h-2.5 w-1/2 rounded bg-[var(--color-text-secondary)]/25 blur-[1px]" />
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#E74C3C]/30 bg-[#E74C3C]/10 px-3 py-1.5">
                            <Flame className="h-3 w-3 text-[#E74C3C]" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#E74C3C]">
                              Auto-Burn
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4 — Profile / Settings (mirrors the real app) */}
                  {activeIndex === 4 && (
                    <div className="flex h-full w-full flex-col gap-3">
                      <h4 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Profile</h4>
                      <div>
                        <p className="mb-1.5 font-body text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                          Security
                        </p>
                        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-1 backdrop-blur-sm">
                          <SettingsToggle label="Biometric Login" on />
                          <div className="h-px bg-[var(--color-border)]" />
                          <SettingsToggle label="Public Mode (Blur Names)" on />
                          <div className="h-px bg-[var(--color-border)]" />
                          <SettingsToggle label="Hide Count on Dashboard" on />
                          <div className="h-px bg-[var(--color-border)]" />
                          <SettingsToggle label="Hide Count in Journal" on={false} />
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 font-body text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                          Account
                        </p>
                        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 backdrop-blur-sm">
                          <div className="flex items-center justify-between py-2.5">
                            <span className="text-[11px] font-medium text-[var(--color-text-primary)]">Log Out</span>
                            <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" />
                          </div>
                          <div className="h-px bg-[var(--color-border)]" />
                          <div className="flex items-center justify-between py-2.5">
                            <span className="text-[11px] font-medium text-[#E74C3C]">Delete Account</span>
                            <ChevronRight className="h-3.5 w-3.5 text-[#E74C3C]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Scroll-linked Face ID scan sweep — "unlocks" the app entering the walkthrough */}
              {activeIndex === 0 && unlock && (
                <motion.div
                  aria-hidden="true"
                  style={{ y: unlock.scanY, opacity: unlock.scanOpacity }}
                  className="pointer-events-none absolute inset-x-3 top-0 z-30 h-px bg-[var(--color-primary)] shadow-[0_0_16px_3px_var(--color-primary)]"
                >
                  <div className="absolute inset-x-0 -top-16 h-32 bg-[linear-gradient(to_bottom,transparent,var(--hero-glow),transparent)]" />
                </motion.div>
              )}

              {activeIndex !== 0 && <PhoneTabBar active={tabForIndex[activeIndex]} />}

              <div className="absolute bottom-2 left-1/2 z-40 h-1.5 w-28 -translate-x-1/2 rounded-full bg-[var(--color-text-secondary)]/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Desktop feature copy block in the pinned-phone walkthrough. */
function FeatureBlock({
  feature,
  index,
  isActive,
  registerRef,
}: {
  feature: (typeof featuresDataList)[number];
  index: number;
  isActive: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={registerRef} className="relative flex min-h-[64vh] w-full max-w-xl items-center py-16 pl-10">
      <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-[var(--color-border)]">
        <motion.div
          animate={isActive ? 'active' : 'inactive'}
          variants={railMotion}
          className="absolute inset-0 origin-top bg-[var(--color-primary)]"
        />
      </div>

      <div className="flex flex-col gap-6">
        <motion.div
          animate={isActive ? 'active' : 'inactive'}
          variants={featureIconMotion}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-primary)] shadow-lg"
        >
          <feature.icon size={32} strokeWidth={1.5} />
        </motion.div>

        <motion.div animate={isActive ? 'active' : 'inactive'} variants={featureCopyMotion}>
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
            0{index + 1}
          </span>
          <h3 className="[font-family:var(--font-playfair)] mt-4 text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
            {feature.title}
          </h3>
          <p className="mb-6 mt-4 font-body text-sm font-bold uppercase leading-relaxed tracking-widest text-[var(--color-primary)]">
            {feature.subtitle}
          </p>
          <p className="font-body text-xl leading-relaxed text-[var(--color-text-secondary)]">
            {feature.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const scoreBars = [38, 52, 44, 66, 58, 78, 70, 88, 74, 92];

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [direction, setDirection] = useState(1);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeFeatureRef = useRef(0);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroSectionRef, { amount: 0.1 });

  // Drives the single pinned phone: subtle settle (scale + slight 3D turn) as the
  // hero gives way to the walkthrough, so it reads as one continuous device.
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ['start start', 'end end'],
  });
  const phoneScale = useTransform(scrollYProgress, [0, 0.12], [1.02, 0.95]);
  const scanY = useTransform(scrollYProgress, [0, 0.1], [30, 540]);
  const scanOpacity = useTransform(scrollYProgress, [0, 0.02, 0.085, 0.12], [0, 1, 1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.12], [0.18, 0.45]);

  const updateActiveFeature = useEffectEvent(() => {
    if (featureRefs.current.length === 0) return;

    const triggerLine = window.innerHeight * 0.46;
    let nextActiveIndex = activeFeatureRef.current;
    let minDistance = Number.POSITIVE_INFINITY;

    featureRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();
      // Skip elements with no layout (e.g. the desktop column on mobile breakpoints).
      if (rect.height === 0) return;

      const elementMiddle = rect.top + rect.height / 2;
      const distance = Math.abs(elementMiddle - triggerLine);

      if (distance < minDistance) {
        minDistance = distance;
        nextActiveIndex = index;
      }
    });

    const currentIndex = activeFeatureRef.current;

    if (nextActiveIndex !== currentIndex) {
      activeFeatureRef.current = nextActiveIndex;
      setDirection(nextActiveIndex > currentIndex ? 1 : -1);
      setActiveFeature(nextActiveIndex);
    }
  });

  useEffect(() => {
    let frameId = 0;

    const scheduleUpdate = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateActiveFeature();
      });
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen overflow-x-clip pt-[4.5rem] md:pt-20">
        {/* ───────── Hero + Walkthrough — one continuous pinned phone ───────── */}
        <section id="showcase" ref={heroSectionRef} className="relative scroll-mt-28">
          {/* Ambient glow, confined to the first viewport */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100svh-4.5rem)] overflow-hidden md:h-[calc(100svh-5rem)]">
            <motion.div
              animate={
                shouldReduceMotion || !heroInView
                  ? undefined
                  : { y: [0, -20, 0], x: [0, 18, 0], opacity: [0.45, 0.7, 0.45] }
              }
              transition={
                shouldReduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
              }
              className="absolute left-[8%] top-[14%] h-[26rem] w-[26rem] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--hero-glow) 0%, transparent 72%)' }}
            />
            <motion.div
              animate={
                shouldReduceMotion || !heroInView
                  ? undefined
                  : { y: [0, 18, 0], x: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
              }
              className="absolute right-[10%] top-[30%] h-[22rem] w-[22rem] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--hero-glow-soft) 0%, transparent 72%)' }}
            />
            <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
              <ChevronDown className="h-5 w-5 animate-bounce text-[var(--color-primary)]" aria-hidden="true" />
            </div>
          </div>

          {/* ── Mobile: stacked hero, then walkthrough cards ── */}
          <div className="relative z-10 lg:hidden">
            <div className="flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center gap-12 px-6 py-16">
              <HeroCopy />
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.9, ease: smoothEase, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute bottom-4 left-1/2 -z-10 h-10 w-56 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />
                <PhoneMockup activeIndex={0} direction={1} shouldReduceMotion={shouldReduceMotion} />
              </motion.div>
            </div>

            <div className="px-6 pb-8 pt-12">
              <WalkthroughIntro />
            </div>

            <div className="flex flex-col gap-8 px-6 pb-16">
              {featuresDataList.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: smoothEase }}
                  className="flex flex-col gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-default)] text-[var(--color-primary)] shadow-md">
                    <feature.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-body text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                      0{idx + 1}
                    </span>
                    <h3 className="[font-family:var(--font-playfair)] mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="mb-3 mt-2 font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                      {feature.subtitle}
                    </p>
                    <p className="font-body text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Desktop: one pinned phone that persists hero → walkthrough ── */}
          <div ref={journeyRef} className="relative z-10 mx-auto hidden w-full max-w-7xl px-12 lg:block">
            <div className="grid grid-cols-[1.05fr_0.95fr] gap-16">
              {/* Scrolling content column */}
              <div className="flex flex-col">
                <div className="flex min-h-[calc(100svh-5rem)] items-center">
                  <HeroCopy />
                </div>

                <div className="flex min-h-[48vh] items-center">
                  <WalkthroughIntro />
                </div>

                {featuresDataList.map((feature, idx) => (
                  <FeatureBlock
                    key={idx}
                    feature={feature}
                    index={idx}
                    isActive={activeFeature === idx}
                    registerRef={(el) => {
                      featureRefs.current[idx] = el;
                    }}
                  />
                ))}

                <div className="pb-[30vh]" />
              </div>

              {/* Pinned phone column */}
              <div className="relative">
                <motion.div
                  style={shouldReduceMotion ? undefined : { scale: phoneScale }}
                  className="sticky top-20 flex h-[calc(100svh-5rem)] items-center justify-center"
                >
                  <div className="relative">
                    <motion.div
                      style={shouldReduceMotion ? undefined : { opacity: glowOpacity }}
                      className="absolute bottom-2 left-1/2 -z-10 h-12 w-64 -translate-x-1/2 rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl"
                    />
                    <PhoneMockup
                      activeIndex={activeFeature}
                      direction={direction}
                      shouldReduceMotion={shouldReduceMotion}
                      unlock={shouldReduceMotion ? null : { scanY, scanOpacity }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── Trust marquee ───────────────────────── */}
        <TrustMarquee />

        {/* ───────────────────────── The SCORE spotlight ───────────────────────── */}
        <section id="score" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/[0.04] to-transparent" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2"
          >
            <div className="flex flex-col">
              <motion.span
                variants={fadeUp}
                className="mb-5 inline-flex w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)] backdrop-blur-xl"
              >
                The SCORE
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl"
              >
                One number for the depth of your story.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-lg font-body text-lg leading-relaxed text-[var(--color-text-secondary)]"
              >
                The SCORE is a proprietary reflection metric — built not on how much you log, but on the depth and
                quality of what you choose to remember. It grows as your journaling does, entirely for your eyes.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 grid grid-cols-2 gap-4 sm:max-w-md">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 backdrop-blur-sm">
                  <p className="font-heading text-3xl font-bold tabular-nums text-[var(--color-text-primary)]">24</p>
                  <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                    Entries this year
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 backdrop-blur-sm">
                  <p className="font-heading text-3xl font-bold tabular-nums text-[var(--color-text-primary)]">4.2</p>
                  <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                    Average rating
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              variants={fadeUp}
              className="relative flex flex-col gap-8 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8 backdrop-blur-md md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                  Your SCORE
                </span>
                <span className="font-body text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  All time
                </span>
              </div>

              <div className="flex items-end gap-4">
                <span className="font-heading text-7xl font-bold leading-none tabular-nums text-[var(--color-text-primary)] md:text-8xl">
                  87
                </span>
                <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  <Activity className="h-3.5 w-3.5" aria-hidden="true" /> Rising
                </span>
              </div>

              <div
                className="flex h-32 items-end gap-2"
                role="img"
                aria-label="Illustrative SCORE momentum, trending upward over recent entries"
              >
                {scoreBars.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={shouldReduceMotion ? { opacity: 1 } : { scaleY: 0, opacity: 0 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: i * 0.04, ease: smoothEase }
                    }
                    style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                    className="flex-1 rounded-full bg-gradient-to-t from-[var(--color-primary)]/40 to-[var(--color-primary)]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ───────────────────────── Privacy manifesto ───────────────────────── */}
        <section id="privacy" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
          >
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.span
                variants={fadeUp}
                className="mb-5 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)] backdrop-blur-xl"
              >
                Privacy First
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl"
              >
                Your journal is yours alone.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-md font-body text-lg leading-relaxed text-[var(--color-text-secondary)]"
              >
                Everything you write stays between you and your journal. No exceptions, no compromises, no one
                looking over your shoulder.
              </motion.p>
            </div>

            <motion.div variants={staggerContainer} className="flex flex-col">
              {[
                {
                  icon: Lock,
                  title: 'Stored in your account only',
                  body: 'Your entries are encrypted and belong exclusively to your private account. We have no access to your content.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Never shared without you',
                  body: 'Your data is never sold or disclosed. Community sharing is always opt-in, explicitly initiated by you.',
                },
                {
                  icon: EyeOff,
                  title: 'Biometric protection',
                  body: 'The app locks the moment you leave it. Only your biometrics can reopen your journal.',
                },
                {
                  icon: Activity,
                  title: 'Public Mode ready',
                  body: 'One tap blurs all sensitive content if someone glances at your screen. Your privacy, on demand.',
                },
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group flex items-start gap-6 border-b border-[var(--color-border)] py-8 first:pt-0 last:border-none"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-primary)] shadow-md backdrop-blur-sm transition-transform group-hover:-translate-y-1">
                    <pillar.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] md:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 font-body text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ───────────────────────── Social proof ───────────────────────── */}
        <Testimonials />

        {/* ───────────────────────── FAQ ───────────────────────── */}
        <section id="faq" className="mx-auto max-w-4xl scroll-mt-28 px-6 py-24 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex flex-col gap-12"
          >
            <div className="text-center">
              <motion.h2 variants={fadeUp} className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                No Secrets.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-lg font-body text-lg text-[var(--color-text-secondary)]"
              >
                Just answers to how we protect yours.
              </motion.p>
            </div>

            <div
              id="faq-list"
              className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-xl backdrop-blur-xl md:p-10"
            >
              {faqData.map((faq) => (
                <FAQItem key={faq.question} faq={faq} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ───────────────────────── Final CTA / Download ───────────────────────── */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-surface)] via-transparent to-transparent" />
          <motion.div
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            >
              Your experiences are worth remembering.
              <br />
              <span className="text-[var(--color-primary)]">Every detail, privately yours.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl font-body text-xl leading-relaxed text-[var(--color-text-secondary)] md:text-2xl"
            >
              A private journal designed for your dating life. Honest, personal, and entirely yours.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 pt-4">
              <StoreBadges className="items-center" />
              <a
                href="mailto:support@countintimacyjournal.com?subject=COUNT%20Launch%20Updates"
                className="inline-flex cursor-pointer items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
              >
                Or get launch updates by email
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-default)] px-6 py-12 md:px-12">
        <motion.div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8 font-body text-sm text-[var(--color-text-secondary)]"
          >
            <a href="/privacy-policy" className="transition-colors hover:text-[var(--color-primary)]">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="transition-colors hover:text-[var(--color-primary)]">
              Terms of Service
            </a>
            <a
              href="mailto:support@countintimacyjournal.com"
              className="transition-colors hover:text-[var(--color-primary)]"
            >
              Support
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="font-subheading text-sm text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} COUNT. All rights reserved.
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
}
