'use client';

import { Navigation } from '@/components/Navigation';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function TermsOfService() {
    return (
        <>
            <Navigation />
            <main className="min-h-screen pt-32 pb-24 px-6 overflow-hidden">
                <motion.article
                    className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert prose-headings:font-heading prose-p:font-body prose-li:font-body prose-strong:text-[var(--color-primary)]"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeUp}>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
                        <p className="font-subheading text-[var(--color-text-secondary)] italic mb-12">
                            Last updated: February 16, 2026
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <p>
                            Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the <strong>COUNT</strong> mobile application (the "Service") operated by <strong>COUNT</strong> ("us", "we", or "our").
                        </p>
                        <p>
                            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                        <p className="font-bold text-lg">
                            By accessing or using the Service you agree to be bound by these Terms.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">1. Age Restriction (18+)</h2>
                        <p>
                            <strong>Strict Policy:</strong> The Service is strictly intended for users who are at least <strong>18 years of age</strong>.
                        </p>
                        <p>
                            By accessing or using the Service, you warrant and represent that you are at least 18 years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of these Terms.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">2. Accounts</h2>
                        <p>
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <p>
                            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">3. User Content & Privacy</h2>
                        <p>
                            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                        </p>
                        <p>
                            <strong>Private Journal Nature:</strong> We understand the sensitive nature of personal journal data. While we take security measures (including local encryption and auth protections), you acknowledge that <strong>you enter this data at your own risk</strong>. We are not liable for any personal embarrassment, reputational damage, or other consequences that may arise if your device is compromised or if you voluntarily share your data.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">4. Community Guidelines & User-Generated Content</h2>
                        <p>
                            The COUNT Community feature facilitates the secure transfer of private information between consenting users. By utilizing this feature, you agree to the following strict conditions:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 mb-6">
                            <li><strong>Acceptable Use:</strong> You agree not to use the Service to transmit harassing, abusive, illegal, or non-consensual explicit content. You must have explicit consent from all parties involved before documenting or sharing any interactive details.</li>
                            <li><strong>Zero Liability for Leaks (The "Limits of Technology" Clause):</strong> While COUNT employs native Operating System technology attempting to block screenshots and screen recordings of "View-Once" entries, no technology is infallible. A recipient may bypass these restrictions by using a secondary device (e.g., photographing their screen). YOU ASSUME ALL RISK associated with sharing your personal data. The Company, the Developer, and our affiliates are strictly indemnified and hold absolutely zero liability if your shared content is captured, leaked, or distributed by a recipient.</li>
                        </ol>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">5. Intellectual Property</h2>
                        <p>
                            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of COUNT and its licensors.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">6. Links To Other Web Sites</h2>
                        <p>
                            Our Service may contain links to third-party web sites or services that are not owned or controlled by COUNT.
                        </p>
                        <p>
                            COUNT has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">7. Termination</h2>
                        <p>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms, or if we receive credible reports that you are utilizing the Community feature for harassment, spam, or distributing non-consensual content.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">8. Limitation of Liability</h2>
                        <p>
                            In no event shall COUNT, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">9. Disclaimer</h2>
                        <p>
                            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">10. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of <strong>Israel</strong>, without regard to its conflict of law provisions.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">11. Changes</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-bold mt-12 mb-6">12. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us:</p>
                        <ul className="list-disc pl-6 mb-12">
                            <li>By email: <strong>nevo.iflah6@icloud.com</strong></li>
                        </ul>
                    </motion.div>
                </motion.article>
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
                        <Link href="/terms-of-service" className="text-[var(--color-primary)] transition-colors">Terms of Service</Link>
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
