# COUNT — Intimacy Journal

Official marketing landing page for COUNT, a premium, privacy-first intimacy journal available on iOS and Android.

---

## Overview

This repository contains the landing page for the COUNT mobile application, hosted at [countintimacyjournal.com](https://countintimacyjournal.com). The site is designed to reflect the aesthetic of the app itself — a luxury, editorial experience that communicates exclusivity, discretion, and precision.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 15 (App Router)             |
| Styling     | Tailwind CSS v4                     |
| Animations  | Framer Motion                       |
| Theming     | next-themes (Light / Dark Mode)     |
| Typography  | Playfair Display, Source Serif 4, Montserrat (Google Fonts via next/font) |
| Language    | TypeScript                          |
| Deployment  | Vercel (recommended)                |

---

## Design System

The site implements two distinct visual themes that mirror the COUNT iOS/Android application:

**Light Mode — Raw Linen**
- Background: `#F9F7F2`
- Primary Accent: `#8B8276`
- Text: `#2D2926`

**Dark Mode — Dark Luxury**
- Background: `#1C1C1E`
- Primary Accent: `#AAB7B8`
- Text: `#ECF0F1`

---

## Project Structure

```
src/
  app/
    page.tsx              # Main landing page (Hero, Features, FAQ, CTA)
    layout.tsx            # Root layout, fonts, SEO metadata
    globals.css           # Tailwind theme tokens, CSS variables
    privacy-policy/       # Privacy Policy page
    terms-of-service/     # Terms of Service page
  components/
    Navigation.tsx        # Fixed top navigation bar with theme toggle
    ThemeProvider.tsx     # next-themes wrapper
    ThemeToggle.tsx       # Light/Dark mode toggle button
public/
  journal-icon.png        # App icon, used as favicon and OG image
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

```bash
git clone https://github.com/your-org/bodycount-web.git
cd bodycount-web
npm install
```

### Development

```bash
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## Key Features

**Sticky Scroll Showcase**
The Features section uses a CSS `position: sticky` layout combined with native scroll event listeners. As the user scrolls through each feature, the iPhone mockup on the left dynamically transitions its screen content to reflect the active feature — Privacy, Journal, Analytics, and Settings — via Framer Motion `AnimatePresence` crossfades.

**Dual-Theme Architecture**
All colors are defined as CSS custom properties and toggled via a `data-theme` attribute on the root element. No theme-specific class duplication is needed in components.

**Legal Pages**
Standalone Privacy Policy and Terms of Service pages are included with full content, matching the visual language of the main page.

**SEO**
OpenGraph and Twitter Card metadata is configured in `layout.tsx` for rich social sharing previews.

---

## Deployment

The recommended deployment target is Vercel.

```bash
vercel deploy
```

Ensure the custom domain `countintimacyjournal.com` is configured in your Vercel project settings and that DNS records point to Vercel's nameservers.

---

## Legal

All content, branding, and design are the intellectual property of the COUNT application and its owners. Unauthorized reproduction or distribution is prohibited.
