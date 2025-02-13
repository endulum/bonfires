import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { Edit, Logout } from "@mui/icons-material";

import { clearStoredToken } from "../../functions/tokenUtils";
import { type UserData } from "../../types";
import { ModalButton } from "../reusable/ModalButton";
import { UploadOwnAvatarForm } from "../forms/UploadOwnAvatarForm";
import { NavTabs } from "../reusable/NavTabs";

export function Me({
  user,
  initUser,
}: {
  user: UserData;
  initUser: () => void;
}) {
  const avatarRef = useRef<HTMLImageElement | null>(null);

  const timeOfDay = () => {
    const hours = new Date().getHours();
    return hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";
  };

  const resetAvatar = () => {
    if (avatarRef.current) {
      const timestamp = new Date().getTime();
      avatarRef.current.src = `${import.meta.env.VITE_API_URL}/user/${
        user._id
      }/avatar?${timestamp}`;
    }
  };

  const navigate = useNavigate();

  const logOut = () => {
    clearStoredToken();
    initUser();
    navigate("/");
  };

  return (
    <header className="me flex-row g-1 mb-1">
      {/* avatar */}
      <div className="me-avatar p-05">
        <img
          src={`${import.meta.env.VITE_API_URL}/user/${user._id}/avatar`}
          alt="Your avatar"
          ref={avatarRef}
        />
        <ModalButton
          modalTitle="Change Avatar"
          buttonElement={
            <button
              type="button"
              className="button neutral solid circle"
              data-tooltip-id="edit-avatar"
              data-tooltip-content="Change your avatar"
              data-tooltip-place="bottom-start"
            >
              <Edit />
            </button>
          }
          modalElement={<UploadOwnAvatarForm resetAvatar={resetAvatar} />}
        />
        <Tooltip id="edit-avatar" />
      </div>

      {/* content */}
      <div className="flex-col jcspb align-start w100 stretch">
        <div className="flex-row g-05 h100 stretch">
          <h2>
            Good {timeOfDay()}, <b>{user.username}</b>
          </h2>
          <button
            type="button"
            className="button neutral plain circle"
            data-tooltip-id="log-out"
            data-tooltip-content="Log out"
            data-tooltip-place="bottom-end"
            onClick={logOut}
          >
            <Logout />
          </button>
          <Tooltip id="log-out" />
        </div>
        <NavTabs
          tabs={[
            { to: "/channels", title: "Channels" },
            { to: "/settings", title: "Settings" },
            { to: "/about", title: "About" },
          ]}
        />
      </div>
    </header>
  );
}
