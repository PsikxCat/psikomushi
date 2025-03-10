import { useNavigate } from 'react-router-dom'

import { Session } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase'

interface LogoutButtonProps {
  setSession: (session: Session | null) => void
}

export default function LogoutButton({ setSession }: LogoutButtonProps) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setSession(null)
      navigate('/')
    } catch (error: unknown) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <button
      className="rounded-md bg-red-700 px-2 py-1 text-sm text-white hover:bg-red-800"
      onClick={handleLogout}
    >
      Salir
    </button>
  )
}
