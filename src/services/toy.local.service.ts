import { Toy } from '../models/toy.model'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'toyDB'
_createDemoToys()

export const toyService = {
  query,
  getById,
  remove,
  save,
}

async function query() {
  try {
    const toys = storageService.query<Toy>(STORAGE_KEY)
    return toys
  } catch (err) {
    console.log('Toy Service -> Had issues with loading toys:', err)
    throw err
  }
}
async function getById(toyId: string) {
  try {
    const toy = storageService.get<Toy>(STORAGE_KEY, toyId)
    return toy
  } catch (err) {
    console.log('Toy Service -> Had issues with loading toy:', err)
    throw err
  }
}

async function remove(toyId: string) {
  try {
    storageService.remove(STORAGE_KEY, toyId)
  } catch (err) {
    console.log('Toy Service -> Had issues with removing toy:', err)
  }
}

async function save(toy: Toy) {
  try {
    if (toy._id) {
      return storageService.put(STORAGE_KEY, toy)
    } else {
      return storageService.post(STORAGE_KEY, toy)
    }
  } catch (err) {
    console.log('Toy Service -> Had issues with saving toy:', err)
    throw err
  }
}

////////////////////////////////////////////////////

// ! Private functions

function _createDemoToys() {
  let toys: Toy[] | undefined = utilService.loadFromStorage<Toy>(STORAGE_KEY)

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
  return {
    _id: utilService.makeId(),
    name: _getRandomToyName(),
    price: utilService.getRandomIntInclusive(20, 150),
    labels: [],
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
