import { useState, useEffect } from 'react'
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
  const [allProducts, setAllProducts] = useState<ProductType[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState(true) // Cambiado de isLoaded a isLoading e invertido el valor inicial
  const [bannerProduct, setBannerProduct] = useState<ProductType | null>(null)

  // Mantener actualizada la sesión de usuario
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

  // Cargar todos los productos al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true) // Indicamos que está cargando

        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (supabaseError) throw supabaseError

        // Asegurar formato correcto del JSONB
        const parsedProducts = data.map((product) => ({
          ...product,
          image_urls: Array.isArray(product.image_urls) ? product.image_urls : [],
        })) as ProductType[]

        setAllProducts(parsedProducts)

        // Pequeño retraso para efectos visuales de carga
        setTimeout(() => {
          setIsLoading(false) // Indicamos que ya no está cargando
        }, 300)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        setIsLoading(false) // Aseguramos que isLoading se desactive incluso en caso de error
      }
    }

    fetchProducts()
  }, [])

  // Cargar productos destacados
  useEffect(() => {
    // Proteger contra posibles errores si allProducts está vacío
    if (allProducts.length === 0) return

    // Seleccionar productos aleatorios para destacar (4 máximo)
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, Math.min(4, shuffled.length))

    // Seleccionar un producto aleatorio para el banner que no esté en los destacados
    const remainingProducts = shuffled.filter((product) => !selected.some((p) => p.id === product.id))

    // Actualizar estados
    setFeaturedProducts(selected)
    if (remainingProducts.length > 0) {
      setBannerProduct(remainingProducts[0])
    }
  }, [allProducts])

  return (
    <GlobalContext.Provider
      value={{
        session,
        setSession,
        authLoading,
        allProducts,
        featuredProducts,
        isLoading,
        setIsLoading,
        bannerProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
