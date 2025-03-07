import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv' //! * (2)

if (process.env.NODE_ENV !== 'production') dotenv.config({ path: 'src/config/.env.local' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)

export { supabase }

// ! !!!!!!!!!!!!!!!!!!!!!!!
// ! pendiente de solucionar
// la configuracion de dotenv(2) no deberia estar en este archivo, sin embargo, al quitarla no lee las variables de entorno
