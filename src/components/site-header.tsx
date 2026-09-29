"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { resolveNavHref } from "@/lib/nav";
import { THEMES, useTheme, type ThemeId } from "@/lib/use-theme";
import { site } from "@/lib/site";

/* Theme switcher: shadcn Select in the navbar block's `trailing` slot. */
function ThemeSwitcher() {
  const { theme, select } = useTheme();
  return (
    <Select value={theme} onValueChange={(v) => select(v as ThemeId)}>
      <SelectTrigger aria-label="Color theme" className="h-9 w-[132px] border-transparent bg-transparent text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map((t) => (
          <SelectItem key={t.id} value={t.id}>
            <span className="flex items-center gap-2 text-xs">
              <span className="size-3 rounded-full border border-black/10" style={{ backgroundColor: t.dot }} />
              {t.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* Header: AkmanOS navbar block + route lookup. Sticky positioning only. */
export function SiteHeader() {
  const router = useRouter();
  const go = (itemId: string, linkId?: string) => {
    const href = resolveNavHref(itemId, linkId);
    if (href) router.push(href);
  };
  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-3 pb-3">
        <Navbar
          showSignIn={false}
          onNavSelect={go}
          onCta={() => router.push("/contact")}
          logoAlt={`${site.name} logo`}
          trailing={<ThemeSwitcher />}
        />
      </div>
    </div>
  );
}
