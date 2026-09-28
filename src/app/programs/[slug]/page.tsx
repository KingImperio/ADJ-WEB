import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { FaqBlock } from "@/components/sections/faq-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { ProgramFacts, Audience, Outcomes } from "@/components/programs/program-facts";
import { Modules } from "@/components/programs/modules";
import { Format } from "@/components/programs/format";
import { Process, Disclaimer } from "@/components/programs/process";
import { RelatedPrograms } from "@/components/programs/related-programs";
import { getProgram, programSlugs } from "@/lib/programs";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Programme not found" };
  return {
    title: program.seoTitle,
    description: program.seoDescription,
    keywords: program.keywords,
  };
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

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(program.name, program.slug)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(program.faqs)) }} />
      <PageHero eyebrow={`${program.exam} — ${program.name}`} title={program.hero.headline} sub={program.hero.sub} pills={program.hero.highlights} />

      <section className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-14">
          <Audience program={program} />
          <ProgramFacts program={program} />
          <Modules program={program} />
          <Format program={program} />
          <Outcomes program={program} />
          <Process program={program} />
          <Disclaimer program={program} />
          <RelatedPrograms program={program} />
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
