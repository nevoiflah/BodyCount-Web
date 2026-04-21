import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-default)]/82 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 md:h-20">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/journal-icon.png"
            alt="COUNT Logo"
            width={32}
            height={32}
            className="rounded-md object-contain"
          />
          <span className="[font-family:var(--font-playfair)] text-[1.9rem] font-bold tracking-tight text-[var(--color-text-primary)] transition-opacity group-hover:opacity-80">
            COUNT
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
