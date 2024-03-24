import { useState } from 'react'
import Modal from 'react-modal'

import XSvg from '../icons/xmark-solid.svg?react'

export default function DropdownMenu ({ menuItems, children }: {
  menuItems: Array<false | {
    title: string
    icon?: JSX.Element
    element?: JSX.Element
    function?: () => void
  }>
  children: JSX.Element[] | JSX.Element
}): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<string>('')

  function toggleOpen (): void { setDropdownOpen(!dropdownOpen) }

  return (
    <div className="dropdown-menu-wrapper">
      <button type="button" onClick={toggleOpen} className={dropdownOpen ? 'active' : ''}>
        {children}
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item) => item !== false && (
            <button
              type="button"
              key={item.title}
              onClick={() => {
                if (item.element !== undefined) {
                  setModalOpen(item.title)
                }
                if (item.function !== undefined) {
                  item.function()
                }
                setDropdownOpen(false)
              }}
            >
              <span>
                {item.title}
              </span>
              {item.icon !== undefined && item.icon}
            </button>
          ))}
        </div>
      )}
      {menuItems.filter((item) => item).map((item) => item !== false && (
        (item.element !== undefined && (
        <Modal
          className="modal-content edit-form"
          overlayClassName="modal-overlay"
          contentLabel={item.title}
          isOpen={modalOpen === item.title}
          key={item.title}
        >
          {item.element}
          <button
            aria-label="Close Modal"
            type="button"
            onClick={() => { setModalOpen('') }}
          >
            <XSvg />
            <span>Cancel</span>
          </button>
        </Modal>
        ))
      ))}
    </div>
  )
}
