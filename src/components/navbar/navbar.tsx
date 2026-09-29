"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMountedReducedMotion } from "@/lib/use-mounted-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { SPRING_PANEL } from "@/lib/motion-ease";
import {
  DEFAULT_NAV_ITEMS,
  NAVBAR_BRAND_TITLE,
  NAVBAR_CTA_LABEL,
  NAVBAR_LOGO_SRC,
  NAVBAR_SIGN_IN_LABEL,
} from "./constants";
import { MegaMenuPanel } from "./mega-menu-panel";
import { NavBadge } from "./nav-badge";
import { NavbarMobileDrawer } from "./navbar-mobile-drawer";
import { useNavbarMegaMenu } from "./use-navbar-mega-menu";
import type { NavItem } from "./types";
import { isMegaItem } from "./types";

export type NavbarProps = {
  brandTitle?: string;
  logoSrc?: string;
  logoAlt?: string;
  items?: NavItem[];
  signInLabel?: string;
  ctaLabel?: string;
  /** Filled CTA (default) or plain page-link style. */
  ctaVariant?: "button" | "link";
  /** Gray card shell (default) or transparent on the page canvas. */
  surface?: boolean;
  /** Hide Sign in (desktop + mobile drawer). */
  showSignIn?: boolean;
  /** Hide Get started / CTA (desktop + mobile drawer). */
  showCta?: boolean;
  /** Tighter padding and gaps for minimal chrome (e.g. homepage). */
  compact?: boolean;
  /** Extra controls after CTA (e.g. theme switch). */
  trailing?: ReactNode;
  onNavSelect?: (itemId: string, linkId?: string) => void;
  onSignIn?: () => void;
  onCta?: () => void;
  className?: string;
};

export function Navbar({
  brandTitle = NAVBAR_BRAND_TITLE,
  logoSrc = NAVBAR_LOGO_SRC,
  logoAlt = "",
  items = DEFAULT_NAV_ITEMS,
  signInLabel = NAVBAR_SIGN_IN_LABEL,
  ctaLabel = NAVBAR_CTA_LABEL,
  ctaVariant = "button",
  surface = true,
  showSignIn = true,
  showCta = true,
  compact = false,
  trailing,
  onNavSelect,
  onSignIn,
  onCta,
  className,
}: NavbarProps) {
  const reduceMotion = useMountedReducedMotion();
  const {
    openMegaId,
    mobileOpen,
    mobileExpandedId,
    activeMega,
    scheduleMegaClose,
    scheduleMegaOpen,
    openMega,
    setMobileOpen,
    setMobileExpandedId,
    handleMegaTriggerClick,
    handleLinkClick,
  } = useNavbarMegaMenu({ items, onNavSelect });

  const ctaClassName =
    ctaVariant === "link"
      ? "px-3 font-medium text-foreground hover:bg-surface"
      : "bg-foreground px-4 font-semibold text-background hover:opacity-90";

  return (
    <header
      data-component="navbar"
      className={cn(
        "relative rounded-2xl sm:rounded-3xl",
        compact ? "w-auto px-3 sm:px-4" : "w-full px-4 sm:px-6",
        surface ? "bg-chart-card-bg" : "bg-transparent",
        className,
      )}
      onMouseLeave={scheduleMegaClose}
    >
      <div className="flex h-14 items-center justify-between gap-3 sm:h-16">
        <div
          className={cn(
            "flex min-w-0 items-center",
            compact ? "gap-2 sm:gap-3" : "gap-6",
          )}
        >
          <button
            type="button"
            className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-1 transition-opacity hover:opacity-80"
            onClick={() => onNavSelect?.("brand")}
            aria-label={brandTitle || logoAlt || NAVBAR_BRAND_TITLE}
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={128}
              height={32}
              sizes="128px"
              priority
              className="h-8 w-auto object-contain"
              draggable={false}
            />
            {brandTitle ? (
              <span className="truncate text-base font-semibold tracking-tight text-foreground">
                {brandTitle}
              </span>
            ) : null}
          </button>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {items.map((item) =>
              isMegaItem(item) ? (
                <button
                  key={item.id}
                  type="button"
                  aria-expanded={openMegaId === item.id}
                  aria-haspopup="true"
                  onMouseEnter={() => scheduleMegaOpen(item.id)}
                  onFocus={() => openMega(item.id)}
                  onClick={() => handleMegaTriggerClick(item)}
                  className={cn(
                    "flex h-11 min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-medium transition-colors",
                    openMegaId === item.id
                      ? "bg-surface text-foreground"
                      : "text-foreground hover:bg-surface",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-4 text-chart-muted transition-transform",
                      openMegaId === item.id && "rotate-180",
                    )}
                    strokeWidth={2.5}
                  />
                </button>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className="flex h-11 min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                >
                  {item.label}
                  {item.badge ? <NavBadge>{item.badge}</NavBadge> : null}
                </button>
              ),
            )}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-11 min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-chart-muted transition-colors hover:bg-surface hover:text-foreground sm:flex"
            onClick={() => onNavSelect?.("search")}
          >
            <Search className="size-4" strokeWidth={2.5} />
            <span className="font-mono text-xs">⌘K</span>
          </button>

          {showSignIn ? (
            <button
              type="button"
              className="hidden h-11 min-h-11 items-center rounded-xl px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface sm:flex"
              onClick={onSignIn}
            >
              {signInLabel}
            </button>
          ) : null}

          {showCta ? (
            <button
              type="button"
              className={cn(
                "hidden h-11 min-h-11 items-center rounded-xl text-sm transition-colors sm:flex",
                ctaClassName,
              )}
              onClick={onCta}
            >
              {ctaLabel}
            </button>
          ) : null}

          {trailing ? (
            <div className="hidden items-center sm:flex">{trailing}</div>
          ) : null}

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 min-h-11 w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-surface md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-5" strokeWidth={2.5} />
            ) : (
              <Menu className="size-5" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeMega ? (
          <motion.div
            key={activeMega.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : SPRING_PANEL}
            className="absolute inset-x-0 top-full z-50 hidden px-4 pt-2 sm:px-6 md:block"
            onMouseEnter={() => openMega(activeMega.id)}
          >
            <MegaMenuPanel
              item={activeMega}
              onLinkClick={(linkId) => handleLinkClick(activeMega.id, linkId)}
              onFeaturedClick={() => handleLinkClick(activeMega.id, "featured")}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <NavbarMobileDrawer
        items={items}
        mobileOpen={mobileOpen}
        mobileExpandedId={mobileExpandedId}
        signInLabel={signInLabel}
        ctaLabel={ctaLabel}
        ctaClassName={ctaClassName}
        showSignIn={showSignIn}
        showCta={showCta}
        trailing={trailing}
        onNavSelect={onNavSelect}
        onSignIn={onSignIn}
        onCta={onCta}
        onLinkClick={handleLinkClick}
        onMobileExpandedChange={setMobileExpandedId}
      />
    </header>
  );
}
