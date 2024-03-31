import { useState, useRef } from 'react'
import useOutsideClick from '../hooks/useOutsideClick.ts'
import CustomModal from './CustomModal.tsx'
import isNotFalse from '../helpers/isNotFalse.ts'

export default function DropdownMenu ({ menuItems, children }: {
  menuItems: Array<{
    title: string
    icon?: JSX.Element
    element?: JSX.Element
    function?: () => void
  } | false>
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [whichModalOpen, setWhichModalOpen] = useState<string>('')
  const dropdownRef = useRef<null | HTMLDivElement>(null)

  function toggleDropdown (): void { setDropdownOpen(!dropdownOpen) }
  useOutsideClick(dropdownRef, () => { setDropdownOpen(false) })

  return (
    <>
      <div className="dropdown-wrapper" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          className={`button dropdown-button${dropdownOpen ? ' active' : ''}`}
        >
          {children}
        </button>
        {dropdownOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item) => item !== false && (
          <button
            type="button"
            key={item.title}
            className="dropdown-menu-button"
            onClick={() => {
              if (item.element !== undefined) {
                setWhichModalOpen(item.title)
              }
              if (item.function !== undefined) {
                item.function()
              }
              setDropdownOpen(false)
            }}
          >
            <span className="dropdown-menu-button-text">{item.title}</span>
            {item.icon !== undefined && item.icon}
          </button>
          ))}
        </div>
        )}
      </div>
      {menuItems.filter(isNotFalse).map((item) => (
        (item.element !== undefined && (
        <CustomModal
          contentLabel={item.title}
          isOpen={whichModalOpen === item.title}
          closeModal={() => { setWhichModalOpen('') }}
          key={item.title}
        >
          {item.element}
        </CustomModal>
        ))
      ))}
    </>
  )
}
