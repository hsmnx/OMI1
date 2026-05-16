# Product Requirement Document — OMI Mauritanie Website

**Version:** 1.0  
**Date:** 2026-05-14  
**Status:** In Progress

---

## 1. Product Overview

**Project:** OMI Mauritanie Website Rebuild  
**Client:** OMI — cleaning-products brand, Nouakchott, Mauritania  
**Type:** Public marketing and product catalog website (not e-commerce)  
**Working directory:** `artifacts/nextjs-app/`

OMI is a Mauritanian company specializing in high-quality cleaning products including dishwashing liquids, surface cleaners, glass cleaners, bleach, paste soaps, handwash liquids, and powder detergents. The website serves as a digital brand presence and product catalog for Mauritanian consumers, retailers, and distributors.

---

## 2. Project Goals

1. Establish a modern, premium digital brand presence for OMI
2. Deliver a bilingual product catalog (French primary, Arabic fully polished RTL)
3. Implement SEO-ready architecture for organic discovery
4. Provide a mobile-first user experience
5. Create a polished Arabic RTL experience that feels native
6. Connect real product data from the 18-product catalog
7. Provide a secure contact channel for commercial inquiries

---

## 3. Target Audience

- Mauritanian households and consumers
- Retail buyers and distributors
- Businesses seeking bulk cleaning products
- French-speaking and Arabic-speaking Mauritanians

---

## 4. Website Type

Public marketing website + product catalog.

**This is NOT:**
- An e-commerce platform
- A SaaS application
- An admin tool or dashboard
- A login-based system

---

## 5. Scope

### In Scope

| Page | FR Route | AR Route |
|---|---|---|
| Homepage | `/fr` | `/ar` |
| Products / Catalog | `/fr/produits` | `/ar/produits` |
| Product Detail | `/fr/produits/[slug]` | `/ar/produits/[slug]` |
| About | `/fr/a-propos` | `/ar/a-propos` |
| Contact | `/fr/contact` | `/ar/contact` |

Root `/` redirects to `/fr`.

### Out of Scope

- Login / register / authentication
- Shopping cart
- Checkout and payment processing
- Order management
- User accounts or profiles
- Admin dashboard
- Database (unless explicitly requested)
- CSRF middleware (no cookie-session state-changing flow)
- Fake reviews, fake prices, fake certifications
- Newsletter subscription (email marketing)

---

## 6. Template Transition Requirements

The repository contains:
- **`Rebuild OMI Website/`** — Figma/Stitch design import (Vite + React Router SPA). Visual design reference; contains demo/placeholder content that must be replaced.
- **`artifacts/nextjs-app/`** — Next.js 15 template foundation. The implementation target.

Requirements:
- Remove all temporary demo/placeholder content from `artifacts/nextjs-app/`
- Preserve the working Next.js / next-intl / RTL / security infrastructure
- Port visual design patterns from `Rebuild OMI Website/` into the Next.js app
- Connect real OMI brand content (from https://omi.mr/)
- Do not restart from scratch; do not break working infrastructure

---

## 7. Content Source Rules

**Primary content source:** https://omi.mr/  
**Arabic content source:** https://omi.mr/AR/index.html

Use for: brand text, product names, product images, category names, contact info, nav labels.  
Do NOT copy: old layout, old template structure, old visual design, old code patterns.  
Sanitize all imported content before rendering.

---

## 8. Product Catalog

### 7 Product Categories

| ID | French Name | Arabic Name |
|---|---|---|
| `detergent` | Détergent poudre | مسحوق الغسيل |
| `lave-main` | Lave main liquide | سائل غسيل اليدين |
| `javel` | Javel | المبيض |
| `savon` | Savons en pâte | صابون القوالب |
| `vitres` | Nettoyant vitres | منظف الزجاج |
| `surface` | Nettoyant surface | منظف الأسطح |
| `vaisselle` | Nettoyant vaisselle | منظف الأواني |

### 18 Products

| # | Slug | French Name | Arabic Name | Category | Size | Image |
|---|---|---|---|---|---|---|
| 1 | `nettoyant-vaisselle-limon-750ml` | Nettoyant vaisselle limon | منظف الأطباق بنكهة الليمون | vaisselle | 750ML | id=1 |
| 2 | `lave-main-lavandra-300ml` | Lave main lavandra | غسول اليدين برائحة اللافندر | lave-main | 300ML | id=2 |
| 3 | `nettoyant-vitres-lavandra-500ml` | Nettoyant vitres lavandra | منظف النوافذ برائحة اللافندر | vitres | 500ml | id=3 |
| 4 | `nettoyant-vitres-original-500ml` | Nettoyant vitre original | منظف النوافذ الأصلي | vitres | 500ml | id=4 |
| 5 | `nettoyant-surface-limon-1-5l` | Nettoyant surface limon | منظف السطح بنكهة الليمون | surface | 1,5L | id=5 |
| 6 | `nettoyant-surface-lavandra-1-5l` | Nettoyant surface lavandra | منظف السطح برائحة اللافندر | surface | 1,5L | id=6 |
| 7 | `nettoyant-surface-original-1-5l` | Nettoyant surface original | منظف السطح الأصلي | surface | 1,5L | id=7 |
| 8 | `eau-de-javel-original-1l` | Eau du javel original | ماء الجاوي الأصلي | javel | 1L | id=8 |
| 9 | `detergent-poudre-25g` | Détergent poudre | مسحوق منظف | detergent | 25g | id=9 |
| 10 | `detergent-poudre-15g` | Détergent poudre | مسحوق منظف | detergent | 15g | id=10 |
| 11 | `savon-pates-citron-1kg` | Savon pâtes citron | صابون الليمون بالقوالب | savon | 1kg | id=11 |
| 12 | `nettoyant-surface-original-5l` | Nettoyant surface original | منظف السطح الأصلي | surface | 5L | id=12 |
| 13 | `lave-main-original-300ml` | Lave main original | غسول اليدين الأصلي | lave-main | 300ML | id=13 |
| 14 | `savon-pates-original-1kg` | Savon pâtes original | صابون القوالب الأصلي | savon | 1kg | id=14 |
| 15 | `savon-pates-citron-0-25kg` | Savon pâtes citron | صابون الليمون | savon | 0,25kg | id=15 |
| 16 | `savon-pates-citron-0-5kg` | Savon pâtes citron | صابون الليمون بالقوالب | savon | 0,5kg | id=16 |
| 17 | `nettoyant-lavandra-750ml` | Nettoyant lavandra | منظف برائحة اللافندر | surface* | 750ML | id=17 |
| 18 | `eau-de-javel-original-5l` | Eau du javel original | ماء الجاوي الأصلي | javel | 5L | id=18 |

\* Product 17 category: FR site lists as `surface`, AR site lists as `vaisselle`. **CLIENT CONFIRMATION REQUIRED.**

---

## 9. Page Requirements

### Homepage (`/`)
Sections:
1. Hero — brand visual, headline ("Produits de nettoyage Haute qualité"), CTA buttons
2. Brand intro marquee strip — dark scrolling text band
3. Featured products grid — 6 products (first 6 in catalog)
4. Why OMI — 3-column brand values section
5. About snippet — brand tagline with link to /a-propos
6. Contact CTA — dark section with phone/email and link to /contact

### Products / Catalog (`/produits`)
Sections:
1. Page hero — title, subtitle
2. Category filter chips — "Tous" + 7 categories (URL search param: `?categorie=`)
3. Product grid — all 18 or filtered subset
4. Empty state if no products match

Product card shows: image, category chip, product name, size. No price.

### Product Detail (`/produits/[slug]`)
Sections:
1. Image in colored background container
2. Category breadcrumb chip (links back to filtered catalog)
3. Product name (H1, locale-aware)
4. Size badge
5. Product description
6. Related products (same category, max 3)
7. Contact/inquiry CTA

No quantity selector, no Add to Cart, no price.

### About (`/a-propos`)
Content:
- Brand headline: "Nettoyage, Garantie & Sécurité et Durabilité"
- Brand description: OMI expertise and location
- Mission statement
- About image

Do not invent: founding date, certifications, awards, partnerships, export markets.

### Contact (`/contact`)
Content:
- Phone: +222 22 51 11 11 (clickable `tel:`)
- Email: commercial@omi.mr (clickable `mailto:`)
- Address: Zone industrielle Dar Naim, Nouakchott
- Optional contact form (if implemented: Zod validation, honeypot, rate limiting)

---

## 10. Content Model

### Product
```typescript
interface Product {
  id: number;
  slug: string;
  categoryId: string;
  nameFr: string;
  nameAr: string;
  size: string;
  scent?: 'limon' | 'lavandra' | 'original';
  imageId: number;
  bg: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  slug: string;
  nameFr: string;
  nameAr: string;
}
```

### SiteContent
Typed constants for contact info and social links — not locale-dependent.

---

## 11. Bilingual Requirements

- French is the primary language
- Arabic version must be fully polished — not a secondary translation
- All UI strings (nav, buttons, headings, labels) live in `messages/fr.json` and `messages/ar.json`
- Product/category content lives in `src/data/` files (localized fields)
- Arabic uses the Tajawal font (Google Fonts, loaded via `next/font/google`)
- Arabic adjusts line height for readability

---

## 12. RTL Requirements

- `dir="rtl"` and `lang="ar"` set on `<html>` for Arabic pages
- All components use CSS logical properties (`start-`, `end-`, `ms-`, `me-`)
- Two-column layouts auto-mirror via `dir="rtl"`
- Directional icons (arrows, chevrons) must flip in RTL
- Mobile navigation correct in RTL
- Arabic typography feels native, not a translated LTR layout

---

## 13. UI / UX Requirements

- Modern, premium, clean — consumer-brand quality
- Warm off-white background `#f8f7f5`
- Near-black primary
- Near-square border-radius
- Smooth product card hover: `translateY(-4px)` + shadow increase
- Active category filter chip: filled dark background
- Premium hero section
- Product-focused grid layout
- Clear CTA buttons

---

## 14. Motion / Interaction Requirements

- `transform` and `opacity` animations only
- Quick interactions: 150–200ms ease-out
- Fade/appear: 300–500ms ease
- Hero entrance: fade + translate-up
- Grid reveals: subtle stagger
- `prefers-reduced-motion` support
- No bounce/spring/elastic effects

---

## 15. Media / Image Requirements

- All product images from `https://omi.mr/imageView.php?id=N` via `next/image`
- `width` and `height` defined on all images (prevents layout shift)
- Hero image: `priority` prop
- Below-fold: lazy-load
- Domain whitelisted in `next.config.ts` `images.remotePatterns`

---

## 16. Backend / Contact Form Requirements

- `POST /api/contact` Route Handler
- Zod validation: name, email, message, honeypot (must be empty)
- In-memory rate limiting: 3 requests/minute per IP (no sessions)
- Returns generic error messages
- Does not store personal data
- Email delivery via SMTP env vars (console.log stub until client provides SMTP credentials)

---

## 17. Performance Requirements

- CLS below 0.1
- LCP below 2.5s (target)
- INP below 200ms (target)
- `next/image` optimization for all images
- `next/font/google` with font-display swap
- Static generation for all pages (`generateStaticParams`)
- No heavy scroll effects
- No layout-affecting animations
- Remove all `console.log` / `debugger` before production

---

## 18. Security Requirements

- Security headers in `next.config.ts`:
  - `Strict-Transport-Security`
  - `Content-Security-Policy` (scoped to actual domains used)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- No hardcoded secrets
- Secrets in `.env.local` only (never committed)
- `.env.example` with placeholders
- `rel="noopener noreferrer"` on all external links
- Sanitize content imported from omi.mr

---

## 19. SEO Requirements

- Unique `<title>` and `<meta description>` per page
- `generateMetadata()` in every page file
- Open Graph tags on all pages
- `lang` and `dir` attributes on `<html>`
- One `<h1>` per page
- Semantic HTML
- Organization JSON-LD on homepage
- Product JSON-LD on product detail pages
- BreadcrumbList JSON-LD on catalog and product pages
- `sitemap.ts` dynamic sitemap
- `robots.txt` pointing to sitemap
- **hreflang:** TODO until final production domain confirmed (`[FINAL_DOMAIN]`)

---

## 20. Accessibility Requirements

- All interactive elements keyboard-navigable
- Visible focus states on all focusable elements
- Meaningful `alt` text for content images
- Empty `alt=""` for decorative images
- Category filter chips are accessible `<button>` elements
- Mobile nav: `aria-expanded`, `aria-controls`
- Mobile drawer: correct focus management
- Language switcher: clear accessible label
- Contact form: all inputs have `<label>` elements
- Touch targets: minimum 44×44px
- RTL accessibility (screen reader compatible)
- `prefers-reduced-motion` support

---

## 21. Technical Architecture

```
artifacts/nextjs-app/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # Root layout, fonts, i18n provider
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── produits/
│   │   │   │   ├── page.tsx        # Product catalog
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Product detail
│   │   │   ├── a-propos/
│   │   │   │   └── page.tsx        # About page
│   │   │   └── contact/
│   │   │       └── page.tsx        # Contact page
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts        # Contact form endpoint
│   │   └── sitemap.ts              # Dynamic sitemap
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── marquee-banner.tsx
│   │   │   ├── product-card.tsx
│   │   │   ├── category-filter.tsx
│   │   │   ├── why-omi.tsx
│   │   │   └── contact-form.tsx
│   │   └── ui/                     # shadcn/ui (do not modify)
│   ├── data/
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   └── siteContent.ts
│   ├── types/
│   │   └── product.ts
│   ├── i18n/                       # Do not modify
│   ├── lib/utils.ts                # Do not modify
│   └── globals.css
├── messages/
│   ├── fr.json
│   └── ar.json
├── public/
│   ├── robots.txt
│   └── favicon.svg
├── next.config.ts
├── middleware.ts
└── docs/
    └── PRD.md                      # This file
```

---

## 22. File Hygiene Rules

- No random files
- No duplicate components
- No `.bak` / `.old` / `.tmp` files
- No unused imports or dead code
- No `console.log` in production
- No unused pages or components

---

## 23. Testing / QA Checklist

### Automated (run before every deploy)
- [ ] `pnpm lint` — 0 errors
- [ ] `pnpm typecheck` — 0 errors
- [ ] `pnpm build` — completes successfully

### Manual Verification
- [ ] `/fr` homepage: hero, marquee, 6 products, Why OMI, about snippet, contact CTA, footer
- [ ] `/ar` homepage: full RTL, Tajawal font, Arabic content, mirrored layout
- [ ] `/fr/produits`: all 18 products visible, category chips filter via URL
- [ ] `/ar/produits`: Arabic product names, RTL layout
- [ ] `/fr/produits/nettoyant-vaisselle-limon-750ml`: product detail page renders
- [ ] `/ar/produits/nettoyant-vaisselle-limon-750ml`: Arabic detail page renders
- [ ] `/fr/a-propos`: about page renders
- [ ] `/fr/contact`: contact info visible, form submits to `/api/contact`
- [ ] Language switcher changes locale correctly in URL
- [ ] No cart icon anywhere
- [ ] No prices anywhere
- [ ] No "Add to Cart" anywhere
- [ ] Mobile menu opens/closes with `aria-expanded`
- [ ] Phone link is `tel:+22222511111`
- [ ] Email link is `mailto:commercial@omi.mr`
- [ ] Security headers present in response headers
- [ ] No console errors
- [ ] No hydration errors
- [ ] No broken images
- [ ] No layout shift from missing image dimensions

---

## 24. Client Confirmation Items

These items are pending client input before final launch:

| Item | Status | Notes |
|---|---|---|
| Social media URLs | PENDING | Placeholder links used (Facebook, Instagram) |
| Final production domain | PENDING | Use `[FINAL_DOMAIN]` as placeholder |
| Arabic product names | PENDING | Sourced from omi.mr/AR — needs client sign-off |
| Product 17 category | PENDING | FR site: surface / AR site: vaisselle — which is correct? |
| SMTP credentials | PENDING | Contact form logs to console without these |
| Higher-res product images | PENDING | Currently using `omi.mr/imageView.php?id=N` |
| hreflang absolute URLs | PENDING | Requires final production domain |
| sitemap absolute URLs | PENDING | Requires final production domain |

---

## 25. Final Acceptance Criteria

The project is complete when:
1. All 5 pages render correctly in French and Arabic
2. All 18 products appear in the catalog with correct names and images
3. Category filter works via URL search params
4. Product detail pages for all 18 products are generated statically
5. Language switcher works between `/fr/...` and `/ar/...`
6. Arabic RTL layout is fully polished and native-feeling
7. No e-commerce features exist anywhere
8. Contact form submits to `/api/contact` without error
9. Security headers are present
10. `pnpm lint`, `pnpm typecheck`, `pnpm build` all pass
11. No placeholder text visible in the production UI
12. No console errors or hydration errors
