"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";

export function BottomBarClient({ whatsapp }: { whatsapp: string }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <nav aria-label="Contact shortcuts" className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 md:hidden">
      <div className="flex items-center gap-1 rounded-lg border border-[#b5c4b6] bg-white/95 p-1 shadow-[0_8px_24px_-12px_rgba(0,32,69,0.4)] backdrop-blur-md">
        <a
          href={whatsapp}
          aria-label="WhatsApp"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#efbc52] text-[#101A3D] transition-all active:scale-95"
        >
          <Icon name="chat" className="text-xl" />
        </a>
        <Link
          href="/contact"
          className="flex h-11 items-center justify-center rounded-md bg-[#174e3f] px-4 text-center text-[13px] font-bold text-white transition-all active:scale-[0.99]"
        >
          Contact ADJ
        </Link>
      </div>
    </nav>
  );
}
