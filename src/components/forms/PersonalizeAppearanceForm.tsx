import { useContext, useState } from "react";
import { Info } from "@mui/icons-material";

import { Form } from "../reusable/Form";
import { ChannelContext } from "../unique/channel-view/ChannelContext";
import { InputChecklist } from "../reusable/InputChecklist";
import { ChannelUser } from "../../types";
import { Tooltip } from "react-tooltip";
import { useBoolean } from "usehooks-ts";
import { Alert } from "../reusable/Alert";

export function PersonalizeAppearanceForm() {
  const { id, getYou } = useContext(ChannelContext);
  const you = getYou();

  const [wantsCustom, setWantsCustom] = useState<Record<string, boolean>>({
    name: !!you && "displayName" in you.channelSettings,
    color: !!you && "nameColor" in you.channelSettings,
    visibility: !!you && "visibility" in you.channelSettings,
  });
  const {
    value: success,
    setFalse: turnOffSuccess,
    setTrue: turnOnSuccess,
  } = useBoolean(false);

  return (
    you && (
      <Form<ChannelUser>
        destination={{ endpoint: `/channel/${id}/settings`, method: "PUT" }}
        onSubmit={turnOffSuccess}
        onSuccess={(_submissionData, _submissionResult) => {
          turnOnSuccess();
        }}
        buttonText="Save"
      >
        {success && (
          <Alert type="success">
            <p>Your settings for this camp have been successfully saved.</p>
          </Alert>
        )}
        <p>
          Customize how you appear in this camp. These settings are specific to
          this camp only, and overwrite your defaults. If you would like to set
          defaults for yourself, visit your user settings.
        </p>

        <div className="flex-row jcspb w100">
          <label htmlFor="wantsCustomName">Custom display name?</label>
          <input
            type="checkbox"
            id="wantsCustomName"
            checked={wantsCustom.name}
            onChange={(e) => {
              setWantsCustom({ ...wantsCustom, name: e.target.checked });
            }}
          />
        </div>

        {wantsCustom.name && (
          <label htmlFor="displayName">
            <span>Display name</span>
            <InputChecklist
              input={
                <input
                  type="text"
                  id="displayName"
                  defaultValue={you.channelSettings.displayName}
                  required
                />
              }
              requirements={[
                {
                  description: "No longer than 32 characters",
                  function: (i) => i.length <= 32,
                },
              ]}
            />
          </label>
        )}

        <hr />

        <div className="flex-row jcspb w100">
          <label htmlFor="wantsCustomColor">Custom name color?</label>
          <input
            type="checkbox"
            id="wantsCustomColor"
            checked={wantsCustom.color}
            onChange={(e) => {
              setWantsCustom({ ...wantsCustom, color: e.target.checked });
            }}
          />
        </div>

        {wantsCustom.color && (
          <label htmlFor="nameColor">
            <span>Name color</span>
            <input
              type="color"
              id="nameColor"
              defaultValue={you.channelSettings.nameColor}
            />
          </label>
        )}

        <hr />

        <div className="flex-row jcspb w100">
          <div className="flex-row g-05">
            <label htmlFor="wantsCustomVisibility">Custom invisibility?</label>
            <Info data-tooltip-id="invisibility" className="small" />
            <Tooltip id="invisibility">
              <p style={{ maxWidth: "250px" }}>
                When <b>invisible</b>, you will not appear online when viewing
                this camp and there will be no typing indicator created when you
                are composing a message.
              </p>
            </Tooltip>
          </div>

          <input
            type="checkbox"
            id="wantsCustomVisibility"
            checked={wantsCustom.visibility}
            onChange={(e) => {
              setWantsCustom({ ...wantsCustom, visibility: e.target.checked });
            }}
          />
        </div>

        {wantsCustom.visibility && (
          <label
            htmlFor="invisible"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <span>Invisible</span>
            <input
              type="checkbox"
              id="invisible"
              defaultChecked={!!you.channelSettings.visible}
            />
          </label>
        )}

        <small></small>
      </Form>
    )
  );
}
