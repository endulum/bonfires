import { ColorLens } from "@mui/icons-material";

import { ModalButton } from "../../reusable/ModalButton";
import { PersonalizeAppearanceForm } from "../../forms/PersonalizeAppearanceForm";

export function ChannelSettings() {
  return (
    <ModalButton
      buttonElement={
        <button type="button" className="button neutral plain">
          <ColorLens />
          <span>Personalize appearance</span>
        </button>
      }
      modalElement={<PersonalizeAppearanceForm />}
      modalTitle="Personalize appearance"
    />
  );
}
