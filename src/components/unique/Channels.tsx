import { useRef } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { Tooltip } from "react-tooltip";

import { Channel } from "../../types";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { NoResultsSpacer } from "../reusable/NoResultsSpacer";
import { DateRelative } from "../reusable/Dates";
import { useChannels } from "../../hooks/useChannels";

export function Channels() {
  const {
    channels,
    url, // to check to determine whether a "load more" button is needed
    title, // to check to determine whether client is performing search
    setTitle, // to allow another component to trigger a search by changing title
    setRefetchOn, // to trigger loadmore
    loading,
    error,
  } = useChannels();

  return (
    <>
      <ChannelSearch setTitle={setTitle} />
      {(loading || error) && channels.length === 0 && (
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText={`${
            title === "" ? "Finding" : "Searching"
          } your camps...`}
        />
      )}
      {channels.length > 0 && (
        <div className="channels flex-col g-25">
          <ChannelItems channels={channels} />
          {url && (
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
        <NoResultsSpacer>
          {title !== "" ? (
            <p>No camps fit your search.</p>
          ) : (
            <p>
              It looks like you aren't in any camps.
              <br />
              Why not create one?
            </p>
          )}
        </NoResultsSpacer>
      )}
    </>
  );
}

function ChannelSearch({
  setTitle,
}: {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTitle(e.target.value);
    }, 750);
  };

  return (
    <form onChange={handleChange} className="flex-row g-1 mb-1">
      <label htmlFor="title" className="mw-mxc">
        Search by title
      </label>
      <input type="text" id="title" />
    </form>
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
