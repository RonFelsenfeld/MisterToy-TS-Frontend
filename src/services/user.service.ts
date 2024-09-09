import { UserCredentials } from '../models/user.model'

export const userService = {
  getDefaultCredentials,
}

function getDefaultCredentials(): UserCredentials {
  return {
    username: '',
    password: '',
    fullName: '',
  }
}
