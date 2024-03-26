import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import useFetch from './useFetch.ts'

import IndexWrapper from './components/IndexWrapper.tsx'
import AuthWrapper from './components/AuthWrapper.tsx'
import LoadingWrapper from './components/LoadingWrapper.tsx'
import Login from './routes/Login.tsx'
import Signup from './routes/Signup.tsx'
import ChannelList from './routes/Channels.tsx'
import ChannelView from './routes/Channel.tsx'

export default function App (): JSX.Element | undefined {
  const [token, setToken] = useLocalStorage<string | null>('token', null, {
    initializeWithValue: true
  })
  const [tokenChanged, setTokenChanged] = useState<boolean>(false)

  const {
    data, loading, error, fetchData
  } = useFetch<{ username: string, id: string }>(
    true,
    'http://localhost:3000/login',
    {
      method: 'GET',
      headers: token !== null
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    }
  )

  useEffect(() => {
    if (
      !loading &&
      error !== null &&
      [
        'Token could not be verified.',
        'The user this token belongs to could not be found.'
      ].includes(error)
    ) {
      // eslint-disable-next-line no-console
      console.warn('Invalid token provided, nullifying token...')
      setTokenAndRefresh()
    }
  }, [error])

  function setTokenAndRefresh (t: string | null = null): void {
    setToken(t)
    setTokenChanged(true)
  }

  useEffect(() => {
    // the "tokenChanged" flag is here
    // because we can't call the fetch hook
    // at the same time we change our token.
    // if we do, the fetch hook will use the token
    // BEFORE the token's state changed.
    // or maybe there's another way...?
    if (tokenChanged) {
      setTokenChanged(false)
      void fetchData()
    }
  }, [tokenChanged])

  return (data === null && error !== 'Please log in.'
    ? <LoadingWrapper loading={loading} error={error} />
    : (
      <Routes>
        <Route element={token === null ? <AuthWrapper /> : <Navigate to="/" />}>
          <Route path="/login" element={<Login setToken={setTokenAndRefresh} />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {data !== null && (
        <Route element={(
          <IndexWrapper userData={data} setToken={setTokenAndRefresh} />
        )}
        >
          <Route path="/" element={<ChannelList />} />
          <Route path="/channel/:channel" element={<ChannelView />} />
          <Route
            path="*"
            element={<LoadingWrapper loading={false} error="Nothing found at this URL." />}
          />
        </Route>
        )}
        <Route
          path="*"
          element={
            token === null
              ? <Navigate to="login" />
              : <LoadingWrapper loading={false} error="Nothing found at this URL." />
          }
        />
      </Routes>
      ))
}
