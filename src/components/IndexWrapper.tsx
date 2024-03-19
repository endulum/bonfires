import { type Dispatch, type SetStateAction } from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function IndexWrapper ({ userData, setToken }: {
  userData: { username: string, id: string }
  setToken: Dispatch<SetStateAction<string | null>>
}): JSX.Element {
  function logOut (): void {
    setToken(null)
  }

  return (
    <>
      <header>
        <h1>
          <Link to="/">App</Link>
        </h1>

        <nav>
          <p>
            Logged in as
            {' '}
            <Link to={`/user/${userData.username}`}>{userData.username}</Link>
          </p>
          <p>
            <button type="button" onClick={logOut}>Log Out</button>
          </p>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
