import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { getContact } from "@/lib/content";

/* Floating stacked header: a dark utility pill carrying hours/address/phone,
   then a floating frosted-white nav island with logo, links, and the two
   conversion actions. The whole stack floats with rounded-full geometry. */
const links = [
  { label: "Programmes", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export async function SiteHeader() {
  const site = await getContact();
  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-6xl px-3 sm:px-4">
      {/* Floating nav island */}
      <nav className="mt-2 rounded-full border border-[#e2e7ff] bg-white/85 shadow-[0_18px_44px_-18px_rgba(0,32,69,0.35)] backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/adj-logo.png"
              alt={`${site.name} logo`}
              width={676}
              height={369}
              className="h-10 w-10 rounded-xl border border-[#e2e7ff] object-cover"
            />
            <span className="flex flex-col">
              <span className="font-display text-[15px] leading-tight font-bold tracking-tight text-[#002045]">
                {site.name}
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#006c48] uppercase">
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
              href={site.whatsapp}
              className="hidden items-center gap-1.5 rounded-full border border-[#e2e7ff] px-3.5 py-2 text-xs font-bold text-[#002045] transition-colors hover:bg-[#f2f3ff] sm:inline-flex"
            >
              <Icon name="chat" className="text-[16px]" />
              <span className="hidden sm:inline">Call / WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#006c48] px-4 py-2.5 text-xs font-bold text-white shadow-[0_12px_28px_-10px_rgba(0,108,72,0.6)] transition-all hover:bg-[#005236] active:scale-95"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
