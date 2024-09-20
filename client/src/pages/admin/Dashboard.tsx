import { useEffect, useState, useContext } from 'react'

// import { supabase } from '@/utils/supabase'
import { GlobalContext } from '@/context/GlobalContext'

export default function Dashboard() {
  const [users, setUsers] = useState<
    {
      id_employee: number
      name: string
      surname: string
      role: string
      phone_number: string
      email: string
      hire_date: string
    }[]
  >([])

  const { isLoggedIn } = useContext(GlobalContext)
  console.log('isLoggedIn :>> ', isLoggedIn)

  useEffect(() => {
    // if (!isLoggedIn) return

    getEmployees()
  }, [isLoggedIn])

  async function getEmployees() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/db/employees`)

      if (!response.ok) throw new Error('Error cargando empleados')

      const data = await response.json()
      console.log('data desde API :>> ', data)
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
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
