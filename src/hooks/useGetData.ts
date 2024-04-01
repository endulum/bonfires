import { useState, useEffect } from 'react'
import fetchData from '../helpers/fetchData.ts'
import { getStoredToken } from '../helpers/tokenUtils.ts'

export default function useGetData<T> (url: string): {
  loading: boolean
  error: string | null
  data: T | null
  getData: (preservePreviousData?: boolean) => Promise<void>
} {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)

  async function getData (preservePreviousData?: boolean): Promise<void> {
    if (preservePreviousData === false) {
      if (error !== null) setError(null)
      if (data !== null) setData(null)
      if (!loading) setLoading(true)
    }
    const token = getStoredToken()
    const { fetchedData, statusCode, errorMsg } = await fetchData<T>(
      url,
      {
        method: 'GET',
        headers: token !== null
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}
      }
    )
    setLoading(false)
    if (statusCode === 200) setData(fetchedData)
    else setError(errorMsg)
  }

  useEffect(() => { void getData(false) }, [])

  return { loading, error, data, getData }
}
