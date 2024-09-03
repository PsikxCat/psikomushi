import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  'https://juvqsssntugauywonksb.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dnFzc3NudHVnYXV5d29ua3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NTY4MTksImV4cCI6MjA0MDQzMjgxOX0.-8R7pGTS2sPTD44Mp6Okj-sJf3tMbqGt4pecS4_WmM8',
)
