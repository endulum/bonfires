import { useEffect, useState } from "react";
import { ChannelData } from "../types";
import { useGet } from "./useGet";

export function useChannel(id: string) {
  const [channel, setChannel] = useState<ChannelData | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const { error, data } = useGet<ChannelData>(`/channel/${id}`);

  const updateTitle = (newTitle: string) => {
    if (channel) setChannel({ ...channel, title: newTitle });
  };

  useEffect(() => {
    if (!error && data) {
      setChannel(data);
      setReady(true);
    }
  });

  return {
    ready,
    error,
    channel,
    // form-triggered actions
    updateTitle,
  };
}
