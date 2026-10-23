import { PROCESS, SERVICES } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

const STEP_ICONS = ["compass", "code", "rocket", "refresh"];

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <SectionHead
          index="05"
          eyebrow="Services"
          title="How I can"
          accent="help"
          lede="Hiring for a role or need a single project delivered — this is the work I take on, and how each project runs from brief to after-launch."
        />

        <div className="services">
          {SERVICES.map((service, i) => (
            <Reveal className="service spot" key={service.title} delay={70 * i}>
              <div className="service__top">
                <span className="service__icon">
                  <Icon name={service.icon} size={20} />
                </span>
                <span className="service__no">0{i + 1}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul className="service__points">
                {service.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={13} strokeWidth={2.2} />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="process">
          <p className="process__label">
            <Icon name="bolt" size={14} />
            How a project runs
          </p>
          <ol className="process__steps">
            {PROCESS.map((step, i) => (
              <li className="step" key={step.title} style={{ "--i": i }}>
                <span className="step__icon">
                  <Icon name={STEP_ICONS[i]} size={18} />
                </span>
                <span className="step__no">Step 0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
