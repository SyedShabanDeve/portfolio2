import { PROFILE } from "../../data/site";
import { formatTime, useNow } from "../../hooks/useNow";

/**
 * The time where I am, ticking. Kept in its own component so the per-second
 * update re-renders this text and nothing around it.
 */
export default function LocalTime({ seconds = false, className = "" }) {
  const now = useNow();
  const time = formatTime(now, PROFILE.timeZone, seconds);

  return (
    <time className={className} dateTime={time}>
      {time}
    </time>
  );
}
