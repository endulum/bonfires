import { useParams } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import { useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
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
  const bottom = useRef<null | HTMLDivElement>(null)

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

  function scrollToBottom (): void {
    bottom.current?.scrollIntoView()
  }

  function unEscape (htmlStr: string): string {
    return htmlStr
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&amp;/g, '&')
  }

  useEffect(() => {
    if (messageSeed !== 0) void fetchData()
  }, [messageSeed])

  useEffect(() => {
    if (data !== null) scrollToBottom()
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        {data.length > 0
          ? data.map((message) => (
            <div className="message" key={message.id}>
              <small
                className="message-timestamp"
                title={
                  DateTime.fromISO(message.timestamp).toLocaleString({
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })
                }
              >
                {DateTime.fromISO(message.timestamp).toLocaleString({
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </small>
              <div className="message-body">
                <span className="message-user">
                  {message.user.displayName ?? message.user.username}
                </span>
                <span className="message-content">
                  {unEscape(message.content)}
                </span>
              </div>
            </div>
          ))
          : <p><i>No messages to show.</i></p>}
        <div ref={bottom} />
      </>
    )
  }
}
