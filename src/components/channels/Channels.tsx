import useChannels from '../../hooks/useChannels.ts'
import LoadingWrapper from '../LoadingWrapper.tsx'
import ChannelsHeader from './ChannelsHeader.tsx'

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
      <ChannelsHeader refreshChannels={() => { void getChannels() }} />
      // <ChannelsList channels={channels} />
      )
}
