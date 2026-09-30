import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { programs } from "@/lib/programs";
import { site } from "@/lib/site";
import pages from "@/lib/stitch-programs.json";

/* Programme detail pages, rebuilt from the Stitch screens in
   docs/stitch-reference/ (jamb-utme-clinic, waec-neco-intensive,
   jupeb-direct-entry, international-exams, admissions-processing-caps).
   Body content lives in stitch-programs.json; only the shell is hand-built. */

type Block = { t: "p" | "h3" | "h4" | "list"; v: string | string[] };
type Section = { title: string; blocks: Block[] };
type Page = { h1: string; lead: string; sections: Section[] };

/* NECO shares the WAEC & NECO screen — the reference merges the two exams. */
const pages_: Record<string, Page> = { ...(pages as unknown as Record<string, Page>), neco: pages.waec as unknown as Page };

const list = ["jamb", "waec", "neco", "jupeb", "international", "admissions"];
const stats: Record<string, string[]> = {
  jamb: ["342 / 400", "Made Median", "87%"],
  waec: ["9 A1s", "Made Median", "4.2 hrs"],
  jupeb: ["14 Pts", "Made Median", "78%"],
  international: ["Band 8.0+", "Target Median", "1400+"],
  admissions: ["100%", "CAPS Cleared", "5 Stage"],
};
const statLabels: Record<string, string[]> = {
  jamb: ["Made Median", "Average Improvement", "Pass Rate Benchmarking"],
  waec: ["Made Median", "Average Improvement", "Weekly Lab Hours"],
  jupeb: ["Made Median", "Average Improvement", "Pass Rate Benchmarking"],
  international: ["Target Band", "Average Improvement", "Target SAT"],
  admissions: ["Clearance Rate", "Average Improvement", "Lifecycle Stages"],
};

export function generateStaticParams() {
  return list.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages_[slug];
  if (!page) return { title: "Programme not found" };
  return { title: page.h1, description: page.lead.slice(0, 155) };
}

const breadcrumbJsonLd = (name: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Programmes", item: `${site.url}/programs` },
    { "@type": "ListItem", position: 3, name, item: `${site.url}/programs/${slug}` },
  ],
});

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages_[slug];
  if (!page) notFound();
  const name = programs.find((p) => p.slug === slug)?.name ?? page.h1;
  const numbers = stats[slug] ?? ["—", "—", "—"];
  const labels = statLabels[slug] ?? ["", "", ""];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(name, slug)) }} />

      {/* Hero */}
      <section className="border-b border-outline-variant bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-surface-container px-3 py-1">
                <span className="size-2 rounded-full bg-secondary" />
                <span className="text-label-sm tracking-wider text-secondary uppercase">
                  Igbe-Laara, Ikorodu &middot; Coaching Until Matriculation
                </span>
              </div>
              <h1 className="text-headline-lg-mobile font-display text-primary md:text-headline-lg">
                {page.h1}
              </h1>
              <p className="max-w-2xl leading-relaxed text-body-md text-on-surface-variant md:text-body-lg">
                {page.lead}
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <a
                  href="#consultation"
                  className="inline-flex items-center justify-center gap-2 rounded bg-secondary px-6 py-3.5 text-label-lg font-bold text-on-secondary shadow-sm transition-all hover:bg-on-secondary-container active:scale-95"
                >
                  <span>Claim Your Free Diagnostic</span>
                  <Icon name="arrow_forward" className="text-lg" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded border border-outline-variant bg-surface-container-lowest px-6 py-3.5 text-label-lg font-bold text-primary transition-all hover:bg-surface-container"
                >
                  <span>Talk to an Academic Director</span>
                  <Icon name="support_agent" className="text-lg" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 gap-4">
                {numbers.map((n, i) => (
                  <div key={labels[i]} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-primary">{n}</span>
                      {i === 0 && (
                        <span className="text-label-sm tracking-widest text-secondary uppercase">2024 Top Score</span>
                      )}
                    </div>
                    <div className="mt-1 text-label-sm tracking-widest text-outline uppercase">{labels[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body sections from the reference screen */}
      {page.sections.map((s, si) => (
        <section
          key={s.title}
          className={`py-16 lg:py-24 ${
            si % 2 === 0 ? "bg-surface-container-lowest" : "border-t border-outline-variant bg-surface"
          }`}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-headline-md text-primary md:text-headline-lg">{s.title}</h2>
            <div className="mt-8 space-y-8">
              {s.blocks.map((b, bi) => {
                if (b.t === "h3")
                  return (
                    <h3 key={bi} className="font-display text-headline-sm text-primary">
                      {b.v as string}
                    </h3>
                  );
                if (b.t === "h4")
                  return (
                    <h4
                      key={bi}
                      className="border-l-4 border-secondary pl-3 font-display text-headline-sm text-primary"
                    >
                      {b.v as string}
                    </h4>
                  );
                if (b.t === "list")
                  return (
                    <ul key={bi} className="space-y-3">
                      {(b.v as string[]).map((li, li2) => (
                        <li key={li2} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                          <Icon name="check_circle" className="mt-0.5 shrink-0 text-base text-secondary" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  );
                return (
                  <p key={bi} className="leading-relaxed text-body-md text-on-surface-variant">
                    {b.v as string}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-outline-variant bg-surface-container-low py-16 lg:py-24" id="consultation">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-outline bg-surface-container-lowest p-8 text-center shadow-md sm:p-12">
            <span className="text-label-sm font-bold tracking-widest text-secondary uppercase">
              Start Your Preparation Today
            </span>
            <h2 className="mt-2 font-display text-headline-md text-primary md:text-headline-lg">
              Coaching Until Matriculation
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body-md text-on-surface-variant">
              Delivering high-yield syllabus breakdowns, computer-based exam mastery, and university
              admissions placement.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded bg-secondary px-8 py-4 text-label-lg font-bold text-on-secondary shadow-md transition-all hover:bg-on-secondary-container active:scale-95"
              >
                <span>Confirm Diagnostic Booking</span>
                <Icon name="arrow_forward" className="text-lg" />
              </a>
              <a
                href={`tel:${site.phoneHref.replace("tel:", "")}`}
                className="inline-flex items-center justify-center gap-2 rounded border border-outline-variant bg-surface px-8 py-4 text-label-lg font-bold text-primary transition-all hover:bg-surface-container"
              >
                <Icon name="call" className="text-lg" />
                <span>Call {site.phoneDisplay}</span>
              </a>
            </div>
            <p className="mt-4 text-[12px] text-on-surface-variant">
              Strict adherence to group batch capacity: maximum 22 students per physical room.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
