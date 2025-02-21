import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import { ChannelAvatar } from "./ChannelAvatar";
import { ChannelTitle } from "./ChannelTitle";
import { ChannelUsers } from "./ChannelUsers";

export function ChannelHeader() {
  return (
    <div className="flex-row jcspb mb-05">
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
      </FlyoutMenu>
    </div>
  );
}
