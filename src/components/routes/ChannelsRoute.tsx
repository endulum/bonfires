import { useDocumentTitle } from "usehooks-ts";
import { Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";

import Camp from "../../assets/icons/camp.svg?react";
import { Channels } from "../unique/channel-list/Channels";
import { ModalButton } from "../reusable/ModalButton";
import { NewChannel } from "../unique/channel-list/NewChannel";

export function ChannelsRoute() {
  useDocumentTitle(`Your Camps :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jcspb mb-1">
        <h2>Your Camps</h2>
        <ModalButton
          buttonElement={
            <Link to="#" type="button" className="button neutral solid">
              <SvgIcon component={Camp} />
              <span>New Camp</span>
            </Link>
          }
          modalElement={<NewChannel />}
          modalTitle="New camp"
        />
      </div>
      <Channels />
    </>
  );
}
