import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import Modal from 'react-modal'
import APIForm from '../components/APIForm.tsx'
import useFetch from '../useFetch.ts'

interface ChannelList {
  id: string
  title: string
  admin: string
  userCount: number
  ownDisplayName: string | null
}

export default function Channels (): JSX.Element | undefined {
  Modal.setAppElement('#root')
  const token = useReadLocalStorage<string>('token')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const {
    data, loading, error, fetchData
  } = useFetch<ChannelList[]>(
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
          <h2>Your Channels</h2>
          <button type="button" onClick={() => { setModalIsOpen(true) }}>
            New Channel
          </button>
        </div>

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
            Cancel
          </button>
        </Modal>

        {data.length > 0
          ? (
            <div className="channels">
              {data.map((channel) => (
                <Link to={`/channel/${channel.id}`} key={channel.id}>
                  <div className="channel">
                    <h3>{channel.title}</h3>
                    <p>
                      {channel.userCount > 1
                        ? (
                          <span>
                            {channel.userCount}
                            {' '}
                            members
                          </span>
                          )
                        : (<span>Just you</span>)}
                      {channel.ownDisplayName !== null && (
                      <span>
                        {' '}
                        |
                        {' '}
                        You appear as $
                        {channel.ownDisplayName}
                      </span>
                      )}
                    </p>
                  </div>
                </Link>

              ))}
            </div>
            )
          : <p><i>No channels to show.</i></p>}
      </>
    )
  }
}
