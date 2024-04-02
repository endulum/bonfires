import { useState, type FormEvent, useRef } from 'react'
import InfoParagraph from '../InfoParagraph.tsx'
import useSendMessage from '../../hooks/useSendMessage.ts'

import SendSvg from '../../assets/icons/paper-plane-solid.svg?react'

export default function MessageCompose ({ channelId }: {
  channelId: string
}): JSX.Element {
  const textarea = useRef<null | HTMLTextAreaElement>(null)
  const [content, setContent] = useState<string>('')
  const { loading, errorSendingMessage, sendMessage } = useSendMessage(channelId, content)

  function handleChange (event: InputEvent): void {}

  function handleSubmit (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  function handleKeyDown (event: KeyboardEvent): void {}

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
