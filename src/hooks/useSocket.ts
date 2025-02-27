import { useEffect, useRef } from "react";

import { User } from "../types";
import { socket } from "../functions/socketClient";

export function useSocket(channel: { _id: string; title: string }, user: User) {
  const timerRef: { current: ReturnType<typeof setInterval> | null } =
    useRef(null);

  const disconnect = () => {
    window.removeEventListener("beforeunload", disconnect);
    socket.emit(
      "leave channel",
      { _id: channel._id, title: channel.title },
      { _id: user._id, username: user.username }
    );
  };

  const connect = () => {
    window.addEventListener("beforeunload", disconnect);
    socket.emit(
      "view channel",
      { _id: channel._id, title: channel.title },
      { _id: user._id, username: user.username }
    );
    timerRef.current = null;
  };

  useEffect(() => {
    timerRef.current = setTimeout(connect, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      else disconnect();
    };
  }, []);
}
