import { useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { FILTERS, PROFILE, PROJECTS } from "../data/site";
import { REDUCED_MOTION } from "../lib/motion";
import BrowserFrame from "./ui/BrowserFrame";
import Cover from "./ui/Cover";
import Icon from "./ui/Icon";
import PhoneFrame from "./ui/PhoneFrame";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

const COUNTS = Object.fromEntries(
  FILTERS.map((item) => [
    item.id,
    item.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.categories.includes(item.id)).length,
  ])
);

/** Clicks on the card open the case study, unless they landed on one of its own links. */
const openUnlessControl = (open) => (event) => {
  if (!event.target.closest("a, button")) open();
};

function ProjectLinks({ project, onOpen, primary = false }) {
  return (
    <div className="plinks">
      <button
        type="button"
        className={primary ? "btn btn--primary btn--sm" : "plink"}
        onClick={onOpen}
        aria-label={`Read the ${project.name} case study`}
      >
        Case study
        <Icon name="arrowRight" size={13} />
      </button>
      {project.url && (
        <a
          className={primary ? "btn btn--outline btn--sm" : "plink plink--muted"}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the live ${project.name} site`}
        >
          Live site
          <Icon name="arrowUpRight" size={13} />
        </a>
      )}
      {project.repo && (
        <a
          className={primary ? "btn btn--ghost btn--sm" : "plink plink--muted"}
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the ${project.name} source on GitHub`}
        >
          <Icon name="github" size={13} />
          Source
        </a>
      )}
      {!project.repo && (
        <span className="plink--none" title="Built under contract — the repository stays with the client">
          <Icon name="lock" size={11} />
          Private repo
        </span>
      )}
    </div>
  );
}

function Meta({ project }) {
  return (
    <div className="pcard__top">
      <span className="pcard__kind">{project.kind}</span>
      <span className="pcard__year">
        {project.isNew && <span className="pill-new">New</span>}
        {project.year}
      </span>
    </div>
  );
}

/** Wide showcase row for featured work: big capture, phone view, highlights. */
function FeatureCard({ project, flip, onOpen, delay }) {
  const [armed, setArmed] = useState(false);
  const open = () => onOpen(project.id);

  return (
    <Reveal
      as="article"
      className={`feature spot t-${project.accent}${flip ? " is-flipped" : ""}`}
      delay={delay}
      onPointerEnter={() => setArmed(true)}
      onClick={openUnlessControl(open)}
      style={{ "--vt": `p-${project.id}` }}
    >
      <div className="feature__media">
        <BrowserFrame
          image={project.image}
          url={project.domain}
          alt={`${project.name} — first screen of the live site`}
          full={armed}
          cover={<Cover project={project} />}
        />
        {project.image && <PhoneFrame image={`${project.image}-m`} className="feature__phone" />}
      </div>

      <div className="feature__body">
        <Meta project={project} />
        <h3 className="feature__name">{project.name}</h3>
        <p className="feature__summary">{project.summary}</p>

        {project.highlights && (
          <ul className="feature__points">
            {project.highlights.map((point) => (
              <li key={point}>
                <Icon name="check" size={14} strokeWidth={2.2} />
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="pcard__tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <ProjectLinks project={project} onOpen={open} primary />
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, onOpen, delay }) {
  const [armed, setArmed] = useState(false);
  const open = () => onOpen(project.id);

  return (
    <Reveal
      as="article"
      className={`card pcard spot t-${project.accent}`}
      delay={delay}
      onPointerEnter={() => setArmed(true)}
      onClick={openUnlessControl(open)}
      style={{ "--vt": `p-${project.id}` }}
    >
      <BrowserFrame
        image={project.image}
        url={project.domain}
        alt={`${project.name} — first screen`}
        full={armed}
        cover={<Cover project={project} />}
        className="pcard__frame"
      />
      <div className="pcard__body">
        <Meta project={project} />
        <h3 className="pcard__name">{project.name}</h3>
        <p className="pcard__summary">{project.summary}</p>
        <div className="pcard__tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <ProjectLinks project={project} onOpen={open} />
      </div>
    </Reveal>
  );
}

export default function Projects({ onOpenProject }) {
  const [filter, setFilter] = useState("all");

  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter]
  );
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  // Cards glide to their new places when the browser can animate the change.
  const choose = (id) => {
    if (id === filter) return;
    if (!document.startViewTransition || REDUCED_MOTION) {
      setFilter(id);
      return;
    }
    const root = document.documentElement;
    root.classList.add("vt-filter");
    const transition = document.startViewTransition(() => flushSync(() => setFilter(id)));
    transition.finished.finally(() => root.classList.remove("vt-filter"));
  };

  return (
    <section id="work" className="section section--alt work">
      <div className="container">
        <SectionHead
          index="01"
          eyebrow="Work"
          title="Selected"
          accent="work"
          lede="Client platforms running in production alongside open-source builds you can read line by line. Open any project for the full case study."
        />

        <Reveal className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={filter === item.id}
              className={`filter${filter === item.id ? " is-active" : ""}`}
              onClick={() => choose(item.id)}
            >
              {item.id === "shopify" && <Icon name="shopify" size={13} />}
              {item.label}
              <span className="filter__count">{COUNTS[item.id]}</span>
            </button>
          ))}
        </Reveal>

        <p className="sr-only" aria-live="polite">
          {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}`}
        </p>

        <div className="showcase">
          {featured.map((project, i) => (
            <FeatureCard
              key={project.id}
              project={project}
              flip={i % 2 === 1}
              onOpen={onOpenProject}
              delay={0}
            />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="projects__grid">
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} onOpen={onOpenProject} delay={(i % 3) * 70} />
            ))}
          </div>
        )}

        <Reveal className="projects__cta">
          <a className="btn btn--outline" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={15} />
            All repositories on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
