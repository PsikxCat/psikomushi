import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { useAuth } from '@/hooks/use-auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardWrapper, Spinner, MessageSuccess, MessageError } from '@/components'

export default function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values

    try {
      setIsLoggingIn(true)
      setError(null)
      setSuccess(null)

      // Iniciar sesión
      const { error } = await login(email, password)
      // Si hay error, lanzar error para que sea capturado por el catch
      if (error) throw error

      setSuccess('Login exitoso!')
      navigate('/')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al iniciar sesión'
      setError(errorMessage)
      console.error('Error al iniciar sesión:', errorMessage)
    } finally {
      setIsLoggingIn(false)
    }
  }

  // Limpiar mensajes despues de cinco segundos
  useEffect(() => {
    if (error || success) {
      const timeout = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [error, success])

  return (
    <CardWrapper
      headerLabel="Bienvenido de vuelta"
      backButtonLabel="¿No estas registrado?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          {/* campos */}
          <div className="space-y-4">
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
          </div>

          {/* mensajes error/success */}
          {error && <MessageError message={error} />}
          {success && <MessageSuccess message={success} />}

          {/* botón de submit */}
          <Button type="submit" size="sm" className="mx-auto my-5 w-[50%]" disabled={isLoggingIn}>
            {isLoggingIn ? <Spinner visible /> : 'Iniciar sesión'}{' '}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
