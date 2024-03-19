import { useReadLocalStorage } from 'usehooks-ts'
import useFetch from '../useFetch.ts'

interface ChannelList {
  id: string
  title: string
  admin: string
  userCount: number
  ownDisplayName: string | null
}

export default function Channels (): JSX.Element | undefined {
  const token = useReadLocalStorage<string>('token')

  const {
    data, loading, error
  } = useFetch<ChannelList[]>(
    true,
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

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        <h2>Your Channels</h2>
        {data.length > 0
          ? (
            <div className="channels">
              {data.map((channel) => (
                <div className="channel" key={channel.id}>
                  <h3>{channel.title}</h3>
                  <p>
                    {channel.userCount > 1
                      ? (
                        <span>
                          {channel.userCount}
                          {' '}
                          members
                        </span>
                        )
                      : (<span>Just you</span>)}
                    {channel.ownDisplayName !== null && (
                    <span>
                      {' '}
                      |
                      {' '}
                      You appear as $
                      {channel.ownDisplayName}
                    </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
            )
          : <p><i>No channels to show.</i></p>}
      </>
    )
  }
}
