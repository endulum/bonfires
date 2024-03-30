import { Routes, Route, Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { type IUserData } from '../types.ts'

import LogoutSvg from '../assets/icons/right-from-bracket-solid.svg?react'

export default function IndexRouter ({ userData, logOut }: {
  userData: IUserData
  logOut: () => void
}): JSX.Element {
  return (
    <Routes>
      <Route element={<IndexWrapper userData={userData} logOut={logOut} />}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Nothing found at this URL.</p>} />
      </Route>
    </Routes>
  )
}

function IndexWrapper ({ userData, logOut }: {
  userData: IUserData
  logOut: () => void
}): JSX.Element {
  return (
    <div>
      <Outlet context={userData} />
      <button type="button" className="button" onClick={logOut}>
        <LogoutSvg className="button-svg" />
        <span>Log Out</span>
      </button>
    </div>
  )
}

function Index (): JSX.Element {
  const { id, username } = useOutletContext<IUserData>()
  return (
    <p>
      User is
      {' '}
      <b>{username}</b>
      , id is
      {' '}
      <b>{id}</b>
    </p>
  )
}
