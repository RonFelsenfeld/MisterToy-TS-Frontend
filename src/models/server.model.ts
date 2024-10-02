import { Toy, ToyFilterBy, ToyMsg, ToySortBy } from './toy.model'
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

export interface AddToyMsgResponse {
  addToyMsg: ToyMsg
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

type AuthMutationNames = 'login' | 'signup' | 'logout' | 'fetchLoggedInUser'

export type AuthResponse = {
  [index in AuthMutationNames]: User
}

export interface LogoutResponse {
  logout: {
    msg: string
  }
}

export enum AuthMutationType {
  Login,
  Signup,
  Logout,
  FetchLoggedInUser,
}
