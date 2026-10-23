const EVENT = "ssa:toast";

/** Fire-and-forget status message; <Toast /> listens and shows it briefly. */
export const toast = (message) => window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));

export const TOAST_EVENT = EVENT;

/** Copies text and reports the outcome through a toast. */
export async function copyText(text, label = "Copied") {
  try {
    await navigator.clipboard.writeText(text);
    toast(`${label} — copied to clipboard`);
    return true;
  } catch {
    toast("Copy was blocked — select the text instead");
    return false;
  }
}
