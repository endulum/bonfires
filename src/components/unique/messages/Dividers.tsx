import { DateTime } from "luxon";
import { useContext } from "react";
import { SvgIcon } from "@mui/material";

import { ChannelContext } from "../channel-view/ChannelContext";
import Camp from "../../../assets/icons/camp.svg?react";

const getCalendar = (datestring: string) =>
  DateTime.fromISO(datestring).toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function DateDivider({ timestamp }: { timestamp: string }) {
  return (
    <div className="flex-row g-1 w100">
      <hr />
      <p className="mw-mxc">
        <small className="faded">{getCalendar(timestamp)}</small>
      </p>
      <hr />
    </div>
  );
}

export function StartOfChannel() {
  const { title } = useContext(ChannelContext);
  return (
    <div className="flex-col messages-beginner mt-1">
      <SvgIcon component={Camp} />
      <h3>
        Welcome to <b>{title}</b>
      </h3>
      <p>This is the beginning of this camp.</p>
      <hr className="mt-1 mb-1" />
    </div>
  );
}
