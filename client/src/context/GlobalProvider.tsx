import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'

import { GlobalContext } from './GlobalContext'
import { supabase } from '@/utils/supabase'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  console.log('session desde context', session)

  // Mantener actualizada la sesión de usuario
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error obteniendo sesión:', error)
          setSession(null)
        } else {
          setSession(data.session)
        }
      } catch (err) {
        console.error('Error inesperado:', err)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        session,
        setSession,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
