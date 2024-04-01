import { useState, useRef, useEffect } from 'react'
import LoadingWrapper from '../LoadingWrapper.tsx'
import { type IMessage } from '../../types.ts'

import MessagesListItem from './MessagesListItem.tsx'

export default function MessagesList ({ messageData }: {
  messageData: IMessage[]
}): JSX.Element {
  const [messages, setMessages] = useState<IMessage[]>(messageData)
  const bottom = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    bottom.current?.scrollIntoView()
  }, [messages])

  return (
    <div className="messages">
      {messages.length > 0
        ? (
          <>
            {messages.map((message) => (
              <MessagesListItem
                key={message.id}
                message={message}
              />
            ))}
          </>
          )
        : (
          <LoadingWrapper
            loading={false}
            error="No messages in this channel. Send one?"
          />
          )}
      <div ref={bottom} className="typing">
        {/* <IsTyping /> */}
      </div>
    </div>
  )
}
