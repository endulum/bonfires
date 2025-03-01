import { useContext } from "react";
import { useGet } from "../../../hooks/useGet";
import { PushPin } from "@mui/icons-material";
import { MessageData } from "../../../types";
import { ChannelContext } from "../channel-view/ChannelContext";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { ModalButton } from "../../reusable/ModalButton";
import { MessageItem } from "./MessageItem";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";
import { UnpinMessageButton } from "../../forms/buttons/UnpinMessageButton";
import { useBoolean } from "usehooks-ts";
import { Alert } from "../../reusable/Alert";

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
  const {
    value: success,
    setFalse: turnOffSuccess,
    setTrue: turnOnSuccess,
  } = useBoolean(false);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Gathering messages..."
      />
    );

  return (
    <>
      {success && (
        <Alert type="success" className="mb-1">
          <p>Message has been successfully unpinned.</p>
        </Alert>
      )}
      {data && data.pinned.length > 0 ? (
        <div className="modal-messages flex-col w100 g-05">
          {data.pinned.map((message) => (
            <div
              key={message._id}
              className="w100"
              style={{ position: "relative" }}
            >
              <MessageItem data={message} />
              <UnpinMessageButton
                channelId={id}
                messageId={message._id}
                unpinSuccess={turnOnSuccess}
                clearSuccess={turnOffSuccess}
              />
            </div>
          ))}
        </div>
      ) : (
        <NoResultsSpacer>
          <p>This camp has no pinned messages.</p>
        </NoResultsSpacer>
      )}
    </>
  );
}
