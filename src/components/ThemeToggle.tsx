"use client";

import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const TRANSITION_MS = 650;
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

/**
 * Percentage clip-paths — MagicUI/Chrome fix:
 * absolute `px` on ::view-transition-new(root) often lands at the wrong
 * origin (top-left) on mobile Chrome / scaled displays. Percentages resolve
 * against the snapshot box and stay aligned with the toggle.
 */
function getCircleClipPaths(cx: number, cy: number, maxRadius: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const x = `${(cx / vw) * 100}%`;
  const y = `${(cy / vh) * 100}%`;
  // circle() % radius resolves against hypot(w,h)/√2 of the reference box
  const r = `${(maxRadius / (Math.hypot(vw, vh) / Math.SQRT2)) * 100}%`;
  return [
    `circle(0% at ${x} ${y})`,
    `circle(${r} at ${x} ${y})`,
  ] as const;
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
    const root = document.documentElement;

    if (
      !button ||
      typeof document.startViewTransition !== "function" ||
      prefersReducedMotion()
    ) {
      applyTheme(next);
      return;
    }

    const { top, left, width, height } = button.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );
    const clipPath = getCircleClipPaths(cx, cy, maxRadius);

    animatingRef.current = true;
    // Pin collapsed clip BEFORE VT so the new snapshot never paints unclipped
    root.dataset.themeVt = "active";
    root.style.setProperty("--theme-vt-clip-from", clipPath[0]);
    root.style.setProperty("--theme-vt-duration", `${TRANSITION_MS}ms`);

    const cleanup = () => {
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-clip-from");
      root.style.removeProperty("--theme-vt-duration");
      animatingRef.current = false;
    };

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          applyTheme(next);
        });
      });

      await transition.ready;

      const animation = root.animate(
        { clipPath: [...clipPath] },
        {
          duration: TRANSITION_MS,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );

      await Promise.all([animation.finished, transition.finished]);
    } catch {
      applyTheme(next);
    } finally {
      cleanup();
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
