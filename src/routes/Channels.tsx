import { useState, type Dispatch, type SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import Modal from 'react-modal'
import APIForm from '../components/APIForm.tsx'
import LoadingWrapper from '../components/LoadingWrapper.tsx'
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
  const [searchPhrase, setSearchPhrase] = useState<string>('')

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

  function filterTitle (filterPhrase: string): IChannelListItem[] {
    if (data !== null) {
      return data.filter((channel) => (
        channel.title.toLowerCase().includes(filterPhrase.toLowerCase())
      ))
    }
    return []
  }

  return (data === null
    ? <LoadingWrapper loading={loading} loadingMessage="Gathering your channels..." error={error} />
    : (
      <>
        <div className="header-bar">
          <h2>Your Channels</h2>
          <NewChannelModal onSuccess={newChannelSuccess} />
        </div>
        <SearchChannels setSearchPhrase={setSearchPhrase} />
        {filterTitle(searchPhrase).length > 0
          ? (
            <div className="channels">
              {filterTitle(searchPhrase).map((channel) => (
                <ChannelListItem channel={channel} key={channel.id} />
              ))}
            </div>
            )
          : (
            <div className="expand">
              <p>
                <i>No channels to show.</i>
              </p>
            </div>
            )}
      </>
      ))
}

function SearchChannels ({ setSearchPhrase }: {
  setSearchPhrase: Dispatch<SetStateAction<string>>
}): JSX.Element {
  return (
    <div className="search-row">
      <label htmlFor="searchChannelTitle">
        <span>
          Search by title:
        </span>
        <input
          type="text"
          id="searchChannelTitle"
          onChange={(e) => { setSearchPhrase(e.target.value) }}
        />
      </label>
    </div>
  )
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
