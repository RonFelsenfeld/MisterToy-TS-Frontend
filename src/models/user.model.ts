export interface UserCredentials {
  username: string
  password: string
  fullName?: string
}

export interface User extends Required<Omit<UserCredentials, 'password'>> {
  _id: string
}
