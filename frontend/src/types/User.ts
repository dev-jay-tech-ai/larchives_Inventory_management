export type User = {
  _id: string
  name: string
  email: string
  token: string
  isAdmin: boolean
  file: string
}

export type UserInfo = {
  name: string
  email: string
  token: string
  isAdmin: boolean
}