import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as apolloService from '../../services/apollo-client.service'
import { userService } from '../../services/user.service'

import { User, UserCredentials } from '../../models/user.model'
import { LoginResponse } from '../../models/server.model'

interface SystemState {
  loggedInUser: User | null
}

const initialState: SystemState = {
  loggedInUser: null,
}

export const handleLogin = createAsyncThunk(
  'systemModule/handleLogin',
  async (credentials: UserCredentials) => {
    const mutationOptions = {
      mutation: userService.login,
      variables: { credentials: userService.encryptCredentials(credentials) },
    }
    const { data } = await apolloService.client.mutate<LoginResponse>(mutationOptions)
    console.log(data)
  }
)

export const handleSignup = createAsyncThunk(
  'systemModule/handleSignup',
  async (credentials: UserCredentials) => {
    const mutationOptions = {
      mutation: userService.signup,
      variables: { credentials: userService.encryptCredentials(credentials) },
    }

    const { data } = await apolloService.client.mutate<LoginResponse>(mutationOptions)
    console.log(data)
  }
)

const systemSlice = createSlice({
  name: 'systemModule',
  initialState,
  reducers: {},
})

// export const {} = systemSlice.actions
export default systemSlice.reducer
