import { useContext } from "react";

import { ChannelUser } from "../../types";
import { ChannelContext } from "../unique/channel-view/ChannelContext";
import { Form } from "../reusable/Form";

export function InviteUserForm({
  inviteSuccess,
  clearSuccess,
}: {
  inviteSuccess: (username: string) => void;
  clearSuccess: () => void;
}) {
  const { id, inviteUser } = useContext(ChannelContext);
  return (
    <Form<ChannelUser>
      destination={{ endpoint: `/channel/${id}/invite`, method: "POST" }}
      onSubmit={() => {
        clearSuccess();
      }}
      onSuccess={(_submissionData, submissionResult) => {
        inviteSuccess(submissionResult.username);
        inviteUser(submissionResult);
      }}
      buttonText="Invite"
    >
      <p>
        Input a username to add the user to this camp as a member. A user must
        exist with that username, and must not already be in this camp.
      </p>
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" id="username" required />
      </label>
    </Form>
  );
}
