import { MessageData } from "../../types";
import { Form } from "../reusable/Form";
import { unEscape } from "../../functions/unEscape";

export function EditMessageForm({
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
        method: "PUT",
      }}
      onSuccess={onSuccess}
      buttonText="Save"
    >
      <label htmlFor="content">
        <span>Content</span>
        <textarea
          id="content"
          defaultValue={unEscape(data.content)}
          maxLength={256}
        ></textarea>
      </label>
      <hr />
    </Form>
  );
}
