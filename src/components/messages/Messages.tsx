import { useEffect } from 'react'
import socket from '../../socketConfig.ts'
import useGetData from '../../hooks/useGetData.ts'
import LoadingWrapper from '../LoadingWrapper.tsx'
import MessagesList from './MessagesList.tsx'
import MessageCompose from './MessageComponse.tsx'
import { type IMessage } from '../../types.ts'

export default function Messages ({ channelId }: {
  channelId: string
}): JSX.Element {
  const { loading, error, data } = useGetData<IMessage[]>(
    `http://localhost:3000/channel/${channelId}/messages`
  )

  useEffect(() => {
    socket.emit('viewing channel', channelId)
    return () => {
      socket.emit('leaving channel', channelId)
    }
  }, [])

  return data === null
    ? (
      <LoadingWrapper
        loadingMessage="Gathering messages..."
        loading={loading}
        error={error}
      />
      )
    : (
      <>
        <MessagesList messageData={data} />
        <MessageCompose channelId={channelId} />
      </>
      )
}
