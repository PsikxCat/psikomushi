import { useState, useEffect } from 'react'

import './App.css'
import { supabase } from './utils/supabase'

function UserList() {
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

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    const { data, error } = await supabase.from('employee').select('*')
    console.log('data :>> ', data)

    if (error) {
      console.error('Error fetching users:', error)
    } else {
      setUsers(data)
    }
  }

  return (
    <div className="mx-0 flex w-full flex-col items-center gap-3 border p-20">
      <h1>data de Supabase</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id_employee}>
            {user.name} {user.surname} - {new Date(user.hire_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
