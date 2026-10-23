import { logoFor } from "../data/logos";
import { CORE_STACK, SKILL_GROUPS } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";
import TechLogo from "./ui/TechLogo";

/** Tools whose brand mark is unreadable at this size get a plain icon instead. */
const FALLBACK_ICON = { WooCommerce: "cart" };

/** One looping row of brand marks; the second copy of the list closes the seam. */
function LogoRow({ items, reverse = false }) {
  const lane = [...items, ...items];

  return (
    <div className={`logos__row${reverse ? " is-reverse" : ""}`}>
      <div className="logos__track">
        {lane.map((name, i) => {
          const logo = logoFor(name);
          return (
            <span
              className="logo-chip"
              key={`${name}-${i}`}
              style={logo?.color ? { "--brand": logo.color } : undefined}
            >
              {logo ? <TechLogo name={name} size={22} /> : <Icon name={FALLBACK_ICON[name] ?? "code"} size={20} />}
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="stack" className="section section--alt">
      <div className="container">
        <SectionHead
          index="03"
          eyebrow="Stack"
          title="What I build"
          accent="with"
          lede="The tools I use daily, grouped by where they sit in a build. Everything listed here has shipped in something real."
        />
      </div>

      {/* Decorative: every tool here is listed again, as text, in the cards below. */}
      <Reveal className="logos" aria-hidden="true">
        {CORE_STACK.map((row, i) => (
          <LogoRow key={row[0]} items={row} reverse={i % 2 === 1} />
        ))}
      </Reveal>

      <div className="container">
        <div className="skills__grid">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal className="card skill-card spot" key={group.id} delay={70 * i}>
              <div className="skill-card__head">
                <span className="skill-card__icon">
                  <Icon name={group.icon} size={19} />
                </span>
                <div>
                  <h3>{group.label}</h3>
                  <p className="skill-card__count">{group.items.length} tools</p>
                </div>
              </div>
              <p className="skill-card__blurb">{group.blurb}</p>
              <div className="skill-card__items">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    <TechLogo name={item} size={13} />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
