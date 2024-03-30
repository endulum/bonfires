import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { type IUserData } from '../types.ts'

export default function IndexRouter ({ userData }: {
  userData: IUserData
}): JSX.Element {
  useEffect(() => {
    console.log('rendered')
  })

  return (
    <Routes>
      <Route element={<IndexWrapper userData={userData} />}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Nothing found at this URL.</p>} />
      </Route>
    </Routes>
  )
}

function IndexWrapper ({ userData }: {
  userData: IUserData
}): JSX.Element {
  return (
    <div style={{ border: '1px solid blue' }}>
      <Outlet context={userData} />
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
