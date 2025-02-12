import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import * as routes from "./components/routes/_index";
import { LoadingSpacer } from "./components/reusable/LoadingSpacer";
import { useUser } from "./hooks/useUser";
import { useLogger } from "./hooks/useLogger";
import { setStoredTheme } from "./functions/themeUtils";

export function App() {
  const { loading, error, user, initUser, changeUsername } = useUser();

  useLogger({ loading, error, user });

  useEffect(() => {
    setStoredTheme();
  }, []);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Starting up..."
      />
    );

  return (
    <Routes>
      {user ? (
        <Route
          element={
            <routes.IndexWrapper context={{ user, initUser, changeUsername }} />
          }
        >
          <Route path="/" element={<routes.IndexRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <Route element={<routes.AuthWrapper context={{ initUser }} />}>
          <Route path="/login" element={<routes.LoginRoute />} />
          <Route path="/signup" element={<routes.SignupRoute />} />
          <Route
            path="/github"
            element={<routes.GitHubRoute initUser={initUser} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      )}
    </Routes>
  );
}
