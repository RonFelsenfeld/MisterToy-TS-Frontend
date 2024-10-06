import { ApolloClient, createHttpLink, DocumentNode, InMemoryCache } from '@apollo/client'
import { toyService } from './toy.service'

import {
  GetToysResponse,
  ToyMutationType,
  ToyQueryTypes,
  ToysQueryOptions,
} from '../models/server.model'
import { Toy } from '../models/toy.model'
import { CacheUpdateFn, GetToysFromCacheArgs, UpdateToysCacheArgs } from '../models/apollo.model'

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

////////////////////////////////////////////////////

type QueryToysTuple = [GetToysResponse | null, DocumentNode]

interface UpdateCacheFnGenerator {
  (type: ToyMutationType, options: ToysQueryOptions, payload?: string): CacheUpdateFn
}

export const getUpdateCacheFn: UpdateCacheFnGenerator = (type, options, payload) => {
  const updateCacheFn: CacheUpdateFn = (cache, { data }) => {
    const [cachedData, query] = _getToysFromCache({ cache, options })

    if (cachedData) {
      let toys: Toy[]

      switch (type) {
        case ToyMutationType.RemoveToy:
          toys = cachedData.toys.filter(t => t._id !== (payload as string))
          break

        case ToyMutationType.UpdateToy:
          const { updateToy } = data as { updateToy: Toy }
          toys = cachedData.toys.map(t => (t._id === updateToy._id ? updateToy : t))
          break

        case ToyMutationType.AddToy:
          const { addToy } = data as { addToy: Toy }
          toys = [...cachedData.toys, addToy]
          break

        default:
          throw new Error(`Unsupported mutation type: ${type}`)
      }

      const cacheOptions: UpdateToysCacheArgs = { cache, query, toys }
      if (type !== ToyMutationType.RemoveToy) cacheOptions.options = options
      _updateToysCache(cacheOptions)
    }
  }

  return updateCacheFn
}

////////////////////////////////////////////////////

// ! Private Methods

function _getToysFromCache({ cache, options }: GetToysFromCacheArgs): QueryToysTuple {
  const queryOptions = toyService.getQueryOptions(ToyQueryTypes.GetToys, { ...options })
  const existingToys = cache.readQuery<GetToysResponse>(queryOptions)
  return [existingToys, queryOptions.query]
}

function _updateToysCache({ cache, query, toys, options }: UpdateToysCacheArgs) {
  cache.writeQuery({
    query,
    data: {
      toys,
    },
    variables: { ...options },
  })
}
