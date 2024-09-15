import {
  ApolloCache,
  ApolloClient,
  createHttpLink,
  DocumentNode,
  InMemoryCache,
} from '@apollo/client'
import { toyService } from './toy.service'

import { GetToysResponse, ToyQueryTypes, ToysQueryOptions } from '../models/server.model'
import { Toy } from '../models/toy.model'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  credentials: 'include',
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

interface getToysFromCacheArgs {
  cache: ApolloCache<any>
  options: ToysQueryOptions
}

type QueryToysTuple = [GetToysResponse | null, DocumentNode]

export function getToysFromCache({ cache, options }: getToysFromCacheArgs): QueryToysTuple {
  const queryOptions = toyService.getQueryOptions(ToyQueryTypes.GetToys, { ...options })
  const existingToys = cache.readQuery<GetToysResponse>(queryOptions)
  return [existingToys, queryOptions.query]
}

interface updateToysCacheArgs {
  cache: ApolloCache<any>
  query: DocumentNode
  toys: Toy[]
  options?: ToysQueryOptions
}

export function updateToysCacheQuery({ cache, query, toys, options }: updateToysCacheArgs) {
  cache.writeQuery({
    query,
    data: {
      toys,
    },
    variables: { ...options },
  })
}
