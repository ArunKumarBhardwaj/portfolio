"use client";

import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
  emitChange();
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getToggleCenter(button: HTMLButtonElement) {
  const rect = button.getBoundingClientRect();
  // Layout-viewport coords — must match the root VT snapshot box
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  return { x, y, endRadius };
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const isClient = useIsClient();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animatingRef = useRef(false);

  const toggleTheme = async () => {
    if (animatingRef.current) return;

    const next: Theme = theme === "dark" ? "light" : "dark";
    const button = buttonRef.current;

    if (
      !button ||
      !("startViewTransition" in document) ||
      prefersReducedMotion()
    ) {
      applyTheme(next);
      return;
    }

    const { x, y, endRadius } = getToggleCenter(button);
    const root = document.documentElement;

    root.style.setProperty("--theme-toggle-x", `${x}px`);
    root.style.setProperty("--theme-toggle-y", `${y}px`);
    root.style.setProperty("--theme-toggle-r", `${endRadius}px`);
    root.dataset.themeTransition = "true";
    animatingRef.current = true;

    try {
      const transition = document.startViewTransition(() => {
        // Flush React so the "new" snapshot is the real next theme — avoids the hitch
        flushSync(() => {
          applyTheme(next);
        });
      });

      await transition.finished;
    } catch {
      applyTheme(next);
    } finally {
      delete root.dataset.themeTransition;
      root.style.removeProperty("--theme-toggle-x");
      root.style.removeProperty("--theme-toggle-y");
      root.style.removeProperty("--theme-toggle-r");
      animatingRef.current = false;
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-foreground cursor-pointer"
    >
      <span className="sr-only">Toggle theme</span>
      {isClient ? (
        theme === "dark" ? (
          <Sun className="h-3.5 w-3.5" />
        ) : (
          <Moon className="h-3.5 w-3.5" />
        )
      ) : (
        <Sun className="h-3.5 w-3.5 opacity-0" aria-hidden />
      )}
    </button>
  );
}
