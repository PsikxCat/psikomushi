import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { GlobalContext } from '@/context/GlobalContext'

type AllowedRoles = 'admin' | 'seller' | 'delivery' | 'client' | (string & {})

// Componente de protección de rutas reutilizable
const ProtectedRoute = ({
  allowedRoles,
  redirectPath = '/',
  children,
}: {
  allowedRoles: AllowedRoles[] | 'guest'
  redirectPath?: string
  children?: React.ReactNode
}) => {
  const { session, loading } = useContext(GlobalContext)
  const location = useLocation()

  // Mostrar un indicador de carga mientras se verifica la sesión
  if (loading) {
    return <div>Cargando...</div>
  }

  // Caso especial para rutas que requieren visitante (no autenticado)
  if (allowedRoles === 'guest') {
    if (session) {
      return <Navigate to={redirectPath} state={{ from: location }} replace />
    }
    return children ? <>{children}</> : <Outlet />
  }

  // Si no hay sesión, redirigir a la página de login
  if (!session) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  // Verificar si el usuario tiene el rol adecuado
  const userRole = session.user?.user_metadata?.role

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  // Si todo está bien, mostrar el contenido protegido
  return children ? <>{children}</> : <Outlet />
}

// Componentes específicos para cada rol
export const RequireAdmin = () => <ProtectedRoute allowedRoles={['admin']} />

export const RequireSeller = () => <ProtectedRoute allowedRoles={['admin', 'seller']} />

export const RequireDelivery = () => <ProtectedRoute allowedRoles={['admin', 'delivery']} />

export const RequireClient = () => <ProtectedRoute allowedRoles={['admin', 'client']} />

export const RequireGuest = () => <ProtectedRoute allowedRoles="guest" redirectPath="/" />
