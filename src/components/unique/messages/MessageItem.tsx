import { useContext, useRef, useState } from "react";
import { MessageData } from "../../../types";
import { MDWrapper } from "../../reusable/MDWrapper";
import { ChannelContext } from "../channel-view/ChannelContext";
import { useHover } from "usehooks-ts";
import { EventStamp } from "../../reusable/Dates";
import { MessageDropdown } from "./MessageDropdown";

import { GhostIndicator } from "./GhostIndicator";

export function MessageItem({ data }: { data: MessageData }) {
  const { getSettingsForUser } = useContext(ChannelContext);
  const user = getSettingsForUser(data.user);

  return (
    <div className="event-item flex-row align-start g-75">
      <img
        className="avatar med"
        src={`${import.meta.env.VITE_API_URL}/user/${data.user._id}/avatar`}
        alt={`Avatar for user ${data.user.username}`}
      />
      <div>
        <div className="flex-row g-05">
          <p style={{ color: user.color ?? "var(--text)" }}>
            <b>{user.name}</b>
          </p>
          {!user.isInChannel && <GhostIndicator user={data.user} />}
          <EventStamp
            dateString={data.timestamp}
            lastEditedString={data.lastEdited}
            eventId={data._id}
          />
        </div>
        <MDWrapper content={data.content} />
      </div>
    </div>
  );
}

export function LiveMessageItem({ data }: { data: MessageData }) {
  const { getSettingsForUser } = useContext(ChannelContext);
  const user = getSettingsForUser(data.user);

  const hoverRef = useRef<HTMLDivElement>(null);
  const isHovering = useHover(hoverRef);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="event-item message flex-row align-start g-75"
      id={data._id}
      ref={hoverRef}
    >
      <img
        className="avatar med"
        src={`${import.meta.env.VITE_API_URL}/user/${data.user._id}/avatar`}
        alt={`Avatar for user ${data.user.username}`}
      />
      <div>
        <div className="flex-row g-05">
          <p style={{ color: user.color ?? "var(--text)" }}>
            <b>{user.name}</b>
          </p>
          {!user.isInChannel && <GhostIndicator user={data.user} />}
          <EventStamp
            dateString={data.timestamp}
            lastEditedString={data.lastEdited}
            eventId={data._id}
          />
        </div>
        <MDWrapper content={data.content} />
      </div>
      {(isHovering || isOpen) && (
        <MessageDropdown
          data={data}
          onSuccess={() => {
            setIsOpen(false);
          }}
          onToggle={(opened) => {
            setIsOpen(opened);
          }}
        />
      )}
    </div>
  );
}
