import { gql } from '@apollo/client'
import { UserCredentials } from '../models/user.model'

// ! Queries and Mutations (from GraphQL server)

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

function getDefaultCredentials(isNewUser: boolean): UserCredentials {
  return {
    username: '',
    password: '',
    ...(isNewUser && { fullName: '' }),
  }
}

////////////////////////////////////////////////////

// ! Exporting Mutations and Methods as userService

export const userService = {
  getById,
  getDefaultCredentials,
}
