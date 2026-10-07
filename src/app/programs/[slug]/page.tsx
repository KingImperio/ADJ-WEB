import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { programs } from "@/lib/programs";
import { site } from "@/lib/site";
import { getProgramPage } from "@/lib/content";

/* Programme detail pages, rebuilt from the Stitch screens in
   docs/stitch-reference/ (jamb-utme-clinic, waec-neco-intensive,
   jupeb-direct-entry, international-exams, admissions-processing-caps).
   Body content lives in stitch-programs.json; only the shell is hand-built. */


const list = ["jamb", "waec", "neco", "jupeb", "international", "admissions", "cbt"];

export const revalidate = 300;

export function generateStaticParams() {
  return list.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getProgramPage(slug);
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
  const page = await getProgramPage(slug);
  if (!page) notFound();
  const name = programs.find((p) => p.slug === slug)?.name ?? page.h1;
  const stats = page.stats ?? { numbers: [], labels: [] };
  const numbers = stats.numbers.length === 3 ? stats.numbers : ["—", "—", "—"];
  const labels = stats.labels.length === 3 ? stats.labels : ["", "", ""];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(name, slug)) }} />

      {/* Hero */}
      <section className="bg-[#1a365d] py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A11E]/35 bg-white/10 px-3.5 py-1.5">
                <span className="size-2 rounded-full bg-[#D5A11E]" />
                <span className="text-[11px] font-bold tracking-[0.14em] text-[#F5E5B5] uppercase">
                  Lagos, Nigeria &middot; Coaching Until Matriculation
                </span>
              </div>
              <h1 className="text-[32px] leading-[1.08] font-bold tracking-tight text-white sm:text-[40px] md:text-6xl">
                {page.h1}
              </h1>
              <p className="max-w-2xl text-[15px] leading-relaxed text-[#adc7f7] sm:text-lg">
                {page.lead}
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <a
                  href="#consultation"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D5A11E] px-7 py-4 text-label-lg font-bold text-[#101A3D] shadow-[0_16px_34px_-12px_rgba(213,161,30,.7)] transition-all hover:bg-[#e5b532] active:scale-95"
                >
                  <span>Claim Your Free Diagnostic</span>
                  <Icon name="arrow_forward" className="text-lg" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  <span>Talk to an Academic Director</span>
                  <Icon name="support_agent" className="text-lg" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 gap-4">
                {numbers.map((n, i) => (
                  <div key={labels[i]} className="rounded-2xl border border-[#e2e7ff] bg-white p-5 shadow-[0_14px_34px_-14px_rgba(0,32,69,0.3)]">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-[#002045]">{n}</span>
                      {i === 0 && (
                        <span className="text-[11px] font-bold tracking-widest text-[#8A6400] uppercase">2024 Top Score</span>
                      )}
                    </div>
                    <div className="mt-1 text-[11px] font-bold tracking-widest text-[#74777f] uppercase">{labels[i]}</div>
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
            si % 2 === 0 ? "bg-[#f7f8fd]" : "bg-white"
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
      <section className="border-t border-white/10 bg-[#002045] py-20" id="consultation">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#e2e7ff] bg-white p-8 text-center shadow-[0_28px_64px_-20px_rgba(0,32,69,0.3)] sm:p-12">
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
