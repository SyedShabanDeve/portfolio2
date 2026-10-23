import { useEffect, useRef } from "react";
import { CAN_HOVER_FX } from "../../lib/motion";

/** Lets a call-to-action lean toward the cursor while it is hovered. */
export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !CAN_HOVER_FX) return undefined;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span className={`magnetic${className ? ` ${className}` : ""}`} ref={ref}>
      {children}
    </span>
  );
}
