import { Outlet, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

import { type User } from "../../types";
import { clearStoredToken } from "../../functions/tokenUtils";

export function IndexWrapper({
  context,
}: {
  context: {
    user: User | null;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  };
}) {
  const navigate = useNavigate();

  const logOut = () => {
    clearStoredToken();
    context.initUser();
    navigate("/");
  };

  return (
    <>
      <header className="w100">owo</header>
      <main className="w100">
        <button
          type="button"
          className="button neutral outlined"
          onClick={logOut}
        >
          <Logout />
          <span>Log out</span>
        </button>
        <Outlet context={context} />
      </main>
    </>
  );
}
