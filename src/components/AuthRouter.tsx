import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './Login.tsx'
import Signup from './Signup.tsx'

export default function AuthRouter ({ logIn }: {
  logIn: (t: string) => void
}): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="/login" element={<Login logIn={logIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}

function AuthWrapper (): JSX.Element {
  return (
    <div style={{ border: '1px solid red' }}>
      <Outlet />
    </div>
  )
}
