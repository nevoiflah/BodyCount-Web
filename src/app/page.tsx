'use client';

import { useEffect, useEffectEvent, useId, useRef, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import {
  Activity,
  ArrowRight,
  BarChart2,
  ChevronDown,
  EyeOff,
  Globe,
  Info,
  Lock,
  PieChart,
  Settings2,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion';

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
      staggerChildren: 0.15,
    },
  },
};

const featureCopyMotion: Variants = {
  active: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: smoothEase },
  },
  inactive: {
    opacity: 0.38,
    x: 20,
    filter: 'blur(4px)',
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
      'Locally on your device and securely encrypted on the cloud. We never see your entries, and we cannot access your blackbook. Period.',
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
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-[var(--color-primary)]"
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
    subtitle: "Don't just remember who, remember everything.",
    description:
      'Log every encounter with precision. Track dates, names, durations, and origin stories. Rate physical attributes and nuanced performance dynamics.',
  },
  {
    icon: PieChart,
    title: 'Advanced Analytics',
    subtitle: 'Your history, elegantly visualized.',
    description:
      'A beautifully designed Dashboard calculating stats in real-time. View your momentum, days since last encounter, and total count. Unlock "The SCORE" - a proprietary algorithm calculating a custom score based on the quality of your entries.',
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
      'Refined aesthetics that adapt flawlessly to Light and Dark Modes. Utilize custom sorting modules to navigate your blackbook by score, rating, newest, or oldest entry.',
  },
];

function PhoneMockup({
  activeIndex,
  direction,
  shouldReduceMotion,
}: {
  activeIndex: number;
  direction: number;
  shouldReduceMotion: boolean;
}) {
  const screenTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: smoothEase };

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
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%)]" />

            <div className="absolute left-1/2 top-3 z-30 flex h-9 w-36 -translate-x-1/2 items-center justify-center gap-3 rounded-full bg-black/80 ring-1 ring-white/5 shadow-[0_10px_26px_rgba(0,0,0,0.45)]">
              <div className="h-2 w-12 rounded-full bg-white/12" />
              <div className="h-3 w-3 rounded-full bg-white/12 shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
            </div>

            <div className="absolute inset-0 bg-[var(--color-bg-default)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/16 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/10 to-transparent" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: direction >= 0 ? 24 : -24,
                          scale: 0.96,
                          filter: 'blur(14px)',
                        }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: 'blur(0px)',
                        }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: direction >= 0 ? -18 : 18,
                          scale: 1.02,
                          filter: 'blur(10px)',
                        }
                  }
                  transition={screenTransition}
                  className="absolute inset-0 flex h-full flex-col px-5 pb-8 pt-16"
                >
                  {activeIndex === 0 && (
                    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                      <ShieldCheck className="h-16 w-16 text-[var(--color-primary)]" />
                      <h4 className="font-heading text-xl font-bold text-[var(--color-text-primary)]">LOCKED</h4>
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { scale: [1, 1.04, 1], opacity: [0.75, 1, 0.75] }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                        }
                        className="mt-3 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-primary)]"
                      >
                        <span className="font-body text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">
                          Biometric
                        </span>
                      </motion.div>
                    </div>
                  )}
                  {activeIndex === 1 && (
                    <div className="flex h-full w-full flex-col gap-3 pt-2">
                      <div className="mb-1 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">
                            Entry
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                            Saturday night
                          </p>
                        </div>
                        <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                          Detailed
                        </div>
                      </div>
                      <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 backdrop-blur-sm">
                        <div className="mb-4 h-4 w-1/2 rounded bg-[var(--color-text-secondary)]/20" />
                        <div className="mb-3 flex gap-1">
                          <Star className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                          <Star className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                          <Star className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                        </div>
                        <div className="mb-2 h-2 w-full rounded bg-[var(--color-text-secondary)]/20" />
                        <div className="h-2 w-3/4 rounded bg-[var(--color-text-secondary)]/20" />
                      </div>
                      <div className="h-24 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 opacity-60 backdrop-blur-sm" />
                      <div className="h-24 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 opacity-30 backdrop-blur-sm" />
                    </div>
                  )}
                  {activeIndex === 2 && (
                    <div className="flex h-full w-full flex-col justify-between pt-1">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 backdrop-blur-sm">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                              Dashboard
                            </p>
                            <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                              This month
                            </p>
                          </div>
                          <div className="rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                            Live
                          </div>
                        </div>

                        <motion.div
                          animate={shouldReduceMotion ? { opacity: 1 } : { scale: [1, 1.03, 1] }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                          }
                          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-[var(--color-primary)] shadow-[0_0_30px_var(--hero-glow)]"
                        >
                          <div className="flex h-[5.65rem] w-[5.65rem] items-center justify-center rounded-full bg-[var(--color-bg-default)] shadow-[inset_0_0_0_1px_var(--color-border)]">
                            <span className="font-heading text-5xl font-bold text-[var(--color-text-primary)]">24</span>
                          </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col items-center justify-center rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-5 backdrop-blur-sm">
                            <Activity className="mb-2 h-5 w-5 text-[var(--color-primary)]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                              Streak
                            </span>
                            <span className="mt-2 text-sm font-bold text-[var(--color-text-primary)]">14 Days</span>
                          </div>
                          <div className="flex flex-col items-center justify-center rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-5 backdrop-blur-sm">
                            <BarChart2 className="mb-2 h-5 w-5 text-[var(--color-primary)]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                              Score
                            </span>
                            <span className="mt-2 text-sm font-bold text-[var(--color-text-primary)]">7.6</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 backdrop-blur-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                            Momentum
                          </span>
                          <span className="text-xs font-semibold text-[var(--color-text-primary)]">+18%</span>
                        </div>
                        <div className="flex h-14 items-end gap-1.5">
                          {[28, 45, 34, 58, 46, 74, 60, 82].map((height, index) => (
                            <div
                              key={index}
                              className="flex-1 rounded-full bg-[var(--color-primary)]/75"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeIndex === 3 && (
                    <div className="relative flex h-full w-full flex-col pt-2">
                      <div className="mb-6 flex items-center justify-between px-2 opacity-30">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]" />
                          <div className="h-3 w-20 rounded bg-[var(--color-bg-surface)]" />
                        </div>
                      </div>

                      <div className="absolute top-1/2 left-1/2 z-10 flex w-[88%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-[var(--color-primary)]/50 bg-[var(--color-bg-surface)] shadow-2xl backdrop-blur-xl">
                        <div className="flex items-center justify-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-default)] py-3">
                          <EyeOff className="h-4 w-4 animate-pulse text-[#FF3B30]" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF3B30]">
                            Screenshot Blocked
                          </span>
                        </div>

                        <div className="flex flex-col items-center gap-4 p-6">
                          <div className="h-20 w-20 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-bg-surface)] blur-[2px]" />
                          <div className="h-4 w-3/4 rounded bg-[var(--color-text-secondary)]/20 blur-[1px]" />
                          <div className="h-3 w-1/2 rounded bg-[var(--color-text-secondary)]/20 blur-[1px]" />

                          <div className="mt-4 flex items-center justify-center rounded-full border border-[#FF3B30]/30 bg-[#FF3B30]/10 px-4 py-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF3B30]">
                              Auto-Burn
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 z-0 rounded-[2rem] bg-black/40" />
                    </div>
                  )}
                  {activeIndex === 4 && (
                    <div className="flex h-full w-full flex-col gap-4 pt-2">
                      <div className="mb-2 flex items-center justify-between px-2">
                        <h4 className="font-heading text-lg font-bold text-[var(--color-text-primary)]">Settings</h4>
                        <Settings2 className="h-5 w-5 text-[var(--color-text-secondary)]" />
                      </div>
                      <div className="flex h-14 w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 backdrop-blur-sm">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">Theme</span>
                        <div className="flex h-5 w-9 items-center justify-end rounded-full bg-[var(--color-primary)] p-0.5">
                          <div className="h-4 w-4 rounded-full bg-[var(--color-bg-default)] shadow-sm" />
                        </div>
                      </div>
                      <div className="flex h-14 w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 backdrop-blur-sm">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">Public Mode</span>
                        <div className="flex h-5 w-9 items-center justify-start rounded-full bg-[#38383A] p-0.5">
                          <div className="h-4 w-4 rounded-full bg-[var(--color-text-secondary)] shadow-sm" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-3 left-1/2 z-30 h-1.5 w-28 -translate-x-1/2 rounded-full bg-black/35" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ctaButtonClassName =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold tracking-[0.18em] uppercase transition-all';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [direction, setDirection] = useState(1);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeFeatureRef = useRef(0);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const scrollToSection = (sectionId: string, offset: number, hash = sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    const top = window.scrollY + section.getBoundingClientRect().top - offset;

    window.scrollTo({
      top,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });

    window.history.replaceState(null, '', `#${hash}`);
  };

  const updateActiveFeature = useEffectEvent(() => {
    if (featureRefs.current.length === 0) return;

    const triggerLine = window.innerHeight * 0.46;
    let nextActiveIndex = activeFeatureRef.current;
    let minDistance = Number.POSITIVE_INFINITY;

    featureRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();
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
      <main className="min-h-screen overflow-x-clip pt-[4.5rem] md:pt-20">
        <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center overflow-hidden px-6 py-14 text-center md:min-h-[calc(100svh-5rem)] md:py-16 lg:py-20">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -20, 0], x: [0, 18, 0], opacity: [0.45, 0.7, 0.45] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
              }
              className="absolute left-[18%] top-[18%] h-[24rem] w-[24rem] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--hero-glow) 0%, transparent 72%)' }}
            />
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, 18, 0], x: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
              }
              className="absolute right-[14%] top-[26%] h-[18rem] w-[18rem] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--hero-glow-soft) 0%, transparent 72%)' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-[var(--color-primary)]/6 to-transparent" />
          </div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 max-w-5xl">
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-primary)] backdrop-blur-xl md:mb-6"
            >
              Private by design
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="[font-family:var(--font-playfair)] text-[clamp(4.75rem,15vw,8.75rem)] font-bold leading-[0.9] tracking-[0.12em] text-[var(--color-text-primary)] md:tracking-[0.15em]"
            >
              COUNT
              <span className="[font-family:var(--font-montserrat)] mt-6 block text-[clamp(1.1rem,4.5vw,3rem)] font-light tracking-[0.22em] text-[var(--color-primary)] md:mt-7 md:tracking-[0.28em]">
                Intimacy Journal
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-[var(--color-text-secondary)] md:mt-8 md:text-xl"
            >
              A discreet intimacy journal for adults who want privacy, precision, and a cleaner way to remember everything that matters.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-4 md:mt-10 sm:flex-row">
              <motion.a
                href="#showcase"
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className={`${ctaButtonClassName} bg-[var(--color-text-primary)] text-[var(--color-bg-default)] shadow-lg shadow-black/10`}
              >
                Explore the Product
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.button
                type="button"
                onClick={() =>
                  scrollToSection(
                    'faq-list',
                    window.innerWidth >= 768 ? 230 : 108,
                    'faq'
                  )
                }
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className={`${ctaButtonClassName} border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] backdrop-blur-xl`}
              >
                Read the FAQ
              </motion.button>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-10 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.28em] text-[var(--color-text-secondary)] md:mt-12"
            >
              <span>Scroll through the product story</span>
              <ChevronDown className="h-4 w-4 text-[var(--color-primary)]" />
            </motion.div>
          </motion.div>
        </section>

        <section id="showcase" className="scroll-mt-40 py-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={staggerContainer}
            className="mx-auto flex max-w-7xl flex-col gap-4 px-6 pb-8"
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]"
            >
              Product Walkthrough
            </motion.p>
            <motion.div variants={fadeUp} className="max-w-3xl">
              <h2 className="font-heading text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
                Privacy, detail, and analytics should feel seamless together.
              </h2>
              <p className="mt-4 font-body text-lg leading-relaxed text-[var(--color-text-secondary)]">
                COUNT pairs biometric protection, rich journaling, and elegant stats in a flow that stays calm on the surface and detailed underneath.
              </p>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-8 px-6 pb-16 md:hidden">
            {featuresDataList.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: smoothEase }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="flex flex-col gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-default)] text-[var(--color-primary)] shadow-md">
                  <feature.icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
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

          <div className="relative mx-auto hidden w-full max-w-7xl flex-row items-start gap-12 px-6 pb-32 pt-14 md:flex lg:gap-24">
            <div className="sticky top-[5.5rem] z-20 flex w-1/2 items-start justify-center">
              <PhoneMockup
                activeIndex={activeFeature}
                direction={direction}
                shouldReduceMotion={shouldReduceMotion}
              />
              <div className="absolute bottom-0 left-1/2 -z-10 h-8 w-56 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
            </div>

            <div className="flex w-1/2 flex-col items-start pt-10 pb-[36vh]">
              {featuresDataList.map((feature, idx) => {
                const isActive = activeFeature === idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      featureRefs.current[idx] = el;
                    }}
                    className="relative flex min-h-[64vh] w-full max-w-xl items-center py-16 pl-10"
                  >
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
                        <span className="font-body text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--color-primary)]">
                          0{idx + 1}
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
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl scroll-mt-40 px-6 py-24 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
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

        <section className="relative overflow-hidden px-6 py-24">
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
              Their history matters.
              <br />
              <span className="text-[var(--color-primary)]">But so does yours.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl font-body text-xl leading-relaxed text-[var(--color-text-secondary)] md:text-2xl"
            >
              A discreet intimacy journal designed for the modern adult. Secure, elegant, and entirely yours.
            </motion.p>

            <motion.div variants={fadeUp} className="flex w-full justify-center pt-6">
              <motion.a
                href="mailto:support@countintimacyjournal.com?subject=COUNT%20Launch%20Updates"
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className={`${ctaButtonClassName} bg-[var(--color-primary)] text-[var(--color-bg-default)] shadow-lg shadow-black/10`}
              >
                Get Launch Updates
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-default)] px-6 py-12">
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
