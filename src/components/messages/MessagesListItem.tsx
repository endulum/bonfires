import { DateTime } from 'luxon'
import { Tooltip } from 'react-tooltip'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import unEscape from '../../helpers/unEscape.ts'
import { type IMessage } from '../../types.ts'

import FireSvg from '../../assets/icons/fire-solid.svg?react'
import GhostSvg from '../../assets/icons/ghost-solid.svg?react'

export default function MessagesListItem ({ message }: {
  message: IMessage
}): JSX.Element {
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
            <FireSvg
              className="inline-svg"
              data-tooltip-id={`admin-${message.id}`}
            />
            <Tooltip id={`admin-${message.id}`}>
              <b>Firestarter:</b>
              {' '}
              This user is the admin of this camp.
            </Tooltip>
          </>
          )}
          {!message.user.isInChannel && (
          <>
            <GhostSvg
              className="inline-svg"
              data-tooltip-id={`ghost-${message.id}`}
            />
            <Tooltip id={`ghost-${message.id}`}>
              <b>Ghost:</b>
              {' '}
              This user is no longer in this camp.
            </Tooltip>
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
