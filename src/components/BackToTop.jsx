import Icon from "./ui/Icon";

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Back to top, with a ring that fills as the page is read. */
export default function BackToTop({ shown, progress }) {
  return (
    <button
      type="button"
      className={`to-top${shown ? " is-shown" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
    >
      <svg className="to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} />
        <circle
          className="to-top__bar"
          cx="24"
          cy="24"
          r={RADIUS}
          style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
        />
      </svg>
      <Icon name="arrowUp" size={16} />
    </button>
  );
}
