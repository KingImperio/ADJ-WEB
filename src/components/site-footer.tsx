import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060913]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cobalt font-display text-sm font-bold text-white">
              {site.short}
            </span>
            <span className="font-display text-sm font-bold text-white">{site.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{site.description}</p>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Explore</p>
          <div className="mt-3 flex flex-col gap-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-400 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Programmes</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <span>JAMB / UTME Mastery</span>
            <span>WAEC · NECO · GCE</span>
            <span>JUPEB & Direct Entry</span>
            <span>IELTS · TOEFL · SAT · GRE</span>
            <span>Admission Processing</span>
          </div>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Find us</p>
          <div className="mt-3 flex flex-col gap-2.5 text-sm text-slate-400">
            <span className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.address.line1}, {site.address.line2}
            </span>
            <a href={site.phoneHref} className="flex gap-2 hover:text-white">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="flex gap-2 hover:text-white">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.email}
            </a>
            <span className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.hours}
            </span>
          </div>
        </div>
      </div>
      <Separator className="bg-white/10" />
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>In partnership with {site.partner.name}, {site.partner.area}.</span>
      </div>
    </footer>
  );
}
