import { Form } from "../reusable/Form";
import { InputChecklist } from "../reusable/InputChecklist";
import { Alert } from "../reusable/Alert";
import { useBoolean } from "usehooks-ts";

export function ChannelTitleForm({
  channelId,
  updateTitle,
  defaultTitle,
}: {
  channelId: string;
  updateTitle: (newTitle: string) => void;
  defaultTitle: string;
}) {
  const {
    value: isSuccess,
    setTrue: turnOnSuccess,
    setFalse: turnOffSuccess,
  } = useBoolean();
  return (
    <>
      {isSuccess && (
        <Alert type="success" className="mb-1">
          <p>This camp's name was successfully updated.</p>
        </Alert>
      )}
      <Form
        destination={{ endpoint: `/channel/${channelId}`, method: "PUT" }}
        onSubmit={turnOffSuccess}
        onSuccess={(submissionData, _submissionResult) => {
          updateTitle(submissionData["title"]);
          turnOnSuccess();
        }}
        buttonText="Update"
      >
        <label htmlFor="title">
          <span>Camp Title</span>
          <InputChecklist
            input={
              <input
                type="text"
                id="title"
                autoComplete="off"
                defaultValue={defaultTitle}
                required
              />
            }
            requirements={[
              {
                description: "Must be between 2 and 64 chatacters long",
                function: (x: string) => x.length >= 2 && x.length <= 64,
              },
            ]}
          />
        </label>
        <br />
      </Form>
    </>
  );
}
