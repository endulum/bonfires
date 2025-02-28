import { Edit, PushPin, Delete } from "@mui/icons-material";

import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import { MessageData, User } from "../../../types";
import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { ChannelContext } from "../channel-view/ChannelContext";

import { ModalButton } from "../../reusable/ModalButton";
import { EditMessageForm } from "../../forms/EditMessageForm";
import { PinMessageForm } from "../../forms/PinMessageForm";

export function MessageDropdown({
  data,
  onSuccess,
  onToggle,
}: {
  data: MessageData;
  onSuccess: () => void;
  onToggle: (opened: boolean) => void;
}) {
  const { user } = useOutletContext<{ user: User }>();
  const { id, owner_id } = useContext(ChannelContext);
  return (
    <div className="message-dropdown">
      <FlyoutMenu x="left" y="top" onToggle={onToggle}>
        {/* if it's your message, you're able to edit it */}
        {data.user._id === user._id && (
          <ModalButton
            buttonElement={
              <button type="button" className="button neutral plain">
                <Edit />
                <span>Edit message</span>
              </button>
            }
            modalElement={
              <EditMessageForm
                channelId={id}
                data={data}
                onSuccess={onSuccess}
              />
            }
            modalTitle="Edit message"
          />
        )}

        {/* anyone can pin any message */}
        <ModalButton
          buttonElement={
            <button type="button" className="button neutral plain">
              <PushPin />
              <span>{data.pinned ? "Unpin" : "Pin"} message</span>
            </button>
          }
          modalElement={
            <PinMessageForm channelId={id} data={data} onSuccess={onSuccess} />
          }
          modalTitle="Pin message"
        />

        {/* if it's your message or your camp, you're able to delete it */}
        {(data.user._id === user._id || user._id === owner_id) && (
          <button type="button" className="button warning plain">
            <Delete />
            <span>Delete message</span>
          </button>
        )}
      </FlyoutMenu>
    </div>
  );
}
