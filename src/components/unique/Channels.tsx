import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { Tooltip } from "react-tooltip";

import { Channel } from "../../types";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { DateRelative } from "../reusable/Dates";

import { useChannels } from "../../hooks/useChannels";

export function Channels() {
  const { loading, error, channels, nextPage, setRefetchOn } = useChannels();

  return (
    <>
      {(loading || error) && channels.length === 0 && (
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Finding channels..."
        />
      )}
      {channels.length > 0 && (
        <div className="channels flex-col g-25">
          <ChannelItems channels={channels} />
          {/* consider: remove button and have refetch be automatic when scrolled to bottom? */}
          {nextPage && (
            <button
              type="button"
              className="button neutral solid mt-1"
              onClick={setRefetchOn}
              style={{ alignSelf: "center" }}
              disabled={loading}
            >
              <span>{loading ? "Loading..." : "Load more"}</span>
            </button>
          )}
        </div>
      )}
      {!loading && !error && channels.length === 0 && (
        <p>no channels to show</p>
      )}
    </>
  );
}

function ChannelItems({ channels }: { channels: Channel[] }) {
  const { width = 0 } = useWindowSize();

  const truncate = (string: string) => {
    const allowedCharLength = 12 + Math.floor((width - 250) / 50) * 4;
    if (string.length < allowedCharLength) return string;
    return string.slice(0, allowedCharLength).concat("...");
  };

  return (
    <>
      {channels.map((channel) => (
        <Link
          to="#"
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
              alt={`The channel avatar of ${channel.title}`}
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
  return channel.users.length > 1 ? (
    <>
      <div
        className="flex-row align-start"
        data-tooltip-id={`${channel._id}_campers`}
        data-tooltip-content={`${channel.users.length} camper${
          channel.users.length === 1 ? "" : "s"
        }`}
        data-tooltip-place="bottom"
      >
        {channel.users.slice(0, 5).map((user) => (
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
