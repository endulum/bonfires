import { useContext, useEffect, useRef } from "react";

import { User } from "../types";
import { socket } from "../functions/socketClient";
import { ChannelContext } from "../components/unique/channel-view/ChannelContext";

export function useSocket(channel: { _id: string; title: string }, user: User) {
  const { getYou, getSettingsForUser } = useContext(ChannelContext);

  const timerRef: { current: ReturnType<typeof setInterval> | null } =
    useRef(null);

  const getYourSettings = () => {
    const you = getYou();
    if (!you) return null;
    return getSettingsForUser(you);
  };

  const disconnect = () => {
    const yourSettings = getYourSettings();
    window.removeEventListener("beforeunload", disconnect);
    socket.emit(
      "leave channel",
      { _id: channel._id, title: channel.title },
      {
        _id: user._id,
        username: user.username,
        invisible: yourSettings ? yourSettings.invisible : false,
      }
    );
  };

  const connect = () => {
    const yourSettings = getYourSettings();
    if (!yourSettings) return;
    window.addEventListener("beforeunload", disconnect);
    socket.emit(
      "view channel",
      { _id: channel._id, title: channel.title },
      {
        _id: user._id,
        username: user.username,
        invisible: yourSettings.invisible,
      }
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
