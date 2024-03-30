import useInitializeUser from './hooks/useInitializeUser.ts'
import { setStoredToken, clearStoredToken } from './helpers/tokenUtils.ts'
import LoadingWrapper from './components/LoadingWrapper.tsx'
import AuthRouter from './components/AuthRouter.tsx'
import IndexRouter from './components/IndexRouter.tsx'

import './assets/reset.css'
import './assets/fonts/fonts.css'
import './assets/colors.css'
import './assets/main.css'

export default function App (): JSX.Element {
  const { loading, initError, userData, initUser } = useInitializeUser()
  // - when loading = display loading
  // - when done loading and error = display error
  // - when done loading and no data = return auth routes
  // - when done loading and data = return index routes

  function logIn (t: string): void { setStoredToken(t); void initUser() }
  function logOut (): void { clearStoredToken(); void initUser() }

  if (loading || initError !== null) {
    return (
      <LoadingWrapper
        loading={loading}
        error={initError}
        loadingMessage="Lighting the fires..."
      />
    )
  }

  return userData !== null
    ? <IndexRouter logOut={logOut} userData={userData} />
    : <AuthRouter logIn={logIn} />
}
