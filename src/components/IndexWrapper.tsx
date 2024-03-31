import { Outlet, useNavigate } from 'react-router-dom'
import APIForm from './APIForm.tsx'
import DropdownMenu from './DropdownMenu.tsx'
import { type IUserData } from '../types.ts'

import UserGearSvg from '../assets/icons/user-gear-solid.svg?react'
import GearSvg from '../assets/icons/gear-solid.svg?react'
import LogoutSvg from '../assets/icons/right-from-bracket-solid.svg?react'

export default function IndexWrapper ({ userData, logOut }: {
  userData: IUserData
  logOut: () => void
}): JSX.Element {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <h1>Bonfires</h1>
        <DropdownMenu
          menuItems={[
            {
              title: 'Account Settings',
              icon: (<GearSvg className="dropdown-menu-svg" />),
              element: (
                <APIForm
                  endpoint={{
                    url: `http://localhost:3000/user/${userData.username}`,
                    method: 'PUT'
                  }}
                  onSuccess={() => { navigate(0) }}
                >
                  <h3>Profile Details</h3>
                  <label htmlFor="username">
                    <span className="label-span">Username</span>
                    <input type="text" id="username" defaultValue={userData.username} className="label-text-input" />
                  </label>

                  <h3>Change Password</h3>
                  <label htmlFor="newPassword">
                    <span className="label-span">New Password</span>
                    <input type="password" id="newPassword" className="label-text-input" />
                  </label>
                  <label htmlFor="confirmNewPassword">
                    <span className="label-span">Confirm New Password</span>
                    <input type="password" id="confirmNewPassword" className="label-text-input" />
                  </label>
                  <label htmlFor="currentPassword">
                    <span className="label-span">Current Password</span>
                    <input type="password" id="currentPassword" className="label-text-input" />
                  </label>

                  <button type="submit" className="button">Submit</button>
                </APIForm>

              // todo: having to add those classes is redundant, manage this in APIForm render
              )
            }, {
              title: 'Log Out',
              icon: (<LogoutSvg className="dropdown-menu-svg" />),
              function: logOut
            }
          ]}
        >
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
