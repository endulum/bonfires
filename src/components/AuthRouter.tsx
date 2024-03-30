import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

export default function AuthRouter (): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="/login" element={<p>log in</p>} />
        <Route path="/signup" element={<p>sign up</p>} />
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
