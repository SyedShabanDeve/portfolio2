import { useEffect, useLayoutEffect, useRef } from "react";
import { NAV, PROFILE } from "../data/site";
import { useLockScroll } from "../hooks/useLockScroll";
import { resumeUrl } from "../lib/media";
import { IS_MAC } from "../lib/motion";
import Icon from "./ui/Icon";
import LocalTime from "./ui/LocalTime";

const RESUME_URL = resumeUrl(PROFILE.resume);

/** Slides the highlight pill under whichever link is active. */
function useIndicator(active) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const nav = ref.current;
    if (!nav) return undefined;

    const place = () => {
      const link = nav.querySelector(".nav__link.is-active");
      nav.style.setProperty("--ind-x", `${link ? link.offsetLeft : 0}px`);
      nav.style.setProperty("--ind-w", `${link ? link.offsetWidth : 0}px`);
      nav.dataset.indicator = link ? "on" : "off";
    };

    place();
    // Web fonts change the link widths once they arrive.
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active]);

  return ref;
}

export default function Navbar({ active, stuck, theme, onToggleTheme, open, onOpenChange, onOpenPalette }) {
  const linksRef = useIndicator(active);
  useLockScroll(open, "menu");

  // Close the menu on Escape and once the viewport is wide enough again.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => e.key === "Escape" && onOpenChange(false);
    const onResize = () => window.innerWidth > 920 && onOpenChange(false);

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onOpenChange]);

  const go = (event, id) => {
    event.preventDefault();
    onOpenChange(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className={`nav${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
        <div className="container nav__inner">
          <a className="brand" href="#home" onClick={(e) => go(e, "home")} aria-label="Back to top">
            <span className="brand__mark" aria-hidden="true">
              {PROFILE.initials}
            </span>
            <span className="brand__text">
              <span className="brand__name">{PROFILE.fullName}</span>
              <span className="brand__role">{PROFILE.title}</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections" ref={linksRef}>
            <span className="nav__indicator" aria-hidden="true" />
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav__link${active === item.id ? " is-active" : ""}`}
                aria-current={active === item.id ? "true" : undefined}
                onClick={(e) => go(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="nav__search"
              onClick={onOpenPalette}
              aria-label="Open the command palette"
              aria-keyshortcuts={IS_MAC ? "Meta+K" : "Control+K"}
            >
              <Icon name="search" size={15} />
              <span className="nav__search-text">Search</span>
              <kbd className="kbd">{IS_MAC ? "⌘K" : "Ctrl K"}</kbd>
            </button>

            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
            </button>

            <a className="btn btn--primary btn--sm nav__hire" href="#contact" onClick={(e) => go(e, "contact")}>
              Hire me
              <Icon name="arrowRight" size={14} />
            </a>

            <button
              type="button"
              className={`nav__toggle${open ? " is-open" : ""}`}
              onClick={() => onOpenChange(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`drawer${open ? " is-open" : ""}`} inert={!open}>
        <nav className="drawer__links" aria-label="Sections">
          {NAV.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`drawer__link${active === item.id ? " is-active" : ""}`}
              style={{ "--i": i }}
              onClick={(e) => go(e, item.id)}
            >
              <span className="drawer__no">0{i + 1}</span>
              {item.label}
              <Icon name="arrowUpRight" size={20} className="drawer__arrow" />
            </a>
          ))}
        </nav>

        <div className="drawer__foot">
          <div className="drawer__cta">
            <a className="btn btn--primary" href="#contact" onClick={(e) => go(e, "contact")}>
              Hire me
              <Icon name="arrowRight" size={14} />
            </a>
            <a className="btn btn--outline" href={RESUME_URL} download>
              <Icon name="download" size={15} />
              Download CV
            </a>
          </div>
          <p className="drawer__meta">
            <span className="live-dot" />
            {PROFILE.location} · <LocalTime />
          </p>
        </div>
      </div>
    </>
  );
}
