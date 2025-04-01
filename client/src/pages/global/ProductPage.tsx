import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { supabase } from '@/utils/supabase'
import { ProductType } from '@/types'
import { GlobalContext } from '@/context/GlobalContext'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Spinner } from '@/components'

export default function ProductPage() {
  const [product, setProduct] = useState<ProductType | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState('')

  const { productId } = useParams()
  const navigate = useNavigate()
  const { allProducts, isLoading, setIsLoading } = useContext(GlobalContext)

  // Traer el producto al cargar la página
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true)

      // buscar el producto en el contexto
      const productFromContext = allProducts.find((p) => p.id === productId)

      if (productFromContext) {
        setProduct(productFromContext)
        setSelectedImage(productFromContext.image_urls[0])
        setIsLoading(false)
        return
      }

      // Si no está en el contexto, buscarlo en la base de datos
      try {
        const { data } = await supabase.from('products').select('*').eq('id', productId).single()

        if (data) {
          setProduct(data)
          setSelectedImage(data.image_urls[0])
        } else {
          console.error('Producto no encontrado')
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      getProduct()
    }
  }, [productId, allProducts])

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1 && product && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    console.log(`Añadiendo al carrito: ${quantity} unidades de ${product.name}`)
    // Aquí la lógica para añadir al carrito

    // Mostrar algún tipo de notificación (opcional)
    alert(`${quantity} unidades de ${product.name} añadidas al carrito`)
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner visible={isLoading} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-earth-lightBrown">Producto no encontrado</h2>
        <p className="mt-2 text-red-600">El producto que buscas no existe o ha sido eliminado.</p>
        <button
          onClick={() => navigate('/store')}
          className="mt-6 rounded-md bg-earth-terracotta px-6 py-2 font-medium text-white hover:bg-earth-darkBrown"
        >
          Volver a la tienda
        </button>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-[2200px] px-2 py-8">
      {/* Breadcrumb */}
      {/* <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-sm font-medium text-earth-darkBrown hover:text-earth-terracotta"
              >
                Inicio
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <button
                  onClick={() => navigate('/store')}
                  className="text-sm font-medium text-earth-darkBrown hover:text-earth-terracotta"
                >
                  Tienda
                </button>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="truncate text-sm font-medium text-earth-terracotta">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div> */}

      {/* Contenido principal */}
      <section className="grid grid-cols-1 gap-8 rounded-lg bg-earth-cream p-6 shadow-lg lg:grid-cols-2">
        {/* Galería de imágenes */}
        <section className="space-y-4">
          {/* Imagen principal */}
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <AspectRatio ratio={4 / 3}>
              <img src={selectedImage} alt={product.name} className="h-full w-full object-cover" />
            </AspectRatio>
          </div>

          {/* Miniaturas */}
          <div className="flex justify-center space-x-2 overflow-x-auto border pb-2">
            {product.image_urls.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all ${
                  selectedImage === img
                    ? 'border-earth-terracotta'
                    : 'border-transparent hover:border-earth-sand'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} - vista ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Información del producto */}
        <section className="flex flex-col">
          <h1 className="text-3xl font-bold text-earth-darkBrown">{product.name}</h1>

          {/* Precio */}
          <div className="mt-4">
            <span className="text-2xl font-semibold text-earth-terracotta">
              $ {product.unit_price.toLocaleString('es-CO')}
            </span>
            <span className="ml-2 text-sm text-earth-darkText">por {product.weight}</span>
          </div>

          {/* Descripción */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-earth-darkBrown">Descripción</h2>
            <p className="mt-2 text-earth-darkText">{product.long_description}</p>
          </div>

          {/* Stock */}
          <div className="mt-6">
            <div className="flex items-center">
              <span className="text-sm font-medium text-earth-darkText">
                Disponibilidad:
                <span
                  className={`ml-2 ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-600'}`}
                >
                  {product.stock > 10
                    ? 'En stock'
                    : product.stock > 0
                      ? `Quedan ${product.stock} unidades`
                      : 'Agotado'}
                </span>
              </span>
            </div>
          </div>

          {/* Selección de cantidad */}
          <div className="mt-8">
            <div className="flex items-center">
              <span className="mr-4 text-earth-darkBrown">Cantidad:</span>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="h-8 w-8 rounded-md bg-earth-sand text-earth-darkBrown transition-colors hover:bg-earth-terracotta hover:text-white"
                  disabled={quantity <= 1}
                >
                  <span className="sr-only">Disminuir cantidad</span>
                  <span aria-hidden="true">-</span>
                </button>

                <span className="mx-3 w-8 text-center font-medium text-earth-darkText">{quantity}</span>

                <button
                  onClick={() => handleQuantityChange(1)}
                  className="h-8 w-8 rounded-md bg-earth-sand text-earth-darkBrown transition-colors hover:bg-earth-terracotta hover:text-white"
                  disabled={product.stock <= quantity}
                >
                  <span className="sr-only">Aumentar cantidad</span>
                  <span aria-hidden="true">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Precio total y botón de añadir al carrito */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="pr-4 text-xl font-medium text-earth-darkBrown">
              Total:{' '}
              <span className="font-semibold text-earth-terracotta">
                $ {(product.unit_price * quantity).toLocaleString('es-CO')}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center rounded-md px-6 py-3 font-medium text-white ${
                product.stock === 0
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-earth-terracotta transition-colors hover:bg-earth-darkBrown'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-8 rounded-md bg-earth-sand p-4">
            <h3 className="font-medium text-earth-darkBrown">Información de entrega</h3>
            <p className="mt-2 text-sm text-earth-darkText">
              Entregamos en 24-48 horas laborables. Envío gratuito para pedidos superiores a $50.
            </p>
          </div>

          {/* Botón para volver a la tienda */}
          <div className="mt-6">
            <button
              onClick={() => navigate('/store')}
              className="flex items-center text-earth-darkBrown hover:text-earth-terracotta"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Volver a la tienda
            </button>
          </div>
        </section>
      </section>
    </section>
  )
}
