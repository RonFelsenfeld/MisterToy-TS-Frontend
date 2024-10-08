import { ReactMouseEvent } from './event.model'
import { User } from './user.model'

export interface Toy {
  _id: string
  name: string
  price: number
  labels: string[]
  createdAt: number
  inStock: boolean
  msgs: ToyMsg[]
}

export type NewToy = Omit<Toy, '_id' | 'createdAt'>

export interface ToyMsg {
  id: string
  txt: string
  by: Pick<User, '_id' | 'fullName'>
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
