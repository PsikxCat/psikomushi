import { useState, useEffect } from 'react'
import { ProductCard } from '@/components'

// Definir el tipo de producto para mejorar la seguridad de tipos
interface Product {
  id: number
  imageUrl: string
  name: string
  description: string
}

export default function Home() {
  const allProducts = [
    {
      id: 1,
      imageUrl: './hongo.webp', // Asegurarse que las rutas son correctas para archivos públicos
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

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [bannerProduct, setBannerProduct] = useState<Product | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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

  // > Redirigir a la página de productos <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const handleClick = () => {
    console.log('Botón presionado')
  }

  return (
    <section className="flex w-full flex-col gap-12 py-10">
      {/* Banner Hero - con renderizado condicional mejorado */}
      {isLoaded && bannerProduct ? (
        <section className="relative h-[50vh] w-full overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bannerProduct.imageUrl})`,
            }}
          >
            <div className="from-earth-darkBg/80 absolute inset-0 bg-gradient-to-r to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center p-8 md:p-16">
            <div className="max-w-lg">
              <h1 className="mb-4 text-3xl font-bold text-earth-lightText drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] md:text-5xl">
                La magia de los hongos en tu mesa
              </h1>

              <p className="mb-8 text-lg text-earth-sand drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] md:text-xl">
                Descubre sabores únicos cultivados con pasión y experiencia. Directo del bosque a tu cocina.
              </p>

              <button
                className="rounded-md bg-earth-mediumBrown px-6 py-3 font-medium tracking-wider text-white transition-colors hover:bg-earth-darkBrown"
                onClick={handleClick}
              >
                Explorar catálogo
              </button>
            </div>
          </div>
        </section>
      ) : isLoaded ? (
        <div className="flex h-[30vh] w-full items-center justify-center rounded-xl bg-earth-sand">
          <p className="text-xl text-earth-darkBrown">No hay productos disponibles para mostrar</p>
        </div>
      ) : (
        <div className="flex h-[30vh] w-full items-center justify-center rounded-xl bg-earth-sand">
          <p className="text-xl text-earth-darkBrown">Cargando...</p>
        </div>
      )}

      {/* Frase */}
      <section className="mx-auto max-w-3xl px-4">
        <p className="text-center text-lg font-medium italic leading-relaxed text-earth-mustard md:text-xl">
          &quot; Descubre un mundo de sabores y propiedades únicas en nuestro catálogo de setas. ¡Frescura y
          calidad garantizadas en cada bocado! &quot;
        </p>
      </section>

      {/* Productos destacados */}
      <section className="rounded-lg bg-earth-sand px-4 py-8 shadow-lg">
        <h2 className="mb-8 text-center">
          <span className="border-earth-terracotta pb-2 text-2xl font-semibold uppercase text-earth-darkBrown min-[400px]:border-b-2">
            Productos destacados
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                description={product.description}
                // > crear una campo long description para la pagina del producto individual <<<<<<<<<<<<<<<<<<<<<<<
                // isHomePage
              />
            ))
          ) : (
            <p className="col-span-full text-center text-earth-darkBrown">Cargando productos destacados...</p>
          )}
        </div>
      </section>

      {/* Sección informativa */}
      <section className="grid gap-8 rounded-lg bg-earth-cream p-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-2xl font-semibold text-earth-mediumBrown">¿Por qué elegirnos?</h3>
          <ul className="space-y-3">
            <li className="flex items-start text-earth-darkBrown">
              <span className="mr-2 text-earth-oliveGreen">✓</span>
              <span>Cultivamos en condiciones ideales para maximizar sabor y nutrientes</span>
            </li>
            <li className="flex items-start text-earth-darkBrown">
              <span className="mr-2 text-earth-oliveGreen">✓</span>
              <span>Variedades exclusivas cultivadas por expertos micólogos</span>
            </li>
            <li className="flex items-start text-earth-darkBrown">
              <span className="mr-2 text-earth-oliveGreen">✓</span>
              <span>Entregas rápidas para garantizar la máxima frescura</span>
            </li>
            <li className="flex items-start text-earth-darkBrown">
              <span className="mr-2 text-earth-oliveGreen">✓</span>
              <span>Sostenibilidad y respeto por el medio ambiente</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-semibold text-earth-mediumBrown">Compromiso Psikomushi</h3>
          <p className="leading-relaxed text-earth-darkText">
            En Psikomushi nos dedicamos a cultivar y seleccionar los mejores hongos comestibles. Nuestra
            pasión es traerte la experiencia gourmet del bosque directamente a tu hogar, con productos de la
            más alta calidad que realzarán cualquier plato que prepares.
          </p>
        </div>
      </section>
    </section>
  )
}
