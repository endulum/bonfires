import { useState } from 'react'
import CustomModal from './CustomModal.tsx'

export default function ModalButton ({
  buttonContent, modalContent, modalContentLabel, isInHeaderBar
}: {
  buttonContent: JSX.Element | JSX.Element[]
  modalContent: JSX.Element | JSX.Element[]
  modalContentLabel: string
  isInHeaderBar: boolean
}): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button
        type="button"
        className={`button${isInHeaderBar ? ' header-bar-button' : ''}`}
        onClick={() => { setIsOpen(true) }}
      >
        {buttonContent}
      </button>
      <CustomModal
        contentLabel={modalContentLabel}
        isOpen={isOpen}
        closeModal={() => { setIsOpen(false) }}
      >
        {modalContent}
      </CustomModal>
    </>
  )
}
