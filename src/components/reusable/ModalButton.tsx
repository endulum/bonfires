import { useRef, cloneElement } from "react";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import Modal from "react-modal";
import { Close } from "@mui/icons-material";

export function ModalButton({
  buttonElement,
  modalElement,
  modalTitle,
}: {
  buttonElement: React.ReactElement;
  modalElement: React.ReactElement;
  modalTitle: string;
}) {
  const ref = useRef(null);
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean();

  const handleClickOutside = () => {
    close();
  };

  useOnClickOutside(ref, handleClickOutside);

  const modalButton = cloneElement(buttonElement, {
    onClick: (e: InputEvent) => {
      // todo: wrong type
      buttonElement.props.onClick?.(e); // call the original onClick if it exists
      open();
    },
  });

  return (
    <>
      {modalButton}
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        closeTimeoutMS={250}
        style={{
          overlay: {
            backgroundColor: "oklch(from var(--bg2) l c h / 0.5)",
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            overflow: "auto",
          },
          content: {
            position: "relative",
            width: "100%",
            maxWidth: "500px",
            inset: "0px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            height: "min-content",
          },
        }}
      >
        <div className="flex-row jcspb mb-1">
          <h2>{modalTitle}</h2>
          <button
            type="button"
            className="button neutral plain"
            onClick={close}
          >
            <Close />
          </button>
        </div>
        {modalElement}
      </Modal>
    </>
  );
}
