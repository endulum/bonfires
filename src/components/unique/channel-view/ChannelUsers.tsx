import { Diversity3, Person } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { useContext, useState } from "react";
import { Tooltip } from "react-tooltip";
import Crown from "../../../assets/icons/crown.svg?react";

import { ModalButton } from "../../reusable/ModalButton";
import { ChannelContext } from "./ChannelContext";
import { InviteUserForm } from "../../forms/InviteUserForm";
import { useOutletContext } from "react-router-dom";
import { UserData } from "../../../types";
import { KickUserButton } from "../../forms/buttons/KickUserButton";
import { Alert } from "../../reusable/Alert";

export function ChannelUsers() {
  const [success, setSuccess] = useState<{
    username: string;
    type: "kick" | "invite";
  } | null>(null);

  const kickSuccess = (username: string) =>
    setSuccess({ username, type: "kick" });
  const inviteSuccess = (username: string) =>
    setSuccess({ username, type: "invite" });
  const clearSuccess = () => setSuccess(null);

  return (
    <ModalButton
      buttonElement={
        <button type="button" className="button neutral plain">
          <Diversity3 />
          <span>Camp members</span>
        </button>
      }
      modalElement={
        <div>
          {success && (
            <Alert type="success" className="mb-1">
              <p>
                Successfully {success.type === "invite" ? "invited" : "kicked"}{" "}
                user <b>{success.username}</b>.
              </p>
            </Alert>
          )}
          <UserList kickSuccess={kickSuccess} clearSuccess={clearSuccess} />
          <hr className="mt-1 mb-1" />
          <h3 className="mb-05">Invite a user</h3>
          <InviteUserForm
            inviteSuccess={inviteSuccess}
            clearSuccess={clearSuccess}
          />
        </div>
      }
      modalTitle="Camp Members"
    />
  );
}

function UserList({
  kickSuccess,
  clearSuccess,
}: {
  kickSuccess: (username: string) => void;
  clearSuccess: () => void;
}) {
  const { user: you } = useOutletContext<{ user: UserData }>();
  const { id, owner_id, users, getSettingsForUser } =
    useContext(ChannelContext);

  return (
    <div className="memberlist flex-col g-1">
      {users.map((u) => {
        const user = getSettingsForUser(u._id);
        if (!user) return <br />;
        return (
          <div key={u._id} className="flex-row g-75 w100">
            <img
              className="avatar med"
              src={`${import.meta.env.VITE_API_URL}/user/${u._id}/avatar`}
              alt={`Avatar for user "${user ? user.name : u.username}"`}
            />
            <div className="flex-col align-start w100">
              <div className="flex-row jcspb g-05 w100">
                <div className="flex-row align-start g-05">
                  <h4 style={{ color: user.color ?? "var(--text)" }}>
                    {user.name}
                  </h4>
                  {user.name !== u.username && (
                    <>
                      <span
                        data-tooltip-id={`username_${u._id}`}
                        data-tooltip-place="bottom"
                        data-tooltip-content={u.username}
                      >
                        <Person className="small" />
                      </span>
                      <Tooltip id={`username_${u._id}`} />
                    </>
                  )}
                  {user.isOwner && (
                    <>
                      <span
                        data-tooltip-id="owner"
                        data-tooltip-content={"Camp owner"}
                        data-tooltip-place="bottom"
                        title="Camp owner marker"
                      >
                        <SvgIcon component={Crown} className="small" />
                      </span>
                      <Tooltip id="owner" />
                    </>
                  )}
                </div>

                {u._id !== you._id && owner_id === you._id && (
                  <KickUserButton
                    channelId={id}
                    user={u}
                    kickSuccess={kickSuccess}
                    clearSuccess={clearSuccess}
                  />
                )}
              </div>

              {u.status && (
                <p>
                  <small>{u.status}</small>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
