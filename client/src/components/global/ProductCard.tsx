import { useNavigate } from 'react-router-dom'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ProductType } from '@/types'

interface ProductCardProps {
  product: ProductType
  isHomePage?: boolean
}

export default function ProductCard({ product, isHomePage = false }: ProductCardProps) {
  const { image_urls, name, short_description } = product
  const navigate = useNavigate()

  const handleViewDetails = () => navigate(`/store/${product.id}`)

  const handleAddToCart = () => {
    console.log(`Añadir ${name} al carrito`)
    // Aquí la lógica para añadir al carrito
  }

  return (
    <section
      className={`group h-full overflow-hidden rounded-lg bg-earth-lightBg shadow-md transition-all duration-300 hover:shadow-xl ${
        isHomePage ? 'cursor-pointer' : ''
      }`}
      onClick={isHomePage ? handleViewDetails : undefined}
    >
      {/* Imagen y boton agregar a carrito */}
      <section className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={image_urls[0]}
            alt={name}
            className={`h-full w-full object-cover transition-transform duration-300 ${isHomePage ? 'group-hover:scale-105' : ''}`}
          />
        </AspectRatio>

        {/* Botón de agregar al carrito */}
        {!isHomePage && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-end p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="mr-2 rounded-full bg-earth-sand p-2 text-earth-darkText shadow-md transition-colors hover:bg-earth-terracotta"
              aria-label="Añadir al carrito"
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
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Contenido */}
      <section className="flex flex-col p-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-earth-darkBrown">{name}</h3>
          <p className="mb-4 min-h-[50px] flex-grow text-sm text-earth-darkText">{short_description}</p>
        </div>

        {/* Botón de ver detalles */}
        {!isHomePage && (
          <section className="flex w-full items-center justify-between rounded-md bg-earth-lightBg p-4">
            <div className="flex flex-col text-center">
              <p className="text-sm font-semibold text-earth-darkBrown">
                $ {product.unit_price.toLocaleString('es-CO')}
              </p>
              <p className="text-xs text-earth-darkText">{product.weight}</p>
            </div>

            <button
              onClick={handleViewDetails}
              className="mt-auto self-start rounded-md bg-earth-sand px-4 py-2 font-medium text-earth-darkBrown transition-colors hover:bg-earth-terracotta hover:text-earth-lightText"
            >
              Ver detalles
            </button>
          </section>
        )}
      </section>
    </section>
  )
}
