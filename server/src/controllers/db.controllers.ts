import { Request, Response } from 'express'
import { supabase } from '@/config/supabase'

// > Pasar a un archivo aparte src/types/api.types.ts <-----------------------------
interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: string
}

// | Obtener empleados
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('employee').select('*')

    if (error) {
      console.error('Error obteniendo los empleados:', error)

      const response: ApiResponse<null> = {
        success: false,
        message: 'Ocurrió un error al obtener los empleados',
        error: error.message,
      }

      return res.status(500).json(response)
    }

    // console.log('Empleados en DB:', data)

    const response: ApiResponse<typeof data> = {
      success: true,
      message: 'Empleados obtenidos correctamente',
      data,
    }

    return res.status(200).json(response)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error inesperado:', err.message)
      const response: ApiResponse<null> = {
        success: false,
        message: 'Ocurrió un error inesperado',
        error: err.message,
      }
      return res.status(500).json(response)
    } else {
      console.error('Error inesperado:', err)
      const response: ApiResponse<null> = {
        success: false,
        message: 'Ocurrió un error inesperado',
        error: 'Error desconocido',
      }
      return res.status(500).json(response)
    }
  }
}
