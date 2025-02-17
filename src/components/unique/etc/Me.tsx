import { useOutletContext } from "react-router-dom";

import { type UserData } from "../../../types";
import { NavTabs } from "../../reusable/NavTabs";
import { ThemeSwitch } from "./ThemeSwitch";
import { UploadOwnAvatar } from "../../modals/UploadOwnAvatar";
import { useLiveAvatar } from "../../../hooks/useLiveAvatar";

export function Me() {
  const { user } = useOutletContext<{ user: UserData }>();
  const { baseURL, avatarRef, resetAvatar } = useLiveAvatar(
    `${import.meta.env.VITE_API_URL}/user/${user._id}/avatar`
  );

  const timeOfDay = () => {
    const hours = new Date().getHours();
    return hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";
  };

  return (
    <header className="me flex-row g-1 mb-1">
      {/* avatar */}
      <div className="me-avatar p-05">
        <img src={baseURL} alt="Your avatar" ref={avatarRef} />
        <UploadOwnAvatar resetAvatar={resetAvatar} />
      </div>

      {/* content */}
      <div className="flex-col jcspb align-start w100 stretch">
        <div className="flex-row g-05 h100 stretch">
          <h2>
            Good {timeOfDay()}, <b>{user.username}</b>
          </h2>
          <ThemeSwitch />
        </div>
        <NavTabs
          tabs={[
            { to: "/camps", title: "Camps" },
            { to: "/settings", title: "Settings" },
            { to: "/about", title: "About" },
          ]}
        />
      </div>
    </header>
  );
}
