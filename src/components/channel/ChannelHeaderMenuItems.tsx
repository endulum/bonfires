import { useOutletContext, useNavigate } from 'react-router-dom'
import APIForm from '../APIForm.tsx'
import { type IUserData, type IChannelDetails, type MenuItems } from '../../types.ts'

import EditSvg from '../../assets/icons/pen-to-square-solid.svg?react'
import EditUserSvg from '../../assets/icons/user-pen-solid.svg?react'
import AddUserSvg from '../../assets/icons/user-plus-solid.svg?react'
import RemoveUserSvg from '../../assets/icons/user-xmark-solid.svg?react'
import PromoteUserSvg from '../../assets/icons/user-shield-solid.svg?react'
import LeaveSvg from '../../assets/icons/right-from-bracket-solid.svg?react'
import InfoParagraph from '../InfoParagraph.tsx'

export default function ChannelHeaderMenuItems (
  channel: IChannelDetails,
  onSuccess: () => void
): MenuItems {
  const { id } = useOutletContext<IUserData>()
  const navigate = useNavigate()
  return [
    channel.adminId === id && {
      title: 'Edit Channel',
      icon: (<EditSvg />),
      element: (
        <APIForm
          endpoint={{
            url: `http://localhost:3000/channel/${channel.id}`,
            method: 'PUT'
          }}
          onSuccess={onSuccess}
        >
          <h3>Edit Channel Details</h3>
          <label htmlFor="title">
            <span>Channel Title</span>
            <input type="text" id="title" defaultValue={channel.title} />
          </label>
          <button type="submit" className="button">Submit</button>
        </APIForm>
      )
    }, {
      title: 'Edit Display Name',
      icon: (<EditUserSvg />),
      element: (
        <APIForm
          endpoint={{
            url: `http://localhost:3000/channel/${channel.id}/name`,
            method: 'POST'
          }}
          onSuccess={onSuccess}
        >
          <h3>Change Display Name</h3>
          <InfoParagraph type="neutral">
            Your display name is your custom name for this channel
            {' '}
            that will be shown in place of your username. Submit blank
            {' '}
            to use your username.
          </InfoParagraph>
          <label htmlFor="displayName">
            <span>Display Name</span>
            <input type="text" id="displayName" defaultValue={channel.currentUser.displayName ?? ''} />
          </label>
          <button type="submit" className="button">Change</button>
        </APIForm>
      )
    }, {
      title: 'Invite a User',
      icon: (<AddUserSvg />),
      element: (
        <APIForm
          endpoint={{
            url: `http://localhost:3000/channel/${channel.id}/invite`,
            method: 'POST'
          }}
          onSuccess={onSuccess}
        >
          <h3>Invite a User</h3>
          <label htmlFor="username">
            <span>Username</span>
            <input type="text" id="username" />
          </label>
          <button type="submit" className="button">Invite</button>
        </APIForm>
      )
    }, channel.adminId === id && channel.userIds.length > 1 && {
      title: 'Kick a User',
      icon: (<RemoveUserSvg />),
      element: (
        <APIForm
          endpoint={{
            url: `http://localhost:3000/channel/${channel.id}/kick`,
            method: 'POST'
          }}
          onSuccess={onSuccess}
        >
          <h3>Kick a User</h3>
          <InfoParagraph type="warning">
            The user will be removed from the channel.
            {' '}
            They cannot re-enter this channel unless invited back in.
          </InfoParagraph>
          <label htmlFor="username">
            <span>Username</span>
            <input type="text" id="username" />
          </label>
          <button type="submit" className="button">Kick</button>
        </APIForm>
      )
    }, channel.adminId === id && channel.userIds.length > 1 && {
      title: 'Promote a User',
      icon: (<PromoteUserSvg />),
      element: (
        <APIForm
          endpoint={{
            url: `http://localhost:3000/channel/${channel.id}/promote`,
            method: 'POST'
          }}
          onSuccess={onSuccess}
        >
          <h3>Promote a User</h3>
          <InfoParagraph type="neutral">
            This will remove your admin privileges and
            {' '}
            bestow them to another member of this channel.
          </InfoParagraph>
          <label htmlFor="username">
            <span>Username</span>
            <input type="text" id="username" />
          </label>
          <button type="submit" className="button">Promote</button>
        </APIForm>
      )
    }, {
      title: 'Leave this Channel',
      icon: (<LeaveSvg />),
      element: (
        <APIForm
          endpoint={{
            url: `http://localhost:3000/channel/${channel.id}`,
            method: 'DELETE'
          }}
          onSuccess={() => { navigate('/') }}
        >
          <h3>Leave Channel</h3>
          {channel.userIds.length === 1
            ? (
              <InfoParagraph type="warning">
                You are currently the only user left.
                {' '}
                If you leave and no other members remain,
                {' '}
                this channel and all its messages will be permanently deleted.
              </InfoParagraph>
              )
            : (
              <InfoParagraph type="neutral">
                You will be removed from this channel,
                {' '}
                and will not be able to re-enter until
                {' '}
                you are invited back in.
              </InfoParagraph>
              )}
          <button type="submit" className="button">Leave</button>
        </APIForm>
      )
    }
  ]
}
