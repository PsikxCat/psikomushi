import { useEffect, useState, useContext } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { EmployeeType } from '@/types'
import { getEmployees } from '@/api/employeeService'

export default function DashboardPage() {
  const [users, setUsers] = useState<EmployeeType[]>([])

  const { session } = useContext(GlobalContext)
  console.log('session :>> ', session)

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      const employees = await getEmployees()
      setUsers(employees)
    } catch (error) {
      console.error('Error en el servidor:', error)
    }
  }

  return (
    <section className="flex_center_column gap-2">
      <h1>data de Supabase</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id_employee}>
            {user.name} {user.surname} - {new Date(user.hire_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </section>
  )
}
