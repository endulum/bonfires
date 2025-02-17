import { useParams } from "react-router-dom";

import { useGet } from "../../hooks/useGet";
import { ChannelData } from "../../types";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { ChannelHeader } from "../unique/channel-view/ChannelHeader";

export function ChannelRoute() {
  const { camp } = useParams();

  const { loading, error, data } = useGet<ChannelData>(`/channel/${camp}`);

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
        <ChannelHeader channel={data} />
        <div
          className="messages flg"
          style={{ borderTop: "1px solid var(--border)" }}
        ></div>
      </>
    );
}
