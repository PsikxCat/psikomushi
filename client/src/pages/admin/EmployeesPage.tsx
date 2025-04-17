import { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { fetchEmployees } from '@/services/api/users'
import { AdminTable, NullData } from '@/components'
import { columns } from '@/components/admin/employees/columns'
import { EmployeeType } from '@/types'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { session } = useContext(GlobalContext)

  const isUserAdmin = session?.user?.user_metadata?.role === 'admin'

  useEffect(() => {
    ;(async () => {
      const { data } = await fetchEmployees()
      if (data) {
        setEmployees(data)
      }
      setIsLoading(false)
    })()
  }, [])

  if (!isUserAdmin) {
    return <NullData title="No tienes permisos para ver esta página" />
  }

  return (
    <section className="flex h-full w-full flex-col text-earth-darkBrown">
      <h2 className="my-0 mb-8 text-center text-earth-terracotta">Gestionar Empleados</h2>

      <AdminTable<EmployeeType> columns={columns} data={employees} isLoading={isLoading} />
    </section>
  )
}
