import { SvgIcon } from "@mui/material";
import { Tooltip } from "react-tooltip";

import { User } from "../../../types";
import Ghost from "../../../assets/icons/ghost.svg?react";

export function GhostIndicator({ user }: { user: User }) {
  return (
    <>
      <SvgIcon
        className="small"
        component={Ghost}
        data-tooltip-id={`ghost_${user._id}`}
        data-tooltip-content="This user is no longer in this camp."
      />
      <Tooltip id={`ghost_${user._id}`} />
    </>
  );
}
