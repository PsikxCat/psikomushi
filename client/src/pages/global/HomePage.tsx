import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductCard } from '@/components'

import { GlobalContext } from '@/context/GlobalContext'
import { AspectRatio } from '@/components/ui/aspect-ratio'

// Componente esqueleto para tarjetas de productos
const ProductCardSkeleton = () => (
  <div className="flex animate-pulse flex-col rounded-lg bg-earth-lightBg shadow-md">
    {/* Imagen esqueleto */}
    <AspectRatio ratio={16 / 9}>
      <div className="h-48 w-full rounded-t-lg bg-earth-lightBrown"></div>
    </AspectRatio>

    {/* Contenido esqueleto */}
    <div className="flex flex-col space-y-3 px-4 py-6">
      {/* Título esqueleto */}
      <div className="h-6 w-3/4 rounded bg-earth-lightBrown"></div>

      {/* Descripción esqueleto */}
      <div className="space-y-2">
        <div className="h-4 rounded bg-earth-lightBrown"></div>
        <div className="h-4 w-5/6 rounded bg-earth-lightBrown"></div>
      </div>
    </div>
  </div>
)

const BannerSkeleton = () => (
  <div className="relative h-[50vh] w-full animate-pulse overflow-hidden shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
  </div>
)

export default function Home() {
  const { productState } = useContext(GlobalContext)
  const { featuredProducts, isLoading, bannerProduct } = productState

  const navigate = useNavigate()

  return (
    <section className="flex w-full flex-col gap-12 py-10">
      {/* Banner */}
      {isLoading ? (
        <BannerSkeleton />
      ) : bannerProduct ? (
        <section className="relative h-[50vh] w-full overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bannerProduct.image_urls[0]})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
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
                onClick={() => navigate('/store')}
              >
                Explorar catálogo
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex h-[30vh] w-full items-center justify-center rounded-xl bg-earth-sand">
          <p className="text-xl text-earth-darkBrown">No hay productos disponibles para mostrar</p>
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
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => <ProductCardSkeleton key={index} />)
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => <ProductCard key={product.id} product={product} isHomePage />)
          ) : (
            <p className="col-span-full text-center text-earth-darkBrown">
              No hay productos destacados disponibles
            </p>
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
