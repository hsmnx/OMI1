# Reusable Design Polish Prompt

Use this prompt when you want to bring any frontend component, page, or feature up to production-quality, premium consumer-brand standard using the `/polish` command from the Impeccable skill.

Paste this entire prompt into a new Claude Code session (or prepend it to your task), then describe what you want polished at the bottom.

---

## THE PROMPT

```
You are working on a premium consumer-brand frontend. Before touching anything, load the design system context by reading:
- CLAUDE.md (project rules, stack, design tokens, animation rules, RTL/i18n rules)
- The component files you are about to polish

Then run a systematic /polish pass using the Impeccable skill standard. Work through every dimension below methodically. Fix every issue you find. Never polish one area and leave another rough.

---

## DESIGN STANDARD

Quality benchmark: Blueland, Method, Puracy — modern, premium, clean, consumer-brand.

Core palette:
- Background: #f8f7f5 (warm off-white)
- Primary: #171717 (near-black)
- Border radius: rounded-sm (2px)
- Hover lift: translateY(-4px) + shadow on cards
- CTA: high-contrast, clear hierarchy

Stack: Next.js 15 App Router, React 19, Tailwind CSS 4, Motion 12 (motion/react), next-intl, shadcn/ui

---

## POLISH CHECKLIST — WORK THROUGH EVERY ITEM

### 1. Design System Alignment
- [ ] All values use design tokens or Tailwind scale — no arbitrary hard-coded px values except where necessary
- [ ] Spacing follows a consistent rhythm (4/8/12/16/20/24/32/40/48/64px scale)
- [ ] No one-off implementations when a shared component already exists in src/components/ui/
- [ ] Border radius is consistent (rounded-sm = 2px for cards/buttons, rounded-full for pill badges only)

### 2. Typography
- [ ] One h1 per page, clear heading hierarchy (h1 > h2 > h3)
- [ ] Body text: 45–75 characters per line max (max-w-prose or explicit max-w-md/max-w-xl)
- [ ] No widows (single word on last line) in headings or short body copy
- [ ] Font weights are intentional: body = regular/medium, headings = semibold/bold, labels = semibold
- [ ] Letter spacing on uppercase labels: tracking-widest
- [ ] Line height on large headings: leading-none or leading-tight

### 3. Color & Contrast
- [ ] All text passes WCAG AA contrast ratio (4.5:1 body, 3:1 large text)
- [ ] Text on dark backgrounds: white or white/80 — never gray on dark
- [ ] Text on colored backgrounds: use a shade of that color, not neutral gray
- [ ] Focus rings have enough contrast for their background (dark ring on light, white ring on dark)

### 4. Interactive States — Every interactive element needs ALL of these:
- [ ] Default: clean resting state
- [ ] Hover: subtle feedback (color shift, translateY(-1px to -4px), shadow deepening)
- [ ] Focus-visible: ring-2 ring-{color} — NEVER remove without replacement. On dark bg: ring-white. On light bg: ring-neutral-900
- [ ] Active: scale-[0.97–0.99] or slight color darken for tap feedback
- [ ] Disabled: opacity-50 cursor-not-allowed (if applicable)

### 5. Animation (transform and opacity ONLY)
- [ ] Quick interactions (hover, tap): 150–200ms ease-out
- [ ] Entrance animations: 300–500ms ease
- [ ] Stagger: index * 0.07s (7 items = 0.49s total — acceptable)
- [ ] whileInView: viewport={{ once: true }} — never re-animates on scroll back
- [ ] No width/height/top/left/margin animations — layout-affecting = jank
- [ ] No bounce/spring/elastic easing
- [ ] ALWAYS: const shouldReduce = useReducedMotion(); initial={shouldReduce ? false : { ... }}
- [ ] Tailwind motion-reduce: variants on CSS-only animations (marquees, hovers)

### 6. Accessibility
- [ ] All interactive elements keyboard-navigable (tab order logical)
- [ ] focus-visible rings visible and high-contrast on every interactive element
- [ ] aria-current="page" on active nav link
- [ ] aria-label on icon-only buttons and image links
- [ ] aria-hidden="true" on decorative elements (icons, separators, backgrounds)
- [ ] aria-labelledby on section landmarks, connected to the visible h2
- [ ] Meaningful alt text on content images; alt="" on decorative images
- [ ] Mobile menu: aria-expanded + aria-controls on the toggle button
- [ ] Touch targets: minimum 44×44px on ALL interactive elements (cards, buttons, links)
- [ ] No outline: none without a visible focus-visible replacement

### 7. RTL / i18n
- [ ] No left-/right- directional Tailwind classes in reusable components — use start-/end-/ms-/me-/ps-/pe- (CSS logical properties)
- [ ] text-center and items-center are locale-neutral — fine to use
- [ ] items-start aligns to the start of writing direction — correct for RTL
- [ ] No hardcoded strings — all UI copy through t() from next-intl
- [ ] Translation keys are semantic: products.catalog.title, not title1

### 8. Responsiveness
- [ ] Mobile-first: base classes for mobile, sm:/md:/lg: for larger screens
- [ ] No horizontal scroll at any viewport width
- [ ] Text readable at 320px minimum width (no overflow)
- [ ] Grid reflow is logical: more columns at wider viewports
- [ ] Orphaned last items in grids: center them (col-start-2 or similar) for visual balance

### 9. Images & Video
- [ ] next/image for ALL images (width + height required; or fill + aspect-ratio container)
- [ ] Hero image: priority prop
- [ ] Below-fold: lazy load (default)
- [ ] Video: autoPlay muted loop playsInline — all four attributes required for cross-browser silent autoplay
- [ ] Video error fallback state implemented (onError handler)
- [ ] No layout shift on image/video load (fixed dimensions or aspect-ratio container)

### 10. Code Quality
- [ ] No console.log, no debugger
- [ ] No unused imports
- [ ] No dead code, no commented-out blocks
- [ ] No 'use client' on components that don't need it
- [ ] TypeScript: no any, no @ts-ignore
- [ ] No hardcoded content inside UI components — strings from translations, data from data files

---

## HOW TO APPLY

After reading the component files:

1. List every issue you find, classified as:
   - FUNCTIONAL (blocks or confuses the user) — fix first
   - VISUAL (looks off, doesn't impede) — fix after functional

2. Fix all issues in a single editing pass — don't bounce between files repeatedly

3. Run: pnpm typecheck && pnpm lint && pnpm build

4. Report what was fixed and confirm all checks pass

---

## WHAT TO POLISH

[DESCRIBE THE COMPONENT, PAGE, OR FEATURE YOU WANT POLISHED HERE]

Examples:
- "Polish the contact page and form"
- "Polish the product detail page"  
- "Polish the footer"
- "Polish everything on the /produits catalog page"
```

---

## HOW TO USE THIS PROMPT

1. Copy the block above (between the triple backticks)
2. Replace the `[DESCRIBE THE COMPONENT...]` placeholder with what you want polished
3. Paste into a new Claude Code session
4. The LLM will systematically audit and fix every dimension of the checklist

---

## TIPS FOR BEST RESULTS

- **Be specific about scope.** "Polish the homepage hero" is better than "polish everything." Polish one surface at a time for highest quality.
- **Run it after building, not before.** Polish is the last step — the feature must be functionally complete first (per Impeccable's rules).
- **Combine with `/critique`** if you want user-persona-based scoring before the fix pass. Run critique first, then paste its priority issues at the bottom of this prompt.
- **For RTL-specific polish,** add: "Also test the Arabic locale — verify RTL layout is correct, no LTR-only directional classes, and typography uses the Tajawal font."
- **For animation-heavy sections,** add: "Also check that all animations pass the motion checklist — no layout-affecting properties, no continuous loops except marquees, stagger within 500ms total."
- **For new components being added,** add: "This component did not exist before — also verify it matches the design system of adjacent components for visual consistency."

---

## REFERENCE: All 23 Impeccable Commands

| Command | When to use |
|---------|-------------|
| `/craft` | Build or redesign a component end-to-end with committed design choices |
| `/teach` | Generate PRODUCT.md context from the project for future skill sessions |
| `/document` | Generate DESIGN.md design system documentation |
| `/extract` | Extract reusable tokens or patterns from existing UI |
| `/shape` | Reshape layout structure and visual hierarchy |
| `/critique` | UX evaluation with scoring and persona-based testing — run BEFORE /polish |
| `/audit` | Accessibility + performance technical audit |
| `/polish` | Final quality pass — alignment, spacing, states, copy, micro-details |
| `/bolder` | Make a timid or bland design more confident and expressive |
| `/quieter` | Calm down an overdesigned or cluttered UI |
| `/distill` | Strip to essential elements — remove what doesn't serve the user |
| `/harden` | Add error states, edge cases, and defensive UI patterns |
| `/onboard` | Design or improve onboarding flows and empty states |
| `/animate` | Add purposeful animations and micro-interactions |
| `/colorize` | Improve or rethink the color system |
| `/typeset` | Improve typography — scale, weight, leading, pairing |
| `/layout` | Fix or redesign spacing, grid, and layout rhythm |
| `/delight` | Add moments of joy and personality |
| `/overdrive` | Push ambitious visual effects to feel technically extraordinary |
| `/clarify` | Improve UX copy, labels, and error messages |
| `/adapt` | Make the UI responsive across breakpoints |
| `/optimize` | Performance and render optimization for the UI layer |
| `/live` | Iterate on UI live in the browser |

**Recommended workflow for a new feature:**
`/shape` → `/craft` → `/harden` → `/critique` → `/polish`

**Recommended workflow for an existing page:**
`/critique` → `/audit` → `/polish`
