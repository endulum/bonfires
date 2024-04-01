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
