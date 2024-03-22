import { Link, useLocation } from 'react-router-dom'
import APIForm from '../components/APIForm.tsx'

export default function Login ({ setToken }: {
  setToken: (t?: string | null) => void
}): JSX.Element {
  function handleSuccess (data: { token: string }): void {
    setToken(data.token)
  }

  const { state } = useLocation()

  return (
    <div className="auth-form">
      <h2>Log In</h2>
      <APIForm
        endpoint={{ url: 'http://localhost:3000/login', method: 'POST' }}
        onSuccess={handleSuccess}
      >
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" id="username" defaultValue={state?.username} />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input type="password" id="password" />
        </label>
        <button type="submit">Submit</button>
      </APIForm>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}
