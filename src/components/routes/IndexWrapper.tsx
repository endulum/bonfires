import { Outlet, useOutletContext } from "react-router-dom";

import { type UserData } from "../../types";
import { Me } from "../unique/Me";

export function IndexWrapper() {
  const { user, initUser, changeUsername } = useOutletContext<{
    user: UserData;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  }>();
  return (
    <>
      <Me user={user} />
      <div className="outlet">
        <Outlet context={{ user, initUser, changeUsername }} />
      </div>
    </>
  );
}
