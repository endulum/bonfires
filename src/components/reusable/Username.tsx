import { Link } from "react-router-dom";
import { Shield, LocalPolice, Mode } from "@mui/icons-material";

import { type User } from "../../types";

export function Username({
  user,
  role,
  isOP,
}: {
  user: User;
  role: "mod" | "admin" | null;
  isOP: boolean;
}) {
  const title =
    role === "mod"
      ? "This user is a moderator of this community."
      : role === "admin"
      ? "This user is the admin of this community."
      : undefined;
  return (
    <Link
      className={`username${role ? ` ${role}` : ""}`}
      to={`/user/${user.username}`}
      title={
        isOP
          ? title
            ? title.slice(0, -1).concat(", and the author of this post.")
            : "This user is the author of this post."
          : undefined
      }
    >
      {role === "mod" && <Shield />}
      {role === "admin" && <LocalPolice />} <span>{user.username}</span>{" "}
      {isOP && <Mode />}
    </Link>
  );
}
