import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import useFetch from './useFetch.ts'

import IndexWrapper from './components/IndexWrapper.tsx'
import AuthWrapper from './components/AuthWrapper.tsx'
import Login from './routes/Login.tsx'
import Signup from './routes/Signup.tsx'
import Channels from './routes/Channels.tsx'
import User from './routes/User.tsx'

import './App.css'

export default function App (): JSX.Element | undefined {
  const [token, setToken] = useLocalStorage<string | null>('token', null)
  const [userData, setUserData] = useState<{ username: string, id: string } | null>(null)

  const {
    data, loading, error, fetchData
  } = useFetch<{ username: string, id: string }>(
    false,
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
      error !== null &&
      [
        'Token could not be verified.',
        'The user this token belongs to could not be found.'
      ].includes(error)
    ) {
      // eslint-disable-next-line no-console
      console.warn('Invalid token provided, nullifying token...')
      setToken(null)
    }
  }, [error])

  useEffect(() => {
    void fetchData()
  }, [token])

  useEffect(() => {
    setUserData(data)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error !== null && error !== 'Please log in.') return <p>{error}</p>

  return (
    <Routes>
      <Route element={token === null ? <AuthWrapper /> : <Navigate to="/" />}>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      {userData !== null && (
        <Route element={<IndexWrapper userData={userData} setToken={setToken} />}>
          <Route path="/" element={<Channels />} />
          <Route
            path="/user/:id"
            element={
              <User userData={userData} setUserData={setUserData} />
            }
          />
          <Route path="*" element={<p>Not found.</p>} />
        </Route>
      )}

      <Route
        path="*"
        element={
          token === null ? <Navigate to="login" /> : <p>Not found.</p>
        }
      />
    </Routes>
  )
}
