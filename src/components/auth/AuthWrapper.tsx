import { Outlet } from 'react-router-dom'
import Logo from '../Logo.tsx'

export default function AuthWrapper (): JSX.Element {
  return (
    <main className="auth">
      <Logo />
      <div className="auth-body">
        <div className="auth-body-inner">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
