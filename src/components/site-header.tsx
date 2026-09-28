"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navAnchors, navRoutes, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const links = onHome ? navAnchors : navRoutes;
  const consultHref = onHome ? "#contact" : "/contact";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/adj-logo.png"
            alt={`${site.name} logo`}
            width={1405}
            height={768}
            priority
            className="h-10 w-auto rounded-md"
          />
          <span className="hidden leading-tight min-[420px]:block">
            <span className="block font-display text-sm font-bold text-white">{site.name}</span>
            <span className="block text-[11px] uppercase tracking-widest text-gold">{site.tagline}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={consultHref}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "border-white/20 bg-transparent text-white hover:bg-white/10",
            })}
          >
            Book free consultation
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "sm", className: "bg-gold font-semibold text-ink hover:bg-gold-soft" })}
          >
            WhatsApp us
          </a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="border-white/10 bg-panel">
            <div className="mt-8 flex flex-col gap-1">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ className: "bg-gold font-semibold text-ink hover:bg-gold-soft" })}
                >
                  WhatsApp us
                </a>
                <Link
                  href={consultHref}
                  onClick={() => setOpen(false)}
                  className={buttonVariants({
                    variant: "outline",
                    className: "border-white/20 bg-transparent text-white",
                  })}
                >
                  Book free consultation
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
