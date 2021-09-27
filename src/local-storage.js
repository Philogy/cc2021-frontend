import { useState, useEffect } from 'react'

const DOMAIN_SEPARATOR = 'lidor-loan-market'

const createKey = (key) => `${DOMAIN_SEPARATOR}.${key}`

function useLocalStorage(key, defaultValue) {
  key = createKey(key)

  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key)
    if (storedValue === null) return defaultValue
    return JSON.parse(storedValue)
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

export default useLocalStorage
