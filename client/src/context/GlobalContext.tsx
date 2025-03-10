import { createContext } from 'react'
import { Session } from '@supabase/supabase-js'

export interface GlobalContextType {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
