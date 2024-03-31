import { useState, useRef, cloneElement } from 'react'
import useOutsideClick from '../hooks/useOutsideClick.ts'
import CustomModal from './CustomModal.tsx'
import isNotFalse from '../helpers/isNotFalse.ts'
import { type MenuItems } from '../types.ts'

export default function DropdownMenu ({ menuItems, children }: {
  menuItems: MenuItems
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
            {item.icon !== undefined && cloneElement(item.icon, {
              className: 'dropdown-menu-svg'
            })}
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
