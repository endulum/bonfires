import { useState, type FormEvent, useRef, type KeyboardEvent, type ChangeEvent } from 'react'
import autosize from 'autosize'
import InfoParagraph from '../InfoParagraph.tsx'
import useSendMessage from '../../hooks/useSendMessage.ts'
import useIsTyping from '../../hooks/useIsTyping.ts'

import SendSvg from '../../assets/icons/paper-plane-solid.svg?react'

export default function MessageCompose ({ channelId, yourId, yourDisplayName }: {
  channelId: string
  yourId: string
  yourDisplayName: string | null
}): JSX.Element {
  const textarea = useRef<null | HTMLTextAreaElement>(null)
  const [content, setContent] = useState<string>('')
  const { loading, errorSendingMessage, sendMessage } = useSendMessage(channelId)
  const { startTyping, stopTyping } = useIsTyping(channelId, yourId, yourDisplayName)

  function handleChange (_event: ChangeEvent): void {
    startTyping()
    if (textarea.current !== null) {
      setContent(textarea.current.value)
      autosize(textarea.current)
    }
  }

  function handleSubmit (event?: FormEvent<HTMLFormElement>): void {
    stopTyping()
    if (event !== undefined) {
      event.preventDefault()
      event.currentTarget.reset()
    }
    if (textarea.current !== null) {
      textarea.current.value = ''
      textarea.current.style.height = '3rem'
    }
    setContent('')
    void sendMessage(content)
  }

  function handleKeyDown (event: KeyboardEvent): void {
    if (!event.shiftKey && event.code === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="compose">
      {errorSendingMessage !== null && (
        <InfoParagraph type="error">
          {errorSendingMessage}
        </InfoParagraph>
      )}
      <form
        className="compose-row"
        onSubmit={handleSubmit}
      >
        <textarea
          className="compose-textarea"
          placeholder="Say something nice..."
          ref={textarea}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <button type="submit" className="button compose-send" disabled={loading}>
          <SendSvg className="button-svg" />
          <span>Send</span>
        </button>
      </form>
    </div>
  )
}
