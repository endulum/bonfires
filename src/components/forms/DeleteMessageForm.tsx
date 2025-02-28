import { Form } from "../reusable/Form";
import { MessageData } from "../../types";
import { MessageItem } from "../unique/messages/MessageItem";
import { Alert } from "../reusable/Alert";

export function DeleteMessageForm({
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
        endpoint: `/channel/${channelId}/message/${data._id}`,
        method: "DELETE",
      }}
      onSuccess={onSuccess}
      buttonText="Save"
    >
      <Alert type="warning">
        <p>
          Are you sure you want to delete this message? This action is
          irreversible.
        </p>
      </Alert>
      <div className="modal-messages flex-col">
        <MessageItem data={data} />
      </div>
    </Form>
  );
}
