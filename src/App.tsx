import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import * as routes from "./components/routes/_index";
import { LoadingSpacer } from "./components/reusable/LoadingSpacer";
import { useUser } from "./hooks/useUser";
import { useLogger } from "./hooks/useLogger";
import { setStoredTheme } from "./functions/themeUtils";

import "./assets/reset.css";
import "./assets/body.css";
import "./assets/utility.css";
import "./assets/main.css";

export function App() {
  const { loading, error, user, initUser, changeUsername } = useUser();

  useLogger({ loading, error, user });

  useEffect(() => {
    setStoredTheme();
  }, []);

  if (loading || error)
    return (
      <main>
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Starting up..."
        />
      </main>
    );

  return (
    <Routes>
      {user ? (
        <Route
          element={
            <routes.IndexWrapper context={{ user, initUser, changeUsername }} />
          }
        >
          {["/login", "/signup", "/"].map((path) => (
            <Route
              key={path}
              path={path}
              element={<Navigate to="/channels" />}
            />
          ))}
          <Route path="/channels" element={<routes.ChannelsRoute />} />
          <Route
            path="/settings"
            element={
              <routes.UserSettingsRoute changeUsername={changeUsername} />
            }
          />
          <Route path="/about" element={<routes.AboutRoute />} />
          <Route path="*" element={<routes.ErrorRoute />} />
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
