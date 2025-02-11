import { DateTime, type DateTimeFormatOptions } from "luxon";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function DateWithTitle({ dateString }: { dateString: string }) {
  return (
    <span title={DateTime.fromISO(dateString).toLocaleString(format)}>
      {DateTime.fromISO(dateString).toRelative()}
    </span>
  );
}
