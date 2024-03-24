import { Outlet, Link, useNavigate } from 'react-router-dom'
import DropdownMenu from './DropdownMenu.tsx'
import APIForm from './APIForm.tsx'
import { type UserDetail } from '../types.ts'
import Logo from './Logo.tsx'

import PersonSvg from '../icons/user-solid.svg?react'
import LogOutSvg from '../icons/right-from-bracket-solid.svg?react'
import GearsSvg from '../icons/gears-solid.svg?react'

export default function IndexWrapper ({ userData, setToken }: {
  userData: UserDetail
  setToken: (t?: string | null) => void
}): JSX.Element {
  const navigate = useNavigate()

  function logOut (): void {
    setToken(null)
  }

  return (
    <>
      <header>
        <Link to="/"><Logo className="smaller" /></Link>

        <DropdownMenu
          menuItems={[
            {
              title: 'Account Settings',
              icon: (<GearsSvg className="mini" />),
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
                    <span>Username</span>
                    <input type="text" id="username" defaultValue={userData.username} />
                  </label>

                  <h3>Change Password</h3>
                  <label htmlFor="newPassword">
                    <span>New Password</span>
                    <input type="password" id="newPassword" />
                  </label>
                  <label htmlFor="confirmNewPassword">
                    <span>Confirm New Password</span>
                    <input type="password" id="confirmNewPassword" />
                  </label>
                  <label htmlFor="currentPassword">
                    <span>Current Password</span>
                    <input type="password" id="currentPassword" />
                  </label>

                  <button type="submit">Submit</button>
                </APIForm>
              )
            }, {
              title: 'Log Out',
              icon: (<LogOutSvg className="mini" />),
              function: logOut
            }
          ]}
        >
          <PersonSvg />
          <b>
            {userData.username}
          </b>
        </DropdownMenu>
      </header>
      <main>
        <Outlet context={userData} />
      </main>
    </>
  )
}
