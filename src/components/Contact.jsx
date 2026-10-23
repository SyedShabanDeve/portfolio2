import { useState } from "react";
import { PROFILE } from "../data/site";
import { resumeUrl } from "../lib/media";
import ContactForm from "./ContactForm";
import Icon from "./ui/Icon";
import LocalTime from "./ui/LocalTime";
import Magnetic from "./ui/Magnetic";
import Reveal from "./ui/Reveal";
import SplitWords from "./ui/SplitWords";

/**
 * The value stays a real link (so mailto/tel still work); copying is its own
 * button rather than a nested control inside the anchor.
 */
function ContactRow({ icon, label, value, href, copyable = false, external = false }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the link beside it still works */
    }
  };

  return (
    <div className="contact__row">
      <a
        className="contact__row-main"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="contact__row-icon">
          <Icon name={icon} size={15} />
        </span>
        <span>
          <span className="contact__row-label">{label}</span>
          <span className="contact__row-value">{value}</span>
        </span>
      </a>

      {copyable && (
        <button type="button" className="contact__copy" onClick={copy} aria-label={`Copy ${label}`}>
          {copied ? (
            <>
              <Icon name="check" size={12} /> Copied
            </>
          ) : (
            "Copy"
          )}
        </button>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <span className="glow contact__glow" />
      <div className="container">
        <Reveal className="contact__hero">
          <p className="eyebrow">06 — Contact</p>
          <h2 className="contact__title">
            <SplitWords text="Have a role or a project?" />{" "}
            <span className="contact__title-accent">
              <SplitWords text="Let's talk." start={6} />
            </span>
          </h2>
          <p className="section-lede">
            {PROFILE.availability}. Freelance projects welcome too — tell me what you need and I will come
            back with a plan.
          </p>
          <div className="contact__quick">
            <Magnetic>
              <a className="btn btn--primary btn--lg" href={`mailto:${PROFILE.email}`}>
                <Icon name="mail" size={16} />
                Email me
              </a>
            </Magnetic>
            <a className="btn btn--wa btn--lg" href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={16} />
              WhatsApp
            </a>
          </div>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__panel spot">
            <span className="badge">
              <span className="dot" />
              {PROFILE.responseTime}
            </span>

            <div className="contact__rows">
              <ContactRow
                icon="mail"
                label="Email"
                value={PROFILE.email}
                href={`mailto:${PROFILE.email}`}
                copyable
              />
              <ContactRow
                icon="whatsapp"
                label="WhatsApp"
                value={PROFILE.phone}
                href={PROFILE.whatsapp}
                external
              />
              <ContactRow
                icon="phone"
                label="Phone"
                value={PROFILE.phone}
                href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                copyable
              />
              <div className="contact__row">
                <span className="contact__row-main">
                  <span className="contact__row-icon">
                    <Icon name="pin" size={15} />
                  </span>
                  <span>
                    <span className="contact__row-label">Location</span>
                    <span className="contact__row-value">
                      {PROFILE.location} · <LocalTime /> local
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div className="contact__socials">
              <a
                className="icon-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Icon name="github" size={17} />
              </a>
              <a
                className="icon-btn"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Icon name="linkedin" size={17} />
              </a>
              <a className="icon-btn" href={resumeUrl(PROFILE.resume)} download aria-label="Download my CV">
                <Icon name="download" size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
