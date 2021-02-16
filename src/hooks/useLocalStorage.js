import { useEffect, useState } from 'react'

const PREFIX = 'chatter-app-'

const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key //used so I don't mix with other projects in local storage
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)

    if (jsonValue != null) return JSON.parse(jsonValue) //readable value from local storage

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  //if prefixedKey or value changed it will be written in localStorage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue] //this value will return value from local storage and setValue will enable to change that value in local storage where it is called and then value will be changed
}

export default useLocalStorage
