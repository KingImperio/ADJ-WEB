import type { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Site wireframe — structure preview",
  description: "Ghost preview of the planned ADJ-WEB page structure.",
};

function Ghost({ label, block, h = "h-16", span = false }: { label: string; block: string; h?: string; span?: boolean }) {
  return (
    <div className={`rounded-xl border border-dashed border-zinc-300 bg-white p-3 ${h} ${span ? "sm:col-span-2 lg:col-span-3" : ""}`}>
      <p className="font-display text-xs font-bold text-zinc-900">{label}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">{block}</p>
      <Skeleton className="mt-2 h-2 w-3/4 bg-zinc-100" />
    </div>
  );
}

function Page({ name, route, children }: { name: string; route: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3">
        <h2 className="font-display text-xl font-bold text-zinc-900">{name}</h2>
        <code className="font-mono text-xs text-cobalt">{route}</code>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export default function WireframePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">Planning preview</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
          How the site will be structured.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Ghost blocks only — layout + assigned block per section. Real blocks replace these as each page is built.
        </p>
      </div>

      <Page name="Homepage" route="/">
        <Ghost label="Hero" block="AkmanOS animated-text + marquee" h="h-28" span />
        <Ghost label="Trust band" block="shadcn badge ×3" />
        <Ghost label="Services ×6" block="program cards" />
        <Ghost label="Stats" block="AkmanOS statistic-cards" />
        <Ghost label="Tutorials" block="physical vs online" />
        <Ghost label="Results ×3" block="AkmanOS testimonial-card" />
        <Ghost label="About compact" block="story + link" />
        <Ghost label="FAQ" block="AkmanOS bouncy-accordion" />
        <Ghost label="Contact form" block="shadcn input/select" />
        <Ghost label="Closing CTA" block="consultation + whatsapp" />
      </Page>

      <Page name="Programmes hub" route="/programs">
        <Ghost label="Hero" block="page hero + pills" h="h-24" span />
        <Ghost label="SS1–SS3 ×4" block="program cards" />
        <Ghost label="Post-secondary ×2" block="program cards" />
        <Ghost label="Services ×2" block="program cards" />
        <Ghost label="Policy band" block="4 standing rules" />
        <Ghost label="Ticker" block="marquee" />
        <Ghost label="Stats" block="AkmanOS statistic-cards" />
        <Ghost label="FAQ ×5" block="AkmanOS bouncy-accordion" />
        <Ghost label="CTA" block="consultation" />
      </Page>

      <Page name="Programme detail ×8" route="/programs/[slug]">
        <Ghost label="Hero + pills" block="per-programme data" h="h-24" span />
        <Ghost label="Who is it for" block="audience list" />
        <Ghost label="Quick facts" block="format/mode/size" />
        <Ghost label="Modules" block="AkmanOS bouncy-accordion" />
        <Ghost label="Format" block="physical vs online" />
        <Ghost label="Outcomes" block="ability list" />
        <Ghost label="Process ×5" block="timeline steps" />
        <Ghost label="Disclaimer" block="scope callout" />
        <Ghost label="Related ×3" block="program cards" />
        <Ghost label="FAQ ×4 + JSON-LD" block="AkmanOS bouncy-accordion" />
        <Ghost label="CTA" block="consultation" />
      </Page>

      <Page name="Results" route="/results">
        <Ghost label="Hero" block="page hero" h="h-24" span />
        <Ghost label="Stats wall ×8" block="AkmanOS statistic-cards" />
        <Ghost label="Sample notice" block="demo disclaimer" />
        <Ghost label="Filter chips" block="exam filter" />
        <Ghost label="Stories" block="AkmanOS testimonial-card" />
        <Ghost label="Results table" block="scores grid" />
        <Ghost label="Honesty note" block="no-guarantee" />
        <Ghost label="FAQ" block="AkmanOS bouncy-accordion" />
        <Ghost label="CTA" block="consultation" />
      </Page>

      <Page name="About" route="/about">
        <Ghost label="Hero" block="page hero" h="h-24" span />
        <Ghost label="Story" block="founding paragraphs" />
        <Ghost label="Partner" block="greater heights" />
        <Ghost label="Areas ×5" block="chip row" />
        <Ghost label="Values ×4" block="value cards" />
        <Ghost label="Team" block="tutor grid [OWNER]" />
        <Ghost label="Timeline" block="milestones [OWNER]" />
        <Ghost label="Location" block="address + map" />
        <Ghost label="Stats" block="AkmanOS statistic-cards" />
        <Ghost label="CTA" block="visit / book" />
      </Page>

      <Page name="Contact" route="/contact">
        <Ghost label="Hero" block="page hero" h="h-24" span />
        <Ghost label="Form" block="shadcn input/select" />
        <Ghost label="Call / WhatsApp / Email" block="three taps" />
        <Ghost label="Location" block="address + map" />
        <Ghost label="What happens next" block="3 steps" />
        <Ghost label="Fees note" block="no published fees" />
        <Ghost label="FAQ" block="AkmanOS bouncy-accordion" />
      </Page>
    </div>
  );
}
