import { type Dispatch, type SetStateAction, useState, useEffect, useRef, type FormEvent } from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { useReadLocalStorage } from 'usehooks-ts'
import APIForm from '../components/APIForm.tsx'
import useFetch from '../useFetch.ts'
import Messages from './Messages.tsx'
import DropdownMenu from '../components/DropdownMenu.tsx'
import { type FormErrors, type UserDetail } from '../types.ts'

import GearSvg from '../icons/gear-solid.svg?react'
import AddUserSvg from '../icons/user-plus-solid.svg?react'
import RemoveUserSvg from '../icons/user-xmark-solid.svg?react'
import PromoteUserSvg from '../icons/user-shield-solid.svg?react'
import EditUserSvg from '../icons/user-pen-solid.svg?react'
import LeaveSvg from '../icons/right-from-bracket-solid.svg?react'
import EditSvg from '../icons/pen-to-square-solid.svg?react'
import SendSvg from '../icons/paper-plane-solid.svg?react'
import AlertSvg from '../icons/triangle-exclamation-solid.svg?react'

interface ChannelDetail {
  id: string
  title: string
  currentUser: {
    id: string
    username: string
    displayName: string | null
  }
  adminId: string
  userIds: string[]
}

export default function Channel (): JSX.Element | undefined {
  Modal.setAppElement('#root')
  const token = useReadLocalStorage<string>('token')
  const channelId = useParams().channel
  const [messageSeed, setMessageSeed] = useState<number>(0)
  const { id } = useOutletContext<UserDetail>()
  const navigate = useNavigate()

  const {
    data, loading, error, fetchData
  } = useFetch<ChannelDetail>(
    true,
    `http://localhost:3000/channel/${channelId}`,
    {
      method: 'GET',
      headers: token !== null
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    }
  )

  function handleSuccess (): void {
    void fetchData()
  }

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        <div className="header-bar">
          <h2>{data.title}</h2>
          <DropdownMenu
            menuItems={[
              data.adminId === id && {
                title: 'Edit Channel',
                icon: (<EditSvg />),
                element: (
                  <APIForm
                    endpoint={{
                      url: `http://localhost:3000/channel/${channelId}`,
                      method: 'PUT'
                    }}
                    onSuccess={handleSuccess}
                  >
                    <h3>Edit Channel Details</h3>
                    <label htmlFor="title">
                      <span>Channel Title</span>
                      <input type="text" id="title" defaultValue={data.title} />
                    </label>
                    <button type="submit">Submit</button>
                  </APIForm>
                )
              }, {
                title: 'Edit Display Name',
                icon: (<EditUserSvg />),
                element: (
                  <APIForm
                    endpoint={{
                      url: `http://localhost:3000/channel/${channelId}/name`,
                      method: 'POST'
                    }}
                    onSuccess={handleSuccess}
                  >
                    <h3>Change Display Name</h3>
                    <p className="form-info">
                      Your display name is your custom name for this channel
                      {' '}
                      that will be shown in place of your username. Submit blank
                      {' '}
                      to use your username.
                    </p>
                    <label htmlFor="displayName">
                      <span>Display Name</span>
                      <input type="text" id="displayName" defaultValue={data.currentUser.displayName ?? ''} />
                    </label>
                    <button type="submit">Change</button>
                  </APIForm>
                )
              }, {
                title: 'Invite a User',
                icon: (<AddUserSvg />),
                element: (
                  <APIForm
                    endpoint={{
                      url: `http://localhost:3000/channel/${channelId}/invite`,
                      method: 'POST'
                    }}
                    onSuccess={handleSuccess}
                  >
                    <h3>Invite a User</h3>
                    <label htmlFor="username">
                      <span>Username</span>
                      <input type="text" id="username" />
                    </label>
                    <button type="submit">Invite</button>
                  </APIForm>
                )
              }, data.adminId === id && data.userIds.length > 1 && {
                title: 'Kick a User',
                icon: (<RemoveUserSvg />),
                element: (
                  <APIForm
                    endpoint={{
                      url: `http://localhost:3000/channel/${channelId}/kick`,
                      method: 'POST'
                    }}
                    onSuccess={handleSuccess}
                  >
                    <h3>Kick a User</h3>
                    <p className="form-info">
                      The user will be removed from the channel.
                      {' '}
                      They cannot re-enter this channel unless invited back in.
                    </p>
                    <label htmlFor="username">
                      <span>Username</span>
                      <input type="text" id="username" />
                    </label>
                    <button type="submit">Kick</button>
                  </APIForm>
                )
              }, data.adminId === id && data.userIds.length > 1 && {
                title: 'Promote a User',
                icon: (<PromoteUserSvg />),
                element: (
                  <APIForm
                    endpoint={{
                      url: `http://localhost:3000/channel/${channelId}/promote`,
                      method: 'POST'
                    }}
                    onSuccess={handleSuccess}
                  >
                    <h3>Promote a User</h3>
                    <p className="form-info">
                      This will remove your admin privileges and
                      {' '}
                      bestow them to another member of this channel.
                    </p>
                    <label htmlFor="username">
                      <span>Username</span>
                      <input type="text" id="username" />
                    </label>
                    <button type="submit">Promote</button>
                  </APIForm>
                )
              }, {
                title: 'Leave this Channel',
                icon: (<LeaveSvg />),
                element: (
                  <APIForm
                    endpoint={{
                      url: `http://localhost:3000/channel/${channelId}`,
                      method: 'DELETE'
                    }}
                    onSuccess={() => { navigate('/') }}
                  >
                    <h3>Leave Channel</h3>
                    {data.userIds.length === 1
                      ? (
                        <p className="form-info">
                          You are currently the only user left.
                          {' '}
                          If you leave and no other members remain,
                          {' '}
                          this channel and all its messages will be permanently deleted.
                        </p>
                        )
                      : (
                        <p className="form-info">
                          You will be removed from this channel,
                          {' '}
                          and will not be able to re-enter until
                          {' '}
                          you are invited back in.
                        </p>
                        )}
                    <button type="submit">Leave</button>
                  </APIForm>
                )
              }
            ]}
          >
            <GearSvg />
            <span>
              Settings
            </span>
          </DropdownMenu>
        </div>

        <div className="messages">
          <Messages messageSeed={messageSeed} />
        </div>
        <ComposeMessage setMessageSeed={setMessageSeed} />
      </>
    )
  }
}

function ComposeMessage ({ setMessageSeed }: {
  setMessageSeed: Dispatch<SetStateAction<number>>
}): JSX.Element {
  const token = useReadLocalStorage<string>('token')
  const channelId = useParams().channel
  const textarea = useRef<null | HTMLTextAreaElement>(null)

  const [messageContent, setMessageContent] = useState<string>('')
  const [isSending, setIsSending] = useState(false)

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
    if (data !== null && data === 'OK') {
      setMessageSeed(Math.random())
    }
  }, [data])

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
