import { Outlet } from 'react-router-dom'
import Logo from './Logo.tsx'

export default function AuthWrapper (): JSX.Element {
  return (
    <main className="auth-wrapper">
      <Logo />
      <div className="auth-form-outer">
        <Outlet />
      </div>
    </main>
  )
}
