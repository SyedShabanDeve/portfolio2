import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/site";

const PREFIX = "#work/";

const fromHash = () => {
  const { hash } = window.location;
  if (!hash.startsWith(PREFIX)) return null;
  const id = decodeURIComponent(hash.slice(PREFIX.length));
  return PROJECTS.some((project) => project.id === id) ? id : null;
};

/**
 * The open case study lives in the URL (#work/<id>), so a link to one can be
 * shared, and the browser's Back button closes it instead of leaving the site.
 */
export function useProjectHash() {
  const [id, setId] = useState(() => (typeof window === "undefined" ? null : fromHash()));
  // True while the open case study sits on a history entry we pushed.
  const pushed = useRef(false);

  useEffect(() => {
    const sync = () => {
      const next = fromHash();
      if (!next) pushed.current = false;
      setId(next);
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const open = useCallback((next) => {
    const { pathname, search } = window.location;

    if (next) {
      const url = `${PREFIX}${next}`;
      if (pushed.current) {
        window.history.replaceState({ work: next }, "", url);
      } else {
        window.history.pushState({ work: next }, "", url);
        pushed.current = true;
      }
      setId(next);
      return;
    }

    if (pushed.current) {
      // Popping our own entry fires popstate, which clears the id.
      pushed.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, "", `${pathname}${search}`);
      setId(null);
    }
  }, []);

  return [id, open];
}
