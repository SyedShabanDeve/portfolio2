import { useEffect, useRef } from "react";
import { PROJECTS } from "../data/site";
import { CAN_HOVER_FX } from "../lib/motion";
import BrowserFrame from "./ui/BrowserFrame";
import Icon from "./ui/Icon";
import PhoneFrame from "./ui/PhoneFrame";

/** Back to front — the newest work sits on top. */
const ORDER = ["times", "nexora", "elitezone"];
const CARDS = ORDER.map((id) => PROJECTS.find((project) => project.id === id));

/**
 * The hero visual: real captures of shipped work, layered at different depths
 * so they drift apart as the cursor moves. Each window opens its case study.
 */
export default function ProjectStack({ onOpenProject }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest(".hero");
    if (!el || !host || !CAN_HOVER_FX) return undefined;

    let frame = 0;
    let px = 0;
    let py = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="stack" ref={ref}>
      {CARDS.map((project, i) => (
        <button
          type="button"
          key={project.id}
          className={`stack__card stack__card--${i}`}
          onClick={() => onOpenProject(project.id)}
          aria-label={`Open the ${project.name} case study`}
        >
          <BrowserFrame image={project.image} url={project.domain} eager={i === CARDS.length - 1} />
        </button>
      ))}

      <button
        type="button"
        className="stack__phone"
        onClick={() => onOpenProject("elitezone")}
        aria-label="Open the Elite Zone case study"
      >
        <PhoneFrame image="elitezone-m" eager />
      </button>

      <span className="stack__chip stack__chip--live" aria-hidden="true">
        <span className="live-dot" />
        Live on Shopify
      </span>
      <span className="stack__chip stack__chip--stack" aria-hidden="true">
        <Icon name="code" size={13} />
        React · Node · MongoDB
      </span>
      <span className="stack__chip stack__chip--ai" aria-hidden="true">
        <Icon name="sparkle" size={13} />
        4 AI agents · Electron
      </span>
    </div>
  );
}
