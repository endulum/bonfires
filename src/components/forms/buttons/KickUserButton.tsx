import { FormEvent } from "react";
import { Tooltip } from "react-tooltip";
import { PersonOff, Loop } from "@mui/icons-material";

import { User } from "../../../types";
import { useForm } from "../../../hooks/useForm";

export function KickUserButton({
  channelId,
  user,
  kickSuccess,
  clearSuccess,
}: {
  channelId: string;
  user: User;
  kickSuccess: (username: string) => void;
  clearSuccess: () => void;
}) {
  const { loading, error, inputErrors, handleSubmit } = useForm(
    { endpoint: `/channel/${channelId}/kick`, method: "POST" },
    (_submissionData, _submissionResult) => {
      kickSuccess(user.username);
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
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          id="username"
          value={user.username}
          className="button plain warning"
          {...(getError() && {
            "data-tooltip-content": getError(),
            "data-tooltip-id": `kickerror_${user._id}`,
            "data-tooltip-place": "bottom",
          })}
        >
          {loading ? <Loop className="spin" /> : <PersonOff />}
          <small>Kick</small>
        </button>
      </form>

      {getError() && (
        <Tooltip
          id={`kickerror_${user._id}`}
          defaultIsOpen={!!getError()}
          isOpen={!!getError()}
        />
      )}
    </>
  );
}
