'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]" aria-label="Toggle theme">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:opacity-80 transition-opacity"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
