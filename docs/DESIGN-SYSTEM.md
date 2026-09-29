# ADJ-WEB design system

## 1. Uniformity rules (enforced)

| Element | Spec | Source |
|---|---|---|
| Cards | `rounded-2xl`, white bg, zinc-200 border | shadcn `Card` (owned copy standardized) |
| Pills / chips / badges | `rounded-full`, mono 11–12px labels | shadcn `Badge` (pill base), marquee pills, filter chips |
| Buttons | `rounded-lg`, h-9 (lg), h-7 (sm); cobalt solid / zinc outline / bronze solid | shadcn `buttonVariants` |
| Sections | `py-14` rhythm, `max-w-6xl px-4` container; eyebrow (mono xs, gold) + display h2 + lede | `SectionHeading` pattern |
| Tight bands | `py-6` (trust band, ticker) | — |
| Type | Display: Space Grotesk (self-hosted); Body: Inter (self-hosted); Mono accents | `next/font/local`, `public/fonts/` |
| Icons | lucide, 16px standard, gold for wayfinding | — |

New work must reuse these — no one-off radii, paddings, or type treatments.

## 2. Theme specs (switch via navbar select → `data-theme` on `<html>`)

Persisted in `localStorage` (`adj-theme`), applied pre-paint by `themeInitScript`.
Zinc neutrals stay constant across themes so contrast never breaks. Only accent
+ canvas tokens move. AkmanOS lime pills stay verbatim in all themes.

### lagoon (default — owner's palette image)
- Canvas `#faf9f7` · blue `#2e6e9e` · navy `#1e3a5f` · bronze `#d97e2b` · soft tan `#f0b25c` · rust `#b45a2d` · espresso `#2e1f18`

### royal (vibrant cobalt + bronze, ivory, charcoal)
- Canvas `#fffdf7` (ivory) · cobalt `#0047ab` · deep navy `#002f6c` · bronze `#b27a24` · soft `#d9a94e` · rust `#a34a24` · espresso `#2b2118`
- Use when: maximum punch, announcements, admission-season campaigns.

### emerald (cobalt + green bridge + bronze, sage canvas)
- Canvas `#f6faf7` · blue `#2456a6` · deep `#173f63` · bronze `#b27a24` · soft `#d9a94e` · rust `#a34a24` · forest `#22301f`
- Alternating sections tint sage (`#edf3ed`), pills tint (`#e2ece2`); cards stay white.
- Use when: calm, organic, parent-reassurance pages.

### sand (camel/tan warmth, dusty blue + bronze)
- Canvas `#faf6ef` · blue `#2e6e9e` · navy `#1e3a5f` · camel-bronze `#c08a3e` · soft `#e3b96f` · rust `#a34a24` · espresso `#2e1f18`
- Alternating sections `#f3ede1`, pills `#ece4d3`; cards stay white.
- Use when: warm community feel, Harmattan-season campaigns.

## 3. Token map (Tailwind v4, `globals.css`)

Accent roles — never hardcode these hexes in markup:
`--cobalt` (primary actions, links) · `--cobalt-deep` (hovers) · `--gold` (bronze headlines, eyebrows, icons) · `--gold-soft` (fills) · `--rust` (deep accents) · `--espresso` (dark surfaces) · `--background` (canvas).
Per-theme overrides live under `[data-theme="…"]`; zinc + shadcn tokens are theme-constant.
