import { UserCredentials } from '../models/user.model'

export const userService = {
  getDefaultCredentials,
}

function getDefaultCredentials(isNewUser: boolean = true): UserCredentials {
  return {
    username: '',
    password: '',
    ...(isNewUser && { fullName: '' }),
  }
}
