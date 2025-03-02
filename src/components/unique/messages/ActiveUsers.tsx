import { Tooltip } from "react-tooltip";
import { MoreHoriz } from "@mui/icons-material";

import { useActiveUsers } from "../../../hooks/useActiveUsers";
import { useOutletContext } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { ChannelContext } from "../channel-view/ChannelContext";

export function ActiveUsers() {
  const { user: you } = useOutletContext<{ user: { _id: string } }>();
  const { getSettingsForUser } = useContext(ChannelContext);
  const activeUsers = useActiveUsers();

  return (
    <div className="activeroll flex-row align-start w100 g-25">
      {activeUsers
        .filter((u) => u.user._id !== you._id)
        .map((u) => {
          const user = getSettingsForUser(u.user);
          return (
            <Fragment key={u.user._id}>
              <div
                className="activeroll-user flex-row"
                data-tooltip-id={`active_${u.user._id}`}
                data-tooltip-content={`${user.name} is ${
                  u.isTyping ? "typing" : "active"
                }`}
                data-tooltip-place="top-start"
              >
                <img
                  className="avatar small"
                  src={`${import.meta.env.VITE_API_URL}/user/${
                    u.user._id
                  }/avatar`}
                  alt={`Avatar of user ${user.name}`}
                />
                {u.isTyping && <MoreHoriz className="blink" />}
              </div>
              <Tooltip id={`active_${u.user._id}`} />
            </Fragment>
          );
        })}
    </div>
  );
}
