import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import CustomModal from './CustomModal.tsx'
import { type IUserData } from '../types.ts'

import UserGearSvg from '../assets/icons/user-gear-solid.svg?react'
import InfoParagraph from './InfoParagraph.tsx'

export default function IndexWrapper ({ userData, logOut }: {
  userData: IUserData
  logOut: () => void
}): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  function toggleModal (): void { setModalOpen(!modalOpen) }

  return (
    <>
      <header>
        <h1>Bonfires</h1>
        <button type="button" className="button" aria-label="User Settings" onClick={toggleModal}>
          <UserGearSvg className="button-svg" />
          {userData.username}
        </button>
      </header>
      <main>
        <Outlet context={userData} />
      </main>

      <CustomModal
        contentLabel="test"
        isOpen={modalOpen}
        closeModal={toggleModal}
      >
        <InfoParagraph type="warning">
          content
        </InfoParagraph>
      </CustomModal>
    </>
  )
}
