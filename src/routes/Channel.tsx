import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'
import useFetch from '../useFetch.ts'
import LoadingWrapper from '../components/LoadingWrapper.tsx'
import APIForm from '../components/APIForm.tsx'
import DropdownMenu from '../components/DropdownMenu.tsx'
import MessagesView from './Messages.tsx'
import { type UserDetail } from '../types.ts'

import GearSvg from '../icons/gear-solid.svg?react'
import AddUserSvg from '../icons/user-plus-solid.svg?react'
import RemoveUserSvg from '../icons/user-xmark-solid.svg?react'
import PromoteUserSvg from '../icons/user-shield-solid.svg?react'
import EditUserSvg from '../icons/user-pen-solid.svg?react'
import LeaveSvg from '../icons/right-from-bracket-solid.svg?react'
import EditSvg from '../icons/pen-to-square-solid.svg?react'

interface IChannelView {
  id: string
  title: string
  currentUser: {
    id: string
    username: string
    displayName: string | null
  }
  adminId: string
  userIds: string[]
}

export default function ChannelView (): JSX.Element | undefined {
  const token = useReadLocalStorage<string>('token')
  const channelId = useParams().channel

  const {
    data, loading, error, fetchData
  } = useFetch<IChannelView>(
    true,
    `http://localhost:3000/channel/${channelId}`,
    {
      method: 'GET',
      headers: token !== null
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    }
  )

  function handleSuccess (): void {
    void fetchData()
  }

  return (data === null || channelId === undefined
    ? <LoadingWrapper loading={loading} loadingMessage="Finding channel..." error={error} />
    : (
      <>
        <div className="header-bar">
          <h2>{data.title}</h2>
          <ChannelActionsModal
            channelData={data}
            channelId={channelId}
            onSuccess={handleSuccess}
          />
        </div>
        <MessagesView
          channelId={channelId}
          yourDisplayName={data.currentUser.displayName ?? data.currentUser.username}
        />
      </>
      ))
}

function ChannelActionsModal ({ channelData, channelId, onSuccess }: {
  channelData: IChannelView
  channelId: string | undefined
  onSuccess: () => void
}): JSX.Element {
  const { id } = useOutletContext<UserDetail>()
  const navigate = useNavigate()
  return (
    <DropdownMenu
      menuItems={[
        channelData.adminId === id && {
          title: 'Edit Channel',
          icon: (<EditSvg />),
          element: (
            <APIForm
              endpoint={{
                url: `http://localhost:3000/channel/${channelId}`,
                method: 'PUT'
              }}
              onSuccess={onSuccess}
            >
              <h3>Edit Channel Details</h3>
              <label htmlFor="title">
                <span>Channel Title</span>
                <input type="text" id="title" defaultValue={channelData.title} />
              </label>
              <button type="submit">Submit</button>
            </APIForm>
          )
        }, {
          title: 'Edit Display Name',
          icon: (<EditUserSvg />),
          element: (
            <APIForm
              endpoint={{
                url: `http://localhost:3000/channel/${channelId}/name`,
                method: 'POST'
              }}
              onSuccess={onSuccess}
            >
              <h3>Change Display Name</h3>
              <p className="form-info">
                Your display name is your custom name for this channel
                {' '}
                that will be shown in place of your username. Submit blank
                {' '}
                to use your username.
              </p>
              <label htmlFor="displayName">
                <span>Display Name</span>
                <input type="text" id="displayName" defaultValue={channelData.currentUser.displayName ?? ''} />
              </label>
              <button type="submit">Change</button>
            </APIForm>
          )
        }, {
          title: 'Invite a User',
          icon: (<AddUserSvg />),
          element: (
            <APIForm
              endpoint={{
                url: `http://localhost:3000/channel/${channelId}/invite`,
                method: 'POST'
              }}
              onSuccess={onSuccess}
            >
              <h3>Invite a User</h3>
              <label htmlFor="username">
                <span>Username</span>
                <input type="text" id="username" />
              </label>
              <button type="submit">Invite</button>
            </APIForm>
          )
        }, channelData.adminId === id && channelData.userIds.length > 1 && {
          title: 'Kick a User',
          icon: (<RemoveUserSvg />),
          element: (
            <APIForm
              endpoint={{
                url: `http://localhost:3000/channel/${channelId}/kick`,
                method: 'POST'
              }}
              onSuccess={onSuccess}
            >
              <h3>Kick a User</h3>
              <p className="form-info">
                The user will be removed from the channel.
                {' '}
                They cannot re-enter this channel unless invited back in.
              </p>
              <label htmlFor="username">
                <span>Username</span>
                <input type="text" id="username" />
              </label>
              <button type="submit">Kick</button>
            </APIForm>
          )
        }, channelData.adminId === id && channelData.userIds.length > 1 && {
          title: 'Promote a User',
          icon: (<PromoteUserSvg />),
          element: (
            <APIForm
              endpoint={{
                url: `http://localhost:3000/channel/${channelId}/promote`,
                method: 'POST'
              }}
              onSuccess={onSuccess}
            >
              <h3>Promote a User</h3>
              <p className="form-info">
                This will remove your admin privileges and
                {' '}
                bestow them to another member of this channel.
              </p>
              <label htmlFor="username">
                <span>Username</span>
                <input type="text" id="username" />
              </label>
              <button type="submit">Promote</button>
            </APIForm>
          )
        }, {
          title: 'Leave this Channel',
          icon: (<LeaveSvg />),
          element: (
            <APIForm
              endpoint={{
                url: `http://localhost:3000/channel/${channelId}`,
                method: 'DELETE'
              }}
              onSuccess={() => { navigate('/') }}
            >
              <h3>Leave Channel</h3>
              {channelData.userIds.length === 1
                ? (
                  <p className="form-info">
                    You are currently the only user left.
                    {' '}
                    If you leave and no other members remain,
                    {' '}
                    this channel and all its messages will be permanently deleted.
                  </p>
                  )
                : (
                  <p className="form-info">
                    You will be removed from this channel,
                    {' '}
                    and will not be able to re-enter until
                    {' '}
                    you are invited back in.
                  </p>
                  )}
              <button type="submit">Leave</button>
            </APIForm>
          )
        }
      ]}
    >
      <GearSvg />
      <span>
        Settings
      </span>
    </DropdownMenu>
  )
}
