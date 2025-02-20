import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { useLiveAvatar } from "../../../hooks/useLiveAvatar";
import { useTextTruncate } from "../../../hooks/useTextTruncate";
import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import * as Modals from "../../modals/ChannelModals";

import { ChannelContext } from "./ChannelContext";
import { useContext } from "react";

export function ChannelHeader() {
  const { id, title, updateTitle } = useContext(ChannelContext);

  const { baseURL, resetAvatar, avatarRef } = useLiveAvatar(
    `${import.meta.env.VITE_API_URL}/channel/${id}/avatar`
  );
  const { truncate } = useTextTruncate({});

  return (
    <div className="flex-row jcspb mb-05">
      <div className="flex-row g-05">
        <Link to="/camps" type="button" className="button neutral plain">
          <ArrowBack />
        </Link>
        <img className="channelview-avatar" src={baseURL} ref={avatarRef} />
        <h2>{truncate(title)}</h2>
      </div>
      <FlyoutMenu x="left" y="bottom">
        <Modals.UploadChannelAvatar channelId={id} resetAvatar={resetAvatar} />
        <Modals.ChangeChannelTitle
          channelId={id}
          updateTitle={updateTitle}
          defaultTitle={title}
        />
      </FlyoutMenu>
    </div>
  );
}
