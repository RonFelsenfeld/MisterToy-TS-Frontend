import CryptoJS from 'crypto-js'
import { DocumentNode, gql, MutationOptions } from '@apollo/client'
import { utilService } from './util.service'

import { UserCredentials } from '../models/user.model'
import { AuthMutationType } from '../models/server.model'

// ! Queries and Mutations (from GraphQL server)

const login = gql`
  mutation Login($credentials: LoginInput!) {
    login(credentials: $credentials) {
      token
      user {
        _id
        username
        fullName
      }
    }
  }
`

const signup = gql`
  mutation Signup($credentials: SignupInput!) {
    signup(credentials: $credentials) {
      token
      user {
        fullName
        username
        _id
      }
    }
  }
`

const logout = gql`
  mutation Logout {
    logout {
      msg
    }
  }
`

////////////////////////////////////////////////////

// ! Service Methods

function getAuthMutationOptions(type: AuthMutationType, credentials?: UserCredentials) {
  let mutation: DocumentNode

  switch (type) {
    case AuthMutationType.Login:
      mutation = login
      break
    case AuthMutationType.Signup:
      mutation = signup
      break
    case AuthMutationType.Logout:
      mutation = logout
      break
    default:
      throw new Error(`Unsupported mutation type: ${type}`)
  }

  const mutationOptions: MutationOptions = { mutation }

  if (credentials) mutationOptions.variables = { credentials: _encryptCredentials(credentials) }
  return mutationOptions
}

function saveAuthToken(token: string) {
  utilService.saveToStorage('authToken', token)
}

////////////////////////////////////////////////////

// ! Exporting Mutations and Methods as userService

export const authService = {
  login,
  signup,
  logout,
  getAuthMutationOptions,
  saveAuthToken,
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
