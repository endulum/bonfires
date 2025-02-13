import { Outlet } from "react-router-dom";

import { type UserData } from "../../types";
import { Me } from "../unique/Me";

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
      <main className="flex-col w100">
        <Me user={context.user} initUser={context.initUser} />
        <div className="outlet">
          <Outlet context={context} />
        </div>
      </main>
    </>
  );
}
