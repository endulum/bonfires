import { useParams } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import { useEffect } from 'react'
import useFetch from '../useFetch.ts'

interface ChannelMessage {
  id: string
  content: string
  user: {
    username: string
    id: string
    displayName: string | null
  }
  timestamp: string
}

export default function Messages ({ messageSeed }: {
  messageSeed: number
}): JSX.Element | undefined {
  const token = useReadLocalStorage<string>('token')
  const channelId = useParams().channel

  const {
    data, loading, error, fetchData
  } = useFetch<ChannelMessage[]>(
    true,
    `http://localhost:3000/channel/${channelId}/messages`,
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
    if (messageSeed !== 0) void fetchData()
  }, [messageSeed])

  useEffect(() => { if (data !== null) console.log(data) }, [data])

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <p>look at console</p>
    )
  }
}
