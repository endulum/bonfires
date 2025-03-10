import { Link, useOutletContext } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import { ChannelAvatar } from "./ChannelAvatar";
import { ChannelTitle } from "./ChannelTitle";
import { ChannelUsers } from "./ChannelUsers";
import { ChannelSettings } from "./ChannelSettings";
import { ChannelLeave } from "./ChannelLeave";
import { useContext } from "react";
import { User } from "../../../types";
import { ChannelContext } from "./ChannelContext";
import { ChannelDelete } from "./ChannelDelete";
import { PinnedMessages } from "../messages/PinnedMessages";

export function ChannelHeader() {
  const { user } = useOutletContext<{ user: User }>();
  const { owner_id } = useContext(ChannelContext);
  return (
    <div className="channel-header flex-row jcspb mb-05">
      <div className="flex-row g-05">
        {/* go back to index */}
        <Link to="/camps" type="button" className="button neutral plain">
          <ArrowBack />
        </Link>

        {/* avatar */}
        <ChannelAvatar />

        {/* title */}
        <ChannelTitle />
      </div>

      {/* menu */}
      <FlyoutMenu x="left" y="bottom">
        <ChannelUsers />
        <ChannelSettings />
        <PinnedMessages />
        <ChannelLeave />
        {user._id === owner_id && <ChannelDelete />}
      </FlyoutMenu>
    </div>
  );
}
