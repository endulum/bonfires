import { useContext, useEffect, useRef } from "react";

import { ChannelContext } from "../channel-view/ChannelContext";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { useMessages } from "../../../hooks/useMessages";
import { Messages } from "./Messages";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";
import { StartOfChannel } from "./Dividers";
import { MessageCompose } from "./MessageCompose";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../types";
import { useSocket } from "../../../hooks/useSocket";

export function MessageView() {
  const { id, title } = useContext(ChannelContext);
  const { user } = useOutletContext<{ user: User }>();

  const endOfChannel = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (endOfChannel.current) endOfChannel.current.scrollIntoView();
  };
  const scrollToMessage = (id: string) => {
    const message = document.getElementById(id);
    if (message) message.scrollIntoView();
  };

  const { state, error, events, loadMore, canLoadMore } = useMessages(id);

  useSocket({ _id: id, title }, user);

  useEffect(() => {
    if (state.scrollToMessage) scrollToMessage(state.scrollToMessage);
    else scrollToBottom();
  }, [events]);

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
        <>
          <Messages
            events={events}
            loadmore={
              canLoadMore() ? (
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
              )
            }
            bottom={<div ref={endOfChannel} />}
          ></Messages>
        </>
      )}

      <MessageCompose />
    </>
  );
}
