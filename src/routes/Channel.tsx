import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { useReadLocalStorage } from 'usehooks-ts'
import APIForm from '../components/APIForm.tsx'
import useFetch from '../useFetch.ts'

interface ChannelDetail {
  id: string
  title: string
  admin: {
    username: string
    id: string
    displayName: string | null
  }
  users: Array<{
    username: string
    id: string
    displayName: string | null
  }>
}

export default function Channel (): JSX.Element | undefined {
  Modal.setAppElement('#root')
  const token = useReadLocalStorage<string>('token')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const channelId = useParams().channel

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
    setModalIsOpen(false)
    void fetchData()
  }

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        <div className="header-bar">
          <h2>{data.title}</h2>
          <button type="button" onClick={() => { setModalIsOpen(true) }}>
            Settings
          </button>
        </div>

        <Modal
          className="modal-content edit-form"
          overlayClassName="modal-overlay"
          contentLabel="Channel Settings"
          isOpen={modalIsOpen}
        >
          <APIForm
            endpoint={{
              url: `http://localhost:3000/channel/${channelId}/name`,
              method: 'POST'
            }}
            onSuccess={handleSuccess}
          >
            <h3>Change Display Name</h3>
            <label htmlFor="displayName">
              <span>Display Name</span>
              <input type="text" id="displayName" />
            </label>
            <button type="submit">Change</button>
          </APIForm>

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

          <APIForm
            endpoint={{
              url: `http://localhost:3000/channel/${channelId}`,
              method: 'DELETE'
            }}
            onSuccess={handleSuccess}
          >
            <h3>Leave Channel</h3>
            {data.users.length === 1 && (
              <p>
                You are currently the only user left.
                {' '}
                If no members remain in this channel,
                {' '}
                this channel and all its messages will be permanently deleted.
              </p>
            )}
            <button type="submit">Leave</button>
          </APIForm>

          <h2>Admin Actions</h2>
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
              <input type="text" id="title" />
            </label>
            <button type="submit">Submit</button>
          </APIForm>
          <APIForm
            endpoint={{
              url: `http://localhost:3000/channel/${channelId}/kick`,
              method: 'POST'
            }}
            onSuccess={handleSuccess}
          >
            <h3>Kick a User</h3>
            <label htmlFor="username">
              <span>Username</span>
              <input type="text" id="username" />
            </label>
            <button type="submit">Kick</button>
          </APIForm>
          <APIForm
            endpoint={{
              url: `http://localhost:3000/channel/${channelId}/promote`,
              method: 'POST'
            }}
            onSuccess={handleSuccess}
          >
            <h3>Promote a User</h3>
            <p>
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

          <button type="button" onClick={() => { setModalIsOpen(false) }}>
            Close
          </button>
        </Modal>

        <div className="messages">
          {/* Messages component here */}
        </div>
        <div className="compose">
          {/* Form to send messages here */}
        </div>
      </>
    )
  }
}
