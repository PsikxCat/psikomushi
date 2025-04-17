import { useContext, useEffect, useState } from 'react'
import { Row } from '@tanstack/react-table'

import { GlobalContext } from '@/context/GlobalContext'
import { fetchCustomers } from '@/services/api/users'
import { CustomerType } from '@/types'

import { AdminTable, NullData } from '@/components'
import { columns } from '@/components/admin/customers/columns'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { session } = useContext(GlobalContext)

  const isUserAdmin = session?.user?.user_metadata?.role === 'admin'

  useEffect(() => {
    ;(async () => {
      const { data } = await fetchCustomers()
      if (data) {
        setCustomers(data)
      }
      setIsLoading(false)
    })()
  }, [])

  const filterConfig = {
    multiColumnFilter: (row: Row<CustomerType>, _: unknown, value: string) => {
      if (!value) return true
      const searchValue = value.toLowerCase()
      return (
        row.original.last_name?.toLowerCase().includes(searchValue) ||
        row.original.name?.toLowerCase().includes(searchValue) ||
        row.original.phone_number?.toLowerCase().includes(searchValue) ||
        row.original.email?.toLowerCase().includes(searchValue)
      )
    },
    placeholderColumns: ['nombre', 'e-mail', 'telefono'],
  }

  if (!isUserAdmin) {
    return <NullData title="No tienes permisos para ver esta página" />
  }

  return (
    <section className="flex h-full w-full flex-col text-earth-darkBrown">
      <h2 className="my-0 mb-8 text-center text-earth-terracotta">Gestionar Clientes</h2>

      <AdminTable<CustomerType>
        columns={columns}
        data={customers}
        isLoading={isLoading}
        filterConfig={filterConfig}
      />
    </section>
  )
}
