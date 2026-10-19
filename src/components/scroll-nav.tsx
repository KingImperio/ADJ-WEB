"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { exams, site } from "@/lib/site";

/* Sticky, and morphs: flush full-width bar at the top of the page; once you
   scroll, it slides up and rounds into the floating pill island. */
const links = [
  { label: "Programmes", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mobileLinks = [{ label: "Home", href: "/" }, ...links];

export function ScrollNav({
  whatsapp,
  name,
}: {
  whatsapp: string;
  name: string;
}) {
  const [float, setFloat] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isBookingPage = pathname === "/contact";
  useEffect(() => {
    const on = () => setFloat(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      data-floating={float}
      className="sticky top-0 z-50 h-16 w-full sm:h-[72px]"
    >
      <nav
        className={`relative mx-auto overflow-hidden bg-[#09264d] transition-[width,top,border-radius,background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${
          float ? "top-2 w-[calc(100%-24px)] max-w-[1240px] rounded-[20px] border border-white/15 sm:top-3" : "top-0 w-full rounded-none border-b border-white/15"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-3 px-3 transition-all duration-300 sm:px-5 ${
            float ? "h-14" : "h-16 sm:h-[72px]"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/adj-logo.png"
              alt={`${name} logo`}
              width={512}
              height={512}
              className={`rounded-full border border-[#bd851d]/70 bg-white object-cover p-0.5 transition-all duration-300 ${
                float ? "h-9 w-9" : "h-10 w-10"
              }`}
            />
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-display text-[14px] leading-tight font-bold tracking-tight text-white sm:text-[15px]">
                {name}
              </span>
              <span
                className={`text-[9px] font-bold tracking-[0.2em] text-[#e2bb64] uppercase transition-all duration-300 ${
                  float ? "hidden" : ""
                }`}
              >
                Center of Academic Excellence
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-semibold text-white/80 transition-colors hover:text-[#f1c766]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsapp}
              className={`hidden shrink-0 items-center gap-1.5 whitespace-nowrap border border-white/25 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/10 md:inline-flex ${
                float ? "hidden md:inline-flex" : ""
              }`}
            >
              <Icon name="chat" className="text-[16px]" />
              <span className="hidden sm:inline">Call / WhatsApp</span>
            </a>
            {!isBookingPage && (
              <Link
                href="/contact"
                className="hidden shrink-0 items-center justify-center whitespace-nowrap rounded-br-xl rounded-tl-xl bg-[#bd851d] px-4 py-2.5 text-xs font-bold text-[#10213b] transition-all hover:bg-[#d39b32] sm:inline-flex"
              >
                Contact ADJ
              </Link>
            )}
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="text-xl" />
            </button>
          </div>
        </div>
        <div
          id="mobile-navigation"
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
          style={{ maxHeight: mobileOpen ? "min(70dvh, 34rem)" : "0px" }}
          className={`overflow-hidden bg-[#09264d] transition-[max-height,opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <div className="max-h-[70dvh] overflow-y-auto overscroll-contain border-t border-white/15 bg-[#09264d] px-4 pb-4">
            <div className="grid gap-0.5 pt-2">
              {mobileLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {l.label}
                </Link>
              ))}
              {!isBookingPage && (
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#D5A11E] px-4 text-sm font-bold text-[#101A3D] shadow-[0_10px_24px_-12px_rgba(213,161,30,.8)]"
                >
                  Contact ADJ
                </Link>
              )}
            </div>

            <div className="mt-3 divide-y divide-[#e2e7ff] border-y border-[#e2e7ff]">
              <details className="group">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2.5"><Icon name="school" className="text-lg text-[#e2bb64]" />Programmes & exams</span>
                  <Icon name="expand_more" className="text-xl text-white/60 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-3 pb-4 pl-10">
                  <p className="text-xs leading-5 text-white/70">
                    Focused exam preparation, live group tutorials, and admissions guidance through matriculation.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exams.map((exam) => (
                      <span key={exam} className="bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white">{exam}</span>
                    ))}
                  </div>
                </div>
              </details>

              <details className="group">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2.5"><Icon name="call" className="text-lg text-[#e2bb64]" />Contact ADJ</span>
                  <Icon name="expand_more" className="text-xl text-white/60 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="grid gap-3 px-3 pb-4 pl-10 text-sm">
                  <a href={site.phoneHref} className="font-medium text-white">{site.phoneDisplay}</a>
                  <a href={whatsapp} target="_blank" rel="noreferrer" className="font-medium text-white">Chat on WhatsApp</a>
                  <a href={`mailto:${site.email}`} className="break-all font-medium text-white">{site.email}</a>
                </div>
              </details>

              <details className="group">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2.5"><Icon name="location_on" className="text-lg text-[#e2bb64]" />Our Ikorodu centre</span>
                  <Icon name="expand_more" className="text-xl text-white/60 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-3 pb-4 pl-10 text-xs leading-5 text-white/70">
                  <p>{site.address.line1}<br />{site.address.line2}</p>
                  <p className="mt-1 text-white/55">{site.address.landmark}</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
