import { useParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'
import LoadingWrapper from '../LoadingWrapper.tsx'
import useGetData from '../../hooks/useGetData.ts'
import { type IChannelDetails } from '../../types.ts'

import ChannelHeader from './ChannelHeader.tsx'
import Messages from '../messages/Messages.tsx'

export default function Channel (): JSX.Element {
  const { channelId } = useParams()
  const { loading, error, data, getData } = useGetData<IChannelDetails>(
    `/channel/${channelId}`
  )

  useDocumentTitle(data?.title ?? 'Finding camp...')

  return data === null
    ? (
      <LoadingWrapper
        loadingMessage="Finding camp..."
        loading={loading}
        error={error}
      />
      )
    : (
      <>
        <ChannelHeader channel={data} onSuccess={() => { void getData(false) }} />
        <Messages
          channelId={data.id}
          yourId={data.currentUser.id}
          yourDisplayName={data.currentUser.displayName ?? data.currentUser.username}
        />
      </>
      )
}
