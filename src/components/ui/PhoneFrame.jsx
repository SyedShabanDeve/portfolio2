import { workImage } from "../../lib/media";

/** A phone around a mobile capture (390 × 844). */
export default function PhoneFrame({ image, alt = "", eager = false, className = "" }) {
  return (
    <div className={`phone${className ? ` ${className}` : ""}`}>
      <div className="phone__screen">
        <img
          src={workImage(image)}
          alt={alt}
          width="390"
          height="844"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <span className="phone__island" aria-hidden="true" />
    </div>
  );
}
