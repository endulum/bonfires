import { useRef } from "react";

import { type UserData } from "../../types";
import { NavTabs } from "../reusable/NavTabs";
import { ThemeSwitch } from "./ThemeSwitch";
import { UploadOwnAvatar } from "../modals/UploadOwnAvatar";

export function Me({ user }: { user: UserData }) {
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

  return (
    <header className="me flex-row g-1 mb-1">
      {/* avatar */}
      <div className="me-avatar p-05">
        <img
          src={`${import.meta.env.VITE_API_URL}/user/${user._id}/avatar`}
          alt="Your avatar"
          ref={avatarRef}
        />
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
