import { type NavigateFunction } from 'react-router-dom'
import APIForm from '../APIForm.tsx'
import { type IUserData, type MenuItems } from '../../types.ts'
import GearSvg from '../../assets/icons/gear-solid.svg?react'
import LogoutSvg from '../../assets/icons/right-from-bracket-solid.svg?react'

export default function IndexWrapperMenuItems (
  navigate: NavigateFunction,
  userData: IUserData,
  logOut: () => void
): MenuItems {
  return [
    {
      title: 'Account Settings',
      icon: (<GearSvg />),
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

          <button type="submit" className="button">Submit</button>
        </APIForm>
      )
    }, {
      title: 'Log Out',
      icon: (<LogoutSvg />),
      function: logOut
    }
  ]
}
