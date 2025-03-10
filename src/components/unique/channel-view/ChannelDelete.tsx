import { SvgIcon } from "@mui/material";
import FireOff from "../../../assets/icons/fire-off.svg?react";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ModalButton } from "../../reusable/ModalButton";
import { ChannelContext } from "./ChannelContext";
import { Alert } from "../../reusable/Alert";
import { Form } from "../../reusable/Form";

export function ChannelDelete() {
  const navigate = useNavigate();
  const { id } = useContext(ChannelContext);
  return (
    <ModalButton
      buttonElement={
        <button type="button" className="button warning plain">
          <SvgIcon component={FireOff} />
          <span>Delete camp</span>
        </button>
      }
      modalElement={
        <Form
          destination={{ endpoint: `/channel/${id}`, method: "DELETE" }}
          onSuccess={() => {
            navigate("/camps");
          }}
          buttonText="Confirm"
        >
          <Alert type="warning">
            <p>
              This camp and its message history will be permanently deleted.
              This action is irreversible.
            </p>
          </Alert>
          <p>To confirm deletion, input the name of this camp and submit.</p>

          <label htmlFor="title">
            <span>Camp name</span>
            <input type="text" id="title" required />
          </label>
        </Form>
      }
      modalTitle="Leave camp"
    />
  );
}
