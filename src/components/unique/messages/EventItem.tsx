import {
  ArrowBack,
  ArrowForward,
  Close,
  Edit,
  PushPin,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

import Fire from "../../../assets/icons/fire.svg?react";
import { ChannelEvent, MessageData } from "../../../types";
import { EventStamp } from "../../reusable/Dates";
import { LiveMessageItem } from "./MessageItem";

export function EventItem({ data }: { data: ChannelEvent | MessageData }) {
  if ("type" in data) return <Event data={data} />;
  return <LiveMessageItem data={data} />;
}

function Event({ data }: { data: ChannelEvent }) {
  return (
    <div className="event-item flex-row g-05" id={data._id}>
      {iconForType(data.type)}
      {textForType(data)}
      <EventStamp dateString={data.timestamp} eventId={data._id} />
    </div>
  );
}

const iconForType = (type: string) => {
  switch (type) {
    case "user_invite":
      return <ArrowForward />;
    case "user_leave":
      return <ArrowBack />;
    case "user_kick":
      return <Close />;
    case "channel_title":
      return <Edit />;
    case "channel_avatar":
      return <Edit />;
    case "message_pin":
      return <PushPin />;
    default:
      return <SvgIcon component={Fire} />;
  }
};

const textForType = (data: ChannelEvent) => {
  switch (data.type) {
    case "user_invite":
      return (
        <p>
          <b>{data.user.username}</b> invited <b>{data.targetUser.username}</b>{" "}
          to this camp
        </p>
      );
    case "user_leave":
      return (
        <p>
          <b>{data.user.username}</b> left this camp
        </p>
      );
    case "user_kick":
      return (
        <p>
          <b>{data.user.username}</b> kicked <b>{data.targetUser.username}</b>{" "}
          from this camp
        </p>
      );
    case "channel_title":
      return (
        <p>
          <b>{data.user.username}</b> edited this camp's title to{" "}
          <b>{data.newChannelTitle}</b>
        </p>
      );
    case "channel_avatar":
      return (
        <p>
          <b>{data.user.username}</b> edited this camp's avatar
        </p>
      );
    case "message_pin":
      return (
        <p>
          <b>{data.user.username}</b> pinned a message to this camp
        </p>
      );
    default:
      return <p>unknown action</p>;
  }
};
