// import { ReactNode, useContext } from 'react'
// import { Navigate } from 'react-router-dom'

// import { GlobalContext } from '@/context/GlobalContext'

// export const RequireAdmin = ({ children }: { children: ReactNode }) => {
//   const { session } = useContext(GlobalContext)
//   const userRole = session?.user?.role
//   return userRole === 'admin' ? children : <Navigate to="/" replace />
// }

// export const RequireEmployee = ({ children }: { children: ReactNode }) => {
//   const { session } = useContext(GlobalContext)
//   const userRole = session?.user?.role
//   return userRole && ['admin', 'employee'].includes(userRole) ? children : <Navigate to="/" replace />
// }

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
