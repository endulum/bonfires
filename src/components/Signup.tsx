import { useState } from 'react'
import { Link } from 'react-router-dom'
import APIForm from './APIForm.tsx'

export default function Signup (): JSX.Element {
  const [newAccUsername, setNewAccUsername] = useState<string | null>(null)
  return (
    <>
      {newAccUsername !== null && (
      <p className="form-info">
        New account successfully created. You may
        {' '}
        <Link to="/login" state={{ username: newAccUsername }}>
          log in
        </Link>
        {' '}
        to your new account.
      </p>
      )}
      <APIForm
        endpoint={{ url: 'http://localhost:3000/signup', method: 'POST' }}
        onSuccess={(formData, _data) => {
          setNewAccUsername(formData.username)
        }}
      >
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
        <button type="submit">Sign Up</button>
      </APIForm>
    </>
  )
}
