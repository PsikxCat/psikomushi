import { useState, useEffect } from 'react'

import { GlobalContext } from './GlobalContext'
import { supabase } from '@/utils/supabase'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // ! Esto esta hardcodeado, deberia ser un estado que se obtenga de la API de autenticacion de Supabase <--------
  console.log('isLoggedIn: ', isLoggedIn)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
