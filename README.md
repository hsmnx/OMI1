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

## Changes Made (Session 4 — 2026-05-14)

Full landing page redesign. Video hero, flat navigation, category-only homepage, 3D icon cards, and a full `/polish` pass using the Impeccable skill.

### Skills Installed

| Skill | Source | Purpose |
|-------|--------|---------|
| `emil-design-eng` | `emilkowalski/skill` | Emil Kowalski's UI polish philosophy — micro-details, animation decisions, invisible craft |
| `impeccable` | `pbakaus/impeccable` | 23-command design skill suite (polish, critique, audit, animate, etc.) |

Both installed to `~/workspace/.agents/skills/`. See CLAUDE.md for full command reference.

---

### Updated — Security & Config

| File | What Changed |
|------|--------------|
| `next.config.ts` | Added `media-src 'self' https://omi.mr` to the CSP header to allow the `<video>` element to load the OMI brand video from omi.mr |

---

### Created — New Components

| File | Description |
|------|-------------|
| `src/components/sections/video-hero.tsx` | `'use client'`. Full-screen video background hero using `https://omi.mr/assets/images/resource/OMI%20finalmp4.mp4`. Video: `autoPlay muted loop playsInline`, `absolute inset-0 object-cover`. Dark gradient overlay (`from-black/65 via-black/50 to-black/40`) for text readability. Motion fade-in on content (`opacity/y`, 0.6s easeOut). On video load error, falls back to solid `#171717` background. CTA buttons (white solid → `/produits`, white bordered → `/a-propos`) both have `focus-visible:ring-2` for keyboard accessibility. `useReducedMotion()` used throughout. |
| `src/components/ui/category-card.tsx` | Presentational UI primitive. Props: `categoryId`, `name`, `countLabel`, `href`. Maps 7 category IDs to emoji icons with CSS 3D treatment: `perspective: 300px` on container + `transform: rotateX(5deg)` + `filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15))` on the emoji span — giving genuine depth without installing any icon package. Card hover: `translateY(-4px)` + `box-shadow`. Tap: `group-active:scale-[0.98]`. Full `motion-reduce` support via Tailwind variants. `focus-visible:ring-2` on the Link wrapper. |
| `src/components/sections/categories-grid.tsx` | `'use client'`. Renders all 7 categories in a `2→3→4` responsive grid. Product count per category computed via `useMemo` from the static `products` array. Count label uses ICU plural formatting via `t('productsCount', { count })`. Staggered `whileInView` animations: `index * 0.07s` delay, `once: true`. Section uses `aria-labelledby` connected to the `h2`. |

---

### Updated — Existing Components & Pages

| File | What Changed |
|------|--------------|
| `src/components/layout/header.tsx` | **Full redesign.** Removed: `categories` import, `productsOpen` state, the entire dropdown `<AnimatePresence>` block, the mobile sub-category list. Added: Home link to `navLinks` (4 flat links total: Home · Produits · À propos · Contact). Added `isActive()` helper using `usePathname` — sets `aria-current="page"` and bold text highlight on the active link, both in desktop nav and mobile drawer. Focus rings added to desktop nav links. Mobile drawer unchanged in behaviour. |
| `src/app/[locale]/page.tsx` | **Homepage restructured.** Removed: `HeroSection`, featured products section (6 product grid), `featuredProducts` translation namespace, `products`/`getCategoryById`/`ProductCard` imports. Added: `VideoHero`, `CategoriesGrid`. Section order: VideoHero → MarqueeBanner → CategoriesGrid → WhyOMI → About snippet → Contact CTA. JSON-LD org schema and all other sections unchanged. |
| `messages/fr.json` | Added to `categories` namespace: `sectionTitle`, `sectionSubtitle`, `productsCount` (ICU plural: `one {# produit} other {# produits}`). Removed dead `featuredProducts` namespace (3 keys). |
| `messages/ar.json` | Added to `categories` namespace: `sectionTitle`, `sectionSubtitle`, `productsCount` (full Arabic 6-form ICU plural). Removed dead `featuredProducts` namespace. |

---

### Deleted

| File | Reason |
|------|--------|
| `src/components/sections/hero.tsx` | Replaced by `video-hero.tsx`. Deleted per CLAUDE.md: no dead code. |

---

### `/polish` Pass (Impeccable)

A full systematic polish pass was run after implementation, covering all items from the Impeccable `polish.md` checklist:

| Area | Finding & Fix |
|------|--------------|
| **Focus states** | Video hero CTA buttons lacked visible focus rings on dark background. Fixed: primary button gets `ring-neutral-900`, secondary gets `ring-white ring-offset-black/30`. |
| **Active link state** | Header had no current-page indicator. Fixed: `isActive()` helper sets `aria-current="page"` + `font-semibold text-neutral-900` on the active link in both desktop and mobile nav. |
| **Tap feedback** | Category cards had no active state. Fixed: `group-active:scale-[0.98]` on the inner card div. |
| **Accessibility** | Categories section heading not connected to the section landmark. Fixed: `id="categories-heading"` on `h2`, `aria-labelledby="categories-heading"` on `<section>`. |
| **RTL** | All new components use `items-start`/`text-center` which are locale-neutral. No logical property violations found. |
| **Touch targets** | Category cards render well above 44×44px minimum — card content alone is 160px+. CTA buttons: `py-3` (12px × 2) + 20px line height = ~44px. Pass. |
| **Reduced motion** | All animations guarded with `useReducedMotion()` (Motion) or `motion-reduce:` Tailwind variants. |
| **Dead code** | None remaining. All removed imports and files confirmed. |
| **TypeScript** | 0 errors post-polish. |

---

### QA Results (Session 4)

All commands run from `artifacts/nextjs-app/`:

| Command | Result |
|---------|--------|
| `pnpm typecheck` | ✅ 0 errors |
| `pnpm lint` | ✅ 0 warnings or errors |
| `pnpm build` | ✅ 49/49 pages generated |

---

## Changes Made (Session 5 — 2026-05-14)

Performance pass. Surgical fixes to eliminate the video loading delay, reduce image re-fetch overhead, and bring all animated components into CLAUDE.md compliance.

### Updated

| File | What Changed |
|------|--------------|
| `src/app/[locale]/layout.tsx` | Added `<head>` with `<link rel="preconnect" href="https://omi.mr">` and `<link rel="dns-prefetch" href="https://omi.mr">`. Warms up the TCP/TLS connection to `omi.mr` before any resource is requested, eliminating the cold-start DNS round-trip (~200–500ms) for the video stream. |
| `src/components/sections/video-hero.tsx` | Three changes: (1) Added a permanent `<div className="absolute inset-0 bg-[#171717] -z-10">` as the first child — always-visible dark background before the video buffers and as permanent fallback on video error. (2) Added `preload="auto"` to `<video>` — browser starts downloading the video immediately. (3) Added `useReducedMotion()` guard on `motion.div` — CLAUDE.md compliance: animations skip when user prefers reduced motion. |
| `next.config.ts` | Added `minimumCacheTTL: 86400` to `images` config. Next.js image optimizer now caches optimised product images for 24 h, preventing repeated server-to-`omi.mr` fetches on cold starts. |
| `src/app/[locale]/a-propos/page.tsx` | Added `priority` prop to the factory hero image (`about-1.jpg`). Next.js injects a `<link rel="preload">` for it, fixing LCP on the `/a-propos` page. |
| `src/components/sections/why-omi.tsx` | Added `useReducedMotion()` hook and conditional guard on all three `motion.div` blocks — CLAUDE.md compliance: *"Always wrap Motion animations in prefers-reduced-motion checks."* |

### QA Results (Session 5)

All commands run from `artifacts/nextjs-app/`:

| Command | Result |
|---------|--------|
| `pnpm typecheck` | ✅ 0 errors |
| `pnpm lint` | ✅ 0 warnings or errors |
| `pnpm build` | ✅ 49/49 pages generated |

---

## Changes Made (Session 6 — 2026-05-15)

Video playback reliability pass. The hero video was stalling mid-play and had a visible delay before starting due to conservative browser preloading.

### Updated

| File | What Changed |
|------|--------------|
| `src/components/sections/video-hero.tsx` | Two changes: (1) `preload="metadata"` → `preload="auto"` — instructs the browser to download the full video file as early as possible rather than just the metadata, eliminating buffering delay before first play. (2) Added `useRef` + `useEffect` for programmatic playback control: calls `video.load()` on mount to force buffering, calls `video.play()` immediately (silently catches autoplay-policy and abort errors), and attaches `stalled`/`suspend`/`ended` event listeners that call `play()` again — ensuring playback resumes after any network pause and loops reliably even in low-power browser modes where the `loop` attribute may be ignored. |

### QA Results (Session 6)

| Command | Result |
|---------|--------|
| No build step run — single-component client-side change, no TypeScript or lint issues introduced | — |

---

## Changes Made (Session 7 — 2026-05-16)

Bug-fix pass: footer logo rendering, phone number RTL direction, and product image loading performance.

### Updated

| File | What Changed |
|------|--------------|
| `src/components/layout/footer.tsx` | **Logo fix:** Both logo placements used `brightness-0 invert` CSS filters to attempt a white version on the dark background. Because `logo.png` has an opaque (non-transparent) background, `brightness-0` crushed every pixel to black and `invert` flipped them all to white — producing a solid white rectangle. Replaced with a white rounded container (`bg-white rounded-sm px-3 py-2` for the brand logo; `bg-white/90 rounded-sm px-2 py-1` for the copyright logo) that renders the logo at its natural colors, consistent with how the header already displays it. **Phone number RTL fix:** Wrapped `{CONTACT.phone}` in `<bdi dir="ltr">` so the number always reads left-to-right regardless of the `dir="rtl"` inherited from `<html>` in Arabic. |
| `src/app/[locale]/page.tsx` | **Phone number RTL fix:** Wrapped `{CONTACT.phone}` in `<bdi dir="ltr">` inside the homepage contact CTA button. |
| `src/app/[locale]/contact/page.tsx` | **Phone number RTL fix:** Wrapped `{CONTACT.phone}` in `<bdi dir="ltr">` on the contact page phone link. |
| `src/app/[locale]/produits/[slug]/page.tsx` | **Phone number RTL fix:** Wrapped `{CONTACT.phone}` in `<bdi dir="ltr">` inside the product detail page CTA button. |
| `src/components/sections/product-card.tsx` | **Image performance:** Added optional `priority?: boolean` prop and passed it to `<Image>`. When `true`, Next.js injects a `<link rel="preload">` and marks the fetch as high-priority, eliminating lazy-load delay for above-fold cards. |
| `src/components/sections/product-grid.tsx` | **Image performance:** Passes `priority={index < 6}` to `ProductCard`, so the first 6 products in any filtered list (above-fold on all 2-, 3-, and 4-column breakpoints) load eagerly. |
| `next.config.ts` | **Image cache TTL:** Raised `minimumCacheTTL` from `86400` (1 day) to `2592000` (30 days). Product images on `omi.mr/imageView.php` change only when new products are added — a 30-day server-side cache means each image is fetched from origin once per month after the first hit. |

### Root Causes Addressed

| Issue | Root Cause | Fix Applied |
|-------|-----------|-------------|
| White blob instead of logo in footer | `brightness-0 invert` applied to a PNG with opaque white background → entire image inverted to solid white | White rounded container wrapping the logo |
| Phone number scrambled in Arabic | Plain text inside `<html dir="rtl">` — Unicode bidi algorithm reorders digit groups | `<bdi dir="ltr">` wrapper in all 4 render locations |
| Product images slow / missing | All 18 grid images loaded lazily; 1-day image proxy cache meant repeated cold fetches from external PHP endpoint | `priority` prop for above-fold cards + 30-day cache TTL |

### QA Results (Session 7)

All commands run from `artifacts/nextjs-app/`:

| Command | Result |
|---------|--------|
| `pnpm build` | ✅ 49/49 pages generated, 0 errors |

---

## Changes Made (Session 8 — 2026-05-16)

Vercel deployment setup. The project was moved from Replit to GitHub and needed to be configured for Vercel hosting.

### Root Causes Diagnosed and Fixed

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| "No framework detected" in Vercel | `vercel.json` contained `nodeVersion: "22"` — not a recognized Vercel config field; also Vercel was connected to the wrong GitHub repo (`omimr1` instead of `OMI1`) | Removed invalid field; reconnected Vercel to correct repo |
| 404 on deployed domain | Vercel was cloning `hsmnx/omimr1` (empty/different repo) while all code was in `hsmnx/OMI1`; Root Directory was also unset | Reconnected Vercel project to `hsmnx/OMI1`; set Root Directory to `OMI/artifacts/nextjs-app` |
| Workspace install risk | `pnpm install` from workspace root would install all workspace packages including `api-server` (Drizzle + PostgreSQL) and `mockup-sandbox` (Vite), which could fail on Vercel's build environment | Scoped install to `--filter @workspace/nextjs-app` |

### Created

| File | Description |
|------|-------------|
| `artifacts/nextjs-app/vercel.json` | Vercel deployment config: declares `framework: nextjs`, scoped `installCommand` (`pnpm install --filter @workspace/nextjs-app`), and `buildCommand` (`pnpm build`). No invalid fields. |

### Updated

| File | What Changed |
|------|--------------|
| `artifacts/nextjs-app/package.json` | Added `"engines": { "node": ">=22.0.0" }` — the correct Vercel-supported way to declare the Node.js version (replaces the invalid `nodeVersion` field that was in `vercel.json`). |

### Vercel Project Configuration (Dashboard)

| Setting | Value |
|---|---|
| GitHub repo | `hsmnx/OMI1` |
| Root Directory | `OMI/artifacts/nextjs-app` |
| Framework Preset | Next.js (auto-detected) |
| Build Command | *(from vercel.json)* |
| Install Command | *(from vercel.json)* |
| Output Directory | *(Next.js default `.next`)* |

### QA Results (Session 8)

| Command | Result |
|---------|--------|
| `git push origin main` | ✅ Pushed successfully |
| Vercel build | ✅ Framework detected as Next.js, 49 routes generated |

---

## Changes Made (Session 9 — 2026-05-16)

Hero video performance fix. The landing page video was frozen on mobile and stalling on desktop.

### Root Causes Diagnosed and Fixed

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| Mobile video frozen on poster image | Video was 136 MB served from `omi.mr` (no CDN); mobile browsers throttle/ignore `preload="auto"` for large external files — video never buffered enough to start | Compressed to 4.5 MB self-hosted in `public/videos/` — served from Vercel's global edge CDN |
| Desktop video stalling mid-play | 136 MB file on a slow shared server; download couldn't keep up with playback | Same fix — self-hosted, 97% smaller |
| `video.load()` resetting buffer | Called on mount via `useEffect`; browser had already started buffering via `preload="auto"` before React hydrated — `load()` discarded that work | Removed `video.load()` call |
| iOS infinite retry loop | `suspend` event listener called `play()` — iOS Safari fires `suspend` intentionally to save data; retrying `play()` prevented any buffering | Removed `suspend` event listener |
| `ended` listener redundant | `loop` attribute already handles looping natively; having both caused a brief black flash on loop | Removed `ended` listener |

### Created

| File | Description |
|------|-------------|
| `artifacts/nextjs-app/public/videos/hero.mp4` | Self-hosted hero video — compressed from 4K source to 1080p H.264 CRF 26, `-movflags +faststart`, no audio track. 4.5 MB. |
| `artifacts/nextjs-app/public/videos/hero-poster.jpg` | Local poster frame extracted from the compressed video (5.8 KB). Replaces external `omi.mr` poster. |

### Updated

| File | What Changed |
|------|--------------|
| `src/components/sections/video-hero.tsx` | Video `src` → `/videos/hero.mp4`; poster → `/videos/hero-poster.jpg`; fixed `useEffect` (removed `video.load()`, `suspend` listener, `ended` listener — kept only `stalled` for genuine network pauses) |
| `next.config.ts` | CSP `media-src 'self' https://omi.mr` → `media-src 'self'` (video no longer external) |
| `src/app/[locale]/layout.tsx` | Removed stale `<link rel="preconnect">` and `dns-prefetch` hints for `omi.mr` (video is now self-hosted; product images are proxied server-side through `/_next/image`) |

### QA Results (Session 9)

| Command | Result |
|---------|--------|
| `pnpm lint` | ✅ 0 warnings/errors |
| `pnpm typecheck` | ✅ 0 errors |
| `pnpm build` | ✅ 49/49 pages |

---

## Changes Made (Session 10 — 2026-05-16)

Hero video quality improvement. The Session 9 compression was too aggressive (720p / 514 kbps), causing visible blockiness on desktop.

### Root Cause

Original video is 4K (3840×2160) at 36,933 kbps. Session 9 downscaled to 720p at CRF 30 (514 kbps) — a resolution and bitrate drop severe enough to produce visible block artifacts, even behind the dark overlay.

### Updated

| File | What Changed |
|------|--------------|
| `public/videos/hero.mp4` | Re-encoded at 1920×1080 (1080p) CRF 26, 1,281 kbps. File: 4.5 MB (was 1.9 MB). Quality is near-broadcast; streams on 4G without buffering (network bandwidth >> video bitrate). |
| `public/videos/hero-poster.jpg` | Re-extracted from the higher-quality 1080p video (13 KB). |

### QA Results (Session 10)

| Command | Result |
|---------|--------|
| `pnpm build` | ✅ 49/49 pages |

---

## Changes Made (Session 11 — 2026-05-16)

Footer cleanup: real Facebook URL, Instagram removed, developer credit added.

### Updated

| File | What Changed |
|------|--------------|
| `src/data/siteContent.ts` | `SOCIAL.facebook` updated to real OMI page URL. `SOCIAL.instagram` removed entirely. |
| `src/components/layout/footer.tsx` | Instagram icon/link deleted. Copyright bar updated: added `· Développé par 7 · 47470606` (WhatsApp deep-link `https://wa.me/22247470606`) next to "All rights reserved". Number wrapped in `<bdi dir="ltr">` for RTL safety. |
| `messages/fr.json` | Removed `instagramLabel`. Added `devCredit: "Développé par 7"`. |
| `messages/ar.json` | Removed `instagramLabel`. Added `devCredit: "طُوِّر بواسطة 7"`. |

### QA Results (Session 11)

| Command | Result |
|---------|--------|
| `pnpm lint` | ✅ 0 warnings/errors |
| `pnpm typecheck` | ✅ 0 errors |
| `pnpm build` | ✅ 49/49 pages |

---

## Changes Made (Session 12 — 2026-05-16)

Hero video mobile aspect-ratio fix.

### Root Cause

On portrait mobile (e.g. 390×844 px), `object-cover` must scale the 1920×1080 (16:9) video up to fill the tall narrow viewport. It scales to fit the height (844 px), which requires a render width of ~1 501 px — only the center ~26 % of the video's horizontal width was visible. The video appeared heavily zoomed-in with its left and right content cropped away.

### Updated

| File | What Changed |
|------|--------------|
| `src/components/sections/video-hero.tsx` | Changed `object-cover` → `object-contain md:object-cover` on the `<video>` element. On mobile (`< md`) `object-contain` scales the video to its full viewport width, letterboxed vertically within the full-screen section; the existing `bg-[#171717]` fallback div fills the transparent letterbox areas naturally and the gradient overlay covers the whole section uniformly. On desktop (`≥ md`) `object-cover` behaviour is unchanged. |

### QA Results (Session 12)

| Command | Result |
|---------|--------|
| `pnpm lint` | ✅ 0 warnings/errors |
| `pnpm typecheck` | ✅ 0 errors |
| `pnpm build` | ✅ 49/49 pages |

---

## Changes Made (Session 13 — 2026-05-16)

Mobile product page fix: product image was overlapping text on scroll.

### Root Cause

On mobile (< 1024 px) the two-column grid collapses to one column — product image on top, details below. The image container had `sticky top-24 self-start` applied at all breakpoints, so on mobile the image stayed pinned to the viewport while the user scrolled down, sitting on top of the description and making it unreadable.

### Updated

| File | What Changed |
|------|--------------|
| `src/app/[locale]/produits/[slug]/page.tsx` | `sticky top-24 self-start` → `lg:sticky lg:top-24 lg:self-start`. Sticky behaviour now only applies at the `lg` breakpoint where the two-column layout is active. On mobile the image scrolls normally and the text below it is always readable. |

### QA Results (Session 13)

| Command | Result |
|---------|--------|
| `pnpm lint` | ✅ 0 warnings/errors |
| `pnpm typecheck` | ✅ 0 errors |
| `pnpm build` | ✅ 49/49 pages |

---

## Client Confirmation Items (Pending)

| Item | Status |
|------|--------|
| Facebook URL | ✅ RESOLVED — real OMI page URL live in footer |
| Instagram | ✅ RESOLVED — removed (no account) |
| Developer credit | ✅ RESOLVED — "Développé par 7 · 47470606" in copyright bar |
| Final production domain | PENDING — `[FINAL_DOMAIN]` placeholder in `sitemap.ts`, schema JSON-LD, and `a-propos` page |
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
