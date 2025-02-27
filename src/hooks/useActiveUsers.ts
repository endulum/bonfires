import { useState } from "react";

import { socket } from "../functions/socketClient";
import { type User } from "../types";

export function useActiveUsers() {
  const [activeUsers, setActiveUsers] = useState<Array<User>>([]);

  socket.on("activity update", async (users: User[] | null) => {
    if (users) setActiveUsers(users);
    else setActiveUsers([]);
  });

  return activeUsers;
}
