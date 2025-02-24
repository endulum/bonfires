import { useContext } from "react";

import { ChannelContext } from "../channel-view/ChannelContext";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { useMessages } from "../../../hooks/useMessages";
import { Messages } from "./Messages";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";
import { StartOfChannel } from "./Dividers";
import { MessageCompose } from "./MessageCompose";

export function MessageView() {
  const { id } = useContext(ChannelContext);
  const { state, error, events, loadMore, canLoadMore } = useMessages(id);

  return (
    <>
      <hr />
      {events.length === 0 &&
        (state.ready ? (
          <NoResultsSpacer>
            <p>It's quiet here. Send a message?</p>
          </NoResultsSpacer>
        ) : (
          <LoadingSpacer
            loading={!state.ready}
            error={error}
            customLoadingText="Gathering messages..."
          />
        ))}

      {events.length > 0 && (
        <Messages events={events}>
          {canLoadMore() ? (
            <button
              type="button"
              className="button neutral plain mt-1"
              onClick={loadMore}
              style={{ alignSelf: "center" }}
              disabled={!state.ready}
            >
              <span>{!state.ready ? "Loading..." : "Load more"}</span>
            </button>
          ) : (
            <StartOfChannel />
          )}
        </Messages>
      )}

      <MessageCompose />
    </>
  );
}
