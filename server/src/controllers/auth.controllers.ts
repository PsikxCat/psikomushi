import { Request, Response } from 'express'

import { LoginSchema, RegisterSchema } from '@/schemas'
import { login, register } from '@/actions/userAuth'

// import { supabase } from '@/config/supabase'

// > Pasar a un archivo aparte src/types/api.types.ts <-----------------------------
interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export const getUser = async (req: Request, res: Response) => {
  // hardcodear usuario por ahora
  const user = {
    id: 1,
    username: 'admin',
    email: 'user@admin.com',
  }

  const response: ApiResponse<typeof user> = {
    success: true,
    message: 'Usuario obtenido correctamente',
    data: user,
  }

  return res.status(200).json(response)
}

export const loginController = async (req: Request, res: Response) => {
  const values = req.body

  const validateFields = LoginSchema.safeParse(values)
  if (!validateFields.success) {
    return res.status(400).json({ error: 'Datos inválidos!' })
  }

  try {
    const result = await login(values)
    if (result.error) {
      return res.status(400).json(result)
    }
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ error: error + 'Error desconocido' })
  }
}

export const registerController = async (req: Request, res: Response) => {
  const values = req.body

  const validateFields = RegisterSchema.safeParse(values)
  if (!validateFields.success) {
    return res.status(400).json({ error: 'Datos inválidos!' })
  }

  try {
    const result = await register(values)
    if (result.error) {
      return res.status(400).json(result)
    }
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ error: error + 'Error desconocido' })
  }
}
