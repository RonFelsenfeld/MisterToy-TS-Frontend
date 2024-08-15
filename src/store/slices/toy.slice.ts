import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Toy } from '../../models/toy.model'
import { toyService } from '../../services/toy.local.service'

interface ToyState {
  toys: Toy[]
}

const initialState: ToyState = {
  toys: [],
}

const toySlice = createSlice({
  name: 'toyModule',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadToys.fulfilled, (state, action: PayloadAction<Toy[]>) => {
      state.toys = action.payload
    })
  },
})

export const loadToys = createAsyncThunk('toyModule', async () => {
  try {
    const toys = await toyService.query()
    return toys
  } catch (err) {
    console.log('Toy Slice -> Had issues with loading toys:', err)
    throw err
  }
})

export default toySlice.reducer
