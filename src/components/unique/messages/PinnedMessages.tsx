import { useContext } from "react";
import { useGet } from "../../../hooks/useGet";
import { PushPin } from "@mui/icons-material";
import { MessageData } from "../../../types";
import { ChannelContext } from "../channel-view/ChannelContext";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { ModalButton } from "../../reusable/ModalButton";
import { MessageItem } from "./MessageItem";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";

export function PinnedMessages() {
  return (
    <ModalButton
      buttonElement={
        <button type="button" className="button neutral plain">
          <PushPin />
          <span>Pinned messages</span>
        </button>
      }
      modalElement={<PinnedList />}
      modalTitle="Pinned messages"
    />
  );
}

function PinnedList() {
  const { id } = useContext(ChannelContext);
  const { loading, error, data } = useGet<{ pinned: MessageData[] }>(
    `/channel/${id}/pins`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Gathering messages..."
      />
    );

  return data && data.pinned.length > 0 ? (
    <div className="modal-messages flex-col w100 g-05">
      {data.pinned.map((message) => (
        <MessageItem key={message._id} data={message} />
      ))}
    </div>
  ) : (
    <NoResultsSpacer>
      <p>This camp has no pinned messages.</p>
    </NoResultsSpacer>
  );
}
