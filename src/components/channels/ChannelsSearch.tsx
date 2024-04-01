import { type Dispatch, type SetStateAction } from 'react'
import { type IChannelFilter } from '../../types.ts'

export default function ChannelsSearch ({ filter, setFilter }: {
  filter: IChannelFilter
  setFilter: Dispatch<SetStateAction<IChannelFilter>>
}): JSX.Element {
  return (
    <div className="channels-search">
      <input
        className="label-text-input channels-search-title"
        type="text"
        placeholder="Filter by title..."
        aria-label="Filter by channel title"
        onChange={(event) => { setFilter({ ...filter, title: event.target.value }) }}
      />
      <label htmlFor="channelAdmin" className="channels-search-admin">
        <span>Is Admin?</span>
        <input
          type="checkbox"
          id="channelAdmin"
          onChange={(event) => { setFilter({ ...filter, mustBeAdmin: event.target.checked }) }}
        />
      </label>
    </div>
  )
}
