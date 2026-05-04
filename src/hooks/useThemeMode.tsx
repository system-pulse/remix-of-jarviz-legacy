import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type ThemeMode = "pro" | "tech";

interface Ctx {
  mode: ThemeMode;
  toggle: () => void;
  setMode: (m: ThemeMode) => void;
}

const ThemeModeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "jz-theme-mode";

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "pro";
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return saved === "tech" || saved === "pro" ? saved : "pro";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => setModeState(m), []);
  const toggle = useCallback(() => setModeState((m) => (m === "pro" ? "tech" : "pro")), []);

  return (
    <ThemeModeContext.Provider value={{ mode, toggle, setMode }}>{children}</ThemeModeContext.Provider>
  );
}

export function useThemeMode(): Ctx {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) return { mode: "pro", toggle: () => {}, setMode: () => {} };
  return ctx;
}
