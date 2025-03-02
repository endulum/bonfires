import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { useOutletContext } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import { type UserData } from "../../types";
import { Form } from "../reusable/Form";
import { InputChecklist } from "../reusable/InputChecklist";
import { Alert } from "../reusable/Alert";

export function UserSettingsForm() {
  const {
    value: success,
    setFalse: turnOffSuccess,
    setTrue: turnOnSuccess,
  } = useBoolean(false);

  const { user, changeUsername } = useOutletContext<{
    user: UserData;
    changeUsername: (username: string) => void;
  }>();

  const [wantsCustomColor, setWantsCustomColor] = useState<boolean>(
    "defaultNameColor" in user.settings
  );

  return (
    <Form
      destination={{ endpoint: "/me", method: "PUT" }}
      onSubmit={turnOffSuccess}
      onSuccess={(submissionData) => {
        turnOnSuccess();
        changeUsername(submissionData.username);
      }}
      buttonText="Submit"
    >
      {success && (
        <Alert type="success">
          <p>Your personal settings have been successfully saved.</p>
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
              defaultValue={user ? user.username : ""}
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

      <label htmlFor="tagline">
        <span>Tagline</span>
        <textarea
          id="tagline"
          defaultValue={user.tagline}
          maxLength={256}
        ></textarea>
      </label>

      <div className="flex-row jcspb w100">
        <div className="flex-row g-05">
          <label htmlFor="wantsCustomColor">Set a default name color?</label>
          <Info data-tooltip-id="custom color" className="small" />
          <Tooltip id="custom color">
            <p style={{ maxWidth: "250px" }}>
              This sets the color of your display name in all camps you're in.
              This can be overwritten in individual camps using a camp's{" "}
              <b>Personalize appearance</b> menu.
            </p>
          </Tooltip>
        </div>
        <input
          type="checkbox"
          id="wantsCustomColor"
          checked={wantsCustomColor}
          onChange={(e) => {
            setWantsCustomColor(e.target.checked);
          }}
        />
      </div>

      {wantsCustomColor && (
        <label htmlFor="defaultNameColor">
          <span>Name color</span>
          <input
            type="color"
            id="defaultNameColor"
            defaultValue={user.settings.defaultNameColor}
          />
        </label>
      )}

      <label
        htmlFor="defaultInvisible"
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <div className="flex-row g-05">
          <span>Invisible</span>
          <Info data-tooltip-id="invisibility" className="small" />
          <Tooltip id="invisibility">
            <p style={{ maxWidth: "250px" }}>
              When <b>invisible</b>, you will not appear online when viewing a
              camp and there will be no typing indicator created when you are
              composing a message. This can be overwritten in individual camps
              using a camp's <b>Personalize appearance</b> menu.
            </p>
          </Tooltip>
        </div>
        <input
          type="checkbox"
          id="defaultInvisible"
          defaultChecked={user.settings.defaultInvisible}
        />
      </label>

      {!user.ghId && (
        <>
          <h3 className="mt-1">Password</h3>
          <p className="mb-1">
            Leave these fields blank if you do not wish to alter your password.
          </p>
        </>
      )}

      {!user.ghId && (
        <label htmlFor="password">
          <span>New password</span>
          <InputChecklist
            input={<input type="password" id="password" autoComplete="off" />}
            requirements={[
              {
                description: "Must be 8 or more chatacters long",
                function: (x: string) => x.length >= 8,
              },
            ]}
          />
        </label>
      )}

      {!user.ghId && (
        <label htmlFor="confirmPassword">
          <span>Confirm new password</span>
          <input type="password" id="confirmPassword" />
        </label>
      )}

      {!user.ghId && (
        <label htmlFor="currentPassword">
          <span>Current password</span>
          <input type="password" id="currentPassword" />
        </label>
      )}
    </Form>
  );
}
