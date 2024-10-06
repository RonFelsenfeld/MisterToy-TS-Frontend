import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as apolloService from '../../services/apollo-client.service'
import { toyService } from '../../services/toy.service'
import { RootState } from '../store'

import { Toy, ToyFilterBy, ToySortBy } from '../../models/toy.model'
import {
  GetToyByIdResponse,
  GetToysResponse,
  ToyMutationType,
  ToyQueryTypes,
  ToysQueryOptions,
} from '../../models/server.model'

interface ToyState {
  toys: Toy[] | null
  filterBy: ToyFilterBy
  sortBy: ToySortBy
}

const initialState: ToyState = {
  toys: null,
  filterBy: toyService.getDefaultFilterBy(),
  sortBy: toyService.getDefaultSortBy(),
}

export const loadToys = createAsyncThunk(
  'toyModule/loadToys',
  async ({ filterBy, sortBy }: ToysQueryOptions, { rejectWithValue }) => {
    try {
      const options = toyService.getQueryOptions(ToyQueryTypes.GetToys, { filterBy, sortBy })
      const { data, error } = await apolloService.client.query<GetToysResponse>(options)

      if (error) throw new Error(error.message)
      return data.toys
    } catch (err) {
      console.error('Toy Slice -> Had issues with loading toys:', err)
      return rejectWithValue(err)
    }
  }
)

export const removeToy = createAsyncThunk(
  'toyModule/removeToy',
  async (toyId: string, { getState, rejectWithValue }) => {
    const { filterBy, sortBy } = (getState() as RootState).toyModule

    try {
      const mutationType = ToyMutationType.RemoveToy
      const options = { filterBy, sortBy }

      const updateCacheFn = apolloService.getUpdateCacheFn(mutationType, options, toyId)
      const mutationOptions = toyService.getMutationOptions(mutationType, updateCacheFn, { toyId })

      await apolloService.client.mutate(mutationOptions)
      return toyId
    } catch (err) {
      console.error('Toy Slice -> Had issues with removing toy:', err)
      return rejectWithValue(err)
    }
  }
)

export const saveToy = createAsyncThunk(
  'toyModule/saveToy',
  async (toy: Toy, { getState, rejectWithValue }) => {
    const { filterBy, sortBy } = (getState() as RootState).toyModule

    try {
      const options = { filterBy, sortBy }
      const mutationType = toy._id ? ToyMutationType.UpdateToy : ToyMutationType.AddToy

      const updateCacheFn = apolloService.getUpdateCacheFn(mutationType, options)
      const mutationOptions = toyService.getMutationOptions(mutationType, updateCacheFn, { toy })

      const { data } = await apolloService.client.mutate<GetToyByIdResponse>(mutationOptions)
      if (!data) throw new Error('Toy Slice -> No toy returned from server')
      return toy._id ? data.updateToy : data.addToy
    } catch (err) {
      console.error('Toy Slice -> Had issues with saving toy:', err)
      return rejectWithValue(err)
    }
  }
)

const toySlice = createSlice({
  name: 'toyModule',
  initialState,
  reducers: {
    setFilterBy: (state, action: PayloadAction<ToyFilterBy>) => {
      state.filterBy = action.payload
    },
    setSortBy: (state, action: PayloadAction<ToySortBy>) => {
      state.sortBy = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadToys.fulfilled, (state, action: PayloadAction<Toy[]>) => {
        state.toys = action.payload
      })

      .addCase(removeToy.fulfilled, (state, action: PayloadAction<string>) => {
        const { payload: toyId } = action
        state.toys = state.toys!.filter(t => t._id !== toyId)
      })

      .addCase(saveToy.fulfilled, (state, action: PayloadAction<Toy>) => {
        if (!state.toys) return

        const { payload } = action
        const toyIndex = state.toys.findIndex(t => t._id === payload._id)

        if (toyIndex < 0) state.toys.push(payload)
        else state.toys[toyIndex] = payload
      })
  },
})

export const { setFilterBy, setSortBy } = toySlice.actions
export default toySlice.reducer
