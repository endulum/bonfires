import { Outlet } from "react-router-dom";

import { type UserData } from "../../../types";
import { Me } from "../../unique/etc/Me";

export function IndexWrapper({
  context,
}: {
  context: {
    user: UserData;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  };
}) {
  return (
    <>
      <Me />
      <div className="outlet">
        <Outlet context={context} />
      </div>
    </>
  );
}
