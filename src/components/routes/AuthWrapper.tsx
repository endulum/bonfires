import { Outlet } from "react-router-dom";

export function AuthWrapper({
  context,
}: {
  context: {
    initUser: () => Promise<void>;
  };
}) {
  return (
    <div className="auth-main">
      <Outlet context={context} />
    </div>
  );
}
