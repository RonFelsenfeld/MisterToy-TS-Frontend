import { configureStore } from '@reduxjs/toolkit'
import toyReducer from './slices/toy.slice'

export const store = configureStore({
  reducer: {
    toyModule: toyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
