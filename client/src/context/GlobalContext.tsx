import { createContext, Dispatch, SetStateAction } from 'react'
import { Session } from '@supabase/supabase-js'

import { ProductType } from '@/types'

export interface GlobalContextType {
  session: Session | null | undefined
  setSession: (session: Session | null) => void
  authLoading: boolean
  productState: {
    allProducts: ProductType[]
    featuredProducts: ProductType[]
    isLoading: boolean
    bannerProduct: ProductType | null
  }
  setProductState: Dispatch<
    SetStateAction<{
      allProducts: ProductType[]
      featuredProducts: ProductType[]
      isLoading: boolean
      bannerProduct: ProductType | null
    }>
  >
  cartItems: ProductType[]
  handleAddToCart: (product: ProductType) => void
  handleRemoveFromCart: (productId: string) => void
  handleClearCart: () => void
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
