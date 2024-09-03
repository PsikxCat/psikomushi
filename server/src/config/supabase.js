import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config({ path: 'src/config/.env.local' }) // ! quitar esto !!!!!!!!!!!!!!!!!

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

async function getEmployees() {
  console.log('Fetching employees...')
  const { data, error } = await supabase.from('employee').select('*')

  if (error) {
    console.error('Error fetching employee:', error)
    return null
  }

  console.log('Employee data:', data)
  return data
}

export { supabase, getEmployees }
