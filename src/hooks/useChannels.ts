import { useState, useEffect } from 'react'
import fetchData from '../helpers/fetchData.ts'
import { getStoredToken } from '../helpers/tokenUtils.ts'
import { type IChannel } from '../types.ts'

export default function useChannels (): {
  loading: boolean
  channels: IChannel[] | null
  error: string | null
  getChannels: () => Promise<void>
} {
  const [loading, setLoading] = useState<boolean>(true)
  const [channels, setChannels] = useState<IChannel[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function getChannels (): Promise<void> {
    if (channels !== null) setChannels(null)
    if (error !== null) setError(null)
    const token = getStoredToken()

    const { data, statusCode, errorMsg } = await fetchData<IChannel[]>(
      'http://localhost:3000/channels',
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
    if (statusCode === 200) setChannels(data)
    else setError(errorMsg)
  }

  useEffect(() => { void getChannels() }, [])

  return { loading, error, channels, getChannels }
}
