import { useState } from "react";
import { Link } from "react-router-dom";

import { Form } from "../reusable/Form";
import { InputChecklist } from "../reusable/InputChecklist";
import { Alert } from "../reusable/Alert";

export function SignupForm() {
  const [newAccountUsername, setNewAccountUsername] = useState<string | null>(
    null
  );

  return (
    <Form<null>
      destination={{ endpoint: "/signup", method: "POST" }}
      onSuccess={(submissionData, _submissionResult) => {
        setNewAccountUsername(submissionData.username);
      }}
      buttonText="Sign Up"
    >
      {newAccountUsername !== null && (
        <Alert type="success">
          <p>
            Your account has been created. You may{" "}
            <Link
              to={"/login"}
              state={{
                newAccountUsername,
              }}
            >
              log in
            </Link>{" "}
            to your new account.
          </p>
        </Alert>
      )}
      <label htmlFor="username">
        <span>Username</span>
        <InputChecklist
          input={
            <input
              type="text"
              id="username"
              autoComplete="off"
              maxLength={32}
              required
            />
          }
          requirements={[
            {
              description: "Must be between 2 and 32 characters in length",
              function: (x: string) => x.length >= 2 && x.length <= 32,
            },
            {
              description:
                "Must contain only lowercase letters, numbers, and hyphens",
              function: (x: string) => x.match(/^[a-z0-9-]+$/g) !== null,
            },
          ]}
        />
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <InputChecklist
          input={
            <input type="password" id="password" autoComplete="off" required />
          }
          requirements={[
            {
              description: "Must be 8 or more chatacters long",
              function: (x: string) => x.length >= 8,
            },
          ]}
        />
      </label>
      <label htmlFor="confirmPassword">
        <span>Confirm password</span>
        <input
          type="password"
          id="confirmPassword"
          autoComplete="off"
          required
        />
      </label>
    </Form>
  );
}
