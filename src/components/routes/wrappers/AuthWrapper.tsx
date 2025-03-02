import { Outlet } from "react-router-dom";
import { SvgIcon } from "@mui/material";

import Camp from "../../../assets/icons/camp.svg?react";

export function AuthWrapper({
  context,
}: {
  context: {
    initUser: () => Promise<void>;
  };
}) {
  return (
    <>
      <h1 className="logo flex-row mb-1">
        <SvgIcon component={Camp} />
        <span>Bonfires</span>
      </h1>
      <div className="auth">
        <div className="auth-inner p-1">
          <Outlet context={context} />
        </div>
      </div>
    </>
  );
}
