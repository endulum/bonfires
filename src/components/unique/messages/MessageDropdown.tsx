import { PushPin, Delete } from "@mui/icons-material";

import { FlyoutMenu } from "../../reusable/FlyoutMenu";

export function MessageDropdown({
  onToggle,
}: {
  onToggle: (opened: boolean) => void;
}) {
  return (
    <div className="message-dropdown">
      <FlyoutMenu x="left" y="bottom" onToggle={onToggle}>
        <button type="button" className="button neutral plain">
          <PushPin />
          <span>Pin message</span>
        </button>
        <button type="button" className="button warning plain">
          <Delete />
          <span>Delete message</span>
        </button>
      </FlyoutMenu>
    </div>
  );
}
