import { Form } from "../reusable/Form";
import { Alert } from "../reusable/Alert";
import { useBoolean } from "usehooks-ts";

export function UploadChannelAvatarForm({
  channelId,
  resetAvatar,
}: {
  channelId: string;
  resetAvatar: () => void;
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
          <p>This channel's new avatar was successfully uploaded.</p>
        </Alert>
      )}
      <Form
        destination={{
          endpoint: `/channel/${channelId}/avatar`,
          method: "POST",
        }}
        onSubmit={turnOffSuccess}
        onSuccess={() => {
          turnOnSuccess();
          resetAvatar();
        }}
        buttonText="Upload"
      >
        <p>Avatar upload requirements:</p>
        <ul className="ml-1">
          <li>Must be no larger than 5MB in size.</li>
          <li>Must be a PNG, JPG, GIF, WebP, or TIFF.</li>
          <li>Will be converted to a WebP.</li>
        </ul>

        <label htmlFor="upload">
          <span>File</span>
          <input type="file" id="upload" required />
        </label>
      </Form>
    </>
  );
}
