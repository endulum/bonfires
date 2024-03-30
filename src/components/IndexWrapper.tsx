import { Outlet } from 'react-router-dom'
import { type IUserData } from '../types.ts'

import UserGearSvg from '../assets/icons/user-gear-solid.svg?react'

export default function IndexWrapper ({ userData, logOut }: {
  userData: IUserData
  logOut: () => void
}): JSX.Element {
  return (
    <>
      <header>
        <h1>Bonfires</h1>
        <button type="button" className="button" aria-label="User Settings">
          <UserGearSvg className="button-svg" />
          {userData.username}
        </button>
      </header>
      <main>
        <Outlet context={userData} />
      </main>
    </>
  )
}
