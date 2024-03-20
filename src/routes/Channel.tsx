import { useParams } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import useFetch from '../useFetch.ts'

interface ChannelDetail {
  id: string
  title: string
  admin: {
    username: string
    id: string
    displayName: string | null
  }
  users: Array<{
    username: string
    id: string
    displayName: string | null
  }>
}

export default function Channel (): JSX.Element | undefined {
  const token = useReadLocalStorage<string>('token')
  const channelId = useParams().channel

  const {
    data, loading, error
  } = useFetch<ChannelDetail>(
    true,
    `http://localhost:3000/channel/${channelId}`,
    {
      method: 'GET',
      headers: token !== null
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    }
  )

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        <h2>{data.title}</h2>
        <div className="messages">
          {/* Messages component here */}
        </div>
        <div className="compose">
          {/* Form to send messages here */}
        </div>
        {/* */}
      </>
    )
  }
}
