# ADJ-WEB — planning-agent handoff brief

Feed this file to the planning agent. It contains every website fact needed to plan the app layout. Source of truth for business facts: `src/lib/site.ts`.

## 1. Business

- **Name:** ADJ Educational Consultants (site brand; tagline: "Ikorodu's home for exam success"). Suggested domain: `adjeduconsult.com.ng`.
- **What it is:** exam-prep + admissions consultancy in Igbe-Laara, Ikorodu, Lagos State, Nigeria.
- **Address:** Off Igbe Road, Banana Estate / Laara, Igbe-Laara, Ikorodu, Lagos State. Landmarks: walking distance from Laara Bus Stop & Igbe Laara Community Central Mosque. LGA: Igbogbo-Bayeku LCDA.
- **Partner:** Greater Heights Tutorial Center, Satellite Phase, Igbe-Laara. Serves Igbe Lara, Agunfoye, Oreta, Igbogbo, Elepe + environs.
- **Contact (ALL PLACEHOLDER — confirm):** phone `+234 800 000 0000`, WhatsApp `wa.me/2348000000000`, email `hello@adjeduconsult.com.ng`, hours Mon–Sat 8am–6pm.

## 2. Services (this is the sitemap seed)

1. JAMB/UTME prep — CBT drills, mock exams, cutoff guidance
2. WAEC / NECO / GCE coaching + registration support
3. JUPEB & Direct Entry guidance
4. International exams (IELTS, TOEFL, SAT, GRE) — delivered WITH Greater Heights
5. Admission processing — post-UTME, course/school selection, follow-through
6. Group tutorials — physical (Laara) + live online groups

## 3. Hard constraints (do not plan against these)

- NO study abroad placement / visas (say so on the site; international exams only).
- NO private one-on-one coaching (group sessions only — a selling point, not a gap).
- Online = live GROUP tutorials, never 1-on-1.
- Testimonials + stats are DEMO (`demo: true` in `site.ts`, portraits are SVG placeholders). Plan for real ones arriving later; keep the "sample stories" badge until then.
- No prices confirmed yet — do not invent fees. Pricing Card is queued for when fees land.

## 4. Brand

Dark-first. Cobalt `#2D52E8` (deep `#1E3FCC`) + bronze-orange gold `#CE7E1B` (soft `#EEA63C`) on ink `#080B14`. Display font Space Grotesk, body Inter, mono accents. Real logo at `public/adj-logo.png` (dark-navy bg, blends into header), favicon `public/adj-icon.png`.

## 5. Technical inventory (installed, usable, no new installs needed)

- **Next.js 16 App Router + TS + React 19 + Tailwind v4.** `dark` class on `<html>`. SEO: metadata + OpenGraph + EducationalOrganization JSON-LD in `layout.tsx`.
- **AkmanOS (verbatim, `data-component` roots):** statistic-cards, testimonial-card, bouncy-accordion, animated-text (+ animated-number, icons, motion-ease). Tokens scoped in `globals.css`.
- **shadcn (5):** badge, button (`buttonVariants` for anchors — NO `asChild` in this Base-UI version), separator, sheet, marquee (Magic UI via CLI).
- **Removed, one CLI command to restore:** card, input, textarea, select, label, dialog, sonner, accordion, calendar (never installed — needed for booking).
- **21st registry:** key-gated (HTTP 403 proven). Key goes in `.mcp.json`. Magic UI's public registry works keyless.
- **Backend:** Supabase planned for booking (`.env.example`, no creds yet).

## 6. Current page state (post-cleanup)

`/` renders Hero → Stats → Results → FAQ + header/footer. Everything else (services, tutorials, about, contact/booking, CBT band) was stripped from render; files either deleted (git history has them) or never built (inner pages). Known issue: header "Book free consultation" anchor (`#contact`) dangles until booking returns.

## 7. What the plan must produce

Per `docs/STRUCTURE.md` phases: P2 programme SEO pages (`/programs/[slug]` ×8) + results/about/contact; P3 booking v2 (calendar + Supabase + OTP); P4 blog; P5 portal/admin. The plan should specify, per page: sections in order, which block builds each section (AkmanOS name / shadcn name / hand-rolled), content source (`site.ts` key or new fact to request), and what new facts are needed from the owner.
```

