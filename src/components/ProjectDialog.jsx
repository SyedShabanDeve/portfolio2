import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/site";
import { useLockScroll } from "../hooks/useLockScroll";
import { workImage } from "../lib/media";
import Cover from "./ui/Cover";
import Icon from "./ui/Icon";
import PhoneFrame from "./ui/PhoneFrame";
import TechLogo from "./ui/TechLogo";

/** "Product page — savings badge…" → "Product page" for the gallery tabs. */
const shortLabel = (caption) => caption.split(" — ")[0];

function CaseStudy({ project, index, onOpenProject }) {
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const { details } = project;

  const views = [
    ...(project.image
      ? [{ image: project.image, full: true, caption: "Home page — scroll inside the window to see all of it" }]
      : []),
    ...(details.gallery ?? []).map((item) => ({ ...item, full: false })),
  ];
  const phones = details.phones ?? (project.image ? [`${project.image}-m`] : []);
  const [view, setView] = useState(0);
  const current = views[view];

  return (
    <div className={`pd__panel t-${project.accent}`}>
      <header className="pd__bar">
        <p className="pd__crumb">
          <span className="pd__crumb-dot" />
          Case study
          <span className="pd__crumb-count">
            {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </p>
        <div className="pd__controls">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onOpenProject(prev.id)}
            aria-label={`Previous project: ${prev.name}`}
          >
            <Icon name="chevronLeft" size={17} />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => onOpenProject(next.id)}
            aria-label={`Next project: ${next.name}`}
          >
            <Icon name="chevronRight" size={17} />
          </button>
          <button
            type="button"
            className="icon-btn pd__close"
            onClick={() => onOpenProject(null)}
            aria-label="Close case study"
          >
            <Icon name="close" size={17} />
          </button>
        </div>
      </header>

      <div className="pd__scroll">
        <div className="pd__head">
          <p className="pd__kind">
            {project.kind} <span aria-hidden="true">·</span> {project.year}
          </p>
          <h2 id="pd-title" className="pd__title">
            {project.name}
          </h2>
          <p className="pd__summary">{project.summary}</p>

          <div className="pd__actions">
            {project.url && (
              <a className="btn btn--primary btn--sm" href={project.url} target="_blank" rel="noopener noreferrer">
                Visit live site
                <Icon name="arrowUpRight" size={14} />
              </a>
            )}
            {project.repo && (
              <a className="btn btn--outline btn--sm" href={project.repo} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={14} />
                Source code
              </a>
            )}
            {!project.repo && (
              <span className="pd__private">
                <Icon name="lock" size={12} />
                Private repository — the code belongs to the client
              </span>
            )}
          </div>
        </div>

        <div className={`pd__media${phones.length ? "" : " is-solo"}`}>
          <figure className="pd__screen">
            <div className="frame">
              <div className="frame__bar" aria-hidden="true">
                <span className="frame__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="frame__url">
                  <Icon name="lock" size={10} strokeWidth={2.2} />
                  <span>{project.domain}</span>
                </span>
              </div>
              {current ? (
                <div
                  className={`pd__viewport${current.full ? "" : " is-still"}`}
                  tabIndex={current.full ? 0 : undefined}
                  aria-label={current.full ? `${project.name}: ${current.caption}` : undefined}
                >
                  <img
                    key={current.image}
                    src={workImage(current.image, current.full ? "-full" : "")}
                    alt={`${project.name} — ${current.caption}`}
                    width="1280"
                    height={current.full ? undefined : 800}
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="frame__view">
                  <Cover project={project} />
                </div>
              )}
            </div>

            {views.length > 1 && (
              <div className="pd__tabs" role="group" aria-label="Pages">
                {views.map((item, i) => (
                  <button
                    type="button"
                    key={item.image}
                    className={`pd__tab${i === view ? " is-active" : ""}`}
                    aria-pressed={i === view}
                    onClick={() => setView(i)}
                  >
                    <Icon name={i === 0 ? "globe" : "image"} size={13} />
                    {i === 0 ? "Home" : shortLabel(item.caption)}
                  </button>
                ))}
              </div>
            )}
            {current && <figcaption className="pd__caption">{current.caption}</figcaption>}
          </figure>

          {phones.length > 0 && (
            <div className="pd__phones">
              {phones.map((phone) => (
                <PhoneFrame key={phone} image={phone} alt={`${project.name} on a phone`} />
              ))}
            </div>
          )}
        </div>

        <div className="pd__grid">
          <div className="pd__story">
            <h3 className="pd__h">Overview</h3>
            <p className="pd__overview">{details.overview}</p>

            <h3 className="pd__h">What I built</h3>
            <ol className="pd__built">
              {details.built.map((item, i) => (
                <li key={item}>
                  <span className="pd__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="pd__aside">
            <dl className="pd__facts">
              <div>
                <dt>Role</dt>
                <dd>{details.role}</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>{details.timeline}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd className="pd__stack">
                  {project.tags.map((tag) => (
                    <span className="tag tag--logo" key={tag}>
                      <TechLogo name={tag} size={12} />
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
              {project.url && (
                <div>
                  <dt>Live</dt>
                  <dd>
                    <a className="pd__link" href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.domain}
                      <Icon name="arrowUpRight" size={12} />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>

        <button type="button" className="pd__next" onClick={() => onOpenProject(next.id)}>
          <span className="pd__next-label">Next project</span>
          <span className="pd__next-name">{next.name}</span>
          <Icon name="arrowRight" size={22} />
        </button>
      </div>
    </div>
  );
}

/**
 * The case-study panel: a native <dialog>, so focus is trapped and Escape
 * closes it for free. Which project is open lives in the URL hash.
 */
export default function ProjectDialog({ projectId, onOpenProject }) {
  const ref = useRef(null);
  const index = PROJECTS.findIndex((project) => project.id === projectId);
  const project = index >= 0 ? PROJECTS[index] : null;

  useLockScroll(Boolean(project), "project");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  // Escape (or any other native close) still has to clear the hash.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    const onClose = () => onOpenProject(null);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onOpenProject]);

  const onKeyDown = (event) => {
    if (!project || event.target.closest("input, textarea")) return;
    if (event.key === "ArrowRight") onOpenProject(PROJECTS[(index + 1) % PROJECTS.length].id);
    if (event.key === "ArrowLeft") onOpenProject(PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length].id);
  };

  return (
    <dialog
      ref={ref}
      className="pd"
      aria-labelledby="pd-title"
      onKeyDown={onKeyDown}
      onClick={(event) => {
        // A click on the dimmed area (the dialog box itself, not the panel) closes it.
        if (event.target === event.currentTarget) onOpenProject(null);
      }}
    >
      {project && <CaseStudy key={project.id} project={project} index={index} onOpenProject={onOpenProject} />}
    </dialog>
  );
}
