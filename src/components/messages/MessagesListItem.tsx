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
                <b
                  data-tooltip-id={`username-${message.id}`}
                  data-tooltip-content={message.user.username}
                >
                  {message.user.displayName}
                </b>
                <Tooltip id={`username-${message.id}`} />
              </>
              )
            : (
              <b>
                {message.user.username}
              </b>
              )}
          {message.user.isAdmin && (
          <>
            <FireSvg
              className="inline-svg user-svg firestarter-svg"
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
              className="inline-svg user-svg ghost-svg"
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
        components={{
          p: mdParagraph,
          a: mdLink,
          ul: mdUl,
          ol: mdOl,
          li: mdLi,
          img: mdImg
        }}
        unwrapDisallowed
        skipHtml
        className="message-content"
      >
        {unEscape(message.content)}
      </Markdown>
    </div>
  )
}

// todo: figure out the proper types for the props param

const mdParagraph = (props: any): JSX.Element => (
  <p className="md-paragraph">{props.children}</p>
)

const mdLink = (props: any): JSX.Element => (
  <a href={props.href} target="_blank" className="md-link" rel="noreferrer">{props.children}</a>
)

const mdUl = (props: any): JSX.Element => (
  <ul className="md-ul">{props.children}</ul>
)

const mdOl = (props: any): JSX.Element => (
  <ol className="md-ol">{props.children}</ol>
)

const mdLi = (props: any): JSX.Element => (
  <li className="md-li">{props.children}</li>
)

const mdImg = (props: any): JSX.Element => (
  <img src={props.src} alt="" className="md-img" />
)
