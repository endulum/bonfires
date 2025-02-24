import { Fragment } from "react/jsx-runtime";
import { DateTime } from "luxon";

import { ChannelEvent, MessageData } from "../../../types";
import { DateDivider } from "./Dividers";
import { EventItem } from "./EventItem";

const getNumeric = (datestring: string) =>
  DateTime.fromISO(datestring).toLocaleString({
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

export function Messages({
  events,
  children,
}: {
  events: Array<MessageData | ChannelEvent>;
  children: React.ReactNode;
}) {
  return (
    <div className="outlet" style={{ overflow: "auto" }}>
      {children}
      <div className="flex-col align-start g-1">
        {events.map((event, index) => {
          if (
            events[index + 1] &&
            getNumeric(event.timestamp) !==
              getNumeric(events[index + 1].timestamp)
          )
            return (
              <Fragment key={event._id}>
                <EventItem key={event._id} data={event} />
                <DateDivider timestamp={events[index + 1].timestamp} />
              </Fragment>
            );
          return <EventItem key={event._id} data={event} />;
        })}
      </div>
    </div>
  );
}
