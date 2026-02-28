import type { Metadata } from 'next';
import { Playfair_Display, Source_Serif_4, Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['600', '700'],
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  weight: ['400', '600'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '600'],
});

export const metadata: Metadata = {
  title: 'COUNT | Intimacy Journal',
  description: 'Their history matters. But so does yours. A highly detailed, discreet intimacy journal protected by bank-level security.',
  openGraph: {
    title: 'COUNT | Intimacy Journal',
    description: 'A premium, strictly private intimacy journal. Remember everything with absolute discretion.',
    url: 'https://countintimacyjournal.com',
    siteName: 'COUNT',
    images: [
      {
        url: '/journal-icon.png',
        width: 800,
        height: 600,
        alt: 'COUNT Intimacy Journal Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COUNT | Intimacy Journal',
    description: 'Their history matters. But so does yours. A highly detailed, discreet intimacy journal protected by bank-level security.',
    images: ['/journal-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${sourceSerif.variable} ${montserrat.variable} antialiased bg-[var(--color-bg-default)] text-[var(--color-text-primary)] transition-colors duration-300 min-h-screen`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

