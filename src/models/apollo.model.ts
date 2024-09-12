import { DocumentNode } from 'graphql'
import {
  ApolloCache,
  DefaultContext,
  FetchPolicy,
  MutationUpdaterFunction,
  OperationVariables,
} from '@apollo/client'
import { GetToyByIdResponse } from './server.model'

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
