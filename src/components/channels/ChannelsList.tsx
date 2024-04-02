import { Link, useOutletContext } from 'react-router-dom'
import useFilteredChannels from '../../hooks/useFilteredChannels.ts'
import { type IUserData, type IChannel, type IChannelFilter } from '../../types.ts'

// import FireSvg from '../../assets/icons/fire-solid.svg?react'
import CampSvg from '../../assets/icons/campground-solid.svg?react'
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
        {filteredChannels.length > 0
          ? (
            <div className="channels">
              {filteredChannels.map((channel) => (
                <ChannelsListItem
                  key={channel.id}
                  channel={channel}
                />
              ))}
            </div>
            )
          : <div className="expand"><i>No channels matched your filter.</i></div>}
      </div>
      )
    : <div className="expand"><i>No camps to show. Start a new one?</i></div>
}

function ChannelsListItem ({ channel }: {
  channel: IChannel
}): JSX.Element {
  return (
    <Link to={`/channel/${channel.id}`} key={channel.id} className="channel">
      <CampSvg className="fire" />
      <div className="channel-details">
        <h3 className="channel-title">{channel.title}</h3>
        <div className="channel-status">
          <PeopleSvg className="inline-svg" title="Amount of users in camp" />
          {channel.userCount}
          {channel.ownDisplayName !== null && (
          <>
            <b className="channel-status-spacer">|</b>
            <PersonSvg className="inline-svg" title="Your chosen display name for this camp" />
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
