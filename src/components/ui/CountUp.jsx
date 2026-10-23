import { useEffect } from "react";
import { useInView } from "../../hooks/useInView";
import { REDUCED_MOTION } from "../../lib/motion";

const format = (value, decimals, suffix) => `${value.toFixed(decimals)}${suffix}`;

/**
 * Counts from `from` up to `value` the first time it scrolls into view (years
 * start a couple of decades back rather than at zero). Frames write the text
 * node directly, so the animation costs no React renders; screen readers get
 * the final figure from the hidden twin.
 */
export default function CountUp({ value, from = 0, decimals = 0, suffix = "", duration = 1600 }) {
  const [ref, inView] = useInView({ threshold: 0.1, rootMargin: "0px" });
  const final = format(value, decimals, suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || REDUCED_MOTION) return undefined;

    let frame = 0;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 4;
      el.textContent = format(from + (value - from) * eased, decimals, suffix);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [ref, inView, value, from, decimals, suffix, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {REDUCED_MOTION ? final : format(from, decimals, suffix)}
      </span>
      <span className="sr-only">{final}</span>
    </>
  );
}
