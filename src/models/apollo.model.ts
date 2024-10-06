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

export interface ClientQuery {
  query: DocumentNode
  fetchPolicy?: FetchPolicy
  variables?: OperationVariables
}

export type CacheUpdateFn = MutationUpdaterFunction<
  GetToyByIdResponse,
  OperationVariables,
  DefaultContext,
  ApolloCache<any>
>

export interface UpdateToysCacheArgs {
  cache: ApolloCache<any>
  query: DocumentNode
  toys: Toy[]
  options?: ToysQueryOptions
}

export interface GetToysFromCacheArgs {
  cache: ApolloCache<any>
  options: ToysQueryOptions
}
