export interface UserCredentials {
  username: string
  password: string
  fullName?: string
}

type SecuredUser = Omit<UserCredentials, 'password'>

export interface User extends Required<SecuredUser> {
  _id: string
  isAdmin: false
}
