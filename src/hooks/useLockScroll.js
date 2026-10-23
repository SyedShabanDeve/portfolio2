import { useEffect } from "react";

const holders = new Set();

/**
 * Keeps the page from scrolling behind an open dialog or menu. Several
 * overlays can hold the lock at once; it lifts when the last one lets go.
 */
export function useLockScroll(active, key) {
  useEffect(() => {
    if (!active) return undefined;
    holders.add(key);
    document.documentElement.classList.add("is-locked");
    return () => {
      holders.delete(key);
      if (!holders.size) document.documentElement.classList.remove("is-locked");
    };
  }, [active, key]);
}
