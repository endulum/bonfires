import { useDocumentTitle } from 'usehooks-ts'
import { Link, useNavigate } from 'react-router-dom'
import APIForm from '../APIForm.tsx'

export default function Signup (): JSX.Element {
  useDocumentTitle('Bonfires | Sign Up')
  const navigate = useNavigate()
  return (
    <APIForm
      endpoint={{ url: '/signup', method: 'POST' }}
      onSuccess={(formData, _data) => {
        // setNewAccUsername(formData.username)
        navigate('/login', {
          state: {
            username: formData.username
          }
        })
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

      <button type="submit" className="auth-submit">Sign Up</button>
      <p>
        Already have an account?
        {' '}
        <Link to="/login" className="text-link"><b>Log in</b></Link>
      </p>
    </APIForm>
  )
}
