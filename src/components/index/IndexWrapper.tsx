import { Outlet, useNavigate } from 'react-router-dom'
import DropdownMenu from '../DropdownMenu.tsx'
import IndexWrapperMenuItems from './IndexWrapperMenuItems.tsx'
import { type IUserData } from '../../types.ts'

import UserGearSvg from '../../assets/icons/user-gear-solid.svg?react'

export default function IndexWrapper ({ userData, logOut }: {
  userData: IUserData
  logOut: () => void
}): JSX.Element {
  const navigate = useNavigate()
  return (
    <>
      <header>
        <h1>Bonfires</h1>
        <DropdownMenu menuItems={IndexWrapperMenuItems(navigate, userData, logOut)}>
          <UserGearSvg className="button-svg" />
          <span>{userData.username}</span>
        </DropdownMenu>
      </header>
      <main>
        <Outlet context={userData} />
      </main>
    </>
  )
}
