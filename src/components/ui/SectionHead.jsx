import Reveal from "./Reveal";
import SplitWords from "./SplitWords";

/** `accent` is set in the italic serif after the title, e.g. "Selected" + "work". */
export default function SectionHead({ index, eyebrow, title, accent, lede, children }) {
  const titleWords = title.split(" ").length;

  return (
    <Reveal className={`section-head${lede ? "" : " section-head--stack"}`}>
      <div>
        <p className="eyebrow">
          {index ? `${index} — ` : ""}
          {eyebrow}
        </p>
        <h2 className="section-title">
          <SplitWords text={title} />
          {accent && (
            <>
              {" "}
              <em>
                <SplitWords text={accent} start={titleWords} />
              </em>
            </>
          )}
        </h2>
      </div>
      {lede && <p className="section-lede">{lede}</p>}
      {children}
    </Reveal>
  );
}
