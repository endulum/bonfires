import { useContext, useEffect, useRef } from "react";
import { useBoolean } from "usehooks-ts";
import { Tooltip } from "react-tooltip";
import { Loop, Check, Close, Edit } from "@mui/icons-material";

import { useTextTruncate } from "../../../hooks/useTextTruncate";
import { ChannelContext } from "./ChannelContext";
import { useForm } from "../../../hooks/useForm";

export function ChannelTitle() {
  const {
    value: isEditing,
    setFalse: turnOffEditing,
    toggle: toggleEditing,
  } = useBoolean(false);

  const { id, title, updateTitle } = useContext(ChannelContext);
  const { truncate } = useTextTruncate({});

  const { loading, error, inputErrors, handleSubmit } = useForm(
    {
      endpoint: `/channel/${id}`,
      method: "PUT",
    },
    (submissionData) => {
      updateTitle(submissionData.title);
      turnOffEditing();
    }
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const getError = () => {
    if (error) {
      if (inputErrors && Object.keys(inputErrors).length > 0) {
        return inputErrors[Object.keys(inputErrors)[0]];
      } else return error;
    } else return null;
  };

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-row g-05">
          <label htmlFor="title" className="visually-hidden">
            Camp Title
          </label>
          <input
            type="text"
            id="title"
            defaultValue={title}
            {...(getError() && {
              style: { border: `1px solid var(--warning)` },
              "data-tooltip-content": getError(),
              "data-tooltip-id": "channel-title-error",
              "data-tooltip-place": "bottom",
            })}
            ref={inputRef}
          />
          <button
            type="submit"
            className="button neutral plain"
            data-tooltip-id="channel-title-submit"
            data-tooltip-place="bottom"
            data-tooltip-content="Save camp name"
            disabled={loading}
          >
            {loading ? <Loop className="spin" /> : <Check />}
          </button>
          {getError() && (
            <Tooltip
              id="channel-title-error"
              defaultIsOpen={!!getError()}
              isOpen={!!getError()}
            />
          )}
          <Tooltip id="channel-title-submit" />
        </form>
      ) : (
        <h2>{truncate(title)}</h2>
      )}
      <button
        type="button"
        onClick={toggleEditing}
        className={`button ${isEditing ? "warning" : "neutral"} plain`}
        data-tooltip-id="channel-title-toggle"
        data-tooltip-place="bottom"
        data-tooltip-content={isEditing ? "Cancel editing" : "Edit camp name"}
      >
        {isEditing ? <Close /> : <Edit />}
      </button>
      <Tooltip id="channel-title-toggle" />
    </>
  );
}
