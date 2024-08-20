import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client'
import { toyService } from './toy.service'

import { GetToysResponse, ToyQueryTypes } from '../models/server.model'
import { getToysFromCacheArgs, updateToysCacheArgs } from '../models/apollo.model'

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

type QueryToysTuple = [GetToysResponse | null, DocumentNode]

export function getToysFromCache({ cache, options }: getToysFromCacheArgs): QueryToysTuple {
  const queryOptions = toyService.getQueryOptions(ToyQueryTypes.GetToys, { ...options })
  const existingToys = cache.readQuery<GetToysResponse>(queryOptions)
  return [existingToys, queryOptions.query]
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
