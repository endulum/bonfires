import { useEffect, useState } from "react";

import { ChannelEvent, MessageData } from "../types";
import { useGet } from "./useGet";
import { socket } from "../functions/socketClient";

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
    scrollToMessage: null | string;
  }>({
    ready: false,
    triggerFetch: false,
    scrollToMessage: null,
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
      const dataEvents = [...data.events, ...data.messages];
      setEvents([
        ...dataEvents.sort(
          (a: { timestamp: string }, b: { timestamp: string }) =>
            Date.parse(a.timestamp) - Date.parse(b.timestamp)
        ),
        ...events,
      ]);
      setUrl(data.links.nextPage);
      setState({
        ready: true,
        triggerFetch: false,
        scrollToMessage:
          dataEvents.length > 0 ? dataEvents[dataEvents.length - 1]._id : null,
      });
    }
  }, [data]);

  const loadMore = () => {
    if (url) setState({ ...state, ready: false, triggerFetch: true });
  };

  const canLoadMore = () => url !== null;

  socket.on("new event", (data: MessageData | ChannelEvent | null) => {
    if (data) {
      setEvents([...events, data]);
      setState({ ...state, scrollToMessage: null });
    }
  });

  socket.on("message edit", (data: MessageData) => {
    setEvents(
      events.map((e) => {
        if (e._id === data._id) return data;
        return e;
      })
    );
  });

  return {
    events,
    error,
    state,
    loadMore,
    canLoadMore,
  };
}
