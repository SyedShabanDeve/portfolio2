/**
 * Read once at load: the motion-heavy pieces check these before they start,
 * rather than every component wiring up its own media query.
 */
const query = (q) => typeof window !== "undefined" && Boolean(window.matchMedia?.(q).matches);

export const REDUCED_MOTION = query("(prefers-reduced-motion: reduce)");
export const FINE_POINTER = query("(pointer: fine)");

/** Pointer-driven effects (tilt, magnet, spotlight) only make sense with a mouse. */
export const CAN_HOVER_FX = FINE_POINTER && !REDUCED_MOTION;

export const IS_MAC =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
