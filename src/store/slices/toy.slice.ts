import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as apolloService from '../../services/apollo-client.service'
import { toyService } from '../../services/toy.service'
import { CacheUpdateFn } from '../../models/apollo.model'
import { Toy, ToyFilterBy, ToySortBy } from '../../models/toy.model'
import {
  GetToyByIdResponse,
  GetToysResponse,
  ToyMutationType,
  ToyQueryTypes,
  ToysQueryOptions,
} from '../../models/server.model'

import { RootState } from '../store'

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
  async ({ filterBy, sortBy }: ToysQueryOptions) => {
    try {
      const queryOptions = toyService.getQueryOptions(ToyQueryTypes.GetToys, { filterBy, sortBy })

      const { data, error } = await apolloService.client.query<GetToysResponse>(queryOptions)
      if (error) throw new Error(error.message)

      return data?.toys
    } catch (err) {
      console.error('Toy Slice -> Had issues with loading toys:', err)
      throw err
    }
  }
)

export const removeToy = createAsyncThunk(
  'toyModule/removeToy',
  async (toyId: string, { getState }) => {
    const { filterBy, sortBy } = (getState() as RootState).toyModule

    try {
      const updateCacheFn: CacheUpdateFn = cache => {
        const options = { filterBy, sortBy }
        const [cachedData, query] = apolloService.getToysFromCache({ cache, options })

        if (cachedData) {
          const toys = cachedData.toys.filter(t => t._id !== toyId)
          apolloService.updateToysCacheQuery({ cache, query, toys })
        }
      }

      const mutationOptions = toyService.getMutationOptions(
        ToyMutationType.RemoveToy,
        updateCacheFn,
        { toyId }
      )

      await apolloService.client.mutate(mutationOptions)
      return toyId
    } catch (err) {
      console.error('Toy Slice -> Had issues with removing toy:', err)
      throw err
    }
  }
)

export const saveToy = createAsyncThunk('toyModule/saveToy', async (toy: Toy, { getState }) => {
  const { filterBy, sortBy } = (getState() as RootState).toyModule

  try {
    const updateCacheFn: CacheUpdateFn = (cache, { data }) => {
      const options = { filterBy, sortBy }
      const [cachedData, query] = apolloService.getToysFromCache({ cache, options })

      if (cachedData) {
        let toysToRewrite: Toy[]

        if (toy._id) {
          const { updateToy } = data as { updateToy: Toy }
          toysToRewrite = cachedData.toys.map(t => (t._id === updateToy._id ? updateToy : t))
        } else {
          const { addToy } = data as { addToy: Toy }
          toysToRewrite = [...cachedData.toys, addToy]
        }

        const cacheOptions = { cache, query, toys: toysToRewrite, options }
        apolloService.updateToysCacheQuery(cacheOptions)
      }
    }

    const mutationType = toy._id ? ToyMutationType.UpdateToy : ToyMutationType.AddToy
    const mutationOptions = toyService.getMutationOptions(mutationType, updateCacheFn, { toy })

    const { data } = await apolloService.client.mutate<GetToyByIdResponse>(mutationOptions)
    if (!data) throw new Error('Toy Slice -> No toy returned from server')
    return data?.addToy || data?.updateToy
  } catch (err) {
    console.error('Toy Slice -> Had issues with saving toy:', err)
    throw err
  }
})

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
        const { payload } = action
        const toyIndex = state.toys!.findIndex(t => t._id === payload._id)

        if (toyIndex < 0) {
          state.toys!.push(payload)
        } else {
          state.toys![toyIndex] = payload
        }
      })
  },
})

export const { setFilterBy, setSortBy } = toySlice.actions
export default toySlice.reducer
