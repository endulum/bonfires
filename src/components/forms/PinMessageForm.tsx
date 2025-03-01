import { MessageData } from "../../types";
import { Form } from "../reusable/Form";
import { MessageItem } from "../unique/messages/MessageItem";

export function PinMessageForm({
  channelId,
  data,
  onSuccess,
}: {
  channelId: string;
  data: MessageData;
  onSuccess: () => void;
}) {
  return (
    <Form
      destination={{
        endpoint: `/channel/${channelId}/message/${data._id}/pin`,
        method: "PUT",
      }}
      onSuccess={onSuccess}
      buttonText={data.pinned ? "Unpin" : "Pin"}
    >
      <p>
        Are you sure you want to {data.pinned ? "unpin" : "pin"} this message?
      </p>
      <div className="modal-messages flex-col w100">
        <MessageItem data={data} />
      </div>
      <label htmlFor="pin" style={{ display: "none" }} aria-hidden>
        <span>Pin</span>
        <input
          id="pin"
          autoComplete="off"
          defaultValue={data.pinned ? "false" : "true"}
        />
      </label>
    </Form>
  );
}
