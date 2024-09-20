import { type Dispatch, type SetStateAction, createContext } from 'react'

export interface GlobalContextType {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
