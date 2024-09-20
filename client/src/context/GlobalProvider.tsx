import { useState } from 'react'
import { GlobalContext } from './GlobalContext'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
