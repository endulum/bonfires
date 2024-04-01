import { useState } from 'react'
import useChannels from '../../hooks/useChannels.ts'
import LoadingWrapper from '../LoadingWrapper.tsx'
import ChannelsHeader from './ChannelsHeader.tsx'
import ChannelsSearch from './ChannelsSearch.tsx'
import ChannelsList from './ChannelsList.tsx'
import { type IChannelFilter } from '../../types.ts'

export default function ChannelList (): JSX.Element {
  const {
    loading, error, channels, getChannels
  } = useChannels()

  const [filter, setFilter] = useState<IChannelFilter>({ title: '', mustBeAdmin: false })

  return channels === null
    ? (
      <LoadingWrapper
        loadingMessage="Gathering your camps..."
        loading={loading}
        error={error}
      />
      )
    : (
      <>
        <ChannelsHeader refreshChannels={() => { void getChannels() }} />
        <ChannelsList channels={channels} filter={filter} />
        <ChannelsSearch filter={filter} setFilter={setFilter} />
      </>
      )
}
