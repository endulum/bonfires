import { Tooltip } from "react-tooltip";
import { Edit } from "@mui/icons-material";

import { ModalButton } from "../reusable/ModalButton";
import { UploadOwnAvatarForm } from "../forms/UploadOwnAvatarForm";

export function UploadOwnAvatar({ resetAvatar }: { resetAvatar: () => void }) {
  return (
    <>
      <ModalButton
        modalTitle="Change Avatar"
        buttonElement={
          <button
            type="button"
            className="button neutral solid circle"
            data-tooltip-id="edit-avatar"
            data-tooltip-content="Change your avatar"
            data-tooltip-place="bottom-start"
          >
            <Edit />
          </button>
        }
        modalElement={<UploadOwnAvatarForm resetAvatar={resetAvatar} />}
      />
      <Tooltip id="edit-avatar" />
    </>
  );
}
