import { useEffect, useState } from "react";

import { ChannelEvent, MessageData } from "../types";
import { useGet } from "./useGet";

type Response = {
  messages: MessageData[];
  events: ChannelEvent[];
  links: { nextPage: string | null };
};

export function useMessages(channelId: string) {
  const [events, setEvents] = useState<Array<ChannelEvent | MessageData>>([]);
  const [url, setUrl] = useState<string | null>(
    `/channel/${channelId}/messages`
  );
  const [state, setState] = useState<{
    ready: boolean;
    triggerFetch: boolean;
  }>({
    ready: false,
    triggerFetch: false,
  });

  const { error, data, get } = useGet<Response>(url as string);

  useEffect(() => {
    if (state.triggerFetch === true) get();
  }, [state]);

  useEffect(() => {
    if (
      !error &&
      data &&
      (events.length === 0 || state.triggerFetch === true)
    ) {
      setEvents([
        ...[...data.events, ...data.messages].sort(
          (a: { timestamp: string }, b: { timestamp: string }) =>
            Date.parse(a.timestamp) - Date.parse(b.timestamp)
        ),
        ...events,
      ]);
      setUrl(data.links.nextPage);
      setState({ ...state, ready: true, triggerFetch: false });
    }
  }, [data]);

  const loadMore = () => {
    if (url) setState({ ...state, ready: false, triggerFetch: true });
  };

  const canLoadMore = () => url !== null;

  return {
    events,
    error,
    state,
    loadMore,
    canLoadMore,
  };
}
