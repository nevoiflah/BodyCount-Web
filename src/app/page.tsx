'use client';

import { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Lock, PieChart, Info, ShieldCheck, ChevronDown, Activity, Settings2, BarChart2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const faqData = [
  {
    question: "Where is my data actually stored?",
    answer: "Locally on your device and securely encrypted on the cloud. We never see your entries, and we cannot access your blackbook. Period."
  },
  {
    question: "Is COUNT really free?",
    answer: "The core journaling experience is entirely free. In the future, we may introduce a premium tier for advanced analytics and deeper customization, but your existing history will always remain yours to access."
  },
  {
    question: "What happens if I lose my phone?",
    answer: "Since your data is encrypted and synced with your secure account, you can simply download COUNT on your new device, log in, pass biometric authentication, and your entire history will securely restore."
  },
  {
    question: "Why do I need a Biometric Login as well?",
    answer: "Because discretion is our highest priority. The app locks immediately upon closing or switching apps, ensuring that your intimate journal remains exclusively yours, even if you hand your unlocked phone to a friend."
  }
];

function FAQItem({ faq, index }: { faq: typeof faqData[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border-b border-[#38383A] dark:border-[var(--color-border)] last:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left group transition-colors hover:text-[var(--color-primary)]"
      >
        <span className="font-heading text-lg md:text-xl font-bold pr-8">{faq.question}</span>
        <ChevronDown
          className={`w-6 h-6 shrink-0 transition-transform duration-300 text-[var(--color-primary)] ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-body text-[#EBEBF5]/80 dark:text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
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
    title: "Absolute Privacy & Discretion",
    subtitle: "Bank-level security for your private memories. No one gets in but you.",
    description: "Protected by robust Biometric locking. Activate \"Public Mode\" with a single tap to instantly blur names, faces, and sensitive stats if someone is looking over your shoulder."
  },
  {
    icon: Info,
    title: "The Deep Details",
    subtitle: "Don't just remember who, remember everything.",
    description: "Log every encounter with precision. Track dates, names, durations, and origin stories. Rate physical attributes and nuanced performance dynamics."
  },
  {
    icon: PieChart,
    title: "Advanced Analytics",
    subtitle: "Your history, elegantly visualized.",
    description: "A beautifully designed Dashboard calculating stats in real-time. View your momentum, days since last encounter, and total count. Unlock \"The SCORE\"—a proprietary algorithm calculating a custom score based on the quality of your entries."
  },
  {
    icon: Lock,
    title: "Premium UI & Customization",
    subtitle: "Designed like a high-end fashion app, not a spreadsheet.",
    description: "Refined aesthetics that adapt flawlessly to Light and Dark Modes. Utilize custom sorting modules to navigate your blackbook by score, rating, newest, or oldest entry."
  }
];

function PhoneMockup({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative w-[300px] h-[600px] mx-auto rounded-[3rem] border-[8px] border-[#1C1C1E] dark:border-[#38383A] bg-[#000000] shadow-2xl overflow-hidden flex flex-col z-20">
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#1C1C1E] rounded-full z-30 flex items-center justify-end px-3">
        <div className="w-3 h-3 rounded-full bg-white/10" />
      </div>

      {/* Screen Content */}
      <div className="flex-1 w-full bg-[var(--color-bg-default)] pt-16 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col p-6 h-full"
          >
            {activeIndex === 0 && (
              <div className="flex flex-col items-center justify-center text-center gap-6 h-full">
                <ShieldCheck className="w-16 h-16 text-[var(--color-primary)]" />
                <h4 className="font-heading text-[#F9F7F2] dark:text-[var(--color-text-primary)] text-xl font-bold">LOCKED</h4>
                <div className="w-16 h-16 rounded-full border border-[var(--color-primary)] flex items-center justify-center animate-pulse mt-4">
                  <span className="font-body text-[var(--color-text-secondary)] text-[10px] uppercase tracking-widest">Biometric</span>
                </div>
              </div>
            )}
            {activeIndex === 1 && (
              <div className="flex flex-col w-full h-full gap-4 pt-10">
                <div className="w-full bg-[var(--color-bg-surface)] rounded-2xl p-4 border border-[var(--color-border)]">
                  <div className="h-4 w-1/2 bg-[var(--color-text-secondary)]/20 rounded mb-4" />
                  <div className="flex gap-1 mb-3">
                    <Star className="w-4 h-4 text-[var(--color-primary)] fill-[var(--color-primary)]" />
                    <Star className="w-4 h-4 text-[var(--color-primary)] fill-[var(--color-primary)]" />
                    <Star className="w-4 h-4 text-[var(--color-primary)] fill-[var(--color-primary)]" />
                  </div>
                  <div className="h-2 w-full bg-[var(--color-text-secondary)]/20 rounded mb-2" />
                  <div className="h-2 w-3/4 bg-[var(--color-text-secondary)]/20 rounded" />
                </div>
                <div className="w-full h-24 bg-[var(--color-bg-surface)] rounded-2xl p-4 border border-[var(--color-border)] opacity-60" />
                <div className="w-full h-24 bg-[var(--color-bg-surface)] rounded-2xl p-4 border border-[var(--color-border)] opacity-30" />
              </div>
            )}
            {activeIndex === 2 && (
              <div className="flex flex-col w-full h-full gap-6 pt-10 items-center">
                <div className="w-40 h-40 rounded-full border-[12px] border-[var(--color-primary)] flex items-center justify-center shadow-[0_0_30px_rgba(218,165,32,0.2)]">
                  <span className="font-heading text-[var(--color-text-primary)] text-5xl font-bold">24</span>
                </div>
                <div className="w-full flex justify-between gap-4 mt-6">
                  <div className="flex-1 bg-[var(--color-bg-surface)] rounded-xl py-6 border border-[var(--color-border)] flex items-center justify-center flex-col">
                    <Activity className="w-6 h-6 text-[var(--color-primary)] mb-2" />
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-text-secondary)]">Streak</span>
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">14 Days</span>
                  </div>
                  <div className="flex-1 bg-[var(--color-bg-surface)] rounded-xl py-6 border border-[var(--color-border)] flex items-center justify-center flex-col">
                    <BarChart2 className="w-6 h-6 text-[var(--color-primary)] mb-2" />
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-text-secondary)]">Stud Score</span>
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">7.6</span>
                  </div>
                </div>
              </div>
            )}
            {activeIndex === 3 && (
              <div className="flex flex-col w-full h-full gap-4 pt-10">
                <div className="flex justify-between items-center px-2 mb-2">
                  <h4 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">Settings</h4>
                  <Settings2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
                </div>
                <div className="w-full h-14 bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] flex items-center px-4 justify-between">
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">Theme</span>
                  <div className="w-9 h-5 bg-[var(--color-primary)] rounded-full flex justify-end items-center p-0.5">
                    <div className="w-4 h-4 bg-[var(--color-bg-default)] rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="w-full h-14 bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] flex items-center px-4 justify-between">
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">Public Mode</span>
                  <div className="w-9 h-5 bg-[#38383A] rounded-full flex justify-start items-center p-0.5">
                    <div className="w-4 h-4 bg-[var(--color-text-secondary)] rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#38383A] rounded-full z-30" />
    </div>
  );
}

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (featureRefs.current.length === 0) return;

      const viewportHeight = window.innerHeight;
      const triggerLine = viewportHeight * 0.5; // Trigger when element hits middle of screen

      let newActiveIndex = activeFeature;
      let minDistance = Infinity;

      featureRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Calculate distance from middle of element to trigger line
          const elementMiddle = rect.top + rect.height / 2;
          const distance = Math.abs(elementMiddle - triggerLine);

          // Find the feature closest to the middle of the screen
          if (distance < minDistance) {
            minDistance = distance;
            newActiveIndex = index;
          }
        }
      });

      if (newActiveIndex !== activeFeature) {
        setActiveFeature(newActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeFeature]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Title Only */}
        <section className="relative min-h-[100vh] -mt-20 flex flex-col items-center justify-center px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-bg-surface)] opacity-50 pointer-events-none" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="z-10"
          >
            <motion.h1 variants={fadeUp} className="[font-family:var(--font-playfair)] text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-widest text-[var(--color-text-primary)] relative">
              <span className="relative z-10 drop-shadow-sm">COUNT</span>
              <br className="md:hidden" />
              <span className="[font-family:var(--font-montserrat)] text-[var(--color-primary)] font-light text-xl md:text-4xl lg:text-5xl block mt-8 z-10 relative tracking-widest md:tracking-[0.3em] whitespace-nowrap">— Intimacy Journal —</span>
            </motion.h1>
          </motion.div>
        </section>

        {/* Mobile Feature Cards (visible on small screens only) */}
        <section className="md:hidden px-6 pb-16 flex flex-col gap-8">
          {featuresDataList.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 p-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-default)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] shadow-md">
                <feature.icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="[font-family:var(--font-playfair)] text-2xl font-bold mb-2 text-[var(--color-text-primary)]">{feature.title}</h3>
                <p className="font-body text-[var(--color-primary)] font-semibold mb-3 text-xs tracking-widest uppercase">{feature.subtitle}</p>
                <p className="font-body text-[var(--color-text-secondary)] text-base leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Sticky Scroll Showcase Section (desktop only) */}
        <section className="hidden md:flex relative w-full max-w-7xl mx-auto px-6 pb-32 pt-10 flex-row items-start gap-12 lg:gap-24">

          {/* Left: Sticky Phone Mockup */}
          <div className="w-1/2 sticky top-24 flex justify-center items-start z-20 transition-opacity duration-500">
            <PhoneMockup activeIndex={activeFeature} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-[var(--color-primary)]/20 blur-3xl rounded-full -z-10" />
          </div>

          {/* Right: Scrolling Feature Text Blocks */}
          <div className="w-1/2 flex flex-col items-start pt-10 pb-[40vh]">
            {featuresDataList.map((feature, idx) => {
              return (
                <div
                  key={idx}
                  ref={(el) => { featureRefs.current[idx] = el; }}
                  className="flex flex-col gap-6 items-start text-left justify-center min-h-[70vh] w-full max-w-md py-24"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#1C1C1E] border border-[#38383A] dark:bg-[var(--color-bg-default)] dark:border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] shadow-lg transition-transform duration-500 ease-out"
                    style={{ transform: activeFeature === idx ? 'scale(1.1)' : 'scale(1)' }}>
                    <feature.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className={`transition-all duration-700 ease-out ${activeFeature === idx ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-0'}`}>
                    <h3 className="[font-family:var(--font-playfair)] text-5xl font-bold mb-4 text-[var(--color-text-primary)] tracking-tight">{feature.title}</h3>
                    <p className="font-body text-[var(--color-primary)] font-bold mb-6 text-sm tracking-widest uppercase leading-relaxed">
                      {feature.subtitle}
                    </p>
                    <p className="font-body text-[var(--color-text-secondary)] text-xl leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            className="flex flex-col gap-12"
          >
            <div className="text-center">
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                No Secrets.
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-[#EBEBF5]/80 dark:text-[var(--color-text-secondary)] text-lg max-w-lg mx-auto">
                Just answers to how we protect yours.
              </motion.p>
            </div>

            <div className="flex flex-col bg-[#1C1C1E] dark:bg-[var(--color-bg-surface)] rounded-3xl p-6 md:p-10 border border-[#38383A] dark:border-[var(--color-border)] shadow-xl">
              {faqData.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-surface)] to-transparent pointer-events-none" />
          <motion.div
            className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Their history matters.<br />
              <span className="text-[var(--color-primary)]">But so does yours.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="font-body text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
              A discreet intimacy journal designed for the modern adult. Secure, elegant, and entirely yours.
            </motion.p>

            <motion.div variants={fadeUp} className="pt-8 w-full flex justify-center">
              <button className="bg-[var(--color-primary)] text-[var(--color-text-primary)] font-body font-semibold px-10 py-5 rounded-full hover:opacity-90 transition-all text-lg shadow-lg">
                Download on the App Store
              </button>
            </motion.div>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[var(--color-bg-default)] border-t border-[var(--color-border)]">
        <motion.div
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >


          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 font-body text-sm text-[var(--color-text-secondary)]">
            <Link href="/privacy-policy" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link>
            <a href="mailto:support@countintimacyjournal.com" className="hover:text-[var(--color-primary)] transition-colors">Support</a>
          </motion.div>

          <motion.div variants={fadeUp} className="font-subheading text-sm text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} COUNT. All rights reserved.
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
}
