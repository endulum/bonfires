import { DateTime, type DateTimeFormatOptions } from "luxon";
import { Tooltip } from "react-tooltip";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function DateRelative({
  dateString,
  customText,
}: {
  dateString: string;
  customText?: string;
}) {
  const seed = Math.random();
  return (
    <>
      <small
        data-tooltip-id={`${seed}_${dateString}`}
        data-tooltip-content={`${
          customText ? customText + " " : ""
        }${DateTime.fromISO(dateString).toLocaleString(format)}`}
        data-tooltip-place="bottom-end"
      >
        {DateTime.fromISO(dateString).toRelative()}
      </small>
      <Tooltip id={`${seed}_${dateString}`} />
    </>
  );
}
