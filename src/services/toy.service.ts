import { gql } from '@apollo/client'
import { Toy, ToyFilterBy, ToySortBy } from '../models/toy.model'

// ! Queries (from GraphQL server)

const query = gql`
  query QueryToys($filterBy: FilterByInput!, $sortBy: SortByInput!) {
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

function getEmptyToy(): Partial<Toy> {
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

////////////////////////////////////////////////////

// ! Exporting Queries and Services

export const toyService = {
  query,
  getById,
  remove,
  add,
  update,
  getEmptyToy,
  getDefaultFilterBy,
  getDefaultSortBy,
  getLabels,
}

////////////////////////////////////////////////////

// ! Demo Data

// const STORAGE_KEY = 'toyDB'

// function _createDemoToys() {
//   let toys: Toy[] | undefined = utilService.loadFromStorage<Toy>(STORAGE_KEY)

//   if (!toys || !toys.length) {
//     toys = []
//     for (let i = 0; i < 30; i++) {
//       toys.push(_createDemoToy())
//     }
//     utilService.saveToStorage(STORAGE_KEY, toys)
//   }

//   return toys
// }

// function _createDemoToy(): Toy {
//   const labels = getLabels()
//   let toyLabels: string[] = []

//   for (let i = 0; i < 2; i++) {
//     const label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
//     if (!toyLabels.includes(label)) toyLabels.push(label)
//   }

//   return {
//     _id: utilService.makeId(),
//     name: _getRandomToyName(),
//     price: utilService.getRandomIntInclusive(20, 150),
//     labels: toyLabels,
//     createdAt: utilService.getRandomTimestamp(),
//     inStock: Math.random() > 0.5 ? true : false,
//   }
// }

// function _getRandomToyName() {
//   const toyNames = [
//     'Super Robot',
//     'Magic Unicorn',
//     'Speedy Racecar',
//     'Friendly Dinosaur',
//     'Flying Spaceship',
//     'Cuddly Teddy Bear',
//     'Adventure Pirate Ship',
//     'Mighty Action Figure',
//     'Puzzle Master',
//     'Dancing Doll',
//     'Building Blocks',
//     'Miniature Train',
//     'Talking Parrot',
//     'Safari Jeep',
//     'Glow-in-the-Dark Slime',
//     'Rainbow Kite',
//     'Musical Keyboard',
//     'Bouncing Ball',
//     'Toy Soldier',
//     'Fantasy Castle',
//   ]

//   const randomIndex = Math.floor(Math.random() * toyNames.length)
//   return toyNames[randomIndex]
// }
