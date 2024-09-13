import { ProductCard } from '@/components'

export default function Home() {
  const products = [
    {
      id: 1,
      imageUrl: './hongo.webp',
      name: 'Hongo Comestible 1',
      description: 'Descripción breve del hongo comestible 1.',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/300',
      name: 'Hongo Comestible 2',
      description: 'Descripción breve del hongo comestible 2.',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/300',
      name: 'Hongo Comestible 3',
      description: 'Descripción breve del hongo comestible 3.',
    },
    {
      id: 4,
      imageUrl: 'https://via.placeholder.com/300',
      name: 'Hongo Comestible 4',
      description: 'Descripción breve del hongo comestible 4.',
    },
    {
      id: 5,
      imageUrl: 'https://via.placeholder.com/300',
      name: 'Hongo Comestible 5',
      description: 'Descripción breve del hongo comestible 5.',
    },
    {
      id: 6,
      imageUrl: 'https://via.placeholder.com/300',
      name: 'Hongo Comestible 6',
      description: 'Descripción breve del hongo comestible 6.',
    },
  ]

  return (
    <section className="mx-0 flex w-full flex-col items-center gap-8 py-20">
      <p className="p text-center font-semibold leading-10">
        &quot;Descubre un mundo de sabores y propiedades únicas en nuestro catálogo de setas. ¡Frescura y
        calidad garantizadas!&quot;
      </p>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            description={product.description}
          />
        ))}
      </div>{' '}
    </section>
  )
}
