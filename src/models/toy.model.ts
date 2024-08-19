import { ReactMouseEvent } from './system.model'

export interface Toy {
  _id: string
  name: string
  price: number
  labels: string[]
  createdAt: number
  inStock: boolean
}

export interface ToyFilterBy {
  name: string
  inStock: boolean | null
  maxPrice: number
  labels: string[]
}

export interface ToySortBy {
  [fieldName: string]: 1 | -1
}

export type RemoveToyFn = (ev: ReactMouseEvent, toyId: string) => void

export type ToyFieldValues = string | number | boolean | null
