"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";

/* Sticky mobile bottom action bar: one tap to WhatsApp or book. */
export function BottomBar() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div className="flex items-center gap-2 rounded-full border border-[#e2e7ff] bg-white/90 p-1.5 shadow-[0_18px_44px_-16px_rgba(0,32,69,0.45)] backdrop-blur-md">
        <a
          href={site.whatsapp}
          aria-label="WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#006c48] text-white transition-all active:scale-90"
        >
          <Icon name="chat" className="text-xl" />
        </a>
        <Link
          href="/contact"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#1a365d] text-sm font-bold text-white transition-all active:scale-[0.99]"
        >
          Book Free Consultation
        </Link>
      </div>
    </nav>
  );
}
