import { useState, useContext, useEffect, ChangeEvent } from 'react'
import { GlobalContext } from '@/context/GlobalContext'
import { FiSearch } from 'react-icons/fi'

import { ProductCard, Spinner } from '@/components'

export default function StorePage() {
  const { productState } = useContext(GlobalContext)
  const { allProducts, bannerProduct } = productState

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [isLoading, setIsLoading] = useState(true)

  // Simular un pequeño retardo para asegurar la carga de productos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Filtrar productos por término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(allProducts)
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }, [searchTerm, allProducts])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

  return (
    <section className="flex w-full flex-col gap-8 py-10">
      {/* Banner */}
      <section className="relative h-[30vh] w-full overflow-hidden rounded-lg shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerProduct?.image_urls[0]})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center p-8">
          <div className="max-w-lg">
            <h1 className="mb-2 text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] md:text-5xl">
              Catálogo de Hongos
            </h1>
            <p className="text-earth-sand drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] md:text-xl">
              Explora nuestra colección de hongos cultivados con cuidado y experiencia
            </p>
          </div>
        </div>
      </section>

      {/* Barra de búsqueda y filtros */}
      <section className="rounded-lg bg-earth-cream p-4 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-earth-darkBrown">Nuestros Productos</h2>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="h-5 w-5 text-earth-darkText" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar producto..."
              className="w-full rounded-md border border-earth-sand bg-white py-2 pl-10 pr-4 text-earth-darkBrown focus:border-earth-terracotta focus:outline-none focus:ring-1 focus:ring-earth-terracotta"
            />
          </div>
        </div>
      </section>

      {/* Grid de productos */}
      <section className="min-h-[50vh] rounded-lg bg-earth-sand px-4 py-8 shadow-lg">
        {isLoading ? (
          <div className="flex h-[30vh] items-center justify-center">
            <Spinner visible={isLoading} />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} isHomePage={false} />
            ))}
          </div>
        ) : (
          <div className="flex h-[30vh] items-center justify-center">
            <p className="text-xl text-earth-darkBrown">
              No se encontraron productos que coincidan con la búsqueda
            </p>
          </div>
        )}
      </section>

      {/* Sección informativa */}
      <section className="mt-8 rounded-lg bg-earth-sand p-6 shadow-md">
        <h3 className="mb-4 text-center text-xl font-semibold text-earth-darkBrown">
          ¿Buscas algo específico?
        </h3>
        <p className="mb-4 text-center text-earth-darkText">
          Contamos con una amplia variedad de hongos para diferentes propósitos culinarios. Si necesitas ayuda
          para encontrar el producto perfecto para tu receta, no dudes en contactarnos.
        </p>
        <div className="flex justify-center">
          <button className="rounded-md bg-earth-terracotta px-6 py-2 font-medium text-white transition-all hover:bg-earth-darkBrown">
            Contactar con un experto
          </button>
        </div>
      </section>
    </section>
  )
}
