import { useState, type FormEvent, useRef, type KeyboardEvent, type ChangeEvent } from 'react'
import autosize from 'autosize'
import InfoParagraph from '../InfoParagraph.tsx'
import useSendMessage from '../../hooks/useSendMessage.ts'

import SendSvg from '../../assets/icons/paper-plane-solid.svg?react'

export default function MessageCompose ({ channelId }: {
  channelId: string
}): JSX.Element {
  const textarea = useRef<null | HTMLTextAreaElement>(null)
  const [content, setContent] = useState<string>('')
  const { loading, errorSendingMessage, sendMessage } = useSendMessage(channelId)

  function handleChange (_event: ChangeEvent): void {
    if (textarea.current !== null) {
      setContent(textarea.current.value)
      autosize(textarea.current)
    }
  }

  function handleSubmit (event?: FormEvent<HTMLFormElement>): void {
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
