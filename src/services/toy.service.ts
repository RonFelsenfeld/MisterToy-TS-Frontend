import { DocumentNode, gql } from '@apollo/client'

import { NewToy, Toy, ToyFilterBy, ToySortBy } from '../models/toy.model'
import { RequestVariables, ToyMutationType, ToyQueryTypes } from '../models/server.model'
import { CacheUpdateFn, ClientMutation, ClientQuery } from '../models/apollo.model'
import { utilService } from './util.service'

////////////////////////////////////////////////////

// ! Queries and Mutations (from GraphQL server)

const query = gql`
  query QueryToys($filterBy: FilterByInput, $sortBy: SortByInput) {
    toys(filterBy: $filterBy, sortBy: $sortBy) {
      _id
      name
      price
      labels
      createdAt
      inStock
    }
  }
`

const getById = gql`
  query ToyQuery($toyId: ID!) {
    toy(_id: $toyId) {
      _id
      name
      price
      labels
      createdAt
      inStock
    }
  }
`

const remove = gql`
  mutation RemoveToy($toyId: ID!) {
    removeToy(_id: $toyId)
  }
`

const add = gql`
  mutation AddToy($toy: AddToyInput!) {
    addToy(toy: $toy) {
      _id
      name
      price
      createdAt
      labels
      inStock
    }
  }
`

const update = gql`
  mutation UpdateToy($toy: UpdateToyInput!) {
    updateToy(toy: $toy) {
      _id
      name
      price
      createdAt
      labels
      inStock
    }
  }
`

////////////////////////////////////////////////////

// ! Service Methods

function getQueryOptions(type: ToyQueryTypes, variables?: RequestVariables) {
  const queryOptions: ClientQuery = {
    query: type === ToyQueryTypes.GetToys ? query : getById,
    ...(variables && { variables }),
  }
  return queryOptions
}

function getMutationOptions(
  type: ToyMutationType,
  updateCacheFn?: CacheUpdateFn,
  variables?: RequestVariables
) {
  let mutation: DocumentNode

  switch (type) {
    case ToyMutationType.RemoveToy:
      mutation = remove
      break
    case ToyMutationType.AddToy:
      mutation = add
      break
    case ToyMutationType.UpdateToy:
      mutation = update
      break
    default:
      throw new Error(`Unsupported mutation type: ${type}`)
  }

  const mutationOptions: ClientMutation = {
    mutation,
    ...(variables && { variables }),
  }

  if (updateCacheFn) mutationOptions.update = updateCacheFn
  return mutationOptions
}

function getNewToy(): NewToy {
  return {
    name: '',
    price: 0,
    labels: [],
    inStock: true,
  }
}

function getDefaultFilterBy(): ToyFilterBy {
  return { name: '', inStock: null, maxPrice: 0, labels: [] }
}

function getDefaultSortBy(): ToySortBy {
  return { name: 1 }
}

function getLabels() {
  return ['on wheels', 'box game', 'art', 'baby', 'doll', 'puzzle', 'outdoor', 'battery powered']
}

interface Coords {
  lat: number
  lng: number
}
interface Branch {
  city: string
  coords: Coords
}

function getStoreBranches(): Branch[] {
  return _createDemoBranches()
}

////////////////////////////////////////////////////

// ! Charts Statistics

type StatisticsMap = {
  [label: string]: number
}

function getPricesPerLabelMap(toys: Toy[]): StatisticsMap {
  return toys.reduce((map, toy) => {
    toy.labels.forEach(label => (map[label] = (map[label] || 0) + toy.price))
    return map
  }, {} as StatisticsMap)
}

function getInStockPercentagesPerLabelMap(toys: Toy[]): StatisticsMap {
  const inStockPerLabel = toys.reduce((map, toy) => {
    toy.labels.forEach(label => (map[label] = map[label] + 1 || 1))
    return map
  }, {} as StatisticsMap)

  let inStockPercentagesByLabel: StatisticsMap = {}
  for (const [label, amount] of Object.entries(inStockPerLabel)) {
    inStockPercentagesByLabel[label] = Math.floor((amount / toys.length) * 100)
  }

  return inStockPercentagesByLabel
}

function getSalesPerMonthMap(): StatisticsMap {
  return _createDemoSales()
}

////////////////////////////////////////////////////

// ! Exporting Queries, Mutations and Methods as toyService

export const toyService = {
  query,
  getById,
  remove,
  add,
  update,
  getQueryOptions,
  getMutationOptions,
  getNewToy,
  getDefaultFilterBy,
  getDefaultSortBy,
  getLabels,
  getPricesPerLabelMap,
  getInStockPercentagesPerLabelMap,
  getSalesPerMonthMap,
  getStoreBranches,
}

////////////////////////////////////////////////////

// ! Demo Data

const STORAGE_KEY = 'toyDB'

// @ts-ignore
function _createDemoToys() {
  let toys: Toy[] | undefined = (utilService.loadFromStorage<Toy>(STORAGE_KEY) as Toy[]) || []

  if (!toys || !toys.length) {
    toys = []
    for (let i = 0; i < 30; i++) {
      toys.push(_createDemoToy())
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
  }

  return toys
}

function _createDemoToy(): Toy {
  const labels = getLabels()
  let toyLabels: string[] = []

  for (let i = 0; i < 2; i++) {
    const label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
    if (!toyLabels.includes(label)) toyLabels.push(label)
  }

  return {
    _id: utilService.makeId(),
    name: _getRandomToyName(),
    price: utilService.getRandomIntInclusive(20, 150),
    labels: toyLabels,
    createdAt: utilService.getRandomTimestamp(),
    inStock: Math.random() > 0.5 ? true : false,
  }
}

function _getRandomToyName() {
  const toyNames = [
    'Super Robot',
    'Magic Unicorn',
    'Speedy Racecar',
    'Friendly Dinosaur',
    'Flying Spaceship',
    'Cuddly Teddy Bear',
    'Adventure Pirate Ship',
    'Mighty Action Figure',
    'Puzzle Master',
    'Dancing Doll',
    'Building Blocks',
    'Miniature Train',
    'Talking Parrot',
    'Safari Jeep',
    'Glow-in-the-Dark Slime',
    'Rainbow Kite',
    'Musical Keyboard',
    'Bouncing Ball',
    'Toy Soldier',
    'Fantasy Castle',
  ]

  const randomIndex = Math.floor(Math.random() * toyNames.length)
  return toyNames[randomIndex]
}

function _createDemoSales() {
  return {
    june: 1000,
    july: 4134,
    august: 3214,
    september: 2451,
    october: 3000,
    november: 4672,
  }
}

function _createDemoBranches() {
  const branch1 = {
    city: 'Tel Aviv',
    coords: { lat: 32.073591208159584, lng: 34.79064056091309 },
  }

  const branch2 = {
    city: 'Givatayim',
    coords: { lat: 32.07511852692997, lng: 34.80867017793204 },
  }

  const branch3 = {
    city: 'Ramat Gan',
    coords: { lat: 32.06799082105589, lng: 34.82506383943107 },
  }

  const branch4 = {
    city: 'Beni Brak',
    coords: { lat: 32.08493626238524, lng: 34.83504682410127 },
  }

  return [branch1, branch2, branch3, branch4]
}
