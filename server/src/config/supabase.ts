import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') dotenv.config({ path: 'src/config/.env.local' })

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string)

export { supabase }

// la configuracion de dotenv no deberia estar en este archivo, sin embargo, al quitarla no lee las variables de entorno
// ! pendiente de solucionar
