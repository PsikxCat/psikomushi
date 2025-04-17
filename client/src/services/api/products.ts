import { supabase } from '@/utils/supabase'
import { ProductType } from '@/types'

export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Procesar productos para asegurar que image_urls sea un array
    const parsedProducts = data.map((product) => ({
      ...product,
      image_urls: Array.isArray(product.image_urls) ? product.image_urls : [],
    })) as ProductType[]

    return { data: parsedProducts, error: null }
  } catch (error) {
    console.error('Error obteniendo productos:', error)
    return { data: null, error: error as Error }
  }
}

export async function fetchProductById(productId: string) {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', productId).single()

    if (error) throw error

    // Procesar producto para asegurar que image_urls sea un array
    const parsedProduct = {
      ...data,
      image_urls: Array.isArray(data.image_urls) ? data.image_urls : [],
    } as ProductType

    return { data: parsedProduct, error: null }
  } catch (error) {
    console.error('Error obteniendo producto por ID:', error)
    return { data: null, error: error as Error }
  }
}

export async function addProduct(product: Omit<ProductType, 'id'>) {
  try {
    const { data, error } = await supabase.from('products').insert([product]).select()

    if (error) throw error

    // Procesar producto para asegurar que image_urls sea un array
    const parsedProduct = {
      ...data[0],
      image_urls: Array.isArray(data[0].image_urls) ? data[0].image_urls : [],
    } as ProductType

    return { data: parsedProduct, error: null }
  } catch (error) {
    console.error('Error agregando producto:', error)
    return { data: null, error: error as Error }
  }
}

export async function updateProduct(id: string, updates: Partial<ProductType>) {
  try {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select()

    if (error) throw error

    // Procesar producto para asegurar que image_urls sea un array
    const parsedProduct = {
      ...data[0],
      image_urls: Array.isArray(data[0].image_urls) ? data[0].image_urls : [],
    } as ProductType

    return { data: parsedProduct, error: null }
  } catch (error) {
    console.error('Error actualizando producto:', error)
    return { data: null, error: error as Error }
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    console.error('Error eliminando producto:', error)
    return { success: false, error: error as Error }
  }
}

// Función para generar productos aleatorios destacados
export function getRandomFeaturedProducts(products: ProductType[], count: number = 4) {
  if (!products.length) return []

  const shuffled = [...products].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// Función para obtener un producto para el banner (que no esté en los destacados)
export function getBannerProduct(products: ProductType[], featuredProducts: ProductType[]) {
  if (!products.length) return null

  const availableForBanner = products.filter(
    (product) => !featuredProducts.some((fp) => fp.id === product.id),
  )

  return availableForBanner.length > 0 ? availableForBanner[0] : null
}
