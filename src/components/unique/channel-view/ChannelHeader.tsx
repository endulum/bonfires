import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import { ChannelAvatar } from "./ChannelAvatar";
import { ChannelTitle } from "./ChannelTitle";

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
        {/* <Modals.UploadChannelAvatar channelId={id} resetAvatar={resetAvatar} />
        <Modals.ChangeChannelTitle
          channelId={id}
          updateTitle={updateTitle}
          defaultTitle={title}
        /> */}
      </FlyoutMenu>
    </div>
  );
}
