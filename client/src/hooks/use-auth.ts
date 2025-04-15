import { useState, useEffect, useCallback } from 'react'

import { Session } from '@supabase/supabase-js'
import {
  getCurrentSession,
  setupAuthListener,
  hasSessionChanged,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  resetPassword,
  updatePassword,
} from '@/services/api/auth'

export function useAuth() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<Error | null>(null)

  // Función memoizada para manejar la sesión
  const handleSetSession = useCallback((newSession: Session | null | undefined) => {
    setSession((prevSession) => {
      if (!hasSessionChanged(prevSession, newSession)) {
        return prevSession // No actualizar si no hay cambios reales
      }
      return newSession
    })
  }, [])

  // Función para iniciar sesión
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthError(null)
      const { user, session, error } = await signInWithEmail(email, password)

      if (error) throw error

      return { success: true, user, session }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error desconocido al iniciar sesión')
      setAuthError(err)
      return { success: false, error: err }
    }
  }, [])

  // Función para registrar un nuevo usuario
  const register = useCallback(async (email: string, password: string, metadata?: object) => {
    try {
      setAuthError(null)
      const { user, session, error } = await signUpWithEmail(email, password, metadata)

      if (error) throw error

      return { success: true, user, session }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error desconocido al registrarse')
      setAuthError(err)
      return { success: false, error: err }
    }
  }, [])

  // Función para cerrar sesión
  const logout = useCallback(async () => {
    try {
      setAuthError(null)
      const { error } = await signOut()

      if (error) throw error

      return { success: true }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error desconocido al cerrar sesión')
      setAuthError(err)
      return { success: false, error: err }
    }
  }, [])

  // Función para restablecer contraseña
  const forgotPassword = useCallback(async (email: string) => {
    try {
      setAuthError(null)
      const { error } = await resetPassword(email)

      if (error) throw error

      return { success: true }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al enviar correo de recuperación')
      setAuthError(err)
      return { success: false, error: err }
    }
  }, [])

  // Función para actualizar contraseña
  const changePassword = useCallback(async (newPassword: string) => {
    try {
      setAuthError(null)
      const { error } = await updatePassword(newPassword)

      if (error) throw error

      return { success: true }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al actualizar contraseña')
      setAuthError(err)
      return { success: false, error: err }
    }
  }, [])

  // Efecto para obtener la sesión al inicio
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setAuthLoading(true)
        const { session: currentSession, error } = await getCurrentSession()

        if (error) {
          console.error('Error obteniendo sesión:', error)
          setSession(null)
        } else {
          handleSetSession(currentSession)
        }
      } catch (err) {
        console.error('Error inesperado:', err)
        setSession(null)
      } finally {
        setAuthLoading(false)
      }
    }

    fetchSession()

    // Configurar el listener para cambios en la autenticación
    const subscription = setupAuthListener((newSession) => {
      handleSetSession(newSession)
    })

    return () => {
      // Limpiar el listener al desmontar
      subscription.unsubscribe()
    }
  }, [handleSetSession])

  return {
    session,
    setSession: handleSetSession,
    authLoading,
    authError,
    login,
    register,
    logout,
    forgotPassword,
    changePassword,
  }
}
