import { useState, useRef, useContext } from "react";
import { socket } from "../functions/socketClient";
import { useOutletContext } from "react-router-dom";
import { ChannelContext } from "../components/unique/channel-view/ChannelContext";
import { type User } from "../types";

export function useIsTyping(): {
  startTyping: () => void;
  stopTyping: () => void;
} {
  const { id } = useContext(ChannelContext);
  const { user } = useOutletContext<{ user: User }>();

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const timerRef: { current: ReturnType<typeof setInterval> | null } =
    useRef(null);

  function startTyping(): void {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("you started typing", id, user._id);
    }
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(stopTyping, 2000);
  }

  function stopTyping(): void {
    setIsTyping(false);
    socket.emit("you stopped typing", id, user._id);
  }

  return { startTyping, stopTyping };
}
