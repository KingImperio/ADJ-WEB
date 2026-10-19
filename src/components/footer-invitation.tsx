"use client";

import { usePathname } from "next/navigation";

export function FooterInvitation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/contact" || pathname === "/contact/" ? null : children;
}
