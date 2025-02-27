import { useState } from "react";

import { socket } from "../functions/socketClient";
import { type User } from "../types";

export function useActiveUsers() {
  const [activeUsers, setActiveUsers] = useState<
    Array<{
      user: User;
      isTyping: boolean;
    }>
  >([]);

  socket.on("activity update", async (users: User[] | null) => {
    if (users) setActiveUsers(users.map((u) => ({ user: u, isTyping: false })));
    else setActiveUsers([]);
  });

  socket.on("someone started typing", async (userId: string) => {
    setActiveUsers(
      activeUsers.map((u) => {
        if (u.user._id === userId) return { ...u, isTyping: true };
        return u;
      })
    );
  });

  socket.on("someone stopped typing", async (userId: string) => {
    setActiveUsers(
      activeUsers.map((u) => {
        if (u.user._id === userId) return { ...u, isTyping: false };
        return u;
      })
    );
  });

  return activeUsers;
}
