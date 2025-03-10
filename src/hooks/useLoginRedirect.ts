import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { type User } from "../types";

export function useLoginRedirect() {
  const { user } = useOutletContext<{ user: User }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user)
      navigate("/login", {
        state: { redirect: true },
      });
  }, []);
}
