import { Toy, ToyFilterBy, ToySortBy } from './toy.model'
import { UserCredentials } from './user.model'

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

export interface LoginResponse {
  token: string
  user: UserCredentials
}
