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

export type ToyFieldValues = string | number | boolean | null
