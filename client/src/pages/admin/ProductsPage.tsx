import { useContext, useEffect, useState } from 'react'
import { Row } from '@tanstack/react-table'

import { GlobalContext } from '@/context/GlobalContext'
import { fetchProducts } from '@/services/api/products'
import { ProductType } from '@/types'

import { AdminTable, NullData } from '@/components'
import { columns } from '@/components/admin/products/columns'

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

  const filterConfig = {
    multiColumnFilter: (row: Row<ProductType>, _: unknown, value: string) => {
      if (!value) return true
      const searchValue = value.toLowerCase()
      return (
        row.original.ref?.toLowerCase().includes(searchValue) ||
        row.original.name?.toLowerCase().includes(searchValue)
      )
    },
    placeholderColumns: ['referencia', 'nombre'],
  }

  if (!isUserAdmin) {
    return <NullData title="No tienes permisos para ver esta página" />
  }

  if (!isUserAdmin) {
    return <NullData title="No tienes permisos para ver esta página" />
  }

  return (
    <section className="flex h-full w-full flex-col text-earth-darkBrown">
      <h2 className="my-0 mb-8 text-center text-earth-terracotta">Gestionar Productos</h2>

      <AdminTable<ProductType>
        columns={columns}
        data={products}
        isLoading={isLoading}
        filterConfig={filterConfig}
      />
    </section>
  )
}
