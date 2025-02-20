import { useContext } from "react";
import { Tooltip } from "react-tooltip";

import { ChannelContext } from "./ChannelContext";
import { useLiveAvatar } from "../../../hooks/useLiveAvatar";
import { ModalButton } from "../../reusable/ModalButton";
import { UploadChannelAvatarForm } from "../../forms/UploadChannelAvatarForm";

export function ChannelAvatar() {
  const { id } = useContext(ChannelContext);
  const { baseURL, resetAvatar, avatarRef } = useLiveAvatar(
    `${import.meta.env.VITE_API_URL}/channel/${id}/avatar`
  );

  return (
    <>
      <ModalButton
        buttonElement={
          <button
            type="button"
            data-tooltip-id="channel-avatar"
            data-tooltip-place="bottom-start"
            data-tooltip-content="Change camp avatar"
          >
            <img className="channelview-avatar" src={baseURL} ref={avatarRef} />
          </button>
        }
        modalElement={
          <UploadChannelAvatarForm channelId={id} resetAvatar={resetAvatar} />
        }
        modalTitle="Change Camp Avatar"
      />
      <Tooltip id="channel-avatar" />
    </>
  );
}
