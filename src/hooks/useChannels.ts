import { useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { type Channel } from "../types";
import { useGet } from "./useGet";

type Response = {
  channels: Channel[];
  links: { nextPage: string };
};

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [url, setUrl] = useState<string | null>("/channels");
  const [title, setTitle] = useState<string>("");

  // flag to trigger refetch
  const {
    value: refetch,
    setFalse: setRefetchOff,
    setTrue: setRefetchOn,
  } = useBoolean(false);

  const { loading, error, data, get } = useGet<Response>(url as string);

  useEffect(() => {
    setChannels([]);
    setUrl(title === "" ? "/channels" : `/channels?title=${title}`);
    setRefetchOn();
  }, [title]);

  useEffect(() => {
    if (refetch === true) get();
  }, [refetch]);

  useEffect(() => {
    if (
      data &&
      // first run
      ((channels.length === 0 && data.channels.length > 0) ||
        // subsequent runs
        refetch === true)
    ) {
      setChannels([...channels, ...data.channels]);
      setUrl(data.links.nextPage);
      setRefetchOff();
    }
  }, [data]);

  return {
    channels,
    url, // to check to determine whether a "load more" button is needed
    title, // to check to determine whether client is performing search
    setTitle, // to allow another component to trigger a search by changing title
    setRefetchOn, // to trigger loadmore
    loading,
    error,
  };
}
