import { createContext, Dispatch, SetStateAction } from 'react'
import { Session } from '@supabase/supabase-js'

import { ProductType, CartItemType } from '@/types'

export interface GlobalContextType {
  session: Session | null | undefined
  // setSession: (session: Session | null) => void
  setSession: Dispatch<SetStateAction<Session | null | undefined>>
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
  cartItems: CartItemType[]
  handleAddToCart: (product: ProductType) => void
  handleRemoveFromCart: (productId: string) => void
  handleClearCart: () => void
  handleQuantityChange: (productId: string, amount: number) => void
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
