"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";

/* Sticky, and morphs: flush full-width bar at the top of the page; once you
   scroll, it slides up and rounds into the floating pill island. */
const links = [
  { label: "Programmes", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function ScrollNav({
  whatsapp,
  name,
}: {
  whatsapp: string;
  name: string;
}) {
  const [float, setFloat] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const on = () => setFloat(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky z-50 transition-all duration-300 ${
        float ? "top-3 mx-auto w-[calc(100%-1.5rem)] max-w-5xl" : "top-0 w-full"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-300 ${
          float
            ? "rounded-full border border-[#e2e7ff] bg-white/85 shadow-[0_18px_44px_-18px_rgba(0,32,69,0.35)] backdrop-blur-md"
            : "border-b border-[#e2e7ff] bg-white"
        }`}
      >
        <div
          className={`flex items-center justify-between px-4 transition-all duration-300 sm:px-5 ${
            float ? "h-14" : "h-[72px]"
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
            <span className="flex flex-col">
              <span className="font-display text-[15px] leading-tight font-bold tracking-tight text-[#002045]">
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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#D5A11E] px-4 py-2.5 text-xs font-bold text-[#101A3D] shadow-[0_12px_28px_-10px_rgba(213,161,30,.65)] transition-all hover:-translate-y-0.5 hover:bg-[#e5b532] active:scale-95"
            >
              Book Free Consultation
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e7ff] text-[#002045] transition-colors hover:bg-[#f2f3ff] lg:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="text-xl" />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div id="mobile-navigation" className="border-t border-[#e2e7ff] px-4 pb-4 lg:hidden">
            <div className="grid gap-1 pt-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[#002045] transition-colors hover:bg-[#f2f3ff]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
