import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BouncyAccordionList } from "@/components/bouncy-accordion";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FaqBlock } from "@/components/sections/faq-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { ProgramCard } from "@/components/sections/program-card";
import { getProgram, programSlugs, type Program } from "@/lib/programs";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Programme not found" };
  return { title: program.seoTitle, description: program.seoDescription, keywords: program.keywords };
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

const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const disclaimers: Record<string, { label: string; copy: string }> = {
  "no-study-abroad": {
    label: "Scope",
    copy: "Nigerian tertiary admissions only. We prepare test scores for international routes and refer placement and visas onward.",
  },
  "no-one-on-one": {
    label: "Group-only",
    copy: "Every class is a group session — shared pace, shared energy, one fee structure. No private coaching, by design.",
  },
  "partner-delivered": {
    label: "Partnership",
    copy: "Delivered with Greater Heights Tutorial Center. Test preparation only — no admissions placement or visas.",
  },
  "no-fees-published": {
    label: "Fees",
    copy: "Fees are confirmed during the free consultation. Nothing published, no commitment before you've seen the plan.",
  },
};

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-zinc-600 sm:text-base">
      <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
      {children}
    </li>
  );
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  const related = program.related.map((s) => getProgram(s)).filter((p): p is Program => Boolean(p));
  const disclaimer = program.disclaimer ? disclaimers[program.disclaimer] : null;
  const facts = [
    { label: "Format", value: program.format.mode === "both" ? "Physical + live online" : program.format.mode },
    { label: "Class model", value: "Group sessions only" },
    { label: "Schedule", value: program.format.scheduleNote },
    { label: "Cohort size", value: program.format.capacityNote },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(program.name, program.slug)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(program.faqs)) }} />
      <PageHero eyebrow={`${program.exam} — ${program.name}`} title={program.hero.headline} sub={program.hero.sub} pills={program.hero.highlights} />

      <section className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-14">
          <div>
            <SectionHeading eyebrow="Who this is for" title="Built for students like yours." />
            <ul className="mt-6 space-y-2.5">{program.whoFor.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
          </div>

          <div>
            <SectionHeading eyebrow="Quick facts" title="At a glance." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <Card key={fact.label}>
                  <CardContent className="pt-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{fact.label}</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900">{fact.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Syllabus" title="Module by module." />
            <div className="mt-6">
              <BouncyAccordionList
                defaultValue="m-0"
                items={program.modules.map((m, i) => ({ id: `m-${i}`, title: m.title, description: m.detail }))}
              />
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Outcomes" title="What the student walks out able to do." lede="Concrete abilities — never pass-rate claims." />
            <ul className="mt-6 space-y-2.5">{program.outcomes.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
          </div>

          <div>
            <SectionHeading eyebrow="Process" title="From first call to exam-ready." />
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {program.process.map((step, i) => (
                <Card key={step.step}>
                  <CardContent className="pt-5">
                    <p className="font-display text-2xl font-bold text-gold">{i + 1}</p>
                    <p className="mt-1 font-display text-sm font-bold text-zinc-900">{step.step}</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{step.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {disclaimer ? (
            <Card className="border-gold/40 bg-gold/5">
              <CardHeader className="pb-1">
                <Badge variant="outline" className="w-fit border-gold/40 bg-gold/10 text-[11px] text-gold">
                  {disclaimer.label}
                </Badge>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-zinc-600">{disclaimer.copy}</CardContent>
            </Card>
          ) : null}

          {related.length > 0 ? (
            <div>
              <SectionHeading eyebrow="Keep exploring" title="Related programmes." />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProgramCard key={p.slug} program={p} />
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h2 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl">Programme questions.</h2>
            <div className="mt-6 max-w-3xl">
              <FaqBlock faqs={program.faqs} />
            </div>
          </div>
        </div>
      </section>

      <ProgramCta headline={program.cta.headline} detail={`${program.cta.detail} Fees confirmed during consultation — nothing published.`} />
    </>
  );
}
