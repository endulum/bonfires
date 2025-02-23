import { Logout } from "@mui/icons-material";

import { ModalButton } from "../../reusable/ModalButton";
import { Form } from "../../reusable/Form";
import { useContext } from "react";
import { ChannelContext } from "./ChannelContext";
import { Alert } from "../../reusable/Alert";
import { useNavigate, useOutletContext } from "react-router-dom";
import { User } from "../../../types";

export function ChannelLeave() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: User }>();
  const { id, users, owner_id } = useContext(ChannelContext);
  return (
    <ModalButton
      buttonElement={
        <button type="button" className="button warning plain">
          <Logout />
          <span>Leave camp</span>
        </button>
      }
      modalElement={
        <Form
          destination={{ endpoint: `/channel/${id}/leave`, method: "POST" }}
          onSuccess={() => {
            navigate("/camps");
          }}
          buttonText="Confirm"
        >
          <p>
            You will be removed from this camp, and you will not be able to
            re-enter until a member of this camp invites you back in.
          </p>

          {user._id === owner_id && (
            <Alert type="warning">
              {users.length === 1 ? (
                <p>
                  You are the only member of this camp. If you leave while no
                  other members remain, this camp and its message history will
                  be permanently deleted.
                </p>
              ) : (
                <p>
                  You are the owner of this camp. Upon leaving, another member
                  will be assigned the owner of this camp.
                </p>
              )}
            </Alert>
          )}
        </Form>
      }
      modalTitle="Leave camp"
    />
  );
}
