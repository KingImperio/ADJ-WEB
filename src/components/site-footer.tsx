import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { navRoutes, site } from "@/lib/site";
import { programs } from "@/lib/programs";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/adj-logo.png"
              alt={`${site.name} logo`}
              width={676}
              height={369}
              className="h-10 w-auto rounded-md"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{site.description}</p>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Explore</p>
          <div className="mt-3 flex flex-col gap-2">
            {navRoutes.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-zinc-500 hover:text-zinc-900">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Programmes</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-500">
            {programs.map((p) => (
              <Link key={p.slug} href={`/programs/${p.slug}`} className="hover:text-zinc-900">
                {p.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">Find us</p>
          <div className="mt-3 flex flex-col gap-2.5 text-sm text-zinc-500">
            <span className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.address.line1}, {site.address.line2}
            </span>
            <a href={site.phoneHref} className="flex gap-2 hover:text-zinc-900">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="flex gap-2 hover:text-zinc-900">
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
      <Separator className="bg-zinc-200" />
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>In partnership with {site.partner.name}, {site.partner.area}.</span>
      </div>
    </footer>
  );
}
