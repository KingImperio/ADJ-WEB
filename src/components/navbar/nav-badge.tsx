/* NavBadge — reconstructed (its source was absent from the AkmanOS markdown;
   styling mirrors the inline badge pill in mega-menu-panel.tsx). */
import type { ReactNode } from "react";

export function NavBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[#c0f21e] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1f3a08]">
      {children}
    </span>
  );
}
