import { createContext } from 'react'
import { Session } from '@supabase/supabase-js'

import { ProductType, CartItemType } from '@/types'

export interface GlobalContextType {
  session: Session | null | undefined
  // setSession: (session: Session | null) => void
  // setSession: Dispatch<SetStateAction<Session | null | undefined>>
  setSession: (newSession: Session | null | undefined) => void
  authLoading: boolean
  productState: {
    allProducts: ProductType[]
    featuredProducts: ProductType[]
    isLoading: boolean
    bannerProduct: ProductType | null
  }
  cartItems: CartItemType[]
  handleAddToCart: (product: ProductType, quantity?: number) => void
  handleRemoveFromCart: (productId: string) => void
  handleClearCart: () => void
  handleQuantityChange: (productId: string, amount: number) => void
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
