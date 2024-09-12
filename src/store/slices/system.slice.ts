import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as apolloService from '../../services/apollo-client.service'
import { authService } from '../../services/auth.service'

import { User, UserCredentials } from '../../models/user.model'
import { AuthMutationType, LoginResponse } from '../../models/server.model'

interface SystemState {
  loggedInUser: User | null
}

const initialState: SystemState = {
  loggedInUser: null,
}

export const handleLogin = createAsyncThunk(
  'systemModule/handleLogin',
  async (credentials: UserCredentials) => {
    const mutationOptions = authService.getAuthMutationOptions(AuthMutationType.Login, credentials)

    const { data } = await apolloService.client.mutate<LoginResponse>(mutationOptions)
    console.log(data)
  }
)

export const handleSignup = createAsyncThunk(
  'systemModule/handleSignup',
  async (credentials: UserCredentials) => {
    const mutationOptions = authService.getAuthMutationOptions(AuthMutationType.Signup, credentials)

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
