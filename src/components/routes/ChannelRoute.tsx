import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { ChannelData } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { ChannelContextProvider } from "../unique/channel-view/ChannelContext";
import { ChannelHeader } from "../unique/channel-view/ChannelHeader";

export function ChannelRoute() {
  const { camp } = useParams();

  const { loading, error, data } = useGet<ChannelData>(`/channel/${camp}`);

  useDocumentTitle(
    `${
      data?.title
        ? `${data.title} :: ${import.meta.env.VITE_APP_NAME}`
        : "Approaching camp..."
    }`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Approaching camp..."
      />
    );

  if (data)
    return (
      <>
        <ChannelContextProvider data={data}>
          <ChannelHeader />
        </ChannelContextProvider>
      </>
    );

  /* const { ready, error, channel } = useChannel(camp as string);

  if (!ready || error)
    

  if (channel)
    return (
      <>
        
      </>
    ); */
}
