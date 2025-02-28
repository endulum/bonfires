import { useDocumentTitle } from "usehooks-ts";

import { UserSettingsForm } from "../forms/UserSettingsForm";
import { LogOutButton } from "../unique/etc/LogOutButton";

export function UserSettingsRoute() {
  useDocumentTitle(`Account Settings :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jcspb mb-1">
        <h2>Account Settings</h2>
        <LogOutButton />
      </div>
      <div style={{ overflow: "auto" }}>
        <UserSettingsForm />
      </div>
    </>
  );
}
