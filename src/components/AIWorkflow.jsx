import { AI_USE } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

/** How AI fits into the work: the tools, where they help, and the limits I keep. */
export default function AIWorkflow() {
  return (
    <section id="ai" className="section">
      <div className="container">
        <SectionHead index="04" eyebrow="AI" title="How I use AI" accent="at work" lede={AI_USE.intro} />

        <ol className="aiw">
          {AI_USE.items.map((item, i) => (
            <Reveal as="li" className="aiw__card spot" key={item.title} delay={60 * (i % 3)}>
              <div className="aiw__top">
                <span className="aiw__icon">
                  <Icon name={item.icon} size={19} />
                </span>
                <span className="aiw__no">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
