import { useEffect, useRef } from 'react'

// ! Execute a cb on every update, from the second render (not at the first one)
export function useEffectUpdate(cb: () => void, dependencies: unknown[]) {
  const isFirstRender = useRef<boolean>(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    cb()
  }, dependencies)
}
