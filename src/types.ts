export type FormErrors = Array<{
  path: string
  value: string
  msg: string
}>

export interface UserDetail {
  username: string
  id: string
}
