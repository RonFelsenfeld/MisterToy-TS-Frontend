import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { toyService } from '../../services/toy.service'
import { client } from '../../services/apolloClient.service'

import { Toy, ToyFilterBy, ToySortBy } from '../../models/toy.model'
import {
  ClientMutation,
  ClientQuery,
  GetToyByIdResponse,
  GetToysResponse,
  ToysQueryOptions,
} from '../../models/server.model'

interface ToyState {
  toys: Toy[]
  filterBy: ToyFilterBy
  sortBy: ToySortBy
}

const initialState: ToyState = {
  toys: [],
  filterBy: toyService.getDefaultFilterBy(),
  sortBy: toyService.getDefaultSortBy(),
}

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
        state.toys = state.toys.filter(t => t._id !== toyId)
      })

      .addCase(saveToy.fulfilled, (state, action: PayloadAction<Toy>) => {
        const { payload } = action
        const toyIndex = state.toys.findIndex(t => t._id === payload._id)
        console.log(`payload`, payload)

        if (toyIndex < 0) {
          console.log('ADDING')
          state.toys.push(payload)
        } else {
          console.log('UPDATING')
          state.toys[toyIndex] = payload
        }
      })
  },
})

export const loadToys = createAsyncThunk(
  'toyModule/loadToys',
  async ({ filterBy, sortBy }: ToysQueryOptions) => {
    try {
      const queryOptions: ClientQuery = {
        query: toyService.query,
        variables: { filterBy, sortBy },
      }

      const { data } = await client.query<GetToysResponse>(queryOptions)
      return data.toys
    } catch (err) {
      console.log('Toy Slice -> Had issues with loading toys:', err)
      throw err
    }
  }
)

export const removeToy = createAsyncThunk('toyModule/removeToy', async (toyId: string) => {
  try {
    const mutationOptions: ClientMutation = {
      mutation: toyService.remove,
      variables: { toyId },
    }
    await client.mutate(mutationOptions)
    return toyId
  } catch (err) {
    console.log('Toy Slice -> Had issues with removing toy:', err)
    throw err
  }
})

export const saveToy = createAsyncThunk('toyModule/saveToy', async (toy: Toy) => {
  try {
    const mutationOptions: ClientMutation = {
      mutation: toy._id ? toyService.update : toyService.add,
      variables: { toy },
    }

    const { data } = await client.mutate<GetToyByIdResponse>(mutationOptions)
    if (!data) throw new Error('Toy Slice -> No toy returned from server')
    return data.addToy || data.updateToy
  } catch (err) {
    console.log('Toy Slice -> Had issues with saving toy:', err)
    throw err
  }
})

export const { setFilterBy, setSortBy } = toySlice.actions
export default toySlice.reducer
