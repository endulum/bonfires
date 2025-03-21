import { useContext, useRef, KeyboardEvent } from "react";
import { Send, Loop } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";
import { ChannelContext } from "../channel-view/ChannelContext";
import { MessageData } from "../../../types";
import { Alert } from "../../reusable/Alert";
import { ActiveUsers } from "./ActiveUsers";
import { useIsTyping } from "../../../hooks/useIsTyping";

export function MessageCompose() {
  const form = useRef<HTMLFormElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { id } = useContext(ChannelContext);
  const { loading, error, inputErrors, handleSubmit } = useForm<MessageData>(
    { endpoint: `/channel/${id}/messages`, method: "POST" },
    (_submissionData, _submissionResult) => {
      if (textarea.current) textarea.current.value = "";
    }
  );
  const { startTyping, stopTyping } = useIsTyping();

  const getError = () => {
    if (error) {
      if (inputErrors && Object.keys(inputErrors).length > 0) {
        return inputErrors[Object.keys(inputErrors)[0]];
      } else return error;
    } else return null;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!event.shiftKey && event.code === "Enter") {
      event.preventDefault();
      if (form.current)
        form.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        stopTyping();
        handleSubmit(e);
      }}
      ref={form}
      className="flex-col"
    >
      <hr />
      <ActiveUsers />
      {getError() !== null && (
        <Alert type="warning" className="mb-1">
          <p>{getError()}</p>
        </Alert>
      )}
      <div className="flex-row align-start w100 g-1">
        <textarea
          className="flg"
          placeholder="Say something nice..."
          id="content"
          ref={textarea}
          onKeyDown={handleKeyDown}
          onChange={() => {
            startTyping();
          }}
        />
        <button
          type="submit"
          className="button neutral solid"
          disabled={loading}
        >
          {loading ? <Loop className="spin" /> : <Send />}
        </button>
      </div>
    </form>
  );
}
