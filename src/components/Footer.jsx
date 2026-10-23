import { NAV, PROFILE } from "../data/site";
import { resumeUrl } from "../lib/media";
import { IS_MAC } from "../lib/motion";
import Icon from "./ui/Icon";
import Magnetic from "./ui/Magnetic";

export default function Footer({ onOpenPalette }) {
  const year = new Date().getFullYear();

  const go = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta">
          <p className="footer__kicker">
            <span className="live-dot" />
            Available for new work
          </p>
          <Magnetic strength={0.12}>
            <a className="footer__big" href="#contact" onClick={(e) => go(e, "contact")}>
              Let&apos;s work together
              <span className="footer__big-arrow" aria-hidden="true">
                <Icon name="arrowUpRight" size={34} strokeWidth={1.5} />
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="footer__top">
          <div className="footer__brand">
            <span className="brand">
              <span className="brand__mark" aria-hidden="true">
                {PROFILE.initials}
              </span>
              <span className="brand__text">
                <span className="brand__name">{PROFILE.fullName}</span>
                <span className="brand__role">
                  {PROFILE.title} · {PROFILE.subtitle}
                </span>
              </span>
            </span>
            <p className="footer__blurb">
              Building production web applications and online stores from Lahore for clients in Pakistan, the UAE
              and the United States. {PROFILE.availability}.
            </p>
          </div>

          <div>
            <h4>Navigate</h4>
            <div className="footer__list">
              {NAV.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={(e) => go(e, item.id)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Elsewhere</h4>
            <div className="footer__list">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <a href={resumeUrl(PROFILE.resume)} download>
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {PROFILE.fullName} · {PROFILE.location}
          </span>
          <button type="button" className="footer__palette" onClick={onOpenPalette}>
            Press <kbd className="kbd">{IS_MAC ? "⌘" : "Ctrl"}</kbd>
            <kbd className="kbd">K</kbd> to jump anywhere
          </button>
          <span className="footer__made">
            <Icon name="code" size={13} />
            Hand-built with React &amp; Vite — no UI libraries
          </span>
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        {PROFILE.middleName}
      </div>
    </footer>
  );
}
