import { Link, useOutletContext } from 'react-router-dom'
import useFilteredChannels from '../../hooks/useFilteredChannels.ts'
import { type IUserData, type IChannel, type IChannelFilter } from '../../types.ts'

import FireSvg from '../../assets/icons/fire-solid.svg?react'
import PersonSvg from '../../assets/icons/user-solid.svg?react'
import PeopleSvg from '../../assets/icons/users-solid.svg?react'

export default function ChannelsList ({ filter, channels }: {
  filter: IChannelFilter
  channels: IChannel[]
}): JSX.Element | JSX.Element[] {
  const { id } = useOutletContext<IUserData>()
  const filteredChannels = useFilteredChannels(id, channels, filter)

  return channels.length > 0
    ? (
      <div className="channels-wrapper">
        <div className="channels">
          {filteredChannels.length > 0
            ? filteredChannels.map((channel) => (
              <ChannelsListItem
                key={channel.id}
                channel={channel}
              />
            ))
            : <div className="expand"><i>No channels matched your filter.</i></div>}
        </div>
      </div>
      )
    : <div className="expand"><i>No camps to show. Start a new one?</i></div>
}

function ChannelsListItem ({ channel }: {
  channel: IChannel
}): JSX.Element {
  return (
    <Link to={`/channel/${channel.id}`} key={channel.id} className="channel">
      <FireSvg className="fire" />
      <div className="channel-details">
        <h3 className="channel-title">{channel.title}</h3>
        <div className="channel-status">
          <PeopleSvg className="inline-svg" />
          {channel.userCount}
          {channel.ownDisplayName !== null && (
          <>
            <span>
              {' '}
              |
              {' '}
            </span>
            <PersonSvg className="inline-svg" />
            <span className="channel-displayname">
              &quot;
              {channel.ownDisplayName}
              &quot;
            </span>
          </>
          )}
        </div>
      </div>
    </Link>
  )
}
