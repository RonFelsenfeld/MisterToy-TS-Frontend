import { DocumentNode } from 'graphql'
import {
  ApolloCache,
  DefaultContext,
  FetchPolicy,
  MutationUpdaterFunction,
  OperationVariables,
} from '@apollo/client'

import { Toy, ToyFilterBy, ToySortBy } from './toy.model'

interface ClientVariables {
  variables?: OperationVariables
}

export interface ClientQuery extends ClientVariables {
  query: DocumentNode
  fetchPolicy?: FetchPolicy
}

export interface ClientMutation extends ClientVariables {
  mutation: DocumentNode
  update?: MutationUpdaterFunction<
    GetToyByIdResponse,
    OperationVariables,
    DefaultContext,
    ApolloCache<any>
  >
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
