import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { ChannelData } from "../../../types";
import { useLiveAvatar } from "../../../hooks/useLiveAvatar";
import { useTextTruncate } from "../../../hooks/useTextTruncate";
import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import * as Modals from "../../modals/ChannelModals";

export function ChannelHeader({ channel }: { channel: ChannelData }) {
  const { baseURL, resetAvatar, avatarRef } = useLiveAvatar(
    `${import.meta.env.VITE_API_URL}/channel/${channel._id}/avatar`
  );
  const { truncate } = useTextTruncate({});

  return (
    <div className="flex-row jcspb mb-05">
      <div className="flex-row g-05">
        <Link to="/camps" type="button" className="button neutral plain">
          <ArrowBack />
        </Link>
        <img className="channelview-avatar" src={baseURL} ref={avatarRef} />
        <h2>{truncate(channel.title)}</h2>
      </div>
      <FlyoutMenu x="left" y="bottom">
        <Modals.UploadChannelAvatar
          channelId={channel._id}
          resetAvatar={resetAvatar}
        />
      </FlyoutMenu>
    </div>
  );
}
