import { supabase } from '@/utils/supabase'
import { Session } from '@supabase/supabase-js'

// Obtener la sesión actual
export async function getCurrentSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return { session: data.session, error: null }
  } catch (error) {
    console.error('Error getting session:', error)
    return { session: null, error }
  }
}

// Iniciar sesión con correo y contraseña
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    return { user: null, session: null, error }
  }
}

// Registrar un nuevo usuario
export async function signUpWithEmail(email: string, password: string, metadata?: object) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    if (error) throw error
    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    return { user: null, session: null, error }
  }
}

// Cerrar sesión
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error signing out:', error)
    return { error }
  }
}

// Recuperar contraseña
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error resetting password:', error)
    return { error }
  }
}

// Actualizar contraseña
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error updating password:', error)
    return { error }
  }
}

// Configurar el manejador de cambios de autenticación
export function setupAuthListener(callback: (session: Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_, session) => {
    callback(session)
  })

  return data.subscription
}

// Función auxiliar para comparar sesiones y determinar si hay cambios reales
export function hasSessionChanged(
  prevSession: Session | null | undefined,
  newSession: Session | null | undefined,
): boolean {
  // Si ambos son undefined o null, no hay cambio
  if (!prevSession && !newSession) return false

  // Si uno es null/undefined y el otro no, hay cambio
  if (!prevSession || !newSession) return true

  // Comparar IDs y fechas de expiración para determinar si son efectivamente diferentes
  return prevSession.user.id !== newSession.user.id || prevSession.expires_at !== newSession.expires_at
}
