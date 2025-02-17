import { Link, useOutletContext } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { Channel, UserData } from "../../../types";
import { DateRelative } from "../../reusable/Dates";
import { useTextTruncate } from "../../../hooks/useTextTruncate";

export function ChannelList({ channels }: { channels: Channel[] }) {
  const { truncate } = useTextTruncate({});
  return (
    <>
      {channels.map((channel) => (
        <Link
          to={`/camp/${channel._id}`}
          key={channel._id}
          className="w100"
          style={{ textDecoration: "none", color: "var(--text)" }}
        >
          <div className="channel flex-row jcstart g-1 p-05">
            <img
              className="channel-avatar"
              src={`${import.meta.env.VITE_API_URL}/channel/${
                channel._id
              }/avatar`}
              alt={`The camp avatar of ${channel.title}`}
            />
            <div className="flex-col align-start">
              <div className="flex-row align-end g-75">
                <h3>{truncate(channel.title)}</h3>
                <div style={{ marginBottom: "2px" }}>
                  <DateRelative
                    dateString={channel.lastActivity}
                    customText="Last active"
                  />
                </div>
              </div>
              <ChannelUsers channel={channel} />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

function ChannelUsers({ channel }: { channel: Channel }) {
  const { user } = useOutletContext<{ user: UserData }>();
  return channel.users.length > 1 ? (
    <>
      <div
        className="flex-row align-start"
        style={{ marginLeft: "-3px" }}
        data-tooltip-id={`${channel._id}_campers`}
        data-tooltip-content={`${channel.users.length} camper${
          channel.users.length === 1 ? "" : "s"
        }`}
        data-tooltip-place="bottom"
      >
        {channel.users
          .filter((id) => id !== user._id)
          .slice(0, 5)
          .map((user) => (
            <img
              key={user}
              className="channel-user"
              src={`${import.meta.env.VITE_API_URL}/user/${user}/avatar`}
            />
          ))}
        {channel.users.length > 5 && (
          <small className="channel-user-badge">
            + {channel.users.length - 5}
          </small>
        )}
      </div>
      <Tooltip id={`${channel._id}_campers`} />
    </>
  ) : (
    <div className="flex-row align-start">
      <small className="channel-user-badge">Just you</small>
    </div>
  );
}
