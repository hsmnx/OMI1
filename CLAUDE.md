# CLAUDE.md — OMI Mauritanie Website

## Project Identity

**Client:** OMI — Mauritanian cleaning-products brand  
**Location:** Nouakchott, Mauritania (Zone industrielle Dar Naim)  
**Site type:** Public marketing and product catalog website  
**Working directory:** `artifacts/nextjs-app/`

## Commands

Run from `artifacts/nextjs-app/`:
```bash
pnpm dev        # development server
pnpm lint       # ESLint
pnpm typecheck  # TypeScript (tsc --noEmit)
pnpm build      # production build
```

Or from workspace root using filter:
```bash
pnpm --filter @workspace/nextjs-app dev
pnpm --filter @workspace/nextjs-app build
```

## Stack

- **Framework:** Next.js 15.3.2, App Router, React 19
- **i18n:** next-intl 3.26.3 — locales `['fr', 'ar']`, defaultLocale `'fr'`
- **Styling:** Tailwind CSS 4 + shadcn/ui components in `src/components/ui/`
- **Animation:** Motion 12 (`import { motion } from 'motion/react'`)
- **Validation:** Zod 3
- **Path alias:** `@/` → `src/`
- **Package manager:** pnpm

## Project Scope

**In scope:**
- Homepage
- Products / catalog page (`/produits`)
- Product detail pages (`/produits/[slug]`)
- About / brand story (`/a-propos`)
- Contact page (`/contact`)
- French version (primary)
- Arabic RTL version (fully polished)

**Out of scope — never add:**
- Login / register / authentication
- Sessions or cookies (unless a real approved feature requires it)
- Shopping cart
- Checkout or payment
- Order management
- User dashboard or admin dashboard
- Database or ORM (unless explicitly requested by client)
- CSRF middleware (no cookie-session state-changing endpoints exist)
- Fake reviews, fake prices, fake certifications, fake statistics

## Template Transition Rules

The `artifacts/nextjs-app/` directory is the implementation target — a Next.js template foundation that already has working i18n, RTL, security headers, and build tooling.

The `Rebuild OMI Website/` directory at the workspace root is the imported Figma/Stitch design — the visual and structural starting point. Do not delete it. Port design patterns from it; replace all fake/demo content.

- Keep: i18n setup, RTL setup, security headers, layout structure, UI primitives, Zod, Motion setup
- Remove/replace: generic hero cards, demo text, example API route, placeholder card grid
- Do not restart from scratch

## Content Source Rules

**Source:** https://omi.mr/ — content and asset extraction only  
**Do NOT copy:** old layout, old template structure, outdated visual design, old code patterns

Extract from it:
- Logo and brand mark
- Product names (FR + AR)
- Product images (`https://omi.mr/imageView.php?id=N`)
- Product categories (FR + AR)
- Brand description text (FR + AR)
- Contact information
- Navigation labels (FR + AR)

Sanitize all scraped/imported content before rendering. Do not trust raw HTML from external sources.

## Data Architecture Rules

- All product data in `src/data/products.ts`
- All category data in `src/data/categories.ts`
- Brand/contact constants in `src/data/siteContent.ts`
- TypeScript interfaces in `src/types/product.ts`
- **Never** hardcode product objects inside UI components or page files
- UI strings (nav labels, headings, button text, form labels) live in `messages/fr.json` and `messages/ar.json`
- Product/category content may live in centralized localized data files

## Component Architecture Rules

- Small, focused components
- Reusable layouts in `src/components/layout/`
- Section components in `src/components/sections/`
- UI primitives in `src/components/ui/` (shadcn/ui — do not modify)
- No giant catch-all files
- No duplicate components
- Prefer editing existing clean files over creating new ones

## RTL / i18n Rules

- French: `lang="fr"`, LTR
- Arabic: `lang="ar"`, `dir="rtl"`
- Arabic font: Tajawal (loaded via `next/font/google`)
- Both `lang` and `dir` are set on `<html>` in `src/app/[locale]/layout.tsx`
- Use CSS logical properties (`start-`, `end-`, `ms-`, `me-`, `ps-`, `pe-`) instead of `left-`/`right-` in reusable components
- Translation keys: semantic (`products.catalog.title`, not `title1`)
- Missing translations must be visible during development

## Design / UI Rules

Quality benchmark: Blueland, Method, Puracy (reference only — do not copy)

- Modern, premium, clean, smooth, consumer-brand quality
- Warm off-white background `#f8f7f5`
- Near-black `#171717` primary
- Near-square border-radius (Figma reference: `rounded-sm`)
- Strong product photography
- Smooth hover states (`translateY(-4px)` + shadow on product cards)
- Clear high-contrast CTA buttons
- Strong typographic hierarchy

## Animation Rules

- Use `transform` and `opacity` only
- Quick interactions: 150–200ms ease-out
- Fade/appear: 300–500ms ease
- No layout-affecting animations (no width/height/top/left)
- No continuous looping unless extremely subtle (marquee banner is the exception)
- No bounce/spring/elastic effects
- Always wrap Motion animations in `prefers-reduced-motion` checks

## Security Rules

- No hardcoded secrets
- All secrets in `.env.local` (never committed)
- `.env.example` with placeholder values only
- No `dangerouslySetInnerHTML` unless sanitized
- Use `rel="noopener noreferrer"` on all external links
- No cookies or sessions unless a real authenticated feature exists
- Contact form rate limiting must not require sessions

## Backend Rules

- Minimal Route Handlers only
- Zod validation on all inputs
- Rate limiting for contact form (in-memory, IP-based)
- Honeypot field on contact form
- No database unless explicitly requested
- Return generic error messages (never expose internal errors)
- No authentication, no sessions

## Performance Rules

- `next/image` for all images (width + height required to prevent layout shift)
- Hero image: `priority` prop
- Below-fold images: lazy-load (default)
- Font: `font-display: swap` (handled by `next/font/google` automatically)
- Animations: transform/opacity based only
- No heavy scroll effects
- Remove all `console.log` / `debugger` before production

## SEO Rules

- Unique `title` and `description` for every page
- `generateMetadata` in every page file
- Open Graph tags on all pages
- `lang="fr"` / `lang="ar"` on `<html>`
- One `<h1>` per page
- Semantic HTML throughout
- Organization schema on homepage
- Product schema on product detail pages
- BreadcrumbList on catalog and product pages
- hreflang: mark as TODO until final production domain is confirmed
- Domain placeholder: `[FINAL_DOMAIN]`

## Accessibility Rules

- All interactive elements keyboard-navigable
- Visible focus states
- Meaningful `alt` text for content images, empty `alt` for decorative
- Sufficient color contrast
- Category filter chips: accessible button controls
- Mobile nav: `aria-expanded` + `aria-controls`
- Mobile drawer: correct focus management
- Language switcher: clear accessible label
- Contact form: all inputs have labels
- Touch targets: minimum 44×44px
- `prefers-reduced-motion` support

## File Hygiene Rules

- No random files
- No duplicate components
- No `.bak` / `.old` / `.tmp` files
- No unused imports
- No dead code
- No unused pages, components, or data files
- No `console.log` in production code

## Environment Variables

```
# Contact form (optional — logs to console without these)
CONTACT_SMTP_HOST=
CONTACT_SMTP_PORT=587
CONTACT_SMTP_USER=
CONTACT_SMTP_PASS=
CONTACT_TO_EMAIL=commercial@omi.mr
```

## Final Response Rules

Every Claude Code session working on this project must end with:
1. List of what was done
2. Commands run and whether they passed
3. Client confirmation items (anything pending client input)
4. Items not completed or verified (with reason)

Do not claim something was done unless it was actually done.

## Flag List — Do Not Change Without Client Approval

- Contact phone: `+222 22 51 11 11`
- Contact email: `commercial@omi.mr`
- Contact address: `Zone industrielle Dar Naim, Nouakchott, Mauritanie`
- Product image base URL: `https://omi.mr/imageView.php?id=N`
- Product catalog: 18 products, 7 categories (see `src/data/`)
- Locale list: `['fr', 'ar']`, defaultLocale `'fr'`
- Product 17 category assignment: currently `surface` — confirm with client (Arabic site lists it as vaisselle/dishwasher)

## Client Confirmation Items

These items are pending client input and must NOT be invented:

- [ ] Social media URLs (Facebook, Instagram) — placeholder links used
- [ ] Final production domain — use `[FINAL_DOMAIN]` as placeholder
- [ ] Arabic product names — sourced from omi.mr/AR, need client sign-off
- [ ] Product 17 (`Nettoyant lavandra 750ML`) category: FR site = surface, AR site = vaisselle
- [ ] SMTP credentials for contact form email delivery
- [ ] Higher-resolution product images (currently using `omi.mr/imageView.php?id=N`)
- [ ] Any slogans or brand claims beyond what appears on omi.mr
