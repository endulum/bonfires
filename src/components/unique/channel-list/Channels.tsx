import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";
import { useChannels } from "../../../hooks/useChannels";
import { ChannelList } from "./ChannelList";
import { ChannelListSearch } from "./ChannelListSearch";

export function Channels() {
  const { channels, error, state, searchTitle, loadMore, canLoadMore } =
    useChannels();

  return (
    <>
      {/* search */}
      <ChannelListSearch search={searchTitle} />

      {/* loading or no results */}
      {channels.length === 0 &&
        (state.ready ? (
          <NoResultsSpacer>
            {state.isSearching ? (
              <p>No camps fit your search.</p>
            ) : (
              <p>
                It looks like you aren't in any camps.
                <br />
                It can get dark and cold out here, so why not create one?
              </p>
            )}
          </NoResultsSpacer>
        ) : (
          <LoadingSpacer
            loading={!state.ready}
            error={error}
            customLoadingText={`${
              state.isSearching ? "Searching" : "Finding"
            } your camps...`}
          />
        ))}

      {/* results */}
      {channels.length > 0 && (
        <div className="channels flex-col g-25">
          <ChannelList channels={channels} />
          {/* load more button */}
          {canLoadMore() && (
            <button
              type="button"
              className="button neutral solid mt-1"
              onClick={loadMore}
              style={{ alignSelf: "center" }}
              disabled={!state.ready}
            >
              <span>{!state.ready ? "Loading..." : "Load more"}</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
