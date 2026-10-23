import { Fragment } from "react";

/**
 * Wraps each word in a mask so headings can rise in word by word. The motion
 * is pure CSS, keyed off `.is-visible` on the surrounding <Reveal>; `start`
 * continues the stagger when a heading is split across several calls.
 */
export default function SplitWords({ text, start = 0 }) {
  const words = text.split(" ");

  return words.map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="split__word">
        <span className="split__inner" style={{ "--i": start + i }}>
          {word}
        </span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
