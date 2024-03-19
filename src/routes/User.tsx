import { type Dispatch, type SetStateAction, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import APIForm from '../components/APIForm.tsx'
import useFetch from '../useFetch.ts'

interface UserDetail {
  username: string
  id: string
}

export default function User ({ userData, setUserData }: {
  userData: { username: string, id: string }
  setUserData: Dispatch<SetStateAction<{ username: string, id: string } | null>>
}): JSX.Element | undefined {
  Modal.setAppElement('#root')

  const navigate = useNavigate()
  const params = useParams()

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const {
    data, loading, error, fetchData
  } = useFetch<UserDetail>(
    true,
    `http://localhost:3000/user/${params.id}`,
    {
      method: 'GET'
    }
  )

  function handleSuccess (_dummy: any, form: { username: string }): void {
    setModalIsOpen(false)
    if (form.username !== userData.username) {
      setUserData({ ...userData, username: form.username })
      navigate(`/user/${form.username}`)
      navigate(0)
    } else {
      void fetchData()
    }
  }

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        <h1>{data.username}</h1>
        {data.id === userData.id && (
          <button type="button" onClick={() => { setModalIsOpen(true) }}>
            Account Settings
          </button>
        )}
        <Modal
          className="modal-content edit-form"
          overlayClassName="modal-overlay"
          contentLabel="Editing Profile Details"
          isOpen={modalIsOpen}
        >
          <h2>Edit Account Details</h2>
          <APIForm
            endpoint={{
              url: `http://localhost:3000/user/${data.username}`,
              method: 'PUT'
            }}
            onSuccess={handleSuccess}
          >
            <h3>Profile Details</h3>
            <label htmlFor="username">
              <span>Username</span>
              <input type="text" id="username" defaultValue={data.username} />
            </label>

            <h3>Change Password</h3>
            <label htmlFor="newPassword">
              <span>New Password</span>
              <input type="password" id="newPassword" />
            </label>
            <label htmlFor="confirmNewPassword">
              <span>Confirm New Password</span>
              <input type="password" id="confirmNewPassword" />
            </label>
            <label htmlFor="currentPassword">
              <span>Current Password</span>
              <input type="password" id="currentPassword" />
            </label>

            <button type="submit">Submit</button>
          </APIForm>
          <button type="button" onClick={() => { setModalIsOpen(false) }}>
            Cancel
          </button>
        </Modal>
      </>
    )
  }
}
