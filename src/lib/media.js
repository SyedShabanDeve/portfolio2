/**
 * Project captures live in public/work/. `variant` is "" for the first
 * screen, "-full" for the whole page and "-m" for the phone view.
 */
export const workImage = (name, variant = "") =>
  `${import.meta.env.BASE_URL}work/${name}${variant}.webp`;

export const resumeUrl = (file) => `${import.meta.env.BASE_URL}${file}`;
