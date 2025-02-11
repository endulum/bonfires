import { useContext } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import {
  AddCircle,
  AddCircleOutline,
  Loop,
  WbSunny,
  RemoveCircle,
  RemoveCircleOutline,
} from "@mui/icons-material";

import { type User } from "../../types";
import { useVote } from "../../hooks/useVote";
import { PostContext } from "../unique/post/PostContext";

export function VoteWidget({
  data,
  type,
}: {
  data: {
    id: string;
    author: User;
    _count: { downvotes: number; upvotes: number };
    meta: {
      isVoted: { downvoted: boolean; upvoted: boolean };
    };
  };
  type: "post" | "reply";
}) {
  const { user } = useOutletContext<{ user: User }>();
  const { data: postData, freezing } = useContext(PostContext);

  const { loading, vote, isVoted, score } = useVote({
    endpoint: type === "reply" ? `/reply/${data.id}` : `/post/${data.id}`,
    isVoted: data.meta.isVoted,
    score: { upvotes: data._count.upvotes, downvotes: data._count.downvotes },
    onError: (error: string) => {
      toast(<p>{error}</p>, {
        className: "custom-toast",
        type: "warning",
      });
    },
  });

  const getTitle = (
    voteType: "upvote" | "downvote",
    action: "add" | "remove"
  ) => {
    if (!user) return "You must be logged in to vote on content.";
    if (user.id === data.author.id)
      return "You cannot vote on your own content.";
    if (postData.community.readonly || freezing.frozen)
      return "Voting is disabled on readonly content.";
    if (voteType === "upvote") {
      if (action === "add") {
        return isVoted.upvoted === true
          ? "You gave an upvote."
          : "Add an upvote";
      }
      if (action === "remove") {
        return isVoted.upvoted === false
          ? "You already voted."
          : "Remove your upvote";
      }
    }
    if (voteType === "downvote") {
      if (action === "add") {
        return isVoted.downvoted === true
          ? "You gave a downvote."
          : "Add a downvote";
      }
      if (action === "remove") {
        return isVoted.downvoted === false
          ? "You already voted."
          : "Remove your downvote";
      }
    }
  };

  const getDisabled = (voteType: "upvote" | "downvote") => {
    if (
      !user ||
      user.id === data.author.id ||
      postData.community.readonly ||
      freezing.frozen ||
      (voteType === "upvote" && isVoted.downvoted === true) ||
      (voteType === "downvote" && isVoted.upvoted === true)
    )
      return true;
    return false;
  };

  const handleVote = (
    type: "upvote" | "downvote",
    action: "add" | "remove"
  ) => {
    vote(type, action);
  };

  return (
    <div className="vote-widget flex-row gap-0-25">
      <button
        className="button plain"
        disabled={getDisabled("upvote")}
        title={getTitle(
          "upvote",
          isVoted.upvoted || isVoted.downvoted ? "remove" : "add"
        )}
        onClick={() => {
          handleVote("upvote", isVoted.upvoted ? "remove" : "add");
        }}
      >
        {isVoted.upvoted ? <AddCircle /> : <AddCircleOutline />}
      </button>

      <div
        className="flex-col gap-0-25"
        title={
          loading
            ? "Casting vote..."
            : `${score.upvotes} upvotes, ${score.downvotes} downvotes`
        }
      >
        {loading ? (
          <Loop className="spin" style={{ width: "1.25rem" }} />
        ) : (
          <WbSunny
            style={{
              width: "1.25rem",
              color:
                score.upvotes - score.downvotes > 0
                  ? "var(--accent2)"
                  : "var(--border)",
            }}
          />
        )}
        <small>{score.upvotes - score.downvotes}</small>
      </div>

      <button
        className="button plain"
        disabled={getDisabled("downvote")}
        title={getTitle(
          "downvote",
          isVoted.upvoted || isVoted.downvoted ? "remove" : "add"
        )}
        onClick={() => {
          handleVote("downvote", isVoted.downvoted ? "remove" : "add");
        }}
      >
        {isVoted.downvoted ? <RemoveCircle /> : <RemoveCircleOutline />}
      </button>
    </div>
  );
}
