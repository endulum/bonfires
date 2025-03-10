import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { setStoredToken } from "../../functions/tokenUtils";

export function GitHubRoute() {
  const { initUser } = useOutletContext<{ initUser: () => void }>();
  const location = useLocation();
  const code = location.search.split("=")[1];
  const navigate = useNavigate();

  const { loading, error, data } = useGet<{ token: string }>(
    `/github?code=${code}`
  );

  useEffect(() => {
    if (data && data.token) {
      setStoredToken(data.token);
      initUser();
      navigate("/");
    }
  }, [data]);

  if (loading || error)
    return (
      <div>
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Authenticating with GitHub..."
        />
      </div>
    );
}
