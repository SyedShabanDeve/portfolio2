import { Fragment } from "react";
import { PROFILE, STATS } from "../data/site";
import { resumeUrl } from "../lib/media";
import HeroCanvas from "./HeroCanvas";
import ProjectStack from "./ProjectStack";
import Typer from "./Typer";
import CountUp from "./ui/CountUp";
import Icon from "./ui/Icon";
import LocalTime from "./ui/LocalTime";
import Magnetic from "./ui/Magnetic";

const RESUME_URL = resumeUrl(PROFILE.resume);

/** One word of the name, its letters rising out of their own masks in turn. */
function Word({ text, className = "", delay = 0 }) {
  const letters = [...text];

  return (
    <span className={`hero__word${className ? ` ${className}` : ""}`}>
      {letters.map((letter, i) => (
        <span className="hero__mask" key={`${letter}-${i}`}>
          <span
            className="hero__letter"
            style={{ animationDelay: `${delay + i * 34}ms`, "--i": i, "--n": letters.length }}
          >
            {letter}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ theme, onOpenProject }) {
  const scrollToWork = (event) => {
    event.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <HeroCanvas theme={theme} />
      <span className="glow hero__glow-1" />
      <span className="glow hero__glow-2" />
      <span className="glow hero__glow-3" />

      <div className="container hero__inner">
        <div className="hero__top rise" style={{ animationDelay: "0.05s" }}>
          <p className="badge">
            <span className="dot" />
            Available for hire
          </p>
          <p className="hero__where">
            <Icon name="pin" size={13} />
            <span>{PROFILE.location}</span>
            <span className="hero__where-sep" aria-hidden="true" />
            <LocalTime /> <span className="hero__tz">PKT</span>
          </p>
        </div>

        <h1 className="hero__name">
          <span className="sr-only">{PROFILE.fullName}</span>
          <span className="hero__name-row" aria-hidden="true">
            <Word text={PROFILE.firstName} delay={120} />
            <Word text={PROFILE.middleName} className="is-grad" delay={250} />
            <Word text={PROFILE.lastName} delay={440} />
          </span>
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__pitch rise" style={{ animationDelay: "0.55s" }}>
              {PROFILE.pitch.map((part, i) =>
                typeof part === "string" ? <Fragment key={i}>{part}</Fragment> : <em key={i}>{part.em}</em>
              )}
            </p>

            <div className="rise" style={{ animationDelay: "0.65s" }}>
              <Typer words={PROFILE.roles} />
            </div>

            <div className="hero__cta rise" style={{ animationDelay: "0.75s" }}>
              <Magnetic>
                <a className="btn btn--primary btn--lg" href="#work" onClick={scrollToWork}>
                  View my work
                  <Icon name="arrowRight" size={16} />
                </a>
              </Magnetic>
              <a className="btn btn--outline btn--lg" href={RESUME_URL} download>
                <Icon name="download" size={16} />
                Download CV
              </a>

              <span className="hero__socials">
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
                <a className="icon-btn" href={`mailto:${PROFILE.email}`} aria-label="Send an email">
                  <Icon name="mail" size={17} />
                </a>
              </span>
            </div>
          </div>

          <div className="hero__visual rise" style={{ animationDelay: "0.4s" }}>
            <ProjectStack onOpenProject={onOpenProject} />
          </div>
        </div>

        <dl className="hero__stats rise" style={{ animationDelay: "0.9s" }}>
          {STATS.map((stat) => (
            <div className="hero__stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                <CountUp value={stat.value} from={stat.from} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
