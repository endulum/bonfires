import { useDocumentTitle } from "usehooks-ts";
import { Link } from "react-router-dom";

import { LoginForm } from "../forms/LoginForm";

export function LoginRoute() {
  useDocumentTitle(`Log In :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2 className="mb-05 tac">Log In</h2>
      <p className="mb-1 tac">
        New to Bonfires? <Link to="/signup">Sign up.</Link>
      </p>
      <LoginForm />
    </>
  );
}
