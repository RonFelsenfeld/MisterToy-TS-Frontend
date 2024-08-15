export const utilService = {
  makeId,
  getRandomIntInclusive,
  debounce,
  saveToStorage,
  loadFromStorage,
  getRandomTimestamp,
  getFormattedCurrency,
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

function saveToStorage<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T>(key: string): T[] | undefined {
  const data = localStorage.getItem(key)
  return data ? (JSON.parse(data) as T[]) : undefined
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
