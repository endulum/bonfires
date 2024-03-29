// import { useEffect } from 'react'
import useInitializeUser from './hooks/useInitializeUser.ts'
import { setStoredToken, clearStoredToken } from './helpers/tokenUtils.ts'

export default function App (): JSX.Element {
  const { loading, initError, userData, initUser } = useInitializeUser()
  // - when loading = display loading
  // - when done loading and error = display error
  // - when done loading and no data = return auth routes
  // - when done loading and data = return index routes

  function logIn (t: string): void { setStoredToken(t); void initUser() }
  function logOut (): void { clearStoredToken(); void initUser() }

  // useEffect(() => {
  //   console.log({ loading, initError, userData })
  // })

  if (loading) return <p>loading...</p>
  if (initError !== null) return <p>{initError}</p>
  return (
    <p>
      {userData !== null ? 'You are in.' : 'You are NOT in.'}

      <button
        type="button"
        onClick={() => { logIn('blah') }}
      >
        invalid token
      </button>
      <button
        type="button"
        onClick={logOut}
      >
        empty token
      </button>
    </p>
  )
}
