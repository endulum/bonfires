import { useEffect, useState } from 'react'
import fetchData from '../helpers/fetchData.ts'
import { getStoredToken } from '../helpers/tokenUtils.ts'
import { type IUserData } from '../types.ts'

export default function useInitializeUser (): {
  loading: boolean
  initError: string | null
  userData: IUserData | null
  initUser: () => Promise<void>
} {
  const [loading, setLoading] = useState<boolean>(true)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const [initError, setInitError] = useState<string | null>(null)

  async function initUser (): Promise<void> {
    if (userData !== null) setUserData(null)
    if (initError !== null) setInitError(null)

    const token = getStoredToken()
    if (token === null) {
      setLoading(false)
      return
    } setLoading(true)

    const { fetchedData, statusCode, errorMsg } = await fetchData<IUserData>(
      '/login',
      {
        method: 'GET',
        headers: token !== null
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}
      }
    )

    if (errorMsg !== null && ![401, 403, 404].includes(statusCode)) setInitError(errorMsg)
    else setUserData(fetchedData)
    setLoading(false)
  }

  useEffect(() => { void initUser() }, [])

  return { loading, initError, userData, initUser }
}
