import { Outlet } from "react-router-dom";

import { type UserData } from "../../../types";

export function MainWrapper({
  context,
}: {
  context: {
    user: UserData;
  };
}) {
  return (
    <main className="flex-col w100">
      <Outlet context={context} />
    </main>
  );
}
