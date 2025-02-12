import { Outlet } from "react-router-dom";

import { Alert } from "../reusable/Alert";

export function AuthWrapper({
  context,
}: {
  context: {
    initUser: () => Promise<void>;
  };
}) {
  return (
    <div className="auth-main">
      <Alert type="info" className="mb-1">
        <p>
          Have a GitHub account? You can <a href="#">authenticate</a> with it
          here.
        </p>
      </Alert>
      <Outlet context={context} />
    </div>
  );
}
