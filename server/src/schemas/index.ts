import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().trim().email({
    message: 'Ingresa un correo válido',
  }),
  password: z.string().min(1, {
    message: 'Ingresa una contraseña',
  }),
})

export const RegisterSchema = z.object({
  name: z.string().trim().min(1, { message: 'El nombre es obligatorio.' }),
  email: z.string().trim().email({ message: 'Ingresa un correo válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  confirmPassword: z.string().min(6, { message: 'La confirmación debe tener al menos 6 caracteres.' }),
})

// !!!!!!!!!!!!!!! los esquemas correspondientes a la autenticación se eliminan <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
