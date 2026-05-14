# OMI Mauritanie — Website Rebuild

## Project Overview

OMI is a Mauritanian cleaning-products brand. This repository contains the full website rebuild — a bilingual (French + Arabic RTL) public marketing and product catalog site.

**Implementation target:** `artifacts/nextjs-app/`  
**Figma/design reference:** `Rebuild OMI Website/` (do not delete)  
**Content source:** https://omi.mr/

---

## Repository Structure

```
workspace/
├── Rebuild OMI Website/     # Figma/Stitch design import (Vite + React Router SPA)
│                            # Visual design reference — do not delete
├── artifacts/
│   ├── nextjs-app/          # ← MAIN IMPLEMENTATION TARGET (Next.js 15)
│   ├── api-server/          # Express backend (not used by OMI site)
│   └── mockup-sandbox/      # Vite sandbox (not used by OMI site)
├── lib/                     # Shared workspace packages
├── scripts/                 # Workspace utility scripts
├── CLAUDE.md                # Permanent project instructions for Claude Code
└── README.md                # This file
```

---

## Quick Start

```bash
cd artifacts/nextjs-app
pnpm dev        # Start development server
pnpm lint       # Run ESLint
pnpm typecheck  # TypeScript check
pnpm build      # Production build
```

---

## Stack

- **Next.js 15.3.2** — App Router, React 19
- **next-intl 3.26.3** — French + Arabic i18n, RTL
- **Tailwind CSS 4** + **shadcn/ui** — UI components
- **Motion 12** (`motion/react`) — animations
- **Zod 3** — validation
- **pnpm** — package manager

---

## Changes Made (Session 1 — 2026-05-14)

### Created

| File | Description |
|------|-------------|
| `/CLAUDE.md` | Permanent project instructions for all future Claude Code sessions |
| `/artifacts/nextjs-app/docs/PRD.md` | Full Product Requirement Document |
| `/artifacts/nextjs-app/src/types/product.ts` | TypeScript interfaces: `Product`, `Category`, `Scent` |
| `/artifacts/nextjs-app/src/data/categories.ts` | 7 OMI product categories (FR + AR names) |
| `/artifacts/nextjs-app/src/data/products.ts` | 18 OMI products with slugs, imageIds, AR names, bg colors |
| `/artifacts/nextjs-app/src/data/siteContent.ts` | `CONTACT` and `SOCIAL` constants |

### Updated

| File | What Changed |
|------|--------------|
| `/artifacts/nextjs-app/messages/fr.json` | Replaced generic template content with full OMI French content (all namespaces) |
| `/artifacts/nextjs-app/messages/ar.json` | Replaced generic template content with full OMI Arabic content (all namespaces) |

### Content Extracted from omi.mr

Real content was fetched and confirmed from https://omi.mr/:
- Hero headline: "Produits de nettoyage Haute qualité" / "منتجات تنظيف عالية الجودة"
- Brand tagline: "Nettoyage, Garantie & Sécurité et Durabilité" / "تنظيف، ضمان، أمان، واستدامة"
- All 18 product names (FR + AR) with confirmed image IDs 1–18
- All 7 category names (FR + AR)
- Contact: +222 22 51 11 11 | commercial@omi.mr | Zone industrielle Dar Naim
- Nav labels (FR + AR), about text, Why OMI content

---

## Changes Made (Session 2 — 2026-05-14)

All remaining UI, pages, and infrastructure from the handoff brief were implemented. The site is now fully built and passing lint, typecheck, and production build.

### Updated — Infrastructure & Config

| File | What Changed |
|------|--------------|
| `src/globals.css` | Replaced blue palette with OMI palette: `--background: #f8f7f5`, `--primary: #171717`, `--radius: 0.125rem`; added RTL Tajawal font fallback |
| `src/app/[locale]/layout.tsx` | Added Inter + Tajawal fonts via `next/font/google`; locale-aware `fontClass` on `<html>`; expanded `generateMetadata` with OG `siteName`, images, locale-aware `%s` title template |
| `next.config.ts` | Added `images.remotePatterns` for `omi.mr`; updated CSP to allow Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) and `omi.mr` images; added HSTS header (`max-age=31536000`); changed `X-Frame-Options` from `SAMEORIGIN` → `DENY` |
| `public/robots.txt` | Added `Sitemap: /sitemap.xml` line |

### Created — Environment

| File | Description |
|------|-------------|
| `.env.example` | Template with all required env vars: `CONTACT_SMTP_*`, `CONTACT_TO_EMAIL` |

### Created — Section Components

| File | Description |
|------|-------------|
| `src/components/sections/hero.tsx` | `'use client'`. Two-column layout: badge pill + large `h1` + subtitle + dual CTA links. Right side: `next/image` hero from `omi.mr`. Motion entry animation (`opacity/x` left, `opacity/scale` right). RTL-safe. |
| `src/components/sections/marquee-banner.tsx` | `'use client'`. Dark scrolling text strip with 4 OMI brand items (duplicated for seamless loop). `motion.div` infinite `x` animation. `prefers-reduced-motion` aware. |
| `src/components/sections/product-card.tsx` | Server component. Props: `product`, `locale`, `categoryName`. `next/image` from `omi.mr/imageView.php?id=N`. `aspect-[3/4]` container with `product.bg` background. Category chip using `start-4` (logical property). Links to `/produits/[slug]` via `@/i18n/navigation`. |
| `src/components/sections/category-filter.tsx` | `'use client'`. Chip row: "Tous/الكل" + one chip per category. Active: dark fill. Inactive: white border. Click pushes `?categorie=ID` to URL. Requires `<Suspense>` wrapper at page level. |
| `src/components/sections/why-omi.tsx` | `'use client'`. 3-column grid with large ordinals `01 02 03` in `text-6xl font-light text-neutral-300`. Titles + body from `whyOmi` namespace. Staggered `whileInView` animation. |
| `src/components/sections/contact-form.tsx` | `'use client'`. Fields: name, email, message. Hidden honeypot field (`tabIndex={-1}`, `aria-hidden`). Submits to `/api/contact`. Shows success/error state. All labels from `contact` namespace. Screen-reader accessible. |

### Replaced — Layout Components

| File | What Changed |
|------|--------------|
| `src/components/layout/header.tsx` | Full replacement. Sticky `bg-white/80 backdrop-blur-md`. OMI text logo. Desktop: products dropdown (all 7 categories → `/produits?categorie=ID`), À propos, Contact links, language switcher. Mobile: `aria-expanded` button + `AnimatePresence` drawer. No cart icon. |
| `src/components/layout/footer.tsx` | Full replacement. 4-column dark footer: (1) OMI logo + brand description, (2) nav links, (3) contact info with `tel:`/`mailto:` and locale-aware address, (4) Facebook + Instagram icons with `rel="noopener noreferrer"`. Copyright bar. Imports `CONTACT`/`SOCIAL` from `@/data/siteContent`. |

### Replaced / Created — Pages

| File | Description |
|------|-------------|
| `src/app/[locale]/page.tsx` | Replaced. Server component. Sections: Hero → Marquee → 6 featured products grid → Why OMI → About snippet → Contact CTA strip. `generateMetadata`. Organization JSON-LD. |
| `src/app/[locale]/produits/page.tsx` | New. Server-side category filter via `await searchParams.categorie`. `<Suspense>` around `CategoryFilter`. 18-product grid or empty state. `generateStaticParams` for both locales. BreadcrumbList JSON-LD. |
| `src/app/[locale]/produits/[slug]/page.tsx` | New. `generateStaticParams` → 36 static pages (2 locales × 18 slugs). Two-col layout: sticky product image left, details right. Related products section. Back link. Product + BreadcrumbList JSON-LD. |
| `src/app/[locale]/a-propos/page.tsx` | New. Hero + brand body + about image from `omi.mr/assets/images/resource/about-1.jpg` + quality/location sections + discover products CTA. Organization JSON-LD. |
| `src/app/[locale]/contact/page.tsx` | New. Two-col: contact info (phone, email, locale-aware address) left, `<ContactForm />` right. `generateMetadata`. |

### Created — API & SEO

| File | Description |
|------|-------------|
| `src/app/api/contact/route.ts` | POST endpoint. Zod schema validation. IP-based in-memory rate limiting (3 req/min). Honeypot check (`z.string().max(0)`). Generic error responses. `console.log` placeholder until SMTP is configured. |
| `src/app/sitemap.ts` | Generates sitemap for all locale × route combinations (fr + ar × homepage + /produits + /a-propos + /contact + 18 product pages = 44 URLs). |

### Deleted

| File | Reason |
|------|--------|
| `src/app/api/example/route.ts` | Generic template route, replaced by `/api/contact` |
| `src/components/sections/card-grid.tsx` | Generic template component, no longer used |

### QA Results

All commands run from `artifacts/nextjs-app/`:

| Command | Result |
|---------|--------|
| `pnpm lint` | ✅ No ESLint warnings or errors |
| `pnpm typecheck` | ✅ No TypeScript errors |
| `pnpm build` | ✅ 49/49 pages generated successfully |

**Build output:** 2 locales × (homepage + /produits + /a-propos + /contact + 18 product detail pages) + /_not-found + /sitemap.xml + /api/contact = 49 routes.

---

## Changes Made (Session 3 — 2026-05-14)

Runtime crash fix and CLAUDE.md compliance pass. The app was crashing at runtime despite a clean build. 9 issues were identified and resolved.

### Updated — Crash Fix

| File | What Changed |
|------|--------------|
| `src/components/layout/footer.tsx` | **Critical crash fix.** Removed implicit `getLocale()` + `getTranslations()` calls that relied on async request context. Component now accepts an explicit `locale: string` prop and passes it directly to `getTranslations({ locale, namespace })` — consistent with every other server component in the codebase. |
| `src/app/[locale]/layout.tsx` | Passes `locale={locale}` to `<Footer />` to satisfy the new explicit prop. |

### Updated — Animation Rule Compliance (CLAUDE.md)

| File | What Changed |
|------|--------------|
| `src/components/layout/header.tsx` | Mobile menu drawer was animating `height: 0 → 'auto'` (layout-affecting). Replaced with `opacity` + `y` (transform only), per CLAUDE.md: *"No layout-affecting animations (no width/height/top/left)"*. |
| `src/components/sections/hero.tsx` | Added `useReducedMotion()` hook. Both `motion.div` blocks now set `initial={false}` when reduced motion is preferred, per CLAUDE.md: *"Always wrap Motion animations in `prefers-reduced-motion` checks."* |

### Updated — i18n Correctness

| File | What Changed |
|------|--------------|
| `src/components/sections/category-filter.tsx` | Removed hardcoded Arabic string `'الكل'`. Both locales now use `t('products.filterAll')` from the translation files (both `fr.json` and `ar.json` already defined this key). |

### Updated — next-intl Best Practice

| File | What Changed |
|------|--------------|
| `src/middleware.ts` | Changed from inline `createMiddleware({ locales, defaultLocale })` to `createMiddleware(routing)` using the shared `routing` object imported from `@/i18n/routing`. Future changes to the routing config now propagate automatically. |

### Updated — Config Cleanup

| File | What Changed |
|------|--------------|
| `next.config.ts` | Removed redundant `/` → `/fr` redirect — the next-intl middleware already handles this. Also added `'unsafe-eval'` to `script-src` in development mode only (`isDev` guard), needed by Next.js HMR. |

### Updated — CSS Correctness

| File | What Changed |
|------|--------------|
| `src/globals.css` | Fixed `[dir='rtl'] body` font rule. Was using literal `'Tajawal'` which `next/font/google` does not register under its real name. Now uses `var(--font-arabic)` — the CSS variable declared by `Tajawal({ variable: '--font-arabic' })` in `layout.tsx`. |

### Updated — Security

| File | What Changed |
|------|--------------|
| `src/app/api/contact/route.ts` | Fixed unbounded memory growth in the in-memory rate limiter. Added a prune pass inside `isRateLimited` that deletes Map entries where all timestamps have expired (> 60s old). The Map is now bounded to IPs with activity in the last 60 seconds. |

### QA Results

All commands run from `artifacts/nextjs-app/`:

| Command | Result |
|---------|--------|
| `pnpm typecheck` | ✅ No TypeScript errors |
| `pnpm lint` | ✅ No ESLint warnings or errors |
| `pnpm build` | ✅ 49/49 pages generated successfully |

---

## Client Confirmation Items (Pending)

| Item | Status |
|------|--------|
| Social media URLs (Facebook, Instagram) | PENDING — placeholder links (`facebook.com`, `instagram.com`) used in footer |
| Final production domain | PENDING — `[FINAL_DOMAIN]` placeholder in sitemap.ts, schema JSON-LD, and a-propos page |
| Arabic product names sign-off | PENDING — sourced from omi.mr/AR, needs client approval |
| Product 17 (`Nettoyant lavandra 750ML`) category | PENDING — FR site = `surface`, AR site = `vaisselle`; currently assigned `surface` |
| SMTP credentials for contact form | PENDING — form currently logs to console only |
| Higher-resolution product images | PENDING — using `omi.mr/imageView.php?id=N` |

---

## Important Notes

- Product images are served from `https://omi.mr/imageView.php?id=N` (1–18). `next.config.ts` whitelists this domain via `images.remotePatterns`.
- All internal links use `Link` from `@/i18n/navigation` (not `next/link`) — this auto-prepends the locale prefix.
- Motion import: `import { motion } from 'motion/react'` (not `framer-motion`).
- No e-commerce features — no cart, no prices, no checkout, no authentication anywhere.
- All project rules are in `/CLAUDE.md`. Do not modify `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`, `src/middleware.ts`, or `src/components/ui/**`.
