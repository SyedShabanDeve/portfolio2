import { useEffect, useState } from "react";
import { TOAST_EVENT } from "../../lib/toast";
import Icon from "./Icon";

/** Shows whatever `toast()` last announced, then gets out of the way. */
export default function Toast() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let timer = 0;
    const onToast = (event) => {
      setMessage(event.detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 2400);
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`toast${message ? " is-shown" : ""}`} role="status" aria-live="polite">
      {message && (
        <>
          <Icon name="check" size={14} strokeWidth={2.2} />
          {message}
        </>
      )}
    </div>
  );
}
