import { Check, Building2, Wifi, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { services, site } from "@/lib/site";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">{children}</p>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-white/10 bg-[#0a0e1c]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
          Every exam on your path, one roof to prepare under.
        </h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          From your first SSCE paper to the admission list — pick the programme that matches where you are right now.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="border-white/10 bg-panel transition-colors hover:border-cobalt/60">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit border-cobalt/50 bg-cobalt/10 font-mono text-[11px] text-slate-200">
                  {s.exam}
                </Badge>
                <h3 className="pt-2 font-display text-lg font-bold text-white">{s.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-400">{s.copy}</p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Tutorials() {
  return (
    <section id="tutorials" className="scroll-mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Eyebrow>Group tutorials</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
          Learn in Laara — or join live from anywhere.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card className="border-white/10 bg-panel">
            <CardHeader>
              <Building2 className="h-6 w-6 text-gold" />
              <h3 className="pt-1 font-display text-xl font-bold text-white">Physical group classes</h3>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-slate-400">
              Evening and weekend cohorts at our Laara centre, just off Igbe Road — small enough that your tutor knows
              your weak topics by name. Serving {site.partner.serves.join(", ")} and surrounding communities.
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-panel">
            <CardHeader>
              <Wifi className="h-6 w-6 text-gold" />
              <h3 className="pt-1 font-display text-xl font-bold text-white">Live online group tutorials</h3>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-slate-400">
              Same tutors, same rigour, on your phone or laptop. Join scheduled live sessions, get class notes after
              every lesson, and sit the same timed drills as the physical cohorts.
            </CardContent>
          </Card>
        </div>
        <p className="mt-6 flex items-start gap-2 text-sm text-slate-500">
          <Users className="mt-0.5 h-4 w-4 shrink-0" />
          Every ADJ class is a focused group session — we don&apos;t offer private one-on-one coaching, so every seat
          carries the energy of candidates pushing each other higher.
        </p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-white/10 bg-[#0a0e1c]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            An Ikorodu consultancy that stays with you past results day.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            {site.name} exists for one reason: candidates from Igbe-Laara, Igbogbo and environs deserve the same
            quality of exam preparation available anywhere in Lagos. We coach, we register, we drill — and when results
            land, our admission processing team takes over until you&apos;re matriculated.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            Through our partnership with {site.partner.name} ({site.partner.area}), our candidates also access
            international exam preparation — IELTS, TOEFL, SAT and GRE — without leaving the community.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Card className="border-gold/30 bg-gold/5">
            <CardHeader className="pb-1">
              <h3 className="font-display text-base font-bold text-gold">ADJ Educational Consultants</h3>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-slate-300">
              {site.address.line1}, {site.address.line2}. {site.address.landmark}.
            </CardContent>
          </Card>
          <Card className="border-cobalt/40 bg-cobalt/5">
            <CardHeader className="pb-1">
              <h3 className="font-display text-base font-bold text-white">{site.partner.name}</h3>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-slate-300">
              {site.partner.area} — tutorial partner for international exams and extended group cohorts.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
