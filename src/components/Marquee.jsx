import { PROJECTS } from "../data/site";
import Icon from "./ui/Icon";

const NAMES = PROJECTS.map((project) => project.name);

/** Everything I have shipped, on a loop. The list is rendered twice so the seam never shows. */
export default function Marquee() {
  const lane = [...NAMES, ...NAMES];

  return (
    <div className="marquee">
      <p className="sr-only">Shipped work: {NAMES.join(", ")}</p>
      <div className="marquee__track" aria-hidden="true">
        {lane.map((name, i) => (
          // Style by position within one copy, so both copies match at the seam.
          <span className={`marquee__item${(i % NAMES.length) % 2 ? " is-outline" : ""}`} key={`${name}-${i}`}>
            {name}
            <Icon name="sparkle" size={18} className="marquee__star" />
          </span>
        ))}
      </div>
    </div>
  );
}
