import { Navigation } from '@/components/Navigation';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl">
        {title}
      </h2>
      <div className="space-y-4 font-body text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfService() {
  return (
    <>
      <Navigation />
      <main className="px-6 pt-32 pb-24">
        <article className="mx-auto flex max-w-4xl flex-col gap-10 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8 shadow-xl backdrop-blur-xl md:p-12">
          <header className="border-b border-[var(--color-border)] pb-8">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
              Legal
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-4 font-subheading italic text-[var(--color-text-secondary)]">
              Last updated: February 16, 2026
            </p>
          </header>

          <div className="space-y-4 font-body text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            <p>
              Please read these Terms of Use carefully before using the <strong className="text-[var(--color-text-primary)]">COUNT</strong>{' '}
              mobile application and related services.
            </p>
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and
              compliance with these Terms. These Terms apply to all visitors, users, and others who
              access or use the Service.
            </p>
            <p className="font-semibold text-[var(--color-text-primary)]">
              By accessing or using the Service, you agree to be bound by these Terms.
            </p>
          </div>

          <Section title="1. Age Restriction (18+)">
            <p>
              The Service is strictly intended for users who are at least 18 years of age.
            </p>
            <p>
              By accessing or using the Service, you represent that you are at least 18 years old
              and have the authority and capacity to enter into this agreement.
            </p>
          </Section>

          <Section title="2. Accounts">
            <p>
              When you create an account with us, you must provide information that is accurate,
              complete, and current at all times. Failure to do so may result in suspension or
              termination of your account.
            </p>
            <p>
              You are responsible for safeguarding the credentials that you use to access the
              Service and for any activities under your account.
            </p>
          </Section>

          <Section title="3. User Content and Privacy">
            <p>
              Our Service allows you to store, share, and otherwise make available certain
              information, text, graphics, videos, or other material. You remain responsible for the
              legality, reliability, and appropriateness of that content.
            </p>
            <p>
              We understand the sensitive nature of personal journal data. While we take security
              measures, including local protections and authentication controls, you acknowledge that
              you enter and manage this data at your own risk.
            </p>
          </Section>

          <Section title="4. Community Guidelines and User-Generated Content">
            <p>
              The COUNT community feature is intended only for secure sharing between consenting
              users. By using that feature, you agree to the following:
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                You will not use the Service to transmit harassing, abusive, illegal, or
                non-consensual explicit content.
              </li>
              <li>
                You must have explicit consent from all relevant parties before documenting or
                sharing interactive details.
              </li>
              <li>
                You understand that no technical safeguard is perfect and assume the risks
                associated with sharing personal data.
              </li>
            </ol>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              The Service and its original content, excluding user-provided content, remain the
              exclusive property of COUNT and its licensors.
            </p>
          </Section>

          <Section title="6. Links to Other Websites">
            <p>
              Our Service may contain links to third-party websites or services that are not owned
              or controlled by COUNT.
            </p>
            <p>
              COUNT assumes no responsibility for the content, privacy policies, or practices of
              third-party sites or services.
            </p>
          </Section>

          <Section title="7. Termination">
            <p>
              We may terminate or suspend your account immediately, without prior notice or
              liability, for any reason, including breach of these Terms or misuse of the community
              features.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              In no event shall COUNT, its directors, employees, partners, agents, suppliers, or
              affiliates be liable for indirect, incidental, special, consequential, or punitive
              damages arising from your access to or use of the Service.
            </p>
          </Section>

          <Section title="9. Disclaimer">
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an &quot;as
              is&quot; and &quot;as available&quot; basis without warranties of any kind.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms are governed by and construed in accordance with the laws of Israel,
              without regard to its conflict of law provisions.
            </p>
          </Section>

          <Section title="11. Changes">
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is
              material, we will try to provide reasonable notice before new terms take effect.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc pl-6">
              <li>
                By email:{' '}
                <a
                  href="mailto:nevo.iflah6@icloud.com"
                  className="text-[var(--color-primary)] transition-colors hover:opacity-80"
                >
                  nevo.iflah6@icloud.com
                </a>
              </li>
            </ul>
          </Section>
        </article>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-default)] px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap justify-center gap-8 font-body text-sm text-[var(--color-text-secondary)]">
            <a href="/privacy-policy" className="transition-colors hover:text-[var(--color-primary)]">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-[var(--color-primary)] transition-colors">
              Terms of Service
            </a>
            <a
              href="mailto:support@countintimacyjournal.com"
              className="transition-colors hover:text-[var(--color-primary)]"
            >
              Support
            </a>
          </div>

          <div className="font-subheading text-sm text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} COUNT. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
