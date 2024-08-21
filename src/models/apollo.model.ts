import { DocumentNode } from 'graphql'
import {
  ApolloCache,
  DefaultContext,
  FetchPolicy,
  MutationUpdaterFunction,
  OperationVariables,
} from '@apollo/client'
import { GetToyByIdResponse } from './server.model'

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

export type CacheUpdateFn = MutationUpdaterFunction<
  GetToyByIdResponse,
  OperationVariables,
  DefaultContext,
  ApolloCache<any>
>
