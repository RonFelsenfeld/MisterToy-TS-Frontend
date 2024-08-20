import { DocumentNode } from 'graphql'
import {
  ApolloCache,
  DefaultContext,
  FetchPolicy,
  MutationUpdaterFunction,
  OperationVariables,
} from '@apollo/client'
import { GetToyByIdResponse, ToysQueryOptions } from './server.model'
import { Toy } from './toy.model'

export interface ClientQuery extends ClientVariables {
  query: DocumentNode
  fetchPolicy?: FetchPolicy
}

export interface ClientMutation extends ClientVariables {
  mutation: DocumentNode
  update?: CacheUpdateFn
}

interface ClientVariables {
  variables?: OperationVariables
}

////////////////////////////////////////////////////

export interface getToysFromCacheArgs {
  cache: ApolloCache<any>
  options: ToysQueryOptions
}

export interface updateToysCacheArgs {
  cache: ApolloCache<any>
  query: DocumentNode
  toys: Toy[]
  options?: ToysQueryOptions
}

export type CacheUpdateFn = MutationUpdaterFunction<
  GetToyByIdResponse,
  OperationVariables,
  DefaultContext,
  ApolloCache<any>
>
