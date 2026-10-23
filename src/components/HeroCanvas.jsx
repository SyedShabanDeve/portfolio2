import { useEffect, useRef } from "react";
import { FINE_POINTER, REDUCED_MOTION } from "../lib/motion";

const GAP = 28;
const RADIUS = 190;

/**
 * The hero's dot field. Dots breathe in a slow diagonal wave; near the cursor
 * they swell, take the accent colour and lean away from it. Without a mouse an
 * idle "cursor" drifts across on its own. It only animates while the hero is
 * on screen, and draws a single still frame for reduced-motion visitors.
 */
export default function HeroCanvas({ theme }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const host = canvas.parentElement;

    // Read lazily on the first frame: by then the new theme is on <html>.
    let colours = null;
    const palette = () => {
      if (!colours) {
        const css = getComputedStyle(document.documentElement);
        colours = {
          dot: css.getPropertyValue("--dot").trim() || "rgba(255,255,255,0.16)",
          accent: css.getPropertyValue("--accent").trim() || "#ff4d5e",
        };
      }
      return colours;
    };

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let frame = 0;
    let visible = true;
    let lastMove = -Infinity;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const draw = (time) => {
      const { dot, accent } = palette();
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      // No mouse for a while → let an idle cursor wander so the field stays alive.
      if (time - lastMove > 2600) {
        pointer.tx = width * (0.62 + 0.28 * Math.sin(t * 0.35));
        pointer.ty = height * (0.48 + 0.3 * Math.sin(t * 0.52 + 1.2));
      }
      pointer.x += (pointer.tx - pointer.x) * 0.09;
      pointer.y += (pointer.ty - pointer.y) * 0.09;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = offsetX + i * GAP;
          let y = offsetY + j * GAP;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist2 = dx * dx + dy * dy;
          const wave = (Math.sin(i * 0.32 + j * 0.24 - t * 1.1) + 1) * 0.5;
          let near = 0;

          if (dist2 < RADIUS * RADIUS) {
            const dist = Math.sqrt(dist2) || 1;
            near = 1 - dist / RADIUS;
            const push = near * near * 12;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
          }

          const size = 1.1 + wave * 0.5 + near * 2.2;
          if (near > 0.04) {
            ctx.fillStyle = accent;
            ctx.globalAlpha = 0.18 + near * 0.8;
          } else {
            ctx.fillStyle = dot;
            ctx.globalAlpha = 0.45 + wave * 0.55;
          }
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time) => {
      frame = 0;
      draw(time);
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame && !REDUCED_MOTION) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / GAP) + 1;
      rows = Math.ceil(height / GAP) + 1;
      offsetX = (width - (cols - 1) * GAP) / 2;
      offsetY = (height - (rows - 1) * GAP) / 2;
      if (REDUCED_MOTION) requestAnimationFrame(() => draw(0));
    };

    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      lastMove = performance.now();
    };

    const onLeave = () => {
      lastMove = -Infinity;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(host);

    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (FINE_POINTER && !REDUCED_MOTION) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }

    resize();
    start();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [theme]);

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
}
