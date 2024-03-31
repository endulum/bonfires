import useChannels from '../hooks/useChannels.ts'
import LoadingWrapper from './LoadingWrapper.tsx'
import APIForm from './APIForm.tsx'
import ModalButton from './ModalButton.tsx'

import FireSvg from '../assets/icons/fire-solid.svg?react'

export default function ChannelList (): JSX.Element {
  const {
    loading, error, channels, getChannels
  } = useChannels()

  return channels === null
    ? (
      <LoadingWrapper
        loadingMessage="Gathering your camps..."
        loading={loading}
        error={error}
      />
      )
    : (
      <div className="header-bar">
        <h2>Your Camps</h2>
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
                url: 'http://localhost:3000/channels',
                method: 'POST'
              }}
              onSuccess={() => { void getChannels() }}
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
