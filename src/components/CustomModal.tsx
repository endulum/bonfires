import { useRef } from 'react'
import Modal from 'react-modal'
import useOutsideClick from '../hooks/useOutsideClick.ts'

import XSvg from '../assets/icons/xmark-solid.svg?react'

export default function CustomModal ({
  contentLabel, isOpen, closeModal, children
}: {
  contentLabel: string
  isOpen: boolean
  closeModal: () => void
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
  const modalRef = useRef<null | HTMLDivElement>(null)
  useOutsideClick(modalRef, closeModal)

  return (
    <Modal
      className="modal-content"
      contentRef={(node) => (modalRef.current = node)}
      overlayClassName="modal-overlay"
      contentLabel={contentLabel}
      isOpen={isOpen}
    >
      {children}
      <button type="button" className="button modal-close" onClick={closeModal}>
        <XSvg className="button-svg" />
        <span>Cancel</span>
      </button>
    </Modal>
  )
}
