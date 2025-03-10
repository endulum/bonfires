import { useEffect, useState } from "react";

import { MessageData } from "../types";
import { useGet } from "./useGet";
import { socket } from "../functions/socketClient";

export function usePinnedMessages(channelId: string) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { loading, error, data } = useGet<{ pinned: MessageData[] }>(
    `/channel/${channelId}/pins`
  );

  useEffect(() => {
    if (data && messages.length === 0) {
      setMessages(data.pinned);
    }
  }, [data]);

  socket.on("message pin", (message: MessageData, pinned: boolean) => {
    if (pinned === true) {
      setMessages([...messages, message]);
    } else {
      setMessages(messages.filter((m) => m._id !== message._id));
    }
  });

  return {
    loading,
    error,
    messages,
  };
}
