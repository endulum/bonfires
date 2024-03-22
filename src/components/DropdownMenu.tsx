import { useState } from 'react'
import Modal from 'react-modal'

export default function DropdownMenu ({ menuItems }: {
  menuItems: Array<{ title: string, element: JSX.Element }>
}): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<string>('')

  function toggleOpen (): void { setDropdownOpen(!dropdownOpen) }

  return (
    <div className="dropdown-menu-wrapper">
      <button onClick={toggleOpen} type="button">Settings</button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.title}
              onClick={() => {
                setDropdownOpen(false)
                setModalOpen(item.title)
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
      {menuItems.map((item) => (
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
      ))}
    </div>
  )
}
