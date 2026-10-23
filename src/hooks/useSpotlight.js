import { useEffect } from "react";
import { CAN_HOVER_FX } from "../lib/motion";

/**
 * One pointer listener for every `.spot` surface on the page. It writes the
 * pointer position into --mx / --my (pixels) and --sx / --sy (-0.5…0.5 from
 * the centre) on whichever card is under the cursor; CSS draws the glow and
 * the tilt — no per-card listeners, no re-renders.
 */
export function useSpotlight() {
  useEffect(() => {
    if (!CAN_HOVER_FX) return undefined;

    let frame = 0;
    let last = null;

    const paint = () => {
      frame = 0;
      const el = last?.target?.closest?.(".spot");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = last.clientX - rect.left;
      const y = last.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--sx", (x / rect.width - 0.5).toFixed(3));
      el.style.setProperty("--sy", (y / rect.height - 0.5).toFixed(3));
    };

    const onMove = (event) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
