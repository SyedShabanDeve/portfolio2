import { useTypewriter } from "../hooks/useTypewriter";

/** The cycling role line. Its own component, so each keystroke re-renders only this. */
export default function Typer({ words }) {
  const typed = useTypewriter(words);

  return (
    <p className="hero__typer">
      <span className="prompt" aria-hidden="true">
        &gt;_
      </span>
      <span className="sr-only">{words.join(", ")}</span>
      <span className="typed" aria-hidden="true">
        {typed}
        <span className="caret">|</span>
      </span>
    </p>
  );
}
