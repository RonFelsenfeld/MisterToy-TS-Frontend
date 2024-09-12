export interface UserCredentials {
  username: string
  password: string
  fullName?: string
}

export interface User extends Omit<UserCredentials, 'password'> {
  _id: string
}
