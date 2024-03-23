import { Outlet, Link, useNavigate } from 'react-router-dom'
import DropdownMenu from './DropdownMenu.tsx'
import APIForm from './APIForm.tsx'
import { type UserDetail } from '../types.ts'

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
        <h1>
          <Link to="/">App</Link>
        </h1>

        <DropdownMenu
          menuItems={[
            {
              title: 'Account Settings',
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
              function: logOut
            }
          ]}
        >
          <span>
            Logged in as
            {' '}
            <b>
              {userData.username}
            </b>
          </span>
        </DropdownMenu>
      </header>
      <main>
        <Outlet context={userData} />
      </main>
    </>
  )
}
