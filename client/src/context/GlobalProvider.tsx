import { useMemo } from 'react'
import { GlobalContext } from './GlobalContext'
import { useProducts } from '@/hooks/use-products'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  // Desde custom-hook para la autenticación
  const { session, setSession, authLoading } = useAuth()

  // Desde custom-hook para la gestión de productos
  const {
    allProducts,
    featuredProducts,
    isLoading: productsLoading,
    bannerProduct,
    error: productsError,
  } = useProducts()

  // Desde custom-hook para la gestión del carrito
  const { cartItems, addToCart, removeFromCart, clearCart, changeQuantity } = useCart()

  // Memoizar el valor del contexto para evitar re-renderizados innecesarios
  const contextValue = useMemo(() => {
    const productState = {
      allProducts,
      featuredProducts,
      isLoading: productsLoading,
      bannerProduct,
      error: productsError,
    }

    return {
      session,
      setSession,
      authLoading,
      productState,
      cartItems,
      handleAddToCart: addToCart,
      handleRemoveFromCart: removeFromCart,
      handleClearCart: clearCart,
      handleQuantityChange: changeQuantity,
    }
  }, [
    session,
    setSession,
    authLoading,
    allProducts,
    featuredProducts,
    productsLoading,
    bannerProduct,
    productsError,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    changeQuantity,
  ])

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}
