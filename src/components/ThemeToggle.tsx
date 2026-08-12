"use client";

import { useRef, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const TRANSITION_MS = 900;
const THEME_BG: Record<Theme, string> = {
  light: "#f6f6f7",
  dark: "#050505",
};

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

/**
 * Overlay circle wipe — no View Transitions API.
 * VT was inconsistent on Chrome/DDG (top-left origin, mid-pause jank).
 */
async function runCircleWipe(
  button: HTMLButtonElement,
  next: Theme
): Promise<void> {
  const { x, y, endRadius } = getToggleCenter(button);

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 2147483646;
    pointer-events: none;
    background: ${THEME_BG[next]};
    clip-path: circle(0px at ${x}px ${y}px);
    will-change: clip-path;
    transform: translateZ(0);
  `;
  document.body.appendChild(overlay);

  // Ensure initial clip is painted before animating
  overlay.getBoundingClientRect();

  const animation = overlay.animate(
    [
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
    ],
    {
      duration: TRANSITION_MS,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
    }
  );

  try {
    await animation.finished;
  } catch {
    // aborted
  }

  applyTheme(next);
  overlay.remove();
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

    if (!button || prefersReducedMotion()) {
      applyTheme(next);
      return;
    }

    animatingRef.current = true;
    try {
      await runCircleWipe(button, next);
    } catch {
      applyTheme(next);
    } finally {
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
