import { Routes, Route, Navigate } from 'react-router-dom'
import IndexWrapper from './IndexWrapper.tsx'
import { type IUserData } from '../../types.ts'

import Channels from '../channels/Channels.tsx'

export default function IndexRouter ({ userData, logOut }: {
  userData: IUserData
  logOut: () => void
}): JSX.Element {
  return (
    <Routes>
      <Route element={<IndexWrapper userData={userData} logOut={logOut} />}>
        <Route path="/" element={<Channels />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Nothing found at this URL.</p>} />
      </Route>
    </Routes>
  )
}