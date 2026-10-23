import { useState } from "react";
import { workImage } from "../../lib/media";
import Icon from "./Icon";

/**
 * A browser window around a site capture. With `full`, the whole-page capture
 * is loaded over the first screen; CSS then scrolls through it while the
 * surrounding card is hovered. `cover` stands in when there is no capture.
 */
export default function BrowserFrame({
  image,
  url,
  alt = "",
  eager = false,
  full = false,
  cover = null,
  className = "",
}) {
  const [ready, setReady] = useState(false);

  return (
    <div className={`frame${className ? ` ${className}` : ""}`}>
      <div className="frame__bar" aria-hidden="true">
        <span className="frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame__url">
          <Icon name="lock" size={10} strokeWidth={2.2} />
          <span>{url}</span>
        </span>
      </div>

      <div className={`frame__view${ready ? " is-ready" : ""}`}>
        {image ? (
          <img
            className="frame__img"
            src={workImage(image)}
            alt={alt}
            width="1280"
            height="800"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding="async"
          />
        ) : (
          cover
        )}
        {image && full && (
          <img
            className="frame__full"
            src={workImage(image, "-full")}
            alt=""
            aria-hidden="true"
            decoding="async"
            onLoad={() => setReady(true)}
          />
        )}
      </div>
    </div>
  );
}
