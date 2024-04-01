import { useParams } from 'react-router-dom'
import LoadingWrapper from '../LoadingWrapper.tsx'
import useGetData from '../../hooks/useGetData.ts'

export default function ChannelView (): JSX.Element {
  const { channelId } = useParams()
  const { loading, error, data, getData } = useGetData(
    `http://localhost:3000/channel/${channelId}`
  )

  return data === null
    ? (
      <LoadingWrapper
        loadingMessage="Finding camp..."
        loading={loading}
        error={error}
      />
      )
    : <p>yay</p>
}
