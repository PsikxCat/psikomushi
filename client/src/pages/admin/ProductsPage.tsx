import { useContext } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { AdminTable, NullData } from '@/components'
import { columns } from '@/components/admin/products/columns'

export default function ProductsPage() {
  const { session } = useContext(GlobalContext)
  console.log('session', session)

  const isUserAdmin = session?.user?.user_metadata?.role === 'admin'

  if (!isUserAdmin) {
    return <NullData title="No tienes permisos para ver esta página" />
  }

  return (
    <section className="flex h-full w-full flex-col text-earth-darkBrown">
      <h2 className="my-0 text-center text-earth-terracotta">Gestionar Productos</h2>
      <p className="w-full p-2 text-center font-bold">Se muestran todos los productos</p>

      <AdminTable columns={columns} data={[]} />
    </section>
  )
}
