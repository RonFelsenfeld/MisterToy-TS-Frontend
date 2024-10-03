import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as apolloService from '../../services/apollo-client.service'
import { authService } from '../../services/auth.service'

import { User, UserCredentials } from '../../models/user.model'
import { AuthMutationType, AuthResponse, LogoutResponse } from '../../models/server.model'
import { UserMessage } from '../../models/event.model'

interface SystemState {
  loggedInUser: User | null
  userMsg: UserMessage | null
}

const initialState: SystemState = {
  loggedInUser: null,
  userMsg: null,
}

export const handleLogin = createAsyncThunk(
  'systemModule/handleLogin',
  async (credentials: UserCredentials) => {
    try {
      const mutationOptions = authService.getAuthMutationOptions(
        AuthMutationType.Login,
        credentials
      )

      const { data } = await apolloService.client.mutate<AuthResponse>(mutationOptions)
      return data?.login as User
    } catch (err) {
      console.error('System Slice -> Had issues with logging in:', err)
      throw err
    }
  }
)

export const handleSignup = createAsyncThunk(
  'systemModule/handleSignup',
  async (credentials: UserCredentials) => {
    try {
      const mutationOptions = authService.getAuthMutationOptions(
        AuthMutationType.Signup,
        credentials
      )

      const { data } = await apolloService.client.mutate<AuthResponse>(mutationOptions)
      return data?.signup as User
    } catch (err) {
      console.error('System Slice -> Had issues with signing up:', err)
      throw err
    }
  }
)

export const handleLogout = createAsyncThunk('systemModule/handleLogout', async () => {
  try {
    const mutationOptions = authService.getAuthMutationOptions(AuthMutationType.Logout)

    const { data } = await apolloService.client.mutate<LogoutResponse>(mutationOptions)
    return data?.logout?.msg as string
  } catch (err) {
    console.error('System Slice -> Had issues with logging out:', err)
    throw err
  }
})

// ! Fetching the logged-in user from the server
export const fetchLoggedInUser = createAsyncThunk('systemModule/fetchLoggedInUser', async () => {
  try {
    const mutationOptions = authService.getAuthMutationOptions(AuthMutationType.FetchLoggedInUser)

    const { data } = await apolloService.client.mutate<AuthResponse>(mutationOptions)
    return data?.fetchLoggedInUser || null
  } catch (err) {
    console.error('System Slice -> Had issues with fetching logged in user:', err)
    throw err
  }
})

const systemSlice = createSlice({
  name: 'systemModule',
  initialState,
  reducers: {
    showSuccessMessage: (state, action: PayloadAction<string>) => {
      state.userMsg = { type: 'success', msg: action.payload }
    },
    showErrorMessage: (state, action: PayloadAction<string>) => {
      state.userMsg = { type: 'error', msg: action.payload }
    },
    hideUserMsg: state => {
      state.userMsg = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleLogin.fulfilled, handleSuccessfulAuth)
      .addCase(handleSignup.fulfilled, handleSuccessfulAuth)
      .addCase(handleLogout.fulfilled, state => {
        state.loggedInUser = null
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.loggedInUser = action.payload
      })
  },
})

function handleSuccessfulAuth(state: SystemState, action: PayloadAction<User>) {
  state.loggedInUser = action.payload
}

export const { showSuccessMessage, showErrorMessage, hideUserMsg } = systemSlice.actions
export default systemSlice.reducer
