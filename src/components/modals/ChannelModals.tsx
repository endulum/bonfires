import { InsertPhoto } from "@mui/icons-material";

import { ModalButton } from "../reusable/ModalButton";
import { UploadChannelAvatarForm } from "../forms/UploadChannelAvatarForm";

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
