"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMountedReducedMotion } from "@/lib/use-mounted-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { SPRING_PANEL } from "@/lib/motion-ease";
import { NavBadge } from "./nav-badge";
import type { NavItem } from "./types";
import { isMegaItem } from "./types";

type NavbarMobileDrawerProps = {
  items: NavItem[];
  mobileOpen: boolean;
  mobileExpandedId: string | null;
  signInLabel: string;
  ctaLabel: string;
  ctaClassName: string;
  showSignIn?: boolean;
  showCta?: boolean;
  trailing?: ReactNode;
  onNavSelect?: (itemId: string, linkId?: string) => void;
  onSignIn?: () => void;
  onCta?: () => void;
  onLinkClick: (itemId: string, linkId?: string) => void;
  onMobileExpandedChange: (id: string | null) => void;
};

export function NavbarMobileDrawer({
  items,
  mobileOpen,
  mobileExpandedId,
  signInLabel,
  ctaLabel,
  ctaClassName,
  showSignIn = true,
  showCta = true,
  trailing,
  onNavSelect,
  onSignIn,
  onCta,
  onLinkClick,
  onMobileExpandedChange,
}: NavbarMobileDrawerProps) {
  const reduceMotion = useMountedReducedMotion();

  return (
    <AnimatePresence>
      {mobileOpen ? (
        <motion.div
          key="mobile-nav"
          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
          transition={reduceMotion ? { duration: 0 } : SPRING_PANEL}
          className="overflow-hidden border-t border-border md:hidden"
        >
          <div className="flex flex-col gap-1 py-3">
            {items.map((item) =>
              isMegaItem(item) ? (
                <div key={item.id} className="flex flex-col">
                  <button
                    type="button"
                    aria-expanded={mobileExpandedId === item.id}
                    className="flex h-11 min-h-11 items-center justify-between rounded-xl px-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                    onClick={() =>
                      onMobileExpandedChange(
                        mobileExpandedId === item.id ? null : item.id,
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-4 text-chart-muted transition-transform",
                        mobileExpandedId === item.id && "rotate-180",
                      )}
                      strokeWidth={2.5}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileExpandedId === item.id ? (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={reduceMotion ? { duration: 0 } : SPRING_PANEL}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-4 px-2 pb-3 pt-1">
                          {item.columns.map((column) => (
                            <div key={column.id} className="flex flex-col gap-2">
                              <p className="text-xs font-semibold uppercase tracking-wide text-chart-muted">
                                {column.title}
                              </p>
                              <ul className="flex flex-col gap-1">
                                {column.links.map((link) => (
                                  <li key={link.id}>
                                    <button
                                      type="button"
                                      onClick={() => onLinkClick(item.id, link.id)}
                                      className="flex min-h-11 w-full flex-col items-start rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface"
                                    >
                                      <span className="text-sm font-medium text-foreground">
                                        {link.label}
                                      </span>
                                      {link.description ? (
                                        <span className="text-xs text-chart-muted">
                                          {link.description}
                                        </span>
                                      ) : null}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {item.featured ? (
                            <button
                              type="button"
                              onClick={() => onLinkClick(item.id, "featured")}
                              className="flex min-h-11 flex-col gap-1 rounded-2xl bg-chart-bg px-3 py-3 text-left"
                            >
                              <span className="text-sm font-semibold text-foreground">
                                {item.featured.title}
                              </span>
                              <span className="text-xs text-chart-muted">
                                {item.featured.description}
                              </span>
                            </button>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onLinkClick(item.id)}
                  className="flex h-11 min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                >
                  {item.label}
                  {item.badge ? <NavBadge>{item.badge}</NavBadge> : null}
                </button>
              ),
            )}

            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <button
                type="button"
                className="flex h-11 min-h-11 items-center gap-2 rounded-xl px-2 text-sm text-chart-muted transition-colors hover:bg-surface hover:text-foreground"
                onClick={() => onNavSelect?.("search")}
              >
                <Search className="size-4" strokeWidth={2.5} />
                Search
              </button>
              {showSignIn ? (
                <button
                  type="button"
                  className="flex h-11 min-h-11 items-center rounded-xl px-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                  onClick={onSignIn}
                >
                  {signInLabel}
                </button>
              ) : null}
              {showCta ? (
                <button
                  type="button"
                  className={cn(
                    "flex h-11 min-h-11 items-center rounded-xl text-sm transition-colors",
                    ctaClassName.includes("justify-center")
                      ? ctaClassName
                      : cn("justify-start px-2", ctaClassName),
                  )}
                  onClick={onCta}
                >
                  {ctaLabel}
                </button>
              ) : null}
              {trailing ? (
                <div className="flex items-center px-2 pt-1">{trailing}</div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
