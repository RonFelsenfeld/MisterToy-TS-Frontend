import { gql } from '@apollo/client'
import CryptoJS from 'crypto-js'
import { UserCredentials } from '../models/user.model'

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

const getById = gql`
  query UserQuery($_id: ID!) {
    user(_id: $_id) {
      _id
      fullName
      username
    }
  }
`

////////////////////////////////////////////////////

// ! Service Methods

function logout() {
  // TODO: Implement logout logic
}

function getDefaultCredentials(isNewUser: boolean): UserCredentials {
  return {
    username: '',
    password: '',
    ...(isNewUser && { fullName: '' }),
  }
}

function encryptCredentials(credentials: UserCredentials): UserCredentials {
  const encryptedPassword = _encryptPassword(credentials.password)
  return { ...credentials, password: encryptedPassword }
}

////////////////////////////////////////////////////

// ! Exporting Queries, Mutations and Methods as userService

export const userService = {
  login,
  signup,
  getById,
  logout,
  getDefaultCredentials,
  encryptCredentials,
}

////////////////////////////////////////////////////

// ! Private Methods

function _encryptPassword(password: string) {
  const cryptoSecretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY
  const encryptedPassword = CryptoJS.AES.encrypt(password, cryptoSecretKey)
  return encryptedPassword.toString()
}
