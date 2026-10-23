import { useEffect, useRef } from "react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import TechLogo from "./ui/TechLogo";

/**
 * Fills the timeline rail as the reader moves down it, and lights each node
 * once the fill reaches it. Writes CSS variables and data attributes straight
 * to the DOM from one rAF-throttled scroll listener.
 */
function useTimelineFill() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.62;
      const rect = el.getBoundingClientRect();
      const fill = Math.min(Math.max((line - rect.top) / rect.height, 0), 1);
      el.style.setProperty("--fill", fill.toFixed(4));
      el.querySelectorAll(".tl-item").forEach((item) => {
        item.dataset.reached = String(item.getBoundingClientRect().top < line);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}

export default function Experience() {
  const timeline = useTimelineFill();

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead
          index="04"
          eyebrow="Experience"
          title="Where I have"
          accent="worked"
          lede="Three years across a full-time role, a frontend internship and freelance delivery that has never stopped."
        />

        <div className="timeline" ref={timeline}>
          <span className="timeline__rail" aria-hidden="true">
            <span className="timeline__fill" />
          </span>

          {EXPERIENCE.map((job, i) => (
            <Reveal
              className={`tl-item${job.current ? " is-current" : ""}`}
              key={`${job.company}-${job.role}`}
              delay={70 * i}
            >
              <span className="tl-node" aria-hidden="true" />
              <div className="card tl-card spot">
                <div className="tl-head">
                  <span className="tl-period">
                    {job.current && <span className="live-dot" />}
                    {job.period}
                  </span>
                  <span className="tl-type">{job.type}</span>
                </div>

                <h3 className="tl-role">{job.role}</h3>
                <p className="tl-company">
                  {job.company} <em>· {job.location}</em>
                </p>

                <ul className="tl-list">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="tl-stack">
                  {job.stack.map((tech) => (
                    <span className="chip" key={tech}>
                      <TechLogo name={tech} size={12} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="edu-grid">
          {EDUCATION.map((edu, i) => (
            <Reveal className={`card edu-card spot${i === 0 ? " edu-card--accent" : ""}`} key={edu.degree} delay={80 * i}>
              <span className="eyebrow">
                <Icon name="cap" size={14} />
                Education · {edu.period}
              </span>
              <h3>{edu.degree}</h3>
              <p>
                {edu.school}
                <br />
                {edu.detail} · <strong>{edu.grade}</strong>
              </p>
            </Reveal>
          ))}

          <Reveal className="card edu-card spot" delay={160}>
            <span className="eyebrow">
              <Icon name="award" size={14} />
              Certifications
            </span>
            <ul className="edu-list">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name}>
                  <span>
                    {cert.name}
                    <br />
                    <em>{cert.issuer}</em>
                  </span>
                  <span>{cert.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
