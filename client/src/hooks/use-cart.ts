import { useState, useEffect, useCallback } from 'react'
import { CartItemType, ProductType } from '@/types'
import { useToast } from '@/hooks/use-toast'

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemType[] | []>([])
  const { toast } = useToast()

  // Efecto para cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Verificar que el formato sea [{cartItem, quantity}]
        if (Array.isArray(parsedCart) && parsedCart.length > 0 && 'cartItem' in parsedCart[0]) {
          setCartItems(parsedCart)
        } else {
          console.warn('Formato de carrito en localStorage no es válido')
        }
      } catch (e) {
        console.error('Error parseando el carrito desde localStorage:', e)
      }
    }
  }, [])

  // Efecto para guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    ;(() => {
      const cartToSave = cartItems.map(({ cartItem, quantity }) => ({
        cartItem,
        quantity,
      }))

      localStorage.setItem('cart', JSON.stringify(cartToSave))
    })()
  }, [cartItems])

  // Función para añadir un producto al carrito
  const addToCart = useCallback(
    (product: ProductType, quantity: number = 1) => {
      setCartItems((prevItems) => {
        // Verificar si el producto ya está en el carrito
        const existingItem = prevItems.find(({ cartItem }) => cartItem.id === product.id)
        if (existingItem) {
          toast({
            title: 'Este producto ya está en el carrito',
            variant: 'warning',
          })

          return prevItems
        }

        toast({
          title: 'Producto agregado al carrito',
          variant: 'default',
        })

        return [...prevItems, { cartItem: product, quantity }]
      })
    },
    [toast],
  )

  // Función para eliminar un producto del carrito
  const removeFromCart = useCallback(
    (productId: string) => {
      setCartItems((prevItems) => prevItems.filter(({ cartItem }) => cartItem.id !== productId))

      toast({
        title: 'Producto eliminado del carrito',
        variant: 'destructive',
      })
    },
    [toast],
  )

  // Función para vaciar el carrito
  const clearCart = useCallback(() => {
    toast({
      title: 'Carrito vacío',
      variant: 'destructive',
    })

    setCartItems([])
  }, [toast])

  // Función para cambiar la cantidad de un producto
  const changeQuantity = useCallback((productId: string, amount: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.cartItem.id === productId) {
          const newQuantity = Math.max(1, item.quantity + amount) // Mínimo 1 unidad
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    })
  }, [])

  // Calcular totales
  const cartTotal = cartItems.reduce(
    (total, { cartItem, quantity }) => total + cartItem.unit_price * quantity,
    0,
  )

  const itemCount = cartItems.reduce((count, { quantity }) => count + quantity, 0)

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    changeQuantity,
    cartTotal,
    itemCount,
  }
}
