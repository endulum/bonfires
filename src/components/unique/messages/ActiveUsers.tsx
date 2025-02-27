import { Tooltip } from "react-tooltip";

import { useActiveUsers } from "../../../hooks/useActiveUsers";
import { useLogger } from "../../../hooks/useLogger";
import { useOutletContext } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { ChannelContext } from "../channel-view/ChannelContext";

export function ActiveUsers() {
  const { user: you } = useOutletContext<{ user: { _id: string } }>();
  const { getSettingsForUser } = useContext(ChannelContext);
  const activeUsers = useActiveUsers();

  useLogger({ activeUsers });

  return (
    <div className="activeroll flex-row align-start w100 g-05">
      {activeUsers
        .filter((u) => u.user._id !== you._id)
        .map((u) => {
          const user = getSettingsForUser(u.user._id);
          return (
            <Fragment key={u.user._id}>
              <div
                className="activeroll-user flex-row g-25"
                data-tooltip-id={`active_${u.user._id}`}
                data-tooltip-content={`${user.name} is ${
                  u.isTyping ? "typing" : "active"
                }`}
                data-tooltip-place="top-start"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/user/${
                    u.user._id
                  }/avatar`}
                  alt={`Avatar of user ${user.name}`}
                />
                {u.isTyping && <small>is typing...</small>}
              </div>
              <Tooltip id={`active_${u.user._id}`} />
            </Fragment>
          );
        })}
    </div>
  );
}
