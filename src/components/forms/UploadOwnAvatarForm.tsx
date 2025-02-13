import { Form } from "../reusable/Form";
import { Alert } from "../reusable/Alert";
import { useBoolean } from "usehooks-ts";

export function UploadOwnAvatarForm({
  resetAvatar,
}: {
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
          <p>Your new avatar was successfully uploaded.</p>
        </Alert>
      )}
      <Form
        destination={{ endpoint: "/avatar", method: "POST" }}
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
