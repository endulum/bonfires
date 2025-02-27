import { Tooltip } from "react-tooltip";

import { useActiveUsers } from "../../../hooks/useActiveUsers";
import { useLogger } from "../../../hooks/useLogger";
import { useOutletContext } from "react-router-dom";

export function ActiveUsers() {
  const { user } = useOutletContext<{ user: { _id: string } }>();
  const activeUsers = useActiveUsers();

  useLogger({ activeUsers });

  return (
    <div className="activeroll flex-row align-start w100 g-05">
      {activeUsers
        .filter((u) => u._id !== user._id)
        .map((u) => (
          <>
            <div
              className="activeroll-user"
              data-tooltip-id={`active_${u._id}`}
              data-tooltip-content={`${u.username} is active`}
              data-tooltip-place="top-start"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/user/${u._id}/avatar`}
                alt={`Avatar of user ${u.username}`}
              />
            </div>
            <Tooltip id={`active_${u._id}`} />
          </>
        ))}
    </div>
  );
}
