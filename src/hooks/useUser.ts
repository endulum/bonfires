import { useEffect, useState, useRef } from "react";

import { getStoredToken, clearStoredToken } from "../functions/tokenUtils";
import { doFetch } from "../functions/doFetch";
import { type User } from "../types";

export function useUser(): {
  loading: boolean;
  error: string | null;
  user: User | null;
  initUser: () => Promise<void>;
  changeUsername: (username: string) => void;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const fetching = useRef<boolean>(false);

  async function initUser() {
    if (user) setUser(null);
    if (error) setError(null);

    const token = getStoredToken();
    if (!token) {
      if (loading) setLoading(false);
      fetching.current = false;
      return;
    }

    if (!loading) setLoading(true);

    const fetchResult = await doFetch<User>("/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (fetchResult.error !== null) {
      if (![401, 403, 404].includes(fetchResult.status))
        setError(fetchResult.error);
      else {
        clearStoredToken();
      }
    } else setUser(fetchResult.data);

    setLoading(false);
    fetching.current = false;
  }

  function changeUsername(username: string) {
    if (user) setUser({ ...user, username });
  }

  useEffect(() => {
    if (fetching.current === false) {
      fetching.current = true;
      initUser();
    }
  }, []);

  return {
    loading,
    error,
    user,
    initUser,
    changeUsername,
  };
}
