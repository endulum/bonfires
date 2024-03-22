import { useState } from 'react'
import Modal from 'react-modal'

export default function DropdownMenu ({ menuItems, children }: {
  menuItems: Array<{ title: string, element?: JSX.Element, function?: () => void }>
  children: JSX.Element[] | JSX.Element
}): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<string>('')

  function toggleOpen (): void { setDropdownOpen(!dropdownOpen) }

  return (
    <div className="dropdown-menu-wrapper">
      <button type="button" onClick={toggleOpen}>
        {children}
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item) => (
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
              {item.title}
            </button>
          ))}
        </div>
      )}
      {menuItems.map((item) => (
        (item.element !== undefined && (
        <Modal
          className="modal-content edit-form"
          overlayClassName="modal-overlay"
          contentLabel={item.title}
          isOpen={modalOpen === item.title}
          key={item.title}
        >
          {item.element}
          <button type="button" onClick={() => { setModalOpen('') }}>
            Close
          </button>
        </Modal>
        ))
      ))}
    </div>
  )
}
