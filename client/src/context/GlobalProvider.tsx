// > el contexto empieza a manejar demasiadas responsabilidades (auth, carga de productos, manejo de carrito), evaluar la division de estas

import { useState, useEffect, useCallback, useMemo, SetStateAction } from 'react'
import { Session } from '@supabase/supabase-js'

import { GlobalContext } from './GlobalContext'
import { supabase } from '@/utils/supabase'
import { ProductType, CartItemType } from '@/types'
import { useToast } from '@/hooks/use-toast'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [authLoading, setAuthLoading] = useState(true)
  const [productState, setProductState] = useState({
    allProducts: [] as ProductType[],
    featuredProducts: [] as ProductType[],
    isLoading: true,
    bannerProduct: null as ProductType | null,
  })
  const [cartItems, setCartItems] = useState<CartItemType[] | []>([])

  const { toast } = useToast()

  // | MEMOIZACION DE FUNCIONES PARA EVITAR RE-RENDERIZADOS INNECESARIOS
  // función para manejar la sesión
  const handleSetSession = useCallback((newSession: SetStateAction<Session | null | undefined>) => {
    setSession(newSession)
  }, [])

  // funciones para manejar el carrito
  const handleAddToCart = useCallback((product: ProductType, quantity: number = 1) => {
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
  }, [])

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter(({ cartItem }) => cartItem.id !== productId))

    toast({
      title: 'Producto eliminado del carrito',
      variant: 'destructive',
    })
  }, [])

  const handleClearCart = useCallback(() => {
    toast({
      title: 'Carrito vacio',
      variant: 'destructive',
    })

    setCartItems([])
  }, [])

  const handleQuantityChange = useCallback((productId: string, amount: number) => {
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

  // | EFFECT PARA OBTENER LA SESIÓN DE AUTENTICACIÓN
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error obteniendo sesión:', error)
          setSession(null)
        } else {
          setSession(data.session)
        }
      } catch (err) {
        console.error('Error inesperado:', err)
        setSession(null)
      } finally {
        setAuthLoading(false)
      }
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // | EFFECT PARA CARGAR TODOS LOS PRODUCTOS AL INICIAR
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductState((prev) => ({ ...prev, isLoading: true }))

        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (supabaseError) throw supabaseError

        // Procesar productos
        const parsedProducts = data.map((product) => ({
          ...product,
          image_urls: Array.isArray(product.image_urls) ? product.image_urls : [],
        })) as ProductType[]

        // Seleccionar productos destacados
        const shuffled = [...parsedProducts].sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, Math.min(4, shuffled.length))
        const remainingProducts = shuffled.filter((product) => !selected.some((p) => p.id === product.id))

        // Un solo setState para actualizar todo el estado de productos
        setTimeout(() => {
          setProductState({
            allProducts: parsedProducts,
            featuredProducts: selected,
            bannerProduct: remainingProducts.length > 0 ? remainingProducts[0] : null,
            isLoading: false,
          })
        }, 300)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        setProductState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    fetchProducts()
  }, [])

  // | EFFECT PARA CARGAR LOS PRODUCTOS DEL CARRITO DESDE LOCAL STORAGE
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

  // | EFFECT PARA GUARDAR LOS PRODUCTOS DEL CARRITO Y SUS CANTIDADES EN LOCAL STORAGE
  useEffect(() => {
    ;(() => {
      const cartToSave = cartItems.map(({ cartItem, quantity }) => ({
        cartItem,
        quantity,
      }))

      localStorage.setItem('cart', JSON.stringify(cartToSave))
    })()
  }, [cartItems])

  // Memoizar el valor del contexto para evitar re-renderizados innecesarios
  const contextValue = useMemo(
    () => ({
      session,
      setSession: handleSetSession,
      authLoading,
      productState,
      setProductState,
      cartItems,
      handleAddToCart,
      handleRemoveFromCart,
      handleClearCart,
      handleQuantityChange,
    }),
    [
      session,
      handleSetSession,
      authLoading,
      productState,
      setProductState,
      cartItems,
      handleAddToCart,
      handleRemoveFromCart,
      handleClearCart,
      handleQuantityChange,
    ],
  )

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}
