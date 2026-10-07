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
      className={`sticky z-50 transition-all duration-300 ${
        float ? "top-2 mx-auto w-[calc(100%-1rem)] max-w-5xl sm:top-3 sm:w-[calc(100%-1.5rem)]" : "top-0 w-full"
      }`}
    >
      <nav
        className={`relative mx-auto overflow-visible transition-[background-color,border-color,box-shadow] duration-300 ${
          float
            ? "rounded-full border border-[#e2e7ff] bg-white/85 shadow-[0_18px_44px_-18px_rgba(0,32,69,0.35)] backdrop-blur-md"
            : "border-b border-[#e2e7ff] bg-white"
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
                className={`rounded-full border border-[#D5A11E]/35 bg-white object-cover p-0.5 transition-all duration-300 ${
                float ? "h-9 w-9" : "h-10 w-10"
              }`}
            />
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-display text-[14px] leading-tight font-bold tracking-tight text-[#002045] sm:text-[15px]">
                {name}
              </span>
              <span
                className={`text-[9px] font-bold tracking-[0.2em] text-[#A87909] uppercase transition-all duration-300 ${
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
                className="text-[13px] font-semibold text-[#43474e] transition-colors hover:text-[#002045]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsapp}
              className={`hidden items-center gap-1.5 rounded-full border border-[#e2e7ff] px-3.5 py-2 text-xs font-bold text-[#002045] transition-colors hover:bg-[#f2f3ff] sm:inline-flex ${
                float ? "hidden md:inline-flex" : ""
              }`}
            >
              <Icon name="chat" className="text-[16px]" />
              <span className="hidden sm:inline">Call / WhatsApp</span>
            </a>
            {!isBookingPage && (
              <Link
                href="/contact"
                className="hidden items-center justify-center rounded-xl bg-[#D5A11E] px-4 py-2.5 text-xs font-bold text-[#101A3D] shadow-[0_12px_28px_-10px_rgba(213,161,30,.65)] transition-all hover:-translate-y-0.5 hover:bg-[#e5b532] active:scale-95 sm:inline-flex"
              >
                Book Free Consultation
              </Link>
            )}
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e2e7ff] text-[#002045] transition-colors hover:bg-[#f2f3ff] lg:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="text-xl" />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border border-t-0 border-[#e2e7ff] bg-white px-4 pb-5 shadow-[0_20px_38px_-20px_rgba(0,32,69,0.38)] lg:hidden">
            <div className="grid gap-1 pt-2">
              {mobileLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3.5 text-[15px] font-semibold text-[#002045] transition-colors hover:bg-[#f2f3ff]"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl px-3 py-3 text-[15px] font-semibold text-[#002045] transition-colors hover:bg-[#f2f3ff]"
              >
                <Icon name="chat" className="text-lg" />
                Call / WhatsApp
              </a>
              {!isBookingPage && (
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#D5A11E] px-4 text-sm font-bold text-[#101A3D] shadow-[0_10px_24px_-12px_rgba(213,161,30,.8)]"
                >
                  Book Free Consultation
                </Link>
              )}
            </div>

            <div className="mt-5 border-t border-[#e2e7ff] pt-4">
              <p className="text-[11px] font-bold tracking-[0.16em] text-[#A87909] uppercase">What ADJ offers</p>
              <p className="mt-2 text-sm leading-6 text-[#43474e]">
                Exam preparation, live group tutorials, and admissions guidance from preparation through matriculation.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exams.map((exam) => (
                  <span key={exam} className="rounded-full bg-[#f2f3ff] px-2.5 py-1 text-xs font-medium text-[#002045]">
                    {exam}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-t border-[#e2e7ff] pt-4 text-sm text-[#43474e]">
              <div className="flex items-start gap-2.5">
                <Icon name="location_on" className="mt-0.5 text-base text-[#A87909]" />
                <p>{site.address.line1}, {site.address.line2}<br /><span className="text-xs text-[#74777f]">{site.address.landmark}</span></p>
              </div>
              <a href={site.phoneHref} className="flex items-center gap-2.5 font-medium text-[#002045]">
                <Icon name="call" className="text-base text-[#A87909]" />{site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 font-medium text-[#002045]">
                <Icon name="mail" className="text-base text-[#A87909]" />{site.email}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
