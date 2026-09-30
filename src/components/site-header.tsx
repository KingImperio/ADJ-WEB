import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";

/* Two-tier header per the Stitch system: a dark navy utility strip carrying
   hours/address/phone, then a sticky white nav with the brand crest, section
   links and the two conversion CTAs. */
const links = [
  { label: "Programmes", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <>
      <div className="w-full border-b border-outline-variant/30 bg-primary px-4 py-2.5 text-label-md text-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 md:flex-row">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 text-center md:flex-nowrap md:text-left">
            <span className="inline-flex shrink-0 items-center gap-1 text-secondary-fixed">
              <Icon name="schedule" className="text-[16px]" />
              <span>{site.hours}</span>
            </span>
            <span className="hidden text-outline-variant sm:inline">|</span>
            <span className="inline-flex min-w-0 items-center gap-1 text-surface-variant">
              <Icon name="location_on" className="shrink-0 text-[16px] text-secondary-fixed" />
              <span>
                {site.address.line1} / Laara, Ikorodu (Walking distance from Laara Bus Stop &amp;
                Central Mosque)
              </span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden items-center gap-1.5 font-semibold text-secondary-fixed sm:inline-flex">
              <Icon name="call" className="animate-pulse text-[16px]" />
              <span>WhatsApp &amp; Calls: Active</span>
            </span>
            <a href={site.phoneHref} className="text-xs font-bold text-surface hover:underline">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/adj-logo.png"
              alt={`${site.name} logo`}
              width={676}
              height={369}
              className="h-11 w-11 rounded-lg border border-secondary/40 object-cover shadow-sm"
            />
            <span className="flex flex-col">
              <span className="font-display text-headline-sm leading-none font-bold tracking-tight text-primary">
                {site.name}
              </span>
              <span className="mt-0.5 text-label-sm tracking-widest text-secondary uppercase">
                Ikorodu Center of Academic Excellence
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-medium text-label-lg text-on-surface-variant transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={site.whatsapp}
              className="hidden items-center gap-1.5 rounded bg-surface-container-high px-3 py-2 text-label-md text-primary transition-colors hover:bg-surface-container-highest sm:inline-flex"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Call / WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-primary px-4 py-2.5 text-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container active:scale-95"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
