"use client";

import { useRef, useSyncExternalStore } from "react";
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

  const toggleTheme = async () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const button = buttonRef.current;

    const switchTheme = () => {
      applyTheme(next);
    };

    if (
      !button ||
      !("startViewTransition" in document) ||
      prefersReducedMotion()
    ) {
      switchTheme();
      return;
    }

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(switchTheme);

    try {
      await transition.ready;

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 560,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch {
      // Transition aborted or unsupported mid-flight
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
