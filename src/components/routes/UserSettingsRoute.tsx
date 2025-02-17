import { useDocumentTitle } from "usehooks-ts";

import { LogOutButton } from "../unique/etc/LogOutButton";

export function UserSettingsRoute() {
  useDocumentTitle(`Account Settings :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jcspb">
        <h2>Account Settings</h2>
        <LogOutButton />
      </div>
    </>
  );
}
