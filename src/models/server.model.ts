import { Toy, ToyFilterBy, ToySortBy } from './toy.model'
import { User } from './user.model'

export interface ToysQueryOptions {
  filterBy: ToyFilterBy
  sortBy: ToySortBy
}

export interface GetToysResponse {
  toys: Toy[]
}

export interface GetToyByIdResponse {
  [prop: string]: Toy
}

export enum ToyQueryTypes {
  GetToys,
  GetToyById,
}

export enum ToyMutationType {
  RemoveToy,
  AddToy,
  UpdateToy,
}

export interface RequestVariables extends Partial<ToysQueryOptions> {
  toyId?: string
  toy?: Toy
}

export interface AuthResponseData {
  token: string
  user: User
}

export interface AuthResponse {
  [index: string]: AuthResponseData
}

export enum AuthMutationType {
  Login,
  Signup,
}
