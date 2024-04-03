import APIForm from '../APIForm.tsx'
import ModalButton from '../ModalButton.tsx'

import FireSvg from '../../assets/icons/fire-solid.svg?react'

export default function ChannelsHeader ({ refreshChannels }: {
  refreshChannels: () => void
}): JSX.Element {
  return (
    <div className="header-bar">
      <h2 className="header-bar-text">Your Camps</h2>
      <ModalButton
        buttonContent={(
          <>
            <FireSvg className="button-svg" />
            <span>New Camp</span>
          </>
          )}
        modalContent={(
          <APIForm
            endpoint={{
              url: '/channels',
              method: 'POST'
            }}
            onSuccess={refreshChannels}
          >
            <h2>Start a Camp</h2>
            <label htmlFor="title">
              <span>Title</span>
              <input type="text" id="title" />
            </label>
            <button className="button" type="submit">Create</button>
          </APIForm>
          )}
        modalContentLabel="Start a Camp"
        isInHeaderBar
      />
    </div>
  )
}
