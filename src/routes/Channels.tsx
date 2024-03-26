import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import Modal from 'react-modal'
import APIForm from '../components/APIForm.tsx'
import useFetch from '../useFetch.ts'

import FireSvg from '../icons/fire-solid.svg?react'
import XSvg from '../icons/xmark-solid.svg?react'
import PeopleSvg from '../icons/users-solid.svg?react'
import PersonSvg from '../icons/user-solid.svg?react'

interface IChannelListItem {
  id: string
  title: string
  admin: string
  userCount: number
  ownDisplayName: string | null
}

export default function ChannelList (): JSX.Element | undefined {
  const token = useReadLocalStorage<string>('token')

  const {
    data, loading, error, fetchData
  } = useFetch<IChannelListItem[]>(
    true,
    'http://localhost:3000/channels',
    {
      method: 'GET',
      headers: token !== null
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    }
  )

  function newChannelSuccess (): void { void fetchData() }

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        <div className="header-bar">
          <h2>Your Channels</h2>
          <NewChannelModal onSuccess={newChannelSuccess} />
        </div>
        {data.length > 0
          ? (
            <div className="channels">
              {data.map((channel) => (
                <ChannelListItem channel={channel} key={channel.id} />
              ))}
            </div>
            )
          : <p><i>No channels to show.</i></p>}
      </>
    )
  }
}

function ChannelListItem ({ channel }: {
  channel: IChannelListItem
}): JSX.Element {
  return (
    <Link to={`/channel/${channel.id}`} key={channel.id} className="channel">
      <FireSvg className="fire" />
      <div className="channel-details">
        <h3 className="channel-title">{channel.title}</h3>
        <div className="channel-status">
          <PeopleSvg className="mini" />
          {channel.userCount}
          {channel.ownDisplayName !== null && (
          <>
            <span>
              {' '}
              |
              {' '}
            </span>
            <PersonSvg className="mini" />
            <span className="channel-displayname">
              &quot;
              {channel.ownDisplayName}
              &quot;
            </span>
          </>
          )}
        </div>
      </div>
    </Link>
  )
}

function NewChannelModal ({ onSuccess }: {
  onSuccess: () => void
}): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  function handleSuccess (): void {
    setModalIsOpen(false)
    onSuccess()
  }

  return (
    <>
      <button type="button" onClick={() => { setModalIsOpen(true) }}>
        <FireSvg />
        <span>New</span>
      </button>
      <Modal
        className="modal-content edit-form"
        overlayClassName="modal-overlay"
        contentLabel="Creating a Channel"
        isOpen={modalIsOpen}
      >
        <APIForm
          endpoint={{
            url: 'http://localhost:3000/channels',
            method: 'POST'
          }}
          onSuccess={handleSuccess}
        >
          <h2>Create a Channel</h2>
          <label htmlFor="title">
            <span>Title</span>
            <input type="text" id="title" />
          </label>
          <button type="submit">Create</button>
        </APIForm>
        <button type="button" onClick={() => { setModalIsOpen(false) }}>
          <XSvg />
          <span>Cancel</span>
        </button>
      </Modal>
    </>
  )
}
