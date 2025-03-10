import { createClient } from '@supabase/supabase-js'
import { type z } from 'zod'

import { LoginSchema, RegisterSchema } from '@/schemas'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log('funcion login ejecutandose desde el server...')
  console.log('values: ', values)

  try {
    const { email, password } = values

    // Intentar iniciar sesión con email y contraseña
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error al iniciar sesión:', error.message)

      if (error.message.includes('credentials')) return { error: 'Credenciales inválidas' }
      else return { error: 'Error al iniciar sesión' }
    }

    // Si la autenticación es exitosa
    return { success: 'Login exitoso!', user: data.user }
  } catch (error) {
    console.error('Error desconocido:', error)
    return { error: 'Error desconocido' }
  }
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log('funcion register ejecutandose desde el server...')
  console.log('values: ', values)

  try {
    const { email, password } = values

    // Intentar registrar usuario con email y contraseña
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: process.env.CLIENT_BASE_URL as string },
    })

    if (error) {
      console.error('Error al registrar usuario:', error.message)
    }

    // Si el registro es exitoso
    return { success: 'Registro exitoso!', data }
  } catch (error) {
    console.error('Error desconocido:', error)
    return { error: 'Error desconocido' }
  }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! este fichero se modifica incluyendo su nombre para que contenga la logica de acceso a la base de datos <<<<<<
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! la logica correspondiente a la autenticacion se eliminara <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
