import { useNavigate, useOutletContext } from "react-router-dom";
import { Logout } from "@mui/icons-material";

import { clearStoredToken } from "../../functions/tokenUtils";

export function LogOutButton() {
  const { initUser } = useOutletContext<{ initUser: () => void }>();
  const navigate = useNavigate();
  const logOut = () => {
    clearStoredToken();
    initUser();
    navigate("/");
  };
  return (
    <>
      <button type="button" className="button neutral solid" onClick={logOut}>
        <Logout />
        <span>Log Out</span>
      </button>
    </>
  );
}
