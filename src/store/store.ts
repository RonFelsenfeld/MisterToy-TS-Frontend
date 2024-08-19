import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import toyReducer from './slices/toy.slice'

export const store = configureStore({
  reducer: {
    toyModule: toyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
