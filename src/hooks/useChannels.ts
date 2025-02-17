import { useEffect, useState } from "react";

import { type Channel } from "../types";
import { useGet } from "./useGet";

type Response = {
  channels: Channel[];
  links: { nextPage: string };
};

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [url, setUrl] = useState<string | null>("/channels");

  const [state, setState] = useState<Record<string, boolean>>({
    ready: false,
    isSearching: false,
    trigger: false,
  });

  const { error, data, get } = useGet<Response>(url as string);

  const searchTitle = (title: string) => {
    setChannels([]);
    setUrl(title === "" ? "/channels" : `/channels?title=${title}`);
    setState({
      ...state,
      isSearching: title !== "",
      ready: false,
      trigger: true,
    });
  };

  const loadMore = () => {
    if (url) setState({ ...state, ready: false, trigger: true });
  };

  const canLoadMore = () => url !== null;

  useEffect(() => {
    if (state.trigger === true) get();
  }, [state]);

  useEffect(() => {
    if (
      !error &&
      data &&
      // first run
      ((channels.length === 0 && data.channels.length > 0) ||
        // subsequent runs
        state.trigger === true)
    ) {
      setChannels([...channels, ...data.channels]);
      setUrl(data.links.nextPage);
      setState({ ...state, ready: true, trigger: false });
    }
  }, [data]);

  return {
    channels,
    error,
    state,
    searchTitle,
    loadMore,
    canLoadMore,
  };
}
