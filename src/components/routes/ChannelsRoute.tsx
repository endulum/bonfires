import { useDocumentTitle } from "usehooks-ts";
import { Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";

import Camp from "../../assets/icons/camp.svg?react";

export function ChannelsRoute() {
  useDocumentTitle(`Your Camps :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jcspb">
        <h2>Your Camps</h2>
        <Link to="#" type="button" className="button neutral solid">
          <SvgIcon component={Camp} />
          <span>New Camp</span>
        </Link>
      </div>
    </>
  );
}
