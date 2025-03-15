import { createContext } from 'react'
import { Session } from '@supabase/supabase-js'

export interface GlobalContextType {
  session: Session | null | undefined
  setSession: (session: Session | null) => void
  loading: boolean
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
