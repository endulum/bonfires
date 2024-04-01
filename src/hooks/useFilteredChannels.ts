import { useEffect, useState } from 'react'
import { type IChannel, type IChannelFilter } from '../types.ts'

export default function useFilteredChannels (
  userId: string,
  channels: IChannel[],
  filter: IChannelFilter
): IChannel[] {
  const [filteredChannels, setFilteredChannels] = useState<IChannel[]>(
    () => filterChannels()
  )

  function filterChannels (): IChannel[] {
    return channels.filter((channel) => {
      const matchesTitle = channel.title.toLowerCase()
        .includes(filter.title.toLowerCase())
      const matchesAdmin = channel.adminId === userId
      return filter.mustBeAdmin ? (matchesTitle && matchesAdmin) : matchesTitle
    })
  }

  useEffect(() => { setFilteredChannels(() => filterChannels()) }, [filter])

  return filteredChannels
}
