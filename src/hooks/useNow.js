import { useSyncExternalStore } from "react";

/*
 * One shared clock for every component that shows the time: a single
 * interval runs while anything is subscribed and stops when nothing is.
 */
const listeners = new Set();
let timer = 0;
let now = Date.now();

const tick = () => {
  now = Date.now();
  listeners.forEach((listener) => listener());
};

function subscribe(listener) {
  listeners.add(listener);
  if (!timer) {
    now = Date.now();
    timer = window.setInterval(tick, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      window.clearInterval(timer);
      timer = 0;
    }
  };
}

const getSnapshot = () => now;

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

const formatters = new Map();

/** "05:42" (or with seconds) in the given IANA time zone. */
export function formatTime(timestamp, timeZone, seconds = false) {
  const key = `${timeZone}|${seconds}`;
  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: seconds ? "2-digit" : undefined,
        hour12: false,
      })
    );
  }
  return formatters.get(key).format(timestamp);
}

/** Hour of day (0–23) in the given time zone. */
export const hourIn = (timestamp, timeZone) => Number(formatTime(timestamp, timeZone).slice(0, 2));
