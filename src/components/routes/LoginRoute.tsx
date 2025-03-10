import { useDocumentTitle } from "usehooks-ts";
import { Link } from "react-router-dom";

import { LoginForm } from "../forms/LoginForm";
import { GitHubAlert } from "../unique/etc/GitHubAlert";

export function LoginRoute() {
  useDocumentTitle(`Log In :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2 className="mb-05 tac">Log In</h2>
      <p className="mb-1 tac">
        New to {import.meta.env.VITE_APP_NAME}?{" "}
        <Link to="/signup">Sign up.</Link>
      </p>
      <GitHubAlert />
      <LoginForm />
    </>
  );
}
