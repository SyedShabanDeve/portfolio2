import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { REDUCED_MOTION } from "../lib/motion";

const STORAGE_KEY = "ssa-theme";
const META_COLOR = { light: "#f7f5f0", dark: "#07070a" };

const readStored = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
};

const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";

const applyToDocument = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLOR[theme]);
};

/** Where the circular reveal starts: the control that was used, else the nav toggle. */
const originOf = (event) => {
  const el = event?.currentTarget?.getBoundingClientRect ? event.currentTarget : document.querySelector(".theme-toggle");
  if (!el) return [window.innerWidth - 40, 36];
  const rect = el.getBoundingClientRect();
  return [rect.left + rect.width / 2, rect.top + rect.height / 2];
};

/**
 * Reads the theme the inline boot script already applied to <html>, and keeps
 * it in sync with both the toggle and the OS setting.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.dataset.theme || readStored() || systemTheme();
  });

  useEffect(() => {
    applyToDocument(theme);
  }, [theme]);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const query = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!query) return undefined;

    const onChange = (event) => {
      if (!readStored()) setTheme(event.matches ? "light" : "dark");
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /**
   * Flips the theme. Where the browser supports View Transitions, the new
   * palette wipes in as a circle growing out of the control that was pressed.
   */
  const toggle = useCallback((event) => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private browsing — the choice just will not persist */
    }

    const commit = () => {
      applyToDocument(next);
      setTheme(next);
    };

    if (!document.startViewTransition || REDUCED_MOTION) {
      commit();
      return;
    }

    const [x, y] = originOf(event);
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(commit));

    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 720,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        /* transition skipped — the theme has already been applied */
      });
  }, []);

  return [theme, toggle];
}
