import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { GlobalContext } from '@/context/GlobalContext'

export const RequireAdmin = () => {
  const { session } = useContext(GlobalContext)
  const userRole = session?.user?.role

  return userRole === 'admin' ? <Outlet /> : <Navigate to="/" replace />
}

export const RequireEmployee = () => {
  const { session } = useContext(GlobalContext)
  const userRole = session?.user?.role

  return userRole && ['admin', 'employee'].includes(userRole) ? <Outlet /> : <Navigate to="/" replace />
}

export const RequireGuest = () => {
  const { session } = useContext(GlobalContext)
  // Si el usuario está autenticado, redirigir a una página principal
  if (session) return <Navigate to="/" replace />

  return <Outlet />
}
