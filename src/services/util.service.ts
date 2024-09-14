export const utilService = {
  makeId,
  getRandomIntInclusive,
  debounce,
  saveToStorage,
  loadFromStorage,
  getRandomTimestamp,
  getFormattedCurrency,
  getRandomColor,
  greetBasedOnHour,
}

function makeId(length: number = 6) {
  let txt = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function debounce<T extends (...args: any[]) => unknown>(
  func: T,
  wait = 300
): (...args: Parameters<T>) => unknown {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>): void {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

function saveToStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T>(key: string): T[] | T | undefined {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function getRandomTimestamp() {
  const now = new Date()
  const pastMonth = new Date()

  pastMonth.setMonth(now.getMonth() - 1)

  const nowTimestamp = now.getTime()
  const pastMonthTimestamp = pastMonth.getTime()

  const randomTimestamp =
    Math.floor(Math.random() * (nowTimestamp - pastMonthTimestamp + 1)) + pastMonthTimestamp

  return randomTimestamp
}

function getFormattedCurrency(amount: number) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS',
  }).format(amount)

  return formattedAmount
}

function getRandomColor() {
  const colors = [
    '#F0FFFF',
    '#FFE4E1',
    '#FFF8DC',
    '#F0FFF0',
    '#F5F5DC',
    '#FAF0E6',
    '#F0E68C',
    '#FFFAF0',
    '#FFFFF0',
    '#F0F8FF',
    '#F0E6EE',
    '#F5DEB3',
    '#FAEBD7',
    '#FFEFD5',
    '#FFDAB9',
    '#FDF5E6',
    '#FFD700',
    '#FFFACD',
    '#FFF5EE',
    '#FFE4B5',
    '#FFF0F5',
    '#FFE4C4',
    '#FFFAFA',
    '#FFEBCD',
    '#FFF5DC',
    '#FFE4E1',
    '#FFF8DC',
    '#F0FFF0',
    '#F5F5DC',
    '#FAF0E6',
  ]

  return colors[getRandomIntInclusive(0, colors.length - 1)]
}

function greetBasedOnHour() {
  const currentHour = new Date().getHours()

  if (currentHour >= 6 && currentHour < 12) {
    return 'Good morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good afternoon'
  } else if (currentHour >= 18 && currentHour < 22) {
    return 'Good evening'
  } else {
    return 'Good night'
  }
}
