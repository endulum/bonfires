import { EditNote } from "@mui/icons-material";
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

export function EventStamp({
  dateString,
  lastEditedString,
  eventId,
}: {
  dateString: string;
  lastEditedString?: string;
  eventId: string;
}) {
  return (
    <>
      <small
        data-tooltip-id={`${eventId}_${dateString}`}
        data-tooltip-content={`${DateTime.fromISO(dateString).toLocaleString(
          format
        )}`}
        data-tooltip-place="right"
        className="faded"
      >
        {DateTime.fromISO(dateString).toLocaleString({
          hour: "numeric",
          minute: "numeric",
        })}
      </small>
      <Tooltip id={`${eventId}_${dateString}`} />
      {lastEditedString && (
        <>
          <span
            className="faded"
            data-tooltip-id={`${eventId}_edited_${lastEditedString}`}
            data-tooltip-content={`Last edited ${DateTime.fromISO(
              lastEditedString
            ).toLocaleString(format)}`}
          >
            <EditNote className="small" />
          </span>
          <Tooltip id={`${eventId}_edited_${lastEditedString}`} />
        </>
      )}
    </>
  );
}
