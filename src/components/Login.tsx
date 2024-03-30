import { useLocation, Link } from 'react-router-dom'
import APIForm from './APIForm.tsx'

export default function Login ({ logIn }: {
  logIn: (t: string) => void
}): JSX.Element {
  const { state } = useLocation()
  return (
    <APIForm
      endpoint={{ url: 'http://localhost:3000/login', method: 'POST' }}
      onSuccess={(_formData, data: { token: string }) => {
        logIn(data.token)
      }}
    >
      <label htmlFor="username">
        <span className="label-span">Username</span>
        <input type="text" id="username" defaultValue={state?.username} className="label-text-input" />
      </label>
      <label htmlFor="password">
        <span className="label-span">Password</span>
        <input type="password" id="password" className="label-text-input" />
      </label>
      <button type="submit" className="auth-submit">Log In</button>
      <p>
        Don&apos;t have an account?
        {' '}
        <Link to="/signup" className="text-link"><b>Sign up</b></Link>
      </p>
    </APIForm>
  )
}
