import { CHALLENGES } from "../data/site";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

/** Problems from real projects; each card opens the case study it came from. */
export default function Challenges({ onOpenProject }) {
  return (
    <section id="problems" className="section">
      <div className="container">
        <SectionHead
          eyebrow="Problems solved"
          title="What broke, and"
          accent="what I did"
          lede="Real problems from the projects above, each with the fix and what it changed."
        />

        <ol className="probs">
          {CHALLENGES.map((c, i) => (
            <Reveal as="li" className="prob spot" key={c.problem} delay={60 * (i % 3)}>
              <button type="button" className="prob__project" onClick={() => onOpenProject(c.project)}>
                {c.label}
              </button>
              <dl>
                <div>
                  <dt>Problem</dt>
                  <dd>{c.problem}</dd>
                </div>
                <div>
                  <dt>What I did</dt>
                  <dd>{c.fix}</dd>
                </div>
                <div className="prob__result">
                  <dt>Result</dt>
                  <dd>{c.result}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
