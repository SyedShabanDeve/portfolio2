import { logoFor } from "../../data/logos";

/** A brand mark for a technology name, or nothing when there is no mark for it. */
export default function TechLogo({ name, size = 16, className = "" }) {
  const logo = logoFor(name);
  if (!logo) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={logo.d} />
    </svg>
  );
}
