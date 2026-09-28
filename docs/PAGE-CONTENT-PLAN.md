# ADJ-WEB — page content plan

Source of truth for business facts: `src/lib/site.ts`. Route map: `docs/STRUCTURE.md`. Brief: `docs/BRIEF.md`.

This document specifies, per page: purpose, SEO, ordered sections, which block builds each section, and where
the content comes from. It also lists the facts the owner must supply before real copy can be written.

**Nothing in this plan invents a business fact.** Prices, pass rates, phone numbers and team members that
are not yet confirmed are written as `[OWNER: …]`.

---

## 0. Ground rules that shape every page

These are non-negotiable and come from `docs/BRIEF.md` §3. Each one is a *content* rule, not just a code rule.

1. **No study-abroad placement or visas.** Where relevant (`/programs/international`, `/programs/admissions`)
   the page must say so plainly, framed as scope clarity rather than apology. Never imply we handle placement.
2. **No private one-on-one coaching.** Every class is a group session. Where pricing or format is discussed,
   state it as a deliberate model — "group sessions only, so everyone gets the same teacher and the same
   pace" — not as a missing feature.
3. **Online means live group tutorials.** Never "online tutoring" without the word *group*.
4. **Testimonials and stats are demo data.** The "Sample stories" badge stays until real, consented
   testimonials and confirmed figures exist.
5. **No fees.** Do not invent, estimate, or hint at prices. The one allowed treatment is an explicit
   "fees confirmed on consultation" line paired with a booking CTA. Pricing is a separate future component.

---

## 1. Gotchas for the implementer

Found by reading the actual code. Each of these will bite during implementation.

1. **`TestimonialCard` ships GFA Studio defaults.** `src/components/testimonial-card/constants.ts` defines
   `DEFAULT_TESTIMONIAL` with quote/name `Gökhan` / `Founder @ GFA Studio` and
   `imageSrc: "/testimonials/gokhan.png"`. All five props are optional. **Any render that omits a prop
   will leak vendor placeholder content onto a client site.** Every call site must pass all five props
   explicitly. Consider deleting `DEFAULT_TESTIMONIAL` and making the props required, or adding a dev-time
   assertion.
2. **`StatisticCards` takes no props.** Data is hardcoded in
   `src/components/statistic-cards/constants.ts` (`STAT_CARDS`, 4 fixed keys, and a fixed
   `CARD_ICONS` map). A "stats wall" on `/results` is **impossible** without a refactor: add optional
   `cards` and `columns` props with backwards-compatible defaults so the homepage output is unchanged.
   The icon map must become a lookup keyed by string, with a fallback icon for unknown keys.
3. **`--primary` is near-white in dark mode.** `globals.css:128` sets `--primary: oklch(0.922 0 0)` inside
   `.dark`, overriding the cobalt `--primary: #2d52e8` from the base theme. So `buttonVariants({})` and
   `<Badge>` with the default variant render **white, not cobalt**. `home/hero.tsx` already works around
   this with explicit `bg-cobalt` / `bg-gold` classes — every new button and badge must do the same.
   (Also `--card` flattens to grey `oklch(0.205 0 0)` in dark mode, another reason to hand-roll cards
   rather than install shadcn's `card`.)
4. **`Marquee` repeats content 4×** and has no `prefers-reduced-motion` guard on `.animate-marquee` in
   `globals.css`. Screen readers announce the exam ticker four times, and the animation runs regardless of
   the user's motion preference. Fix by marking the duplicate copies `aria-hidden` and adding a
   reduced-motion media query.
5. **`nav` in `site.ts` is six homepage hash anchors** (`#services`, `#tutorials`, `#results`, `#about`,
   `#faq`, `#contact`) and it is rendered by **both** `site-header.tsx` and `site-footer.tsx`. On any inner
   page every nav item dangles. P2 must split this into `navRoutes` (real paths) and `navAnchors`
   (homepage section jumps), with the header picking based on pathname.
6. **The header CTA `href="#contact"` is a dangling anchor on every page except `/`.** This is the known
   issue called out in BRIEF §6. Fix it in the `/contact` step, not at the end.
7. **`services` in `site.ts` is dead data** — exported, 6 items, imported by nothing. The homepage
   services section was deleted (recoverable from git history) and the programme pages will supersede it.
   Either wire it into the new `src/components/sections/` programme cards or delete it to avoid two
   competing sources of truth for the same copy.
8. **Nothing exists under `src/app/` except `layout.tsx`, `page.tsx`, `globals.css`.** No subroutes, no
   `not-found.tsx`, no `sitemap.ts`, no `robots.ts`, no `error.tsx`/`loading.tsx`. Also no
   `src/lib/programs.ts` and no `public/gallery/`.
9. **Several shadcn components are listed as "removed" in the brief but `sonner` is still a dependency**
   in `package.json` with no `ui/sonner.tsx` and no `<Toaster />` anywhere. Re-adding it is a one-liner
   import, not a CLI install.
10. **21st.dev registry is key-gated (HTTP 403 proven).** Anything sourced from it (Availability
    Scheduler, Rich Text Editor, Related Articles slider) needs either a key in `.mcp.json` or a
    hand-rolled fallback. Magic UI's public registry works keyless — that is where `marquee` came from.

---

## 2. Shared section / block inventory

**Build once, use everywhere.** New shared blocks live in `src/components/sections/`.

| Block | Source | Status | Used on |
|---|---|---|---|
| `PageHero` | hand-rolled | build | `/programs`, `/programs/[slug]`, `/results`, `/about`, `/contact`, `/booking`, `/blog` |
| `Hero` | hand-rolled `home/hero.tsx` | exists | `/` |
| `SectionHeading` | hand-rolled (eyebrow + h2 + lede) | build | most pages |
| `SampleBadge` | shadcn `badge` (pattern exists in `home/proof.tsx`) | build | `/`, `/results`, `/about`, programme pages |
| `PartnerBadge` | shadcn `badge` + lucide `Handshake` | exists (hero) | `/`, `/programs`, `/about` |
| `ProgramCard` | hand-rolled | build | `/`, `/programs`, `RelatedPrograms`, footer |
| `RelatedPrograms` | hand-rolled (uses `ProgramCard`) | build | all 8 `/programs/[slug]` |
| `StatsBand` | AkmanOS `statistic-cards` | exists | `/`, `/programs`, `/results`, `/about` |
| `StoriesBlock` | AkmanOS `testimonial-card` | exists (`home/proof.tsx`) | `/`, `/results`, some programme pages |
| `StoriesFilter` | hand-rolled client | build | `/results` |
| `FaqBlock` | AkmanOS `bouncy-accordion` | exists (`home/faq.tsx`) → extract | `/`, `/programs`, ×8, `/results`, `/about`, `/contact` |
| `ModulesAccordion` | AkmanOS `bouncy-accordion`, different data | reuse | all 8 programme pages |
| `ProgramFacts` | hand-rolled | build | all 8 programme pages |
| `WhoFor` | hand-rolled | build | all 8 programme pages |
| `FormatPolicy` | hand-rolled + `badge` | build | all 8, `/programs` |
| `OutcomesList` | hand-rolled | build | all 8 programme pages |
| `ProcessTimeline` | hand-rolled | build | all 8, `/contact`, `/about` |
| `DisclaimerCallout` | hand-rolled + `badge` | build | `/programs`, `international`, `admissions`, `tutorials` |
| `LocationBlock` | hand-rolled | build | `/contact`, `/about`, compact variant on programme pages |
| `ConsultationForm` | hand-rolled + shadcn `input`/`textarea`/`select`/`label` (**install**) | build | `/contact`, `/` `#contact` |
| `ContactPanel` | hand-rolled + `buttonVariants` | build | `/contact` |
| `ProgramCta` | hand-rolled | build | `/programs`, ×8, `/results`, `/about`, `/blog` |
| `Breadcrumb` + `BreadcrumbList` JSON-LD | hand-rolled | build | all 8 programme pages, `/blog/[slug]` |
| `TeamGrid` | hand-rolled | build | `/about` |
| `StoryTimeline` | hand-rolled | build | `/about` |
| `ResultsTable` | hand-rolled `<table>` | build | `/results` |
| `ArticleGrid` / `ArticleCard` | hand-rolled | build | `/blog` |
| `ArticleToc` | hand-rolled | build | `/blog/[slug]` |
| `RelatedArticles` | 21st.dev carousel — **key-gated, blocked** | blocked | `/blog/[slug]` (P4) |
| `BookingSteps` | hand-rolled client | build | `/booking` (P3) |
| `DatePicker` | shadcn `calendar` (**install**, P3) or hand-rolled | build | `/booking` |
| `SlotGrid` | 21st.dev Availability Scheduler — **key-gated, blocked** | blocked | `/booking` (P3) |
| `OtpInput` | hand-rolled + `input` | build | `/booking` (P3) |
| `ConfirmDialog` | shadcn `dialog` (**install**) + `sonner` (pkg present, `<Toaster />` missing) | build | `/booking`, `/admin` |
| `PortalShell` / `AdminShell` | hand-rolled | build | `/portal/*`, `/admin/*` (P5) |
| `DataTable` | hand-rolled `<table>` (shadcn `table` never installed) | build | `/admin/*` (P5) |
| Analytics charts | **no chart library installed** — needs a new dependency | blocked | `/admin/analytics` (P5) |
| `ExamsTicker` | Magic UI `marquee` | exists (hero) | `/`, `/programs` |

### shadcn install list

Run with `npx shadcn@latest add <name>` (Base-UI variant, no `asChild` — use `buttonVariants` on `Link`).

| Component | Needed by | Phase |
|---|---|---|
| `input` | `ConsultationForm`, `OtpInput` | P2 |
| `textarea` | `ConsultationForm` | P2 |
| `select` | `ConsultationForm` (exam of interest, format) | P2 |
| `label` | `ConsultationForm` | P2 |
| `dialog` | `ConfirmDialog` | P3 |
| `calendar` | `DatePicker` | P3 |
| `sonner` | **already in `package.json`** — just add `ui/sonner.tsx` + `<Toaster />` | P3 |
| `card` | **not needed** — `--card` is grey in dark mode; hand-roll instead | — |
| `accordion` | **not needed** — AkmanOS `bouncy-accordion` already covers it | — |
| `table` | **not needed** — plain `<table>` with Tailwind is enough for P5 volumes | — |

---

## 3. Data model — `src/lib/programs.ts` (P2)

The 8 programme pages are **data-only**. One `src/app/programs/[slug]/page.tsx` template renders all 8.
This is the single highest-leverage decision in the plan: it turns 8 pages of layout work into 8 data
entries.

```ts
export type ProgramSlug =
  | "jamb" | "waec" | "neco" | "gce" | "jupeb"
  | "international" | "admissions" | "tutorials";

export interface Program {
  slug: ProgramSlug;
  name: string;                 // "JAMB / UTME Mastery"
  navLabel: string;             // "JAMB / UTME"  (header + footer + cards)
  exam: string;                 // eyebrow group: "JAMB / UTME"
  seoTitle: string;             // <title>, ≤60 chars
  seoDescription: string;       // ≤155 chars
  intent: "informational" | "commercial" | "transactional";
  keywords: string[];           // real search terms, incl. "Ikorodu" variants
  hero: { headline: string; sub: string; highlights: string[] };
  whoFor: string[];             // audience segments, parent-facing
  modules: { title: string; detail: string }[];   // renders in ModulesAccordion
  outcomes: string[];           // what a student walks out able to do
  process: { step: string; detail: string }[];   // renders in ProcessTimeline
  faqs: { q: string; a: string }[];              // 4–6, page-specific
  format: {
    mode: "physical" | "online" | "both";
    groupOnly: true;            // always true — constraint #2
    capacityNote: string;       // [OWNER: cohort capacity]
    scheduleNote: string;       // [OWNER: class timetable]
  };
  related: ProgramSlug[];       // internal linking
  disclaimer?: "no-study-abroad" | "no-one-on-one" | "partner-delivered" | "no-fees-published";
  cta: { headline: string; detail: string };
  demoStats?: StatCard[];       // only where a programme-specific figure exists
}
```

Export `programs: Program[]`, plus `getProgram(slug)`. `site.services` (6 items, currently imported
nowhere) maps onto these slugs — either delete it or reduce it to the homepage summary strip.

---

## 4. Page: `/` — Homepage

**Purpose.** Sell the whole range to a parent or student who has never heard of ADJ, and push them to
book a free consultation. Must work as a standalone answer to "what is this place and can I trust it?".

**SEO.** Title: `ADJ Educational Consultants — Ikorodu's home for exam success` (from layout default).
Meta: existing `site.description`. Intent: commercial + local. Target: "JAMB coaching Ikorodu",
"WAEC tutorial centre Igbe-Laara", "exam prep Ikorodu Lagos".

**Current state:** only Hero → Stats → Results → FAQ render. Services, tutorials, about and contact
sections were stripped; `services.tsx` / `tutorials.tsx` / `contact.tsx` are recoverable from git history
but should be **rebuilt against the new shared blocks** rather than restored verbatim, so the homepage
and the programme pages stay consistent.

| # | Section (`id`) | Purpose + copy direction | Block | Content source |
|---|---|---|---|---|
| 1 | `hero` | Existing, keep as-is. Cyan/gold headline split, partner badge, dual CTA, exam ticker. | hand-rolled `home/hero.tsx` | `site.*`, `exams` |
| 2 | `trust` | New thin band: "Group classes only · No study-abroad placement · Physical in Laara + live online groups". Sets expectations early, pre-empts the two FAQ objections. | hand-rolled `TrustBand` + `badge` + `separator` | new `site.policies` |
| 3 | `services` | 6 cards, one per service group. Replaces the deleted section. Heading direction: "Every external exam, handled in one place." | hand-rolled `ProgramCard` grid | `site.services` → migrate to `programs` |
| 4 | `stats` | Animated figures. **Keep a "sample figures" badge** — all numbers are demo. | AkmanOS `statistic-cards` | `statistic-cards/constants.ts` (demo) |
| 5 | `tutorials` | Physical vs online group formats, side by side. Addresses "can my child attend from Agunfoye?". | hand-rolled, two-column, `MapPin`/`MonitorSmartphone` | `site.address`, `site.partner` |
| 6 | `results` | Existing. Keep the "Sample stories" badge. | AkmanOS `testimonial-card` | `site.testimonials` (demo) |
| 7 | `cbt` | Stripped band, no source file exists. Promotes the CBT practice platform and links to `/programs/jamb`. **Blocked on a real URL** — `site.cbtUrl` is `"#"`. | hand-rolled, `cta` band | `site.cbtUrl` `[OWNER: real URL]` |
| 8 | `about` | Compact 3-sentence story + link to `/about`. | hand-rolled | `site.tagline`, new `site.storyShort` |
| 9 | `faq` | Existing, refactored to delegate to `FaqBlock`. | AkmanOS `bouncy-accordion` | `site.faqs` |
| 10 | `contact` | The consultation form. This is the page's conversion goal and the target of the header CTA. | hand-rolled `ConsultationForm` + shadcn form primitives (**install**) | `site.*` |
| 11 | `cta` | Closing band: book, or WhatsApp now. | hand-rolled `ProgramCta` | `site.whatsapp` |

**Internal links out:** every `ProgramCard` → `/programs/[slug]`; `#about` → `/about`;
`#contact` → `/contact` (once it exists).

---

## 5. Page: `/programs` — Programme index

**Purpose.** The hub. Let a visitor self-select the exam they care about in one scan, and let Google
crawl all 8 leaf pages from a single index.

**SEO.** Title: `Exam prep programmes in Ikorodu — JAMB, WAEC, NECO, JUPEB & more | ADJ`.
Intent: commercial. Target: "exam coaching programmes Ikorodu", "JAMB and WAEC prep Igbe-Laara".

| # | Section | Purpose + copy direction | Block | Content source |
|---|---|---|---|---|
| 1 | hero | `PageHero`: "Programmes" / "Pick the exam. We'll handle the path after it." Include location + format strip. | `PageHero` | `site.*` |
| 2 | index | 8 `ProgramCard`s in a responsive grid, grouped by phase: SS1–SS3 (jamb, waec, neco, gce) / post-secondary (jupeb, international) / services (admissions, tutorials). | hand-rolled grid of `ProgramCard` | `programs` |
| 3 | policy | One short band stating the four standing rules (group-only, no placement, online = live group, no published fees). | hand-rolled `FormatPolicy` + `badge` | new `site.policies` |
| 4 | ticker | Exam ticker, reused for consistency with the homepage. | Magic UI `marquee` | `exams` |
| 5 | stats | Compact figures band. Sample badge. | AkmanOS `statistic-cards` | demo constants |
| 6 | faq | 5 programme-selection FAQs (which exam am I sitting? can I switch? do you take beginners? what about people outside Ikorodu? do you publish fees?). | `FaqBlock` | new `programsIndexFaqs` |
| 7 | cta | Book a free consultation, or WhatsApp. | `ProgramCta` | `site.whatsapp` |

**Internal links out:** 8 × `/programs/[slug]`, `/contact`, `/results`, `/about`.

---

## 6. Page: `/programs/[slug]` × 8 — Programme SEO pages

**Purpose.** Rank for the one search term each parent actually types ("JAMB coaching Ikorodu",
"WAEC class Igbe-Laara"), answer the syllabus/format questions, and convert to consultation.
All 8 share **one** template; only `programs[slug]` differs.

**Shared template section order:**

| # | Section | Purpose + copy direction | Block | Content source |
|---|---|---|---|---|
| 0 | `breadcrumb` | Home / Programmes / {name}. Emits `BreadcrumbList` JSON-LD. | hand-rolled | `programs` |
| 1 | hero | `PageHero` variant: eyebrow = exam group, headline = programme name, sub = 1–2 sentences, plus 2–4 highlight pills (CBT drills, mock exams, cutoff guidance…). | `PageHero` + `badge` | `program.hero` |
| 2 | `who` | "Who this is for" — SS2, SS3, school leaver, parent. Written in second person, reassuring. | hand-rolled `WhoFor` | `program.whoFor` |
| 3 | `facts` | Quick facts strip: format, mode, duration, next intake `[OWNER]`, class size `[OWNER]`, subjects. | hand-rolled `ProgramFacts` | `program.format` |
| 4 | `modules` | Syllabus-paced module breakdown. This is the page's SEO depth — it is what ranks for long-tail subject queries. | AkmanOS `bouncy-accordion` | `program.modules` |
| 5 | `format` | Physical in Laara vs live online group, side by side, with the group-only rule stated. | hand-rolled `FormatPolicy` | `program.format` |
| 6 | `outcomes` | Concrete, non-numeric outcomes ("finish a full CBT mock inside the time limit", "know which courses your scores qualify for"). **No pass-rate claims.** | hand-rolled `OutcomesList` | `program.outcomes` |
| 7 | `process` | 4–5 steps: assessment call → placement in a cohort → weekly classes → drills/mocks → next step. | hand-rolled `ProcessTimeline` | `program.process` |
| 8 | `disclaimer` | Only where `program.disclaimer` is set. | hand-rolled `DisclaimerCallout` + `badge` | `program.disclaimer` |
| 9 | `related` | 3 sibling programmes, contextual not random. | hand-rolled `RelatedPrograms` | `program.related` |
| 10 | `faq` | 4–6 page-specific FAQs + `FAQPage` JSON-LD. | `FaqBlock` + JSON-LD | `program.faqs` |
| 11 | `cta` | Book a free consultation. Include the no-fees-published line. | `ProgramCta` | `program.cta` |

**Technical:** `generateStaticParams` returns the 8 slugs (fully static export), `generateMetadata`
per slug, `not-found.tsx` for unknown slugs.

### Per-slug content direction

**`/programs/jamb` — JAMB / UTME Mastery**
SEO: `JAMB coaching Ikorodu — CBT drills & mock exams | ADJ`. Intent commercial. Keywords: "JAMB
coaching Ikorodu", "UTME preparation Igbe-Laara", "JAMB CBT practice Lagos", "best JAMB tutorial Ikorodu".
Hero: "Walk into CBT already knowing the room." Modules: subject clusters (English, Maths, sciences,
commercials, arts), CBT interface familiarisation, timed drills, full mocks, cutoff/O-level blending,
post-UTME screening awareness. Disclaimer: `no-one-on-one` + note that practice runs on the ADJ CBT
platform (link gated on real `site.cbtUrl`). No pass-rate claims.

**`/programs/waec` — WAEC Success Classes**
SEO: `WAEC coaching Ikorodu — group classes for SS3 | ADJ`. Keywords: "WAEC class Ikorodu", "WAEC
tutorial Igbe-Laara", "SS3 coaching Lagos", "WAEC registration help". Modules: core subjects,
electives by track, past-question marathons, practical & theory balance, exam-format walkthrough,
registration support, exam-day strategy. Note: separate registration assistance from exam coaching.

**`/programs/neco` — NECO coaching**
SEO: `NECO coaching Ikorodu — internal & external candidates | ADJ`. This is a distinct intent: NECO has
internal (SSS1/2) and external (SSS3) papers, and many candidates sit it after WAEC. Modules: internal
vs external structure, subject coverage, practical (home economics, civics, ICT) emphasis, past-question
practice, revision timetable. State that external candidates can join mid-cohort.

**`/programs/gce` — GCE O-Level**
SEO: `GCE O-Level coaching Ikorodu | ADJ`. Intent informational-to-commercial; often a parent
researching a school leaver. Modules: core/elective structure, practical papers, WAEC-as-alternative
comparison (GCE vs WAEC — this is the actual query), combination rules. **Comparison is the SEO hook
here**; give a neutral, factual comparison, not a sales attack on WAEC.

**`/programs/jupeb` — JUPEB & Direct Entry**
SEO: `JUPEB coaching Ikorodu — direct entry into 200 level | ADJ`. Keywords: "JUPEB preparation Lagos",
"direct entry Ikorodu", "A-level coaching Nigeria". Modules: subject-combo selection against 200-level
requirements, university 200-level subject lists, reading + practice plan, application timing
(usually a fixed annual window — `[OWNER: exact dates]`), Common Entrance as an alternative route.
Note: this is exam prep, **not** placement.

**`/programs/international` — IELTS · TOEFL · SAT · GRE**
SEO: `IELTS & TOEFL coaching Ikorodu — with Greater Heights | ADJ`. Keywords: "IELTS preparation
Lagos", "SAT coaching Nigeria", "TOEFL class Ikorodu", "GRE prep Nigeria".
**Must lead with the scope boundary:** we prepare you for the test; we do not process study-abroad
admissions or visas, and we will refer you to trusted partners for that step. Delivered **with Greater
Heights Tutorial Center** — get written permission for the partner's name on this page `[OWNER]`.
Modules: test format per exam, band-score targeting, speaking/writing feedback, reading speed,
test-day strategy. Per-exam cards so IELTS and SAT each have their own anchor.

**`/programs/admissions` — Admission Processing**
SEO: `Post-UTME and admission processing Ikorodu | ADJ`. Keywords: "post-UTME screening prep Lagos",
"admission processing Ikorodu", "O-level blending", "course and school selection Nigeria".
Modules: post-UTME screening prep, O-level result blending, course and school selection, list
monitoring and follow-through, parent-facing progress updates. Disclaimer: `no-study-abroad` — we handle
Nigerian tertiary admissions only. Specify exactly which steps are included vs referred out
`[OWNER: scope of service]`. **No placement guarantees and no institution-name promises.**

**`/programs/tutorials` — Group tutorials (physical + online)**
SEO: `Group tutorial classes in Laara, Ikorodu — physical & online | ADJ`. Keywords: "evening tutorial
classes Ikorodu", "weekend tutorial Igbe-Laara", "online group tutorial Lagos", "Saturday classes Ikorodu".
This is the format page, not an exam page. Sections: schedule `[OWNER: timetable]`, physical centre
(walking distance from Laara Bus Stop and the Igbe Laara Community Central Mosque — a real convenience
selling point), live online groups, weekend intensive cohorts, class size `[OWNER: capacity]`.
Disclaimer: `no-one-on-one` — lead with it, it is a selling point, not a gap.

---

## 7. Page: `/results` — Results & student stories

**Purpose.** Convert scepticism. Prove ADJ produces outcomes, then send the reader to book.

**SEO.** Title: `Student results & success stories | ADJ Educational Consultants`. Intent
informational. Target: "ADJ Educational Consultants reviews", "Ikorodu tutorial centre results".

| # | Section | Purpose + copy direction | Block | Content source |
|---|---|---|---|---|
| 1 | hero | `PageHero`: "Results our candidates carry into admission season." | `PageHero` | `site.tagline` |
| 2 | `stats` | The stats wall. 4 headline figures plus a secondary row. **Requires the `StatisticCards` props refactor** (gotcha #2). | AkmanOS `statistic-cards`, props added | `statistic-cards/constants.ts` (demo) + new per-programme figures |
| 3 | `notice` | Prominent "sample stories" notice, explaining these are placeholders pending real consented results. | `SampleBadge` + hand-rolled note | `testimonials[].demo` |
| 4 | `filter` | Filter chips: All / JAMB / WAEC / NECO / JUPEB / Admissions / International. Client-side. | hand-rolled `StoriesFilter` | new `testimonials[].exam` field |
| 5 | `stories` | Full testimonial cards, more of them than the homepage, each with exam tag, area, and cohort. | AkmanOS `testimonial-card` (all 5 props mandatory) | `site.testimonials` |
| 6 | `table` | Tabular view: candidate first name (initials), exam, year, score band, area, programme. Easier to scan than cards, and good for "results" intent. | hand-rolled `<table>` | new `results[]` `[OWNER: real data]` |
| 7 | `outcomes` | What the numbers do **not** claim — an honest note that individual results vary and no admission is guaranteed. Unusually persuasive, and legally safer. | hand-rolled + `badge` | new `site.disclaimers.results` |
| 8 | `programs` | Which programme each result came from → programme cards. | `ProgramCard` grid | `programs` |
| 9 | `faq` | "Are these real results?", "do you guarantee admission?", "can I see full scores?" | `FaqBlock` | new `resultsFaqs` |
| 10 | `cta` | Book a consultation. | `ProgramCta` | `program.cta` |

**Responsive note.** The `<table>` must scroll horizontally on mobile (`overflow-x-auto` +
`min-w-` on the table) or collapse to stacked rows below `sm`.

---

## 8. Page: `/about` — About ADJ

**Purpose.** Build trust and legitimacy. Answer "who are these people, and have they been doing this
long enough to trust with my child's exam year?"

**SEO.** Title: `About ADJ Educational Consultants — Igbe-Laara, Ikorodu`. Intent informational.
Target: "ADJ Educational Consultants about", "tutorial centre Ikorodu".

| # | Section | Purpose + copy direction | Block | Content source |
|---|---|---|---|---|
| 1 | hero | `PageHero`: the story in one line — "Ikorodu's home for exam success". | `PageHero` | `site.tagline` |
| 2 | `story` | 3–4 short paragraphs: why ADJ exists, the gap it fills in Igbe-Laara, what the group model is and why. Written in first person, warm, specific to Ikorodu. | hand-rolled prose | new `site.story` `[OWNER: founding story, year, founders]` |
| 3 | `partner` | Greater Heights Tutorial Center partnership: what they bring, where they are (Satellite Phase), who they serve. | hand-rolled + `PartnerBadge` | `site.partner.*` |
| 4 | `areas` | The five areas served as a chip row — Igbe Lara, Agunfoye, Oreta, Igbogbo, Elepe. Reassures people who are not in the centre's immediate street. | hand-rolled chips + `badge` | `site.partner.serves` |
| 5 | `values` | 4 value cards: group-only by design, follow-through, honesty about scope, local roots. Each ties back to a real constraint. | hand-rolled | new `site.values` |
| 6 | `team` | Team grid with names, roles, subjects taught, photos. **Placeholder cards with `[OWNER: …]` until real people are supplied — do not invent bios.** | hand-rolled `TeamGrid` | new `site.team` `[OWNER: names, roles, photos]` |
| 7 | `timeline` | Milestones: founding → first cohort → partnership with Greater Heights → CBT platform → admission processing. | hand-rolled `StoryTimeline` | new `site.timeline` `[OWNER: dates]` |
| 8 | `location` | Full address block: street lines, landmark, LGA, hours, and a directions line ("off Igbe Road, a short walk from Laara Bus Stop and the Igbe Laara Community Central Mosque"). Include a map link `[OWNER: coords]`. | hand-rolled `LocationBlock` | `site.address`, `site.hours` |
| 9 | `stats` | Compact figures. Sample badge. | AkmanOS `statistic-cards` | demo constants |
| 10 | `cta` | Book a consultation, or visit. | `ProgramCta` | `site.whatsapp` |

---

## 9. Page: `/contact` — Booking v1

**Purpose.** Convert. This page fixes the dangling `#contact` header anchor and is the fallback until
`/booking` ships in P3.

**SEO.** Title: `Book a free consultation — ADJ Educational Consultants, Ikorodu`. Intent
transactional. Target: "book exam consultation Ikorodu", "ADJ contact".

| # | Section | Purpose + copy direction | Block | Content source |
|---|---|---|---|---|
| 1 | hero | `PageHero`, short. "Tell us where your child is. We'll tell you exactly what comes next." | `PageHero` | `site.*` |
| 2 | `form` | The consultation form. Fields: parent/student name, phone (required), WhatsApp number, email, exam of interest (select), current class/level (select), preferred format — physical / online group / not sure (select), preferred day or evening, message. Submit → WhatsApp deep link with the answers pre-filled. No backend in P2. | hand-rolled `ConsultationForm` (client) + shadcn `input`/`textarea`/`select`/`label` (**install**) | `site.*` |
| 3 | `alternatives` | "Prefer to just talk?" — three big taps: call, WhatsApp, email. Each a `buttonVariants` link. **These must be real numbers, not placeholders** — this is the single most damaging thing to launch wrong. | hand-rolled `ContactPanel` | `site.phoneHref`, `site.whatsapp`, `site.email` |
| 4 | `location` | Address, landmark, LGA, hours, map link. | hand-rolled `LocationBlock` | `site.address`, `site.hours` |
| 5 | `expect` | "What happens next" — 3-step process: you message or call → we assess where the student is → we recommend a programme and cohort. Sets turnaround expectation `[OWNER: how fast do you reply?]`. | hand-rolled `ProcessTimeline` | new `site.bookingExpectations` |
| 6 | `faq` | Contact-specific: can I just walk in, do you charge for the consultation, is the consultation free, can we visit before committing. | `FaqBlock` | new `contactFaqs` |
| 7 | `fees` | Explicit: "Fees are confirmed during the consultation. We don't publish them, and we don't ask for a commitment before you've seen the plan." | hand-rolled + `badge` | `site.policies.noFees` |
| 8 | cta | Repeat CTA for the header anchor target. | hand-rolled | `site.whatsapp` |

**A11y:** the form section needs `id="contact"` so the header CTA and `#contact` links land here. All
inputs need real `<label>`s (not placeholders as labels), `required` + `aria-describedby` for errors,
and a live-region success message after the WhatsApp handoff.

---

## 10. Page: `/booking` — Booking v2 (P3, lighter treatment)

**Purpose.** Replace the WhatsApp-prefill form with a real date-pick + availability + persistence +
OTP flow. **Blocked on 10 owner facts and on Supabase credentials.**

| # | Section | Purpose + copy direction | Block | Status |
|---|---|---|---|---|
| 1 | hero | `PageHero`, short. "Pick a slot. We'll confirm by [OWNER: channel]." | `PageHero` | ready |
| 2 | `steps` | 4-step indicator: Date → Time → Details → Confirm. Progress must be visible and reversible. | hand-rolled `BookingSteps` (client) | ready |
| 3 | `date` | Calendar month view, past dates and blackout dates disabled, booking horizon enforced. | shadcn `calendar` (**install**) | blocked on horizon + blackout dates |
| 4 | `slot` | Available slots per date. | 21st.dev Availability Scheduler — **key-gated, 403 proven** → hand-rolled fallback | blocked |
| 5 | `details` | Reuse `ConsultationForm` fields, prefilled from the chosen slot. | `ConsultationForm` | ready |
| 6 | `otp` | 6-digit code entry, resend with countdown, expiry. | hand-rolled `OtpInput` + `input` | blocked on OTP channel/length/expiry |
| 7 | `confirm` | Confirmation dialog + success toast, summary of what happens next. | shadcn `dialog` (**install**) + `sonner` (add `<Toaster />`) | ready |
| — | backend | Supabase table `bookings` with RLS, an insert RPC, and an OTP verify RPC. | — | **no creds** `.env.example` only |

**Also fix here:** the "Cancel" confirmation dialog is the natural home for the cancellation/reschedule
policy `[OWNER]`.

---

## 11. `/blog` and `/blog/[slug]` (P4, lighter treatment)

**Purpose.** Capture informational search traffic ("how to score 250 in JAMB", "JAMB subject
combination guide") and route readers to the programme pages.

**`/blog`** — `PageHero` → `ArticleGrid` of `ArticleCard`s (3-up desktop, 1-up mobile; each card shows
category badge, title, excerpt, date, read time) → category filter → `ProgramCta`.
**`/blog/[slug]`** — `Breadcrumb` → article header (category, title, date, author `[OWNER]`) →
`ArticleToc` (sticky on desktop, collapsible on mobile) → prose body → author/composer note →
`RelatedArticles` (**21st.dev carousel, key-gated → hand-rolled fallback**) → programme CTA matching
the article topic → `FaqBlock` seeded from the article's questions for `FAQPage` JSON-LD.

**Two open decisions for the owner:** who writes and approves articles, and whether posts are managed
in Supabase or as MDX files. The Rich Text Editor composer only matters if the first answer is "in-app".

---

## 12. `/portal/*` and `/admin/*` (P5, chrome and IA only)

Deliberately thin — the substance depends on owner decisions that don't exist yet.

**`/portal/*`** — `PortalShell` (sidebar nav, user menu, notifications) with three auth cards
(sign in, create account, forgotten password) sharing one visual treatment, then a dashboard with
"my consultations" (status from booking), "my results/practice scores", and notification list.
**`/admin/*`** — `AdminShell` with `/admin` (bookings table, students table, plain `<table>` with
client-side sort/filter, no chart library), `/admin/bookings/[id]` (detail + status changes +
`ConfirmDialog`), and `/admin/analytics` (**requires a new chart dependency — flag for the owner, do
not silently add one**).

**Blocked on:** auth strategy, who gets portal accounts, whether students see each other, Paystack
decision, admin roles, and the exact fields the bookings/students tables need.

---

## 13. P2 implementation order

Ground every step in what already exists. Steps 0–2 are prerequisites for everything else.

| # | Step | Depends on |
|---|---|---|
| 0 | `npx shadcn@latest add input textarea select label` | — |
| 1 | Create `src/lib/programs.ts` with the `Program` type and all 8 slugs. Split `nav` into `navRoutes` / `navAnchors` in `site.ts`. Decide `services`' fate. | — |
| 2 | `sections/section-heading.tsx`, `sections/page-hero.tsx`, `sections/sample-badge.tsx` | 1 |
| 3 | `sections/program-card.tsx` | 2 |
| 4 | `sections/faq-block.tsx`; refactor `home/faq.tsx` to delegate (homepage output unchanged) | 2 |
| 5 | `sections/location-block.tsx` | 2 |
| 6 | `sections/program-cta.tsx` | 2 |
| 7 | `sections/consultation-form.tsx` (client) + `contact-panel.tsx` → build `/contact` with `id="contact"`. **Repoint the header CTA off the dangling `#contact`.** | 0, 2, 5, 6 |
| 8 | `src/app/programs/page.tsx` | 3, 5, 6 |
| 9 | `components/programs/{program-facts,modules,audience,format,outcomes,process,disclaimer}.tsx` | 3, 4 |
| 10 | `src/app/programs/[slug]/page.tsx` + `not-found.tsx` + `generateStaticParams` + `generateMetadata`. **8 slugs are data-only — no extra files.** | 8, 9 |
| 11 | `/results` + `stories-filter.tsx` + **`StatisticCards` props refactor** (`constants.ts` → optional `cards`/`columns`, backwards-compatible; icon map needs a fallback) | 3, 4 |
| 12 | `/about` | 5, 11 |
| 13 | `sitemap.ts`, `robots.ts`, JSON-LD additions (`Course`/`FAQPage`/`areaServed`/`openingHours`), header + footer nav rewrite, then homepage sections 2, 3, 5, 7, 8, 10, 11 | all |

**Sequencing notes.**
- Step 7 is independently shippable and fixes a live bug (the dangling header anchor). Do its anchor fix
  as soon as it lands; do not wait for step 13.
- Step 11's `StatisticCards` refactor is a change to a verbatim AkmanOS block. Keep the defaults intact
  so the homepage renders identically, and note the modification in the block's header comment.
- Step 10 is the biggest jump in value for the least work — it exists because of step 1.
- Steps 12 and 13 are polish; 0–11 are the phase.

---

## 14. Facts needed from the owner

41 items. Nothing below can be invented or estimated — each is either a launch blocker or a wrong-fact
risk on a page a parent will read.

### (a) P2 launch blockers — 23

1. **Real phone number** (display + `tel:`). Placeholder `+234 800 000 0000` is on `/contact` in three places.
2. **Real WhatsApp number** (`wa.me/…`). Same placeholder, and it is the primary CTA site-wide.
3. **Real email address.** Currently `hello@adjeduconsult.com.ng` on an unpurchased domain.
4. **Domain confirmation** — `site.url` drives `metadataBase`, canonicals, OG tags and `sitemap.ts`.
5. **Confirmed opening hours.** `site.hours` is a TODO.
6. **Real statistics** — the 4 figures in `statistic-cards/constants.ts` (500 / 40 / 320 / 180) plus each growth percentage, with a period attached.
7. **Real testimonials** — quotes, names, exam, area, cohort year, and written consent to publish.
8. **Real student photos** to replace `public/testimonials/demo-{1,2,3}.svg`.
9. **Subject list per programme** — exact subjects offered for each exam and track. Needed for the modules accordion, which is the main SEO depth on the 8 pages.
10. **Class timetable** — days and times, physical and online separately.
11. **Cohort capacity** per class. Used in `format.capacityNote`.
12. **Next intake / resumption dates** per programme. Drives urgency in the CTA.
13. **CBT platform URL** and confirmation ADJ owns/operates it. `site.cbtUrl` is `"#"` and the `/` CBT band is blocked on it.
14. **International exams scope** — which of IELTS/TOEFL/SAT/GRE are genuinely delivered, and in what format.
15. **Written permission** to name Greater Heights Tutorial Center on `/programs/international` and `/about`.
16. **Admission-processing scope** — precisely which steps ADJ performs vs. refers out. Prevents over-promising and is required for the `no-study-abroad` disclaimer to be accurate.
17. **Fee position** — confirm fees genuinely are unpublished, and approve the "confirmed on consultation" wording. Do not publish any figure without this.
18. **Team** — names, roles, subjects taught, photos, short bios.
19. **Founding facts** — year founded, founders' story, why Igbe-Laara.
20. **Centre identity** — is ADJ a distinct centre from Greater Heights, or a shared premises? Affects `/about` and every location claim.
21. **Social media handles** for the footer (Facebook is the primary channel for Lagos parent communities).
22. **RC / registration number** if the business is registered, for footer credibility.
23. **Centre photos** (`public/gallery/` does not exist) and **map coordinates** for `/contact` and `/about`.

### (b) Blocks P3 booking — 10

24. Supabase project URL, anon key, service-role key.
25. Consultable slots — which windows are bookable for a free consultation.
26. Booking horizon (how far ahead) and blackout dates (holidays, exam weeks).
27. Confirmation turnaround time and channel.
28. OTP channel (SMS or WhatsApp), who funds it, code length, and expiry.
29. Data fields to collect and the exact consent sentence.
30. Retention/deletion rule for student records.
31. Fee-at-booking position — is anything payable to hold a slot, or is it free with no card?
32. Cancellation and reschedule policy.
33. Admin alert destination for new bookings (email, WhatsApp, dashboard only).

### (c) Blocks P4/P5 — 8

34. Blog authors, approval workflow, and publishing cadence.
35. Blog hosting model — Supabase tables or MDX in the repo.
36. Portal account holders (students only? parents too?) and whether profiles are mutually visible.
37. Auth strategy (magic link, password, OTP) and who provisions accounts.
38. Paystack decision — needed for fees in P5, affects the data model.
39. Admin roles and who can see student records.
40. Exact fields the bookings and students admin tables need.
41. Retention/deletion policy for student records post-admission.

---

## 15. Assumptions and open questions

Marked as assumptions because the implementer may need to correct them.

1. **The 8 slugs are the right SEO surface.** Assumed from STRUCTURE.md. Worth validating against real
   Search Console data before building the module accordions, which is where the long-tail depth lives.
2. **`neco` and `waec` are separate pages, not one.** They are genuinely different intents (internal vs
   external candidates, different curricula), but they share much copy. If keyword research shows one
   page wins for both, merge and redirect — the data model makes this cheap.
3. **`gce` gets a comparison section** against WAEC. Assumed to be the useful content, since "GCE or
   WAEC" is the decision parents actually search. Needs the owner's view.
4. **WhatsApp-prefill is an acceptable P2 booking form.** Assumed because there is no backend yet. If
   the owner wants real lead capture before P3, Supabase moves up and the phase order changes.
5. **`/programs` and the 8 pages supersede `site.services`.** Assumed. If `services` is kept for the
   homepage strip, it must be reduced to a summary or it will drift from `programs`.
6. **A new chart dependency for `/admin/analytics` is acceptable.** Flagged rather than assumed —
   nothing in `package.json` renders charts.
7. **21st.dev key availability is unknown.** Two features (`SlotGrid`, `RelatedArticles`) are blocked on
   it. Both need a hand-rolled fallback; treat the key as a nice-to-have, not a dependency.
8. **Team, founding story, and photos are unavailable for P2.** `/about` ships with honest placeholder
   cards rather than invented bios. This is deliberate — invented bios on a real business's About page
   are the highest-trust-damage failure mode in this project.

---

## 16. What "done" means for P2

- 8 programme pages + `/programs` + `/results` + `/about` + `/contact` are live and statically generated.
- No dangling anchors in the header or footer from any route.
- No GFA Studio placeholder content anywhere in the rendered output.
- No invented facts, fees, names, or pass rates in any copy.
- Every demo figure and story carries a visible sample label.
- The three scope boundaries (group-only, no placement, no published fees) appear on the pages where
  they matter, framed as deliberate choices.
- `tsc`, `lint`, and `build` green.

