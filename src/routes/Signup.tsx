import { useState } from 'react'
import { Link } from 'react-router-dom'
import APIForm from '../components/APIForm.tsx'

export default function Signup (): JSX.Element {
  const [newUserName, setNewUserName] = useState<string | null>('')

  function handleSuccess (_data: any, form: { username: string }): void {
    setNewUserName(form.username)
  }

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <APIForm
        endpoint={{ url: 'http://localhost:3000/signup', method: 'POST' }}
        onSuccess={handleSuccess}
      >
        {newUserName !== ''
          ? (
            <p className="auth-success">
              Account created. Please
              {' '}
              <Link to="/login" state={{ username: newUserName }}>
                log in
              </Link>
              {' '}
              to your new account.
            </p>
            )
          : <p style={{ display: 'none' }} />}
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" id="username" />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input type="password" id="password" />
        </label>
        <label htmlFor="confirmPassword">
          <span>Confirm Password</span>
          <input type="password" id="confirmPassword" />
        </label>
        <button type="submit">Submit</button>
      </APIForm>
      <Link to="/login">Log in</Link>
    </div>
  )
}
