import { ABOUT, LANGUAGES, PROFILE } from "../data/site";
import { formatTime, hourIn, useNow } from "../hooks/useNow";
import { resumeUrl } from "../lib/media";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

/** developer.json, one line at a time — keys, punctuation and values coloured like an editor. */
const CODE = [
  ["{"],
  ["  ", ["k", '"name"'], ": ", ["s", `"${PROFILE.fullName}"`], ","],
  ["  ", ["k", '"role"'], ": ", ["s", `"${PROFILE.title}"`], ","],
  ["  ", ["k", '"stack"'], ": [", ["s", '"MERN"'], ", ", ["s", '"Shopify"'], ", ", ["s", '"WordPress"'], "],"],
  ["  ", ["k", '"experience"'], ": ", ["s", '"3+ years"'], ","],
  ["  ", ["k", '"clients_in"'], ": [", ["s", '"PK"'], ", ", ["s", '"UAE"'], ", ", ["s", '"USA"'], "],"],
  ["  ", ["k", '"based"'], ": ", ["s", `"${PROFILE.location}"`], ","],
  ["  ", ["k", '"languages"'], ": [", ["s", '"Urdu"'], ", ", ["s", '"English"'], "],"],
  ["  ", ["k", '"latest_ship"'], ": ", ["s", '"elitezone.zone"'], ","],
  ["  ", ["k", '"open_to_work"'], ": ", ["b", "true"]],
  ["}"],
];

function DevCard() {
  return (
    <div className="code">
      <div className="code__bar" aria-hidden="true">
        <span className="frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code__file">developer.json</span>
      </div>
      <pre className="code__body" aria-label="Developer summary">
        {CODE.map((parts, i) => (
          <span className="code__line" key={i} style={{ "--i": i }}>
            <span className="code__no" aria-hidden="true">
              {i + 1}
            </span>
            <code>
              {parts.map((part, j) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <span className={`tok-${part[0]}`} key={j}>
                    {part[1]}
                  </span>
                )
              )}
              {i === CODE.length - 1 && <span className="code__caret" aria-hidden="true" />}
            </code>
          </span>
        ))}
      </pre>
    </div>
  );
}

/** Lahore time tile: the clock, and whether it is day or night there right now. */
function PlaceTile() {
  const now = useNow();
  const hour = hourIn(now, PROFILE.timeZone);
  const daytime = hour >= 6 && hour < 19;

  return (
    <>
      <p className="bento__label">
        <Icon name="pin" size={13} />
        Based in
      </p>
      <p className="place__city">{PROFILE.location}</p>
      <p className="place__time">
        <time dateTime={formatTime(now, PROFILE.timeZone)}>{formatTime(now, PROFILE.timeZone, true)}</time>
      </p>
      <p className="place__zone">
        <Icon name={daytime ? "sun" : "moon"} size={14} />
        {daytime ? "Daytime" : "Night-time"} here · PKT, UTC+5
      </p>
      <img
        className="place__photo"
        src={resumeUrl(PROFILE.photo)}
        alt={`Portrait of ${PROFILE.fullName}`}
        width="640"
        height="640"
        loading="lazy"
        decoding="async"
      />
    </>
  );
}

export default function About() {
  const goContact = (event) => {
    event.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHead index="02" eyebrow="About" title="Who you would be" accent="hiring" />

        <div className="bento">
          <Reveal className="bento__tile bento__intro spot">
            <p className="about__lead">{ABOUT.lead}</p>
            {ABOUT.body.map((paragraph) => (
              <p className="about__p" key={paragraph.slice(0, 32)}>
                {paragraph}
              </p>
            ))}
            <div className="about__meta">
              {LANGUAGES.map((language) => (
                <span className="chip" key={language.name}>
                  <Icon name="globe" size={13} />
                  {language.name} — {language.level}
                </span>
              ))}
            </div>

            <div className="status">
              <p className="status__text">
                <span className="live-dot" />
                <span>
                  <strong>{PROFILE.availability}.</strong> {PROFILE.responseTime}.
                </span>
              </p>
              <div className="status__cta">
                <a className="btn btn--primary btn--sm" href="#contact" onClick={goContact}>
                  Get in touch
                  <Icon name="arrowRight" size={13} />
                </a>
                <a className="btn btn--ghost btn--sm" href={resumeUrl(PROFILE.resume)} download>
                  <Icon name="download" size={13} />
                  Download CV
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="bento__tile bento__code" delay={80}>
            <DevCard />
          </Reveal>

          <Reveal className="bento__tile bento__place spot" delay={120}>
            <PlaceTile />
          </Reveal>

          {ABOUT.highlights.map((item, i) => (
            <Reveal className="bento__tile bento__hl spot" key={item.title} delay={80 * i}>
              <span className="hl__icon">
                <Icon name={item.icon} size={18} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
