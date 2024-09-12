import CryptoJS from 'crypto-js'
import { MutationOptions } from '@apollo/client'

import { userService } from './user.service'
import { UserCredentials } from '../models/user.model'
import { AuthMutationType } from '../models/server.model'
import { utilService } from './util.service'

export const authService = {
  getAuthMutationOptions,
  saveAuthToken,
}

function getAuthMutationOptions(type: AuthMutationType, credentials: UserCredentials) {
  const { login, signup } = userService
  const mutationOptions: MutationOptions = {
    mutation: type === AuthMutationType.Login ? login : signup,
    variables: { credentials: _encryptCredentials(credentials) },
  }

  return mutationOptions
}

function saveAuthToken(token: string) {
  utilService.saveToStorage('authToken', token)
}

////////////////////////////////////////////////////

// ! Private Methods
function _encryptCredentials(credentials: UserCredentials): UserCredentials {
  const encryptedPassword = _encryptPassword(credentials.password)
  return { ...credentials, password: encryptedPassword }
}

function _encryptPassword(password: string) {
  const cryptoSecretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY
  const encryptedPassword = CryptoJS.AES.encrypt(password, cryptoSecretKey)
  return encryptedPassword.toString()
}
