import { type IChannelDetails } from '../../types.ts'
import DropdownMenu from '../DropdownMenu.tsx'
import ChannelHeaderMenuItems from './ChannelHeaderMenuItems.tsx'

import GearSvg from '../../assets/icons/gear-solid.svg?react'

export default function ChannelHeader ({ channel, onSuccess }: {
  channel: IChannelDetails
  onSuccess: () => void
}): JSX.Element {
  return (
    <div className="header-bar">
      <h2 className="header-bar-text">{channel.title}</h2>
      <DropdownMenu menuItems={ChannelHeaderMenuItems(channel, onSuccess)} isInHeaderBar>
        <GearSvg className="button-svg" />
        <span>Settings</span>
      </DropdownMenu>
    </div>
  )
}
