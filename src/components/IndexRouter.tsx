import { Routes, Route, Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { type IUserData } from '../types.ts'

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
    <div style={{ border: '1px solid blue' }}>
      <Outlet context={userData} />
      <button type="button" onClick={logOut}>Log Out</button>
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
