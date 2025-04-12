import { useContext } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
// import { EmployeeType } from '@/types'
// import { getEmployees } from '@/api/employeeService'

export default function DashboardPage() {
  const { session } = useContext(GlobalContext)
  // console.log('session :>> ', session)

  // useEffect(() => {
  //   fetchEmployees()
  // }, [])

  // async function fetchEmployees() {
  //   try {
  //     const employees = await getEmployees()
  //     setUsers(employees)
  //   } catch (error) {
  //     console.error('Error en el servidor:', error)
  //   }
  // }

  return (
    <section className="flex_center_column gap-2 text-earth-darkBrown">
      <h1>data de Supabase</h1>
      <ul>
        {session?.user?.user_metadata?.name && (
          <li>
            <strong>Nombre:</strong> {session.user.user_metadata.name}
          </li>
        )}
        {session?.user?.user_metadata?.email && (
          <li>
            <strong>Email:</strong> {session.user.user_metadata.email}
          </li>
        )}
        {session?.user?.user_metadata?.role && (
          <li>
            <strong>Rol:</strong> {session.user.user_metadata.role}
          </li>
        )}
      </ul>
    </section>
  )
}
