"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NavItem, NavMegaItem } from "./types";
import { isMegaItem } from "./types";

const HOVER_OPEN_MS = 80;
const HOVER_CLOSE_MS = 160;

type UseNavbarMegaMenuOptions = {
  items: NavItem[];
  onNavSelect?: (itemId: string, linkId?: string) => void;
};

export function useNavbarMegaMenu({
  items,
  onNavSelect,
}: UseNavbarMegaMenuOptions) {
  const [openMegaId, setOpenMegaId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const hoverOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeMega = items.find(
    (item): item is NavMegaItem =>
      isMegaItem(item) && item.id === openMegaId,
  );

  const clearHoverTimers = useCallback(() => {
    if (hoverOpenTimer.current) {
      clearTimeout(hoverOpenTimer.current);
      hoverOpenTimer.current = null;
    }
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  }, []);

  const openMega = useCallback(
    (id: string) => {
      clearHoverTimers();
      setOpenMegaId(id);
    },
    [clearHoverTimers],
  );

  const scheduleMegaOpen = useCallback(
    (id: string) => {
      clearHoverTimers();
      hoverOpenTimer.current = setTimeout(() => openMega(id), HOVER_OPEN_MS);
    },
    [clearHoverTimers, openMega],
  );

  const scheduleMegaClose = useCallback(() => {
    clearHoverTimers();
    hoverCloseTimer.current = setTimeout(() => setOpenMegaId(null), HOVER_CLOSE_MS);
  }, [clearHoverTimers]);

  const closeMega = useCallback(() => {
    clearHoverTimers();
    setOpenMegaId(null);
  }, [clearHoverTimers]);

  useEffect(() => {
    return () => clearHoverTimers();
  }, [clearHoverTimers]);

  useEffect(() => {
    if (!openMegaId) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMega();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMega, openMegaId]);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  function handleMegaTriggerClick(item: NavMegaItem) {
    if (openMegaId === item.id) {
      closeMega();
      return;
    }
    openMega(item.id);
  }

  function handleLinkClick(itemId: string, linkId?: string) {
    onNavSelect?.(itemId, linkId);
    closeMega();
    setMobileOpen(false);
  }

  return {
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
  };
}
