import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import { Tooltip } from 'react-tooltip'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DateTime } from 'luxon'
import useFetch from '../useFetch.ts'
import socket from '../socketConfig.ts'
import LoadingWrapper from '../components/LoadingWrapper.tsx'
import type { FormErrors } from '../types.ts'

import CrownSvg from '../icons/crown-solid.svg?react'
import GhostSvg from '../icons/ghost-solid.svg?react'
import SendSvg from '../icons/paper-plane-solid.svg?react'
import AlertSvg from '../icons/triangle-exclamation-solid.svg?react'

interface IChannelMessage {
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

export default function MessagesView ({ channelId }: {
  channelId: string
}): JSX.Element | undefined {
  const token = useReadLocalStorage<string>('token')
  const {
    data, loading, error
  } = useFetch<IChannelMessage[]>(
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

  return (data === null
    ? <LoadingWrapper loading={loading} loadingMessage="Gathering messages..." error={error} />
    : (
      <>
        <MessageList messagesData={data} />
        <MessageCompose channelId={channelId} />
      </>
      ))
}

function MessageList ({ messagesData }: {
  messagesData: IChannelMessage[]
}): JSX.Element {
  const [messages, setMessages] = useState<IChannelMessage[]>(messagesData)
  const bottom = useRef<null | HTMLDivElement>(null)

  socket.on('new message created', (msg: IChannelMessage) => {
    setMessages([...messages, msg])
  })

  useEffect(() => {
    bottom.current?.scrollIntoView()
  }, [messages])

  return (
    <div className="messages">
      {messages.length > 0
        ? (
          <>
            {messages.map((message) => (
              <MessageListItem
                key={message.id}
                message={message}
              />
            ))}
          </>
          )
        : <LoadingWrapper loading={false} error="No messages to show." />}
      <div ref={bottom} />
    </div>
  )
}

function MessageListItem ({ message }: {
  message: IChannelMessage
}): JSX.Element {
  function unEscape (htmlStr: string): string {
    return htmlStr
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&amp;/g, '&')
  }

  return (
    <div className="message">
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
  )
}

function MessageCompose ({ channelId }: {
  channelId: string
}): JSX.Element {
  const token = useReadLocalStorage<string>('token')
  const [messageContent, setMessageContent] = useState<string>('')
  const [isSending, setIsSending] = useState(false)
  const textarea = useRef<null | HTMLTextAreaElement>(null)

  const {
    data, loading, error, fetchData
  } = useFetch<string | FormErrors>(
    false,
      `http://localhost:3000/channel/${channelId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          content: messageContent
        })
      }
  )

  function handleSubmit (e?: FormEvent<HTMLFormElement>): void {
    if (e !== undefined) e.preventDefault()
    if (textarea.current !== null) {
      setMessageContent(textarea.current.value)
      setIsSending(true)
    }
    if (e !== undefined) e.currentTarget.reset()
    else if (textarea.current !== null) textarea.current.value = ''
  }

  useEffect(() => {
    if (isSending) {
      setIsSending(false)
      void fetchData()
    }
  }, [isSending])

  return (
    <div className="compose">
      {error !== null && (
        <div className="compose-error">
          {data !== null && typeof data !== 'string'
            ? (
              <p>
                <AlertSvg className="mini inline" />
                {data[0].msg}
              </p>
              )
            : (
              <p>
                <AlertSvg className="mini inline" />
                {error}
              </p>
              )}
        </div>
      )}
      <form
        className="compose-row"
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder="Say something nice..."
          ref={textarea}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.code === 'Enter') {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <button type="submit" disabled={loading}>
          <SendSvg />
          <span>Send</span>
        </button>
      </form>
    </div>
  )
}
