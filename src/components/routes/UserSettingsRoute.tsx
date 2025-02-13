import { useDocumentTitle } from "usehooks-ts";

export function UserSettingsRoute({
  changeUsername,
}: {
  changeUsername: (username: string) => void;
}) {
  useDocumentTitle(`Account Settings :: ${import.meta.env.VITE_APP_NAME}`);
  return <p>user settings</p>;
}
