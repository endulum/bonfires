import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import { Tooltip } from 'react-tooltip'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DateTime } from 'luxon'
import { useOutletContext } from 'react-router-dom'
import useFetch from '../useFetch.ts'
import socket from '../socketConfig.ts'
import LoadingWrapper from '../components/LoadingWrapper.tsx'
import { type UserDetail, type FormErrors } from '../types.ts'

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

export default function MessagesView ({ channelId, yourDisplayName }: {
  channelId: string
  yourDisplayName: string
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

  useEffect(() => {
    socket.emit('viewing channel', channelId)
    return () => {
      socket.emit('leaving channel', channelId)
    }
  }, [])

  return (data === null
    ? <LoadingWrapper loading={loading} loadingMessage="Gathering messages..." error={error} />
    : (
      <>
        <MessageList messagesData={data} />
        <MessageCompose channelId={channelId} yourDisplayName={yourDisplayName} />
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
      <div ref={bottom} className="typing">
        <IsTyping />
      </div>
    </div>
  )
}

function IsTyping (): JSX.Element {
  const [isTyping, setIsTyping] = useState<Record<string, string>>({})

  socket.on('someone started typing', (userId: string, userName: string) => {
    setIsTyping({ ...isTyping, [userId]: userName })
  })

  socket.on('someone stopped typing', (userId: string) => {
    const { [userId]: userName, ...rest } = isTyping
    setIsTyping(rest)
  })

  const keys = (obj: Record<string, string>): string[] => Object.keys(obj)
  const boldName = (index: number): JSX.Element => <b>{isTyping[keys(isTyping)[index]]}</b>

  switch (keys(isTyping).length) {
    case 0: return (<p>It&apos;s quiet here...</p>)

    case 1: return (
      <p>
        <b>{boldName(0)}</b>
        {' '}
        is typing...
      </p>
    )

    case 2: return (
      <p>
        <b>{boldName(0)}</b>
        {' '}
        and
        {' '}
        <b>{boldName(1)}</b>
        {' '}
        are typing...
      </p>
    )

    case 3: return (
      <p>
        <b>{boldName(0)}</b>
        ,
        {' '}
        <b>{boldName(1)}</b>
        ,
        {' '}
        and
        {' '}
        <b>{boldName(3)}</b>
        {' '}
        are typing...
      </p>
    )

    default: return (<p>Several people are typing...</p>)
  }
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

function MessageCompose ({ channelId, yourDisplayName }: {
  channelId: string
  yourDisplayName: string
}): JSX.Element {
  const token = useReadLocalStorage<string>('token')
  const [messageContent, setMessageContent] = useState<string>('')
  const [isSending, setIsSending] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const timerRef: { current: ReturnType<typeof setInterval> | null } = useRef(null)
  const textarea = useRef<null | HTMLTextAreaElement>(null)
  const { id } = useOutletContext<UserDetail>()

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

  function startTyping (): void {
    if (!isTyping) {
      setIsTyping(true)
      socket.emit('you started typing', channelId, id, yourDisplayName)
    }
    if (timerRef.current !== null) clearTimeout(timerRef.current)
    if (textarea.current !== null && textarea.current.value === '') stopTyping()
    else timerRef.current = setTimeout(stopTyping, 2000)
  }

  function stopTyping (): void {
    setIsTyping(false)
    socket.emit('you stopped typing', channelId, id)
  }

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
              stopTyping()
              handleSubmit()
            }
          }}
          onChange={startTyping}
        />
        <button type="submit" disabled={loading}>
          <SendSvg />
          <span>Send</span>
        </button>
      </form>
    </div>
  )
}
