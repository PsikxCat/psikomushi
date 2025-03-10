import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'

import { GlobalContext } from './GlobalContext'
import { supabase } from '@/utils/supabase'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [session, setSession] = useState<Session | null>(null)

  // Mantener actualizada la sesión de usuario
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
