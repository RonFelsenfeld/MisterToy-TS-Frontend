import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as apolloService from '../../services/apollo-client.service'
import { authService } from '../../services/auth.service'

import { User, UserCredentials } from '../../models/user.model'
import {
  AuthMutationType,
  AuthResponse,
  AuthResponseData,
  LogoutResponse,
} from '../../models/server.model'

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

    const { data } = await apolloService.client.mutate<AuthResponse>(mutationOptions)
    return data?.login as AuthResponseData
  }
)

export const handleSignup = createAsyncThunk(
  'systemModule/handleSignup',
  async (credentials: UserCredentials) => {
    const mutationOptions = authService.getAuthMutationOptions(AuthMutationType.Signup, credentials)

    const { data } = await apolloService.client.mutate<AuthResponse>(mutationOptions)
    return data?.signup as AuthResponseData
  }
)

export const handleLogout = createAsyncThunk('systemModule/handleLogout', async () => {
  const mutationOptions = authService.getAuthMutationOptions(AuthMutationType.Logout)

  const { data } = await apolloService.client.mutate<LogoutResponse>(mutationOptions)
  return data?.logout?.msg as string
})

const systemSlice = createSlice({
  name: 'systemModule',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleLogin.fulfilled, handleSuccessfulAuth)
      .addCase(handleSignup.fulfilled, handleSuccessfulAuth)
      .addCase(handleLogout.fulfilled, (state, action: PayloadAction<string>) => {
        console.log(action.payload)
        state.loggedInUser = null
      })
  },
})

function handleSuccessfulAuth(state: SystemState, action: PayloadAction<AuthResponseData>) {
  const { payload } = action
  console.log('LOGIN PAYLOAD:', payload)
  authService.saveAuthToken(payload.token)
  console.log(payload.user)
  state.loggedInUser = payload.user
}

// export const {} = systemSlice.actions
export default systemSlice.reducer
