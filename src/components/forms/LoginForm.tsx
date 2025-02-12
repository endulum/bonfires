import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useBoolean } from "usehooks-ts";

import { Form } from "../reusable/Form";
import { setStoredToken } from "../../functions/tokenUtils";
import { Alert } from "../reusable/Alert";

export function LoginForm() {
  const navigate = useNavigate();
  const { initUser } = useOutletContext<{ initUser: () => Promise<void> }>();
  const { state } = useLocation();
  const { value: redirectFlag, setFalse: turnOffRedirectFlag } = useBoolean(
    state?.redirect
  );

  return (
    <Form<{ token: string }>
      destination={{ endpoint: "/login", method: "POST" }}
      onSubmit={() => {
        if (redirectFlag) turnOffRedirectFlag();
      }}
      onSuccess={(_submissionData, submissionResult: { token: string }) => {
        navigate(-1);
        setStoredToken(submissionResult.token);
        initUser();
      }}
      buttonText="Log In"
    >
      {redirectFlag && (
        <Alert type="warning">
          <p>You must log in to perform this action.</p>
        </Alert>
      )}
      <label htmlFor="username">
        <span>Username</span>
        <input
          type="text"
          id="username"
          autoComplete="on"
          defaultValue={state ? state.newAccountUsername : ""}
          required
        />
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input type="password" id="password" autoComplete="on" required />
      </label>
    </Form>
  );
}
