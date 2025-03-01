import { FormEvent } from "react";
import { Tooltip } from "react-tooltip";
import { Loop, Close } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";

export function UnpinMessageButton({
  channelId,
  messageId,
  unpinSuccess,
  clearSuccess,
}: {
  channelId: string;
  messageId: string;
  unpinSuccess: () => void;
  clearSuccess: () => void;
}) {
  const { loading, error, inputErrors, handleSubmit } = useForm(
    {
      endpoint: `/channel/${channelId}/message/${messageId}/pin`,
      method: "PUT",
    },
    () => {
      unpinSuccess();
    }
  );

  const onSubmit = (e: FormEvent<Element>) => {
    clearSuccess();
    handleSubmit(e);
  };

  const getError = () => {
    if (error) {
      if (inputErrors && Object.keys(inputErrors).length > 0) {
        return inputErrors[Object.keys(inputErrors)[0]];
      } else return error;
    } else return null;
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
        <button
          type="submit"
          id="pin"
          value="false"
          className="button plain warning"
          {...(getError() && {
            "data-tooltip-content": getError(),
            "data-tooltip-id": `unpinerror_${messageId}`,
            "data-tooltip-place": "bottom",
          })}
        >
          {loading ? <Loop className="spin" /> : <Close />}
          <small>Unpin</small>
        </button>
      </form>

      {getError() && (
        <Tooltip
          id={`unpinerror_${messageId}`}
          defaultIsOpen={!!getError()}
          isOpen={!!getError()}
        />
      )}
    </>
  );
}
