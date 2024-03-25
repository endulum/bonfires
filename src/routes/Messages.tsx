import { useParams } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import { useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
import { Tooltip } from 'react-tooltip'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useFetch from '../useFetch.ts'

import CrownSvg from '../icons/crown-solid.svg?react'
import GhostSvg from '../icons/ghost-solid.svg?react'

interface ChannelMessage {
  id: string
  content: string
  user: {
    username: string
    id: string
    displayName: string | null
    isAdmin: boolean
    isInChannel: boolean
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
    if (messageSeed !== 0) void fetchData(true)
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
              <div className="message-header">
                <Tooltip id={`timestamp-${message.id}`} />
                <small
                  className="message-timestamp"
                  data-tooltip-id={`timestamp-${message.id}`}
                  data-tooltip-content={DateTime.fromISO(message.timestamp).toLocaleString({
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}
                >
                  {DateTime.fromISO(message.timestamp).toLocaleString({
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </small>
                <span className={`message-user${message.user.isAdmin ? ' admin' : ''}${message.user.isInChannel ? '' : ' not-in-channel'}`}>
                  {message.user.displayName !== null
                    ? (
                      <>
                        <span
                          data-tooltip-id={`username-${message.id}`}
                          data-tooltip-content={message.user.username}
                        >
                          {message.user.displayName}
                        </span>
                        <Tooltip id={`username-${message.id}`} />
                      </>
                      )
                    : (
                      <span>
                        {message.user.username}
                      </span>
                      )}
                  {message.user.isAdmin && (
                    <>
                      <CrownSvg
                        className="mini inline"
                        data-tooltip-id={`admin-${message.id}`}
                        data-tooltip-content="This user is the admin of this channel."
                      />
                      <Tooltip id={`admin-${message.id}`} />
                    </>
                  )}
                  {!message.user.isInChannel && (
                  <>
                    <GhostSvg
                      className="mini inline"
                      data-tooltip-id={`ghost-${message.id}`}
                      data-tooltip-content="This user is no longer in this channel."
                    />
                    <Tooltip id={`ghost-${message.id}`} />
                  </>
                  )}
                </span>
              </div>
              <Markdown
                remarkPlugins={[remarkGfm]}
                allowedElements={[
                  'a', 'strong', 'em', 'del', 'p', 'br', 'ul', 'ol', 'li', 'img'
                ]}
                unwrapDisallowed
                skipHtml
                className="message-content"
              >
                {unEscape(message.content)}
              </Markdown>
            </div>
          ))
          : <p><i>No messages to show.</i></p>}
        <div ref={bottom} />
      </>
    )
  }
}
