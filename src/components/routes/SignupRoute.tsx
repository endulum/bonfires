import { useDocumentTitle } from "usehooks-ts";
import { Link } from "react-router-dom";

import { SignupForm } from "../forms/SignupForm";
import { GitHubAlert } from "../unique/etc/GitHubAlert";

export function SignupRoute() {
  useDocumentTitle(`Sign Up :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2 className="mb-05 tac">Sign Up</h2>
      <p className="mb-1 tac">
        Have an account? <Link to="/login">Log in.</Link>
      </p>
      <GitHubAlert />
      <SignupForm />
    </>
  );
}
