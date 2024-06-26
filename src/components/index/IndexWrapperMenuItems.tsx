import { type NavigateFunction } from 'react-router-dom'
import APIForm from '../APIForm.tsx'
import { type IUserData, type MenuItems } from '../../types.ts'
import Logo from '../Logo.tsx'
import RepoLink from '../RepoLink.tsx'

import GearSvg from '../../assets/icons/gear-solid.svg?react'
import QuestionSvg from '../../assets/icons/circle-question-solid.svg?react'
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
            url: `/user/${userData.username}`,
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
      title: 'About Bonfires',
      icon: (<QuestionSvg />),
      element: (
        <>
          <div className="about-center">
            <Logo />
            <RepoLink />
          </div>
          <p className="text-paragraph">
            <b>Bonfires</b>
            {' '}
            is a simple web app allowing users to communicate with one another through camps.
          </p>
          <p className="text-paragraph">
            A
            {' '}
            <b>camp,</b>
            {' '}
            or channel, is a space where users send messages.
            {' '}
            These messages can be seen by all members of the camp, but nobody else outside of it.
          </p>
          <p className="text-paragraph">
            Each camp has a
            {' '}
            <b>firestarter</b>
            , or an admin, who has special powers over the camp.
            {' '}
            Whoever started the camp is automatically its firestarter.
            {' '}
            The firestarter can pass their role to another user, to promote them to admin.
          </p>
        </>
      )
    }, {
      title: 'Log Out',
      icon: (<LogoutSvg />),
      function: logOut
    }
  ]
}
