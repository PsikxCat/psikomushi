import { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { fetchProducts } from '@/services/api/products'
import { AdminTable, NullData } from '@/components'
import { columns } from '@/components/admin/products/columns'
import { ProductType } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { session } = useContext(GlobalContext)

  const isUserAdmin = session?.user?.user_metadata?.role === 'admin'

  useEffect(() => {
    ;(async () => {
      const { data } = await fetchProducts()
      if (data) {
        setProducts(data)
      }
      setIsLoading(false)
    })()
  }, [])

  if (!isUserAdmin) {
    return <NullData title="No tienes permisos para ver esta página" />
  }

  return (
    <section className="flex h-full w-full flex-col text-earth-darkBrown">
      <h2 className="my-0 text-center text-earth-terracotta">Gestionar Productos</h2>
      <p className="w-full p-2 text-center font-bold">Se muestran todos los productos</p>

      <AdminTable columns={columns} data={products} isLoading={isLoading} />
    </section>
  )
}
