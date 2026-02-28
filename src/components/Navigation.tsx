import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-default)]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image src="/journal-icon.png" alt="COUNT Logo" width={32} height={32} className="rounded-md object-contain" />
                    <span className="[font-family:var(--font-playfair)] text-2xl font-bold tracking-tight text-[var(--color-text-primary)] group-hover:opacity-80 transition-opacity">
                        COUNT
                    </span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}
