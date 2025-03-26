import { createContext } from 'react'
import { Session } from '@supabase/supabase-js'

import { ProductType } from '@/types'

export interface GlobalContextType {
  session: Session | null | undefined
  setSession: (session: Session | null) => void
  authLoading: boolean
  allProducts: ProductType[]
  featuredProducts: ProductType[]
  isLoaded: boolean
  bannerProduct: ProductType | null
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
