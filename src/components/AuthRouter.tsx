import { Routes, Route, Navigate } from 'react-router-dom'
import AuthWrapper from './AuthWrapper.tsx'
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
