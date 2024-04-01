import { useState } from 'react'
// import useChannels from '../../hooks/useChannels.ts'
import useGetData from '../../hooks/useGetData.ts'
import LoadingWrapper from '../LoadingWrapper.tsx'
import ChannelsHeader from './ChannelsHeader.tsx'
import ChannelsSearch from './ChannelsSearch.tsx'
import ChannelsList from './ChannelsList.tsx'
import { type IChannel, type IChannelFilter } from '../../types.ts'

export default function ChannelList (): JSX.Element {
  const {
    loading, error, data, getData
  } = useGetData<IChannel[]>('http://localhost:3000/channels')

  const [filter, setFilter] = useState<IChannelFilter>({ title: '', mustBeAdmin: false })

  return data === null
    ? (
      <LoadingWrapper
        loadingMessage="Gathering your camps..."
        loading={loading}
        error={error}
      />
      )
    : (
      <>
        <ChannelsHeader refreshChannels={() => { void getData(false) }} />
        <ChannelsList channels={data} filter={filter} />
        <ChannelsSearch filter={filter} setFilter={setFilter} />
      </>
      )
}
