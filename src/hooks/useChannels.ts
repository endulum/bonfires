import { useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { type Channel } from "../types";
import { useGet } from "./useGet";
import { useLogger } from "./useLogger";

type Response = {
  channels: Channel[];
  links: { nextPage: string };
};

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("/channels");
  const {
    value: refetch,
    setFalse: setRefetchOff,
    setTrue: setRefetchOn,
  } = useBoolean(false);

  const { loading, error, data, get } = useGet<Response>(nextPage as string);

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
      setNextPage(data.links.nextPage);
      setRefetchOff();
    }
  }, [data]);

  return {
    channels,
    nextPage, // to show "load more"
    setRefetchOn, // to trigger loading more
    loading,
    error,
  };
}
