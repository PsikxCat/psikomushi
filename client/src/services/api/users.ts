import { supabase } from '@/utils/supabase'
import { UserType } from '@/types'

export async function fetchEmployees() {
  try {
    const { data, error } = await supabase.from('users').select('*').in('role', ['seller', 'delivery'])

    if (error) throw error

    return { data: data as UserType[], error: null }
  } catch (error) {
    console.error('Error obteniendo empleados:', error)
    return { data: null, error: error as Error }
  }
}

export async function fetchCustomers() {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('role', 'customer')

    if (error) throw error

    return { data: data as UserType[], error: null }
  } catch (error) {
    console.error('Error obteniendo clientes:', error)
    return { data: null, error: error as Error }
  }
}

export async function fetchUserById(userId: string) {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()

    if (error) throw error

    return { data: data as UserType, error: null }
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error)
    return { data: null, error: error as Error }
  }
}

export async function addUser(user: Omit<UserType, 'id'>) {
  try {
    const { data, error } = await supabase.from('users').insert([user]).select()

    if (error) throw error

    return { data: data[0] as UserType, error: null }
  } catch (error) {
    console.error('Error agregando usuario:', error)
    return { data: null, error: error as Error }
  }
}

export async function updateUser(id: string, updates: Partial<UserType>) {
  try {
    const { data, error } = await supabase.from('users').update(updates).eq('id', id).select()

    if (error) throw error

    return { data: data[0] as UserType, error: null }
  } catch (error) {
    console.error('Error actualizando usuario:', error)
    return { data: null, error: error as Error }
  }
}

export async function deleteUser(id: string) {
  try {
    const { error } = await supabase.from('users').delete().eq('id', id)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    console.error('Error eliminando usuario:', error)
    return { success: false, error: error as Error }
  }
}
