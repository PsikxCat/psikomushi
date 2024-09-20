import { Request, Response } from 'express'
import { supabase } from '@/config/supabase'

// | Obtener empleados
export const getEmployees = async (req: Request, res: Response) => {
  try {
    console.log('Obteniendo empleados...')

    const { data, error } = await supabase.from('employee').select('*')

    if (error) {
      console.error('Error obteniendo los empleados:', error)
      return res.status(500).json({ message: 'Ocurrio un error al obtener los empleados', error: error.message })
    }

    console.log('Empleados en DB:', data)

    return res.status(200).json(data)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error inesperado:', err.message)
      return res.status(500).json({ message: 'Ocurrio un error inesperado', error: err.message })
    } else {
      console.error('Error inesperado:', err)
      return res.status(500).json({ message: 'Ocurrio un error inesperado', error: 'Error desconocido' })
    }
  }
}
