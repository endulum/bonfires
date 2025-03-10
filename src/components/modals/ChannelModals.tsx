import { InsertPhoto, DriveFileRenameOutline } from "@mui/icons-material";

import { ModalButton } from "../reusable/ModalButton";
import { UploadChannelAvatarForm } from "../forms/UploadChannelAvatarForm";
import { ChannelTitleForm } from "../forms/ChannelTitleForm";

export function UploadChannelAvatar({
  channelId,
  resetAvatar,
}: {
  channelId: string;
  resetAvatar: () => void;
}) {
  return (
    <ModalButton
      buttonElement={
        <button type="button" className="button neutral plain">
          <InsertPhoto />
          <span>Camp avatar</span>
        </button>
      }
      modalElement={
        <UploadChannelAvatarForm
          channelId={channelId}
          resetAvatar={resetAvatar}
        />
      }
      modalTitle="Change Camp Avatar"
    />
  );
}

export function ChangeChannelTitle({
  channelId,
  updateTitle,
  defaultTitle,
}: {
  channelId: string;
  updateTitle: (newTitle: string) => void;
  defaultTitle: string;
}) {
  return (
    <ModalButton
      buttonElement={
        <button type="button" className="button neutral plain">
          <DriveFileRenameOutline />
          <span>Camp name</span>
        </button>
      }
      modalElement={
        <ChannelTitleForm
          channelId={channelId}
          updateTitle={updateTitle}
          defaultTitle={defaultTitle}
        />
      }
      modalTitle="Change Camp Name"
    />
  );
}
