import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/utils/supabase'
import { RegisterSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardWrapper, Spinner, MessageSuccess, MessageError } from '@/components'

export default function RegisterForm() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      // validar que contrasenas coincidan
      if (values.password !== values.confirmPassword) {
        setError('Las contraseñas no coinciden')
        return
      }

      setIsRegistering(true)
      setError(null)
      setSuccess(null)

      // registrar usuario
      const { error: supabaseError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })
      // si hay error lanzar error para que sea capturado por el catch
      if (supabaseError) throw supabaseError

      // actualizar el perfil con el nombre del user
      const { data: auth } = await supabase.auth.getSession()
      if (auth.session) {
        await supabase.auth.updateUser({
          data: {
            name: values.name,
          },
        })
      }

      setSuccess('Registro exitoso!')
      navigate('/auth/login')
    } catch (error) {
      // manejo de error con tipado estricto
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al registrar'
      setError(errorMessage)
      console.error('Error al registrar:', errorMessage)
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <CardWrapper
      headerLabel="Crear una cuenta"
      backButtonLabel="¿Ya tienes una cuenta?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          {/* campos */}
          <div className="space-y-4">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nombre</FormLabel>

                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>

                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Contraseña</FormLabel>

                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Confirmar Contraseña</FormLabel>

                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* mensajes error/success */}
          {error && <MessageError message={error} />}
          {success && <MessageSuccess message={success} />}

          {/* botón de submit */}
          <Button type="submit" size="sm" className="mx-auto my-5 w-[50%]" disabled={isRegistering}>
            {isRegistering ? <Spinner visible /> : 'Registrarse'}{' '}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
