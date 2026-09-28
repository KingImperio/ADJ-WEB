import type { Metadata } from "next";
import { Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { LocationBlock } from "@/components/sections/location-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { SampleBadge } from "@/components/sections/sample-badge";
import { StatisticCards } from "@/components/statistic-cards";
import { site, story, values, team, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ADJ Educational Consultants — Igbe-Laara, Ikorodu",
  description: "Who ADJ Educational Consultants are: an Ikorodu exam-prep consultancy in partnership with Greater Heights Tutorial Center, serving Igbe-Laara and environs.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Ikorodu's home for exam success."
        sub="An exam-prep and admissions consultancy built for Igbe-Laara, Igbogbo and environs — the same quality of preparation available anywhere in Lagos, without leaving the community."
      />

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeading eyebrow="Our story" title="Why ADJ exists." />
          {story.paragraphs.length > 0 ? (
            story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-white/15 p-5 text-sm text-slate-500">
              Founding story, year and founders — [OWNER: to be supplied]. What we can say today: ADJ exists so
              candidates from Igbe-Laara and environs get top-tier exam preparation without leaving the community.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0e1c]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Partnership" title="With Greater Heights Tutorial Center." />
          <div className="mt-6 rounded-2xl border border-cobalt/40 bg-cobalt/5 p-6 sm:p-8">
            <Badge className="border-gold/40 bg-gold/10 text-gold hover:bg-gold/15">
              <Handshake className="mr-1.5 h-3.5 w-3.5" />
              In partnership with {site.partner.name}
            </Badge>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Our tutorial partner at {site.partner.area} extends our group cohorts and delivers international exam
              preparation — IELTS, TOEFL, SAT and GRE — without any candidate leaving the community.
            </p>
          </div>
          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Areas served</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {site.partner.serves.map((area) => (
                <Badge key={area} variant="outline" className="border-white/15 bg-white/5 text-slate-200">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Values" title="What we won't compromise." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-white/10 bg-panel p-6">
                <h3 className="font-display text-lg font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0e1c]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Team" title="The tutors behind the results." />
          {team.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div key={member.name} className="rounded-2xl border border-white/10 bg-panel p-6">
                  <h3 className="font-display text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-gold">{member.role}</p>
                  <p className="mt-1 text-xs text-slate-500">{member.subjects}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-xl border border-dashed border-white/15 p-6 text-sm text-slate-500">
              Tutor names, roles, subjects and photos — [OWNER: to be supplied]. No bios are invented here.
            </p>
          )}
          {timeline.length > 0 ? (
            <ol className="mt-8 space-y-3">
              {timeline.map((item) => (
                <li key={item.year} className="flex gap-4 text-sm">
                  <span className="w-16 shrink-0 font-mono font-bold text-gold">{item.year}</span>
                  <span className="text-slate-300">{item.event}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Visit" title="Find us in Laara." lede={site.hours} />
            <div className="mt-6">
              <LocationBlock />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Figures" title="By the numbers." />
              <SampleBadge />
            </div>
            <div className="mt-6">
              <StatisticCards columns={2} />
            </div>
          </div>
        </div>
      </section>

      <ProgramCta headline="Come and see a live class." detail="Visit during opening hours, or book ahead so a counsellor is ready." />
    </>
  );
}
