import { Outlet } from 'react-router-dom'

export default function AuthWrapper (): JSX.Element {
  return (
    <main className="auth">
      <h1>Bonfires</h1>
      <div className="auth-body">
        <div className="auth-body-inner">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
