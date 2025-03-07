/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Dispatch, type SetStateAction, createContext } from 'react'

export interface GlobalContextType {
  isLoggedIn: any
  setIsLoggedIn: Dispatch<SetStateAction<any>>
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

//!!!!!!!!!!!!!! tipar correctamente los valores de GlobalContextType !!!!!!!!!!!!!!!!!!!!!!!!!!!
