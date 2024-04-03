import { useLocation, Link } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'
import APIForm from '../APIForm.tsx'
import InfoParagraph from '../InfoParagraph.tsx'

export default function Login ({ logIn }: {
  logIn: (t: string) => void
}): JSX.Element {
  const { state } = useLocation()
  useDocumentTitle('Bonfires | Log In')
  return (
    <>
      {(state !== null && state.username !== null) && (
        <InfoParagraph type="success">
          Account successfully created. Proceed to log in to your new account below.
        </InfoParagraph>
      )}
      <APIForm
        endpoint={{ url: '/login', method: 'POST' }}
        onSuccess={(_formData, data: { token: string }) => {
          logIn(data.token)
        }}
      >
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" id="username" defaultValue={state?.username} />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input type="password" id="password" />
        </label>

        <button type="submit" className="auth-submit">Log In</button>
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/signup" className="text-link"><b>Sign up</b></Link>
        </p>
      </APIForm>
    </>
  )
}
