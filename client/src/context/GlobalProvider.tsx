import { useState, useEffect, useCallback, useMemo } from 'react'
import { Session } from '@supabase/supabase-js'

import { GlobalContext } from './GlobalContext'
import { ProductType } from '@/types'
import { supabase } from '@/utils/supabase'

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
  const [cartItems, setCartItems] = useState<ProductType[] | []>([])
  console.log('cartItems en GlobalProvider', cartItems)
  // >>>>>>>>>>>>>> GENERAR LA PERSISTENCIA DE DATOS DEL CARRITO EN EL LOCAL STORAGE <<<<<<<<<<<<

  // useEffect(() => console.log('session', session), [session])

  // | MEMOIZACION DE FUNCIONES PARA EVITAR RE-RENDERIZADOS INNECESARIOS
  // función para manejar la sesión
  const handleSetSession = useCallback((newSession: Session | null | undefined) => {
    setSession(newSession)
  }, [])

  // funciones para manejar el carrito
  const handleAddToCart = useCallback((product: ProductType) => {
    setCartItems((prevItems) => {
      console.log('prevItems', prevItems)
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find((item) => item.id === product.id)
      console.log('existingItem', existingItem)

      if (existingItem) return prevItems // Evitar duplicados (o implementar cantidad si es necesario)

      return [...prevItems, product]
    })
  }, [])

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }, [])

  const handleClearCart = useCallback(() => {
    setCartItems([])
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
    ],
  )

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}
