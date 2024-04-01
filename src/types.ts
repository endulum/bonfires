export type FormErrors = Array<{
  path: string
  value: string
  msg: string
}>

export interface IUserData {
  username: string
  id: string
}

export type MenuItems = Array<{
  title: string
  icon?: JSX.Element
  element?: JSX.Element
  function?: () => void
} | false>

export interface IChannel {
  id: string
  title: string
  adminId: string
  userCount: number
  ownDisplayName: string
}

export interface IChannelFilter {
  title: string
  mustBeAdmin: boolean
}

export interface IChannelDetails {
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

export interface IMessage {
  id: string
  content: string
  user: {
    username: string
    id: string
    displayName: string | null
    isAdmin: boolean
    isInChannel: boolean
  }
  timestamp: string
}
