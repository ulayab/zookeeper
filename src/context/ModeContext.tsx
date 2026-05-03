"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Mode = "professional" | "human";

type ModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
};

const STORAGE_KEY = "zookeeper:mode";
const MODE_CHANGE_EVENT = "zookeeper:mode-change";
const DEFAULT_MODE: Mode = "professional";

const ModeContext = createContext<ModeContextValue | null>(null);

function isMode(value: string | null): value is Mode {
  return value === "professional" || value === "human";
}

function readCurrentMode(): Mode {
  if (typeof window === "undefined") {
    return DEFAULT_MODE;
  }

  const domMode = document.documentElement.dataset.mode ?? null;
  if (isMode(domMode)) {
    return domMode;
  }

  const storedMode = window.localStorage.getItem(STORAGE_KEY);
  return isMode(storedMode) ? storedMode : DEFAULT_MODE;
}

function applyMode(mode: Mode): void {
  document.documentElement.dataset.mode = mode;
}

function subscribeToModeChanges(onStoreChange: () => void): () => void {
  window.addEventListener(MODE_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(MODE_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function ModeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const mode = useSyncExternalStore(
    subscribeToModeChanges,
    readCurrentMode,
    () => DEFAULT_MODE,
  );

  const setMode = useCallback((nextMode: Mode) => {
    applyMode(nextMode);
    window.localStorage.setItem(STORAGE_KEY, nextMode);
    window.dispatchEvent(new Event(MODE_CHANGE_EVENT));
  }, []);

  const toggleMode = useCallback(() => {
    const nextMode = mode === "professional" ? "human" : "professional";
    setMode(nextMode);
  }, [mode, setMode]);

  const value = useMemo<ModeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const context = useContext(ModeContext);

  if (context === null) {
    throw new Error("useMode must be used within ModeProvider.");
  }

  return context;
}
