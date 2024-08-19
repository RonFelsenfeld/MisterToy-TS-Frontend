import { OperationVariables } from '@apollo/client'
import { DocumentNode } from 'graphql'
import { Toy, ToyFilterBy, ToySortBy } from './toy.model'

interface ClientVariables {
  variables?: OperationVariables
}

export interface ClientQuery extends ClientVariables {
  query: DocumentNode
}

export interface ClientMutation extends ClientVariables {
  mutation: DocumentNode
}

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
