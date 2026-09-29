"use client";

import { useCallback, useEffect, useState } from "react";

export const THEMES = [
  { id: "lagoon", label: "Lagoon", dot: "#2e6e9e" },
  { id: "royal", label: "Royal", dot: "#0047ab" },
  { id: "emerald", label: "Emerald", dot: "#1e7a4f" },
  { id: "sand", label: "Sand", dot: "#c08a3e" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "adj-theme";
const DEFAULT_THEME: ThemeId = "lagoon";

/* Pre-paint script (AkmanOS themeInitScript pattern): applies the stored
   theme before first paint so there is no flash. Inlined in layout <head>. */
export const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("${STORAGE_KEY}") || "${DEFAULT_THEME}";
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
`;

export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "lagoon" || stored === "royal" || stored === "emerald" || stored === "sand") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const select = useCallback((id: ThemeId) => {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* private mode — theme still applies for the session */
    }
  }, []);

  return { theme, select };
}
