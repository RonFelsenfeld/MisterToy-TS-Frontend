import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toyService } from '../../services/toy.local.service'
import { Toy, ToyFilterBy } from '../../models/toy.model'

interface ToyState {
  toys: Toy[]
  filterBy: ToyFilterBy
}

const initialState: ToyState = {
  toys: [],
  filterBy: toyService.getDefaultFilterBy(),
}

const toySlice = createSlice({
  name: 'toyModule',
  initialState,
  reducers: {
    setFilterBy: (state, action: PayloadAction<ToyFilterBy>) => {
      state.filterBy = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(loadToys.fulfilled, (state, action: PayloadAction<Toy[]>) => {
      state.toys = action.payload
    })
  },
})

export const loadToys = createAsyncThunk('toyModule', async (filterBy: ToyFilterBy) => {
  try {
    const toys = await toyService.query(filterBy)
    return toys
  } catch (err) {
    console.log('Toy Slice -> Had issues with loading toys:', err)
    throw err
  }
})

export const { setFilterBy } = toySlice.actions
export default toySlice.reducer
