import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { navRoutes, site } from "@/lib/site";
import { programs } from "@/lib/programs";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060913]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/adj-logo.png"
              alt={`${site.name} logo`}
              width={1405}
              height={768}
              className="h-10 w-auto rounded-md"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{site.description}</p>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Explore</p>
          <div className="mt-3 flex flex-col gap-2">
            {navRoutes.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-400 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Programmes</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            {programs.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`} className="hover:text-white">
                {p.name}
              </Link>
            ))}
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
