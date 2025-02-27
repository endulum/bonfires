import { Tooltip } from "react-tooltip";

import { useActiveUsers } from "../../../hooks/useActiveUsers";
import { useLogger } from "../../../hooks/useLogger";
import { useOutletContext } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export function ActiveUsers() {
  const { user } = useOutletContext<{ user: { _id: string } }>();
  const activeUsers = useActiveUsers();

  useLogger({ activeUsers });

  return (
    <div className="activeroll flex-row align-start w100 g-05">
      {activeUsers
        .filter((u) => u.user._id !== user._id)
        .map((u) => (
          <Fragment key={u.user._id}>
            <div
              className="activeroll-user flex-row g-25"
              data-tooltip-id={`active_${u.user._id}`}
              data-tooltip-content={`${u.user.username} is ${
                u.isTyping ? "typing" : "active"
              }`}
              data-tooltip-place="top-start"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/user/${
                  u.user._id
                }/avatar`}
                alt={`Avatar of user ${u.user.username}`}
              />
              {u.isTyping && <small>is typing...</small>}
            </div>
            <Tooltip id={`active_${u.user._id}`} />
          </Fragment>
        ))}
    </div>
  );
}
