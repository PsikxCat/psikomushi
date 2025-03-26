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
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [bannerProduct, setBannerProduct] = useState<ProductType | null>(null)

  const allProducts = [
    {
      id: 1,
      imageUrl: './hongo.webp',
      name: 'Shiitake Premium',
      description: 'Hongo con sabor intenso ideal para platos orientales.',
    },
    {
      id: 2,
      imageUrl: './hongo.webp',
      name: 'Portobello Selecto',
      description: 'Perfectos para asar o rellenar con gran versatilidad.',
    },
    {
      id: 3,
      imageUrl: './hongo.webp',
      name: 'Champiñones Silvestres',
      description: 'Mezcla de champiñones silvestres de alta calidad.',
    },
    {
      id: 4,
      imageUrl: './hongo.webp',
      name: 'Setas Ostra',
      description: 'Delicadas setas con textura similar al marisco.',
    },
    {
      id: 5,
      imageUrl: './hongo.webp',
      name: 'Enoki Gourmet',
      description: 'Hongos finos ideales para sopas y ensaladas.',
    },
    {
      id: 6,
      imageUrl: './hongo.webp',
      name: 'Trufas Negras',
      description: 'El diamante de la cocina, aroma y sabor incomparables.',
    },
  ]

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

  // Cargar productos destacados
  useEffect(() => {
    // Proteger contra posibles errores si allProducts está vacío
    if (allProducts.length === 0) return

    // Seleccionar productos aleatorios para destacar (4 máximo)
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, Math.min(4, shuffled.length))

    // Seleccionar un producto aleatorio para el banner que no esté en los destacados
    const remainingProducts = shuffled.filter((product) => !selected.some((p) => p.id === product.id))

    // Simular un pequeño retraso para asegurar que todo se cargue correctamente
    setTimeout(() => {
      setFeaturedProducts(selected)
      if (remainingProducts.length > 0) {
        setBannerProduct(remainingProducts[0])
      }
      setIsLoaded(true)
    }, 10)
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        session,
        setSession,
        authLoading,
        allProducts,
        featuredProducts,
        isLoaded,
        bannerProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
