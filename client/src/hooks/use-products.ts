import { useState, useEffect, useCallback } from 'react'
import { ProductType } from '@/types'
import {
  fetchProducts,
  fetchProductById,
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  getRandomFeaturedProducts,
  getBannerProduct,
} from '@/services/api/products'

export function useProducts() {
  const [productState, setProductState] = useState({
    allProducts: [] as ProductType[],
    featuredProducts: [] as ProductType[],
    isLoading: true,
    bannerProduct: null as ProductType | null,
  })
  const [error, setError] = useState<Error | null>(null)

  // Función para cargar todos los productos
  const loadProducts = useCallback(async () => {
    try {
      setProductState((prev) => ({ ...prev, isLoading: true }))
      setError(null)

      const { data, error: apiError } = await fetchProducts()

      if (apiError) throw apiError

      // Seleccionar productos destacados y producto para banner
      const featuredProducts = getRandomFeaturedProducts(data || [])
      const bannerProduct = getBannerProduct(data || [], featuredProducts)

      // Un solo setState para actualizar todo el estado de productos
      setTimeout(() => {
        setProductState({
          allProducts: data || [],
          featuredProducts,
          bannerProduct,
          isLoading: false,
        })
      }, 300)
    } catch (err) {
      console.error('Error al cargar productos:', err)
      setError(err instanceof Error ? err : new Error('Error desconocido al cargar productos'))
      setProductState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  // Función para obtener un producto específico por ID
  const getProductById = useCallback(
    async (productId: string): Promise<ProductType | null> => {
      try {
        // Primero buscar en el estado actual
        const productFromState = productState.allProducts.find((p) => p.id === productId)
        if (productFromState) return productFromState

        // Si no está en el estado, buscarlo en la base de datos
        const { data, error } = await fetchProductById(productId)

        if (error) throw error

        return data
      } catch (err) {
        console.error('Error al obtener el producto:', err)
        setError(err instanceof Error ? err : new Error('Error desconocido al obtener el producto'))
        return null
      }
    },
    [productState.allProducts],
  )

  // Función para añadir un nuevo producto
  const addProduct = useCallback(async (product: Omit<ProductType, 'id'>) => {
    try {
      const { data, error } = await apiAddProduct(product)

      if (error) throw error

      if (data) {
        setProductState((prev) => ({
          ...prev,
          allProducts: [data, ...prev.allProducts],
        }))
      }

      return { success: true, product: data, error: null }
    } catch (err) {
      console.error('Error al añadir producto:', err)
      setError(err instanceof Error ? err : new Error('Error desconocido al añadir producto'))
      return { success: false, product: null, error: err as Error }
    }
  }, [])

  // Función para actualizar un producto existente
  const updateProduct = useCallback(async (id: string, updates: Partial<ProductType>) => {
    try {
      const { data, error } = await apiUpdateProduct(id, updates)

      if (error) throw error

      if (data) {
        setProductState((prev) => ({
          ...prev,
          allProducts: prev.allProducts.map((p) => (p.id === id ? data : p)),
          // Actualizar también en productos destacados si corresponde
          featuredProducts: prev.featuredProducts.map((p) => (p.id === id ? data : p)),
          // Actualizar el producto del banner si corresponde
          bannerProduct: prev.bannerProduct?.id === id ? data : prev.bannerProduct,
        }))
      }

      return { success: true, product: data, error: null }
    } catch (err) {
      console.error('Error al actualizar producto:', err)
      setError(err instanceof Error ? err : new Error('Error desconocido al actualizar producto'))
      return { success: false, product: null, error: err as Error }
    }
  }, [])

  // Función para eliminar un producto
  const removeProduct = useCallback(async (id: string) => {
    try {
      const { success, error } = await apiDeleteProduct(id)

      if (error) throw error

      if (success) {
        setProductState((prev) => ({
          ...prev,
          allProducts: prev.allProducts.filter((product) => product.id !== id),
          featuredProducts: prev.featuredProducts.filter((product) => product.id !== id),
          bannerProduct: prev.bannerProduct?.id === id ? null : prev.bannerProduct,
        }))
      }

      return { success, error: null }
    } catch (err) {
      console.error('Error al eliminar producto:', err)
      setError(err instanceof Error ? err : new Error('Error desconocido al eliminar producto'))
      return { success: false, error: err as Error }
    }
  }, [])

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    ...productState,
    error,
    loadProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct,
  }
}
