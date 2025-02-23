import { useState, useEffect, useRef } from "react";

import { doFetch } from "../functions/doFetch";
import { getStoredToken } from "../functions/tokenUtils";

export function useGet<T>(endpoint: string): {
  loading: boolean;
  error: string | null;
  data: T | null;
  get: (keepCurrentData?: boolean) => Promise<void>;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const fetching = useRef<boolean>(false);

  async function get(keepCurrentData?: boolean) {
    if (!keepCurrentData) {
      if (!loading) setLoading(true);
      if (error) setError(null);
      if (data) setData(null);
    }

    const token = getStoredToken();
    const fetchResult = await doFetch<T>(endpoint, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // toggle on and off
    const simulateLoading = false;
    if (simulateLoading)
      setTimeout(() => {
        setLoading(false);
        if (fetchResult.status === 200) setData(fetchResult.data);
        else setError(fetchResult.error);
      }, 750);
    else {
      setLoading(false);
      if (fetchResult.status === 200) setData(fetchResult.data);
      else setError(fetchResult.error);
    }
  }

  useEffect(() => {
    if (fetching.current === false) {
      fetching.current = true;
      get();
    }
  }, []);

  return { loading, error, data, get };
}
