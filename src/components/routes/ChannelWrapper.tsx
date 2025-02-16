import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useWindowSize } from "usehooks-ts";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { FlyoutMenu } from "../reusable/FlyoutMenu";
import * as Modals from "../modals/ChannelModals";

export function ChannelWrapper() {
  const { camp } = useParams();
  const { loading, error, data } = useGet<{ _id: string; title: string }>(
    `/channel/${camp}`
  );
  const { width = 0 } = useWindowSize();
  const truncate = (string: string) => {
    const allowedCharLength = 12 + Math.floor((width - 300) / 50) * 4;
    if (string.length < allowedCharLength) return string;
    return string.slice(0, allowedCharLength).concat("...");
  };

  const avatarRef = useRef<HTMLImageElement | null>(null);

  const resetAvatar = () => {
    if (avatarRef.current) {
      const timestamp = new Date().getTime();
      avatarRef.current.src = `${import.meta.env.VITE_API_URL}/channel/${
        data?._id
      }/avatar?${timestamp}`;
    }
  };

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Approaching camp..."
      />
    );

  if (data)
    return (
      <>
        <div className="flex-row jcspb mb-05">
          <div className="flex-row g-05">
            <Link to="/camps" type="button" className="button neutral plain">
              <ArrowBack />
            </Link>
            <img
              className="channelview-avatar"
              src={`${import.meta.env.VITE_API_URL}/channel/${data._id}/avatar`}
              ref={avatarRef}
            />
            <h2>{truncate(data.title)}</h2>
          </div>
          <FlyoutMenu x="left" y="bottom">
            <Modals.UploadChannelAvatar
              channelId={data._id}
              resetAvatar={resetAvatar}
            />
            {/* <button type="button" className="button neutral plain">
              <Settings />
              <span>Camp members</span>
            </button>
            <button type="button" className="button neutral plain">
              <Settings />
              <span>Pinned messages</span>
            </button>
            <button type="button" className="button neutral plain">
              <Settings />
              <span>Search messages</span>
            </button>
            <button type="button" className="button neutral plain">
              <Settings />
              <span>Camp avatar</span>
            </button>
            <button type="button" className="button neutral plain">
              <Settings />
              <span>Camp settings</span>
            </button>
            <button type="button" className="button warning plain">
              <Settings />
              <span>Leave camp</span>
            </button> */}
          </FlyoutMenu>
        </div>
        <div
          className="messages flg"
          style={{ borderTop: "1px solid var(--border)" }}
        ></div>
      </>
    );
}
