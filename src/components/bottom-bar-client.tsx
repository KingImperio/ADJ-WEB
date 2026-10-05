"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";

export function BottomBarClient({ whatsapp }: { whatsapp: string }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <nav className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 md:hidden">
      <div className="flex items-center gap-2 rounded-[1.35rem] border border-[#e2e7ff] bg-white/95 p-1.5 shadow-[0_18px_44px_-16px_rgba(0,32,69,0.45)] backdrop-blur-md">
        <a
          href={whatsapp}
          aria-label="WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D5A11E] text-[#101A3D] transition-all active:scale-90"
        >
          <Icon name="chat" className="text-xl" />
        </a>
        <Link
          href="/contact"
          className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-full bg-[#1a365d] px-3 text-center text-[13px] font-bold text-white transition-all active:scale-[0.99]"
        >
          Book Free Consultation
        </Link>
      </div>
    </nav>
  );
}
