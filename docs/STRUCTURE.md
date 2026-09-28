# ADJ-WEB structure plan

## Route map (`src/app/`)

| Route | Content | Phase |
|---|---|---|
| `/` | Homepage (hero, stats, services, tutorials, results, CBT band, about, FAQ, booking) | P1 DONE |
| `/programs` | Programme index | P2 |
| `/programs/[slug]` | `jamb` · `waec` · `neco` · `gce` · `jupeb` · `international` · `admissions` · `tutorials` — one SEO page per search term parents Google | P2 |
| `/results` | Full stories + stats wall | P2 |
| `/about` | ADJ story, Greater Heights partnership, team, location | P2 |
| `/contact` | Booking v1 (WhatsApp prefill — same form as home) | P2 |
| `/booking` | Booking v2: calendar date-pick + Availability Scheduler + Supabase persistence + OTP verify | P3 |
| `/blog`, `/blog/[slug]` | Articles (Rich Text Editor composer, Related Articles Slider) | P4 |
| `/portal/*` | Auth (Login/Sign-Up/Forgot cards) + dashboard (App Shell, tables, notifications) | P5 |
| `/admin/*` | Bookings/students tables + charts analytics | P5 |

## Component map (`src/components/`)

- `ui/` — shadcn primitives, owned code (see shadcn section below)
- `statistic-cards/`, `testimonial-card/`, `bouncy-accordion/`, `animated-text/` — AkmanOS blocks (verbatim source, ADJ data wired)
- `site-header.tsx`, `site-footer.tsx` — shell
- `home/` — `hero, services, tutorials, proof, faq, contact` section composition
- Phase-gated later: `programs/`, `booking/`, `blog/`, `portal/`, `admin/`

## Data (`src/lib/`)

- `site.ts` — every business fact (phones, address, services, FAQs, testimonials). TODO = still needs the real value.
- `programs.ts` (P2) — per-programme content feeding `/programs/[slug]`.

## Assets (`public/`)

- `adj-logo.png`, `adj-icon.png` (live), `testimonials/` (demo SVGs → real photos), `gallery/` (center photos, when supplied)

## Phase exit criteria

- P1 DONE: scaffold, bronze/cobalt theme, homepage, 4 AkmanOS blocks, marquee, tsc+lint+build green, pushed.
- P2: 7 programme pages + results/about/contact live. Needs: real contact details. No prices needed.
- P3: booking writes to Supabase, confirm via dialog + sonner toast. Needs: Supabase URL/anon key, fee/availability facts.
- P4: blog live. Needs: author workflow decision.
- P5: portal + admin. Needs: auth strategy, Paystack decision.
