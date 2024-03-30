import { useState } from 'react'
import { Link } from 'react-router-dom'
import APIForm from './APIForm.tsx'
import InfoParagraph from './InfoParagraph.tsx'

export default function Signup (): JSX.Element {
  const [newAccUsername, setNewAccUsername] = useState<string | null>(null)
  return (
    <>
      {newAccUsername !== null && (
      <InfoParagraph type="success">
        New account successfully created. You may
        {' '}
        <Link to="/login" className="text-link" state={{ username: newAccUsername }}>
          <b>log in</b>
        </Link>
        {' '}
        to your new account.
      </InfoParagraph>
      )}
      <APIForm
        endpoint={{ url: 'http://localhost:3000/signup', method: 'POST' }}
        onSuccess={(formData, _data) => {
          setNewAccUsername(formData.username)
        }}
      >
        <label htmlFor="username">
          <span className="label-span">Username</span>
          <input type="text" id="username" className="label-text-input" />
        </label>
        <label htmlFor="password">
          <span className="label-span">Password</span>
          <input type="password" id="password" className="label-text-input" />
        </label>
        <label htmlFor="confirmPassword">
          <span className="label-span">Confirm Password</span>
          <input type="password" id="confirmPassword" className="label-text-input" />
        </label>
        <button type="submit" className="auth-submit">Sign Up</button>
        <p>
          Already have an account?
          {' '}
          <Link to="/login" className="text-link"><b>Log in</b></Link>
        </p>
      </APIForm>
    </>
  )
}
