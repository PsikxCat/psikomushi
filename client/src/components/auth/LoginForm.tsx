import { useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { type z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { LoginSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardWrapper, Spinner, MessageSuccess, MessageError } from '@/components'

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      console.log('Performing login...')

      axios
        .post(import.meta.env.VITE_API_BASE_URL + '/api/auth/login', values)
        .then((response) => {
          const data = response.data
          console.log('respuesta de api' + data.success)
          if (data.error) setError(data.error)
          if (data.success) {
            setSuccess(data.success)
            navigate('/')
          }
        })
        .catch((error) => {
          console.error(error)
          setError(error.response?.data?.error || 'Error desconocido')
        })
    })

    console.log(values)
  }

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
          <MessageError message={error} />
          <MessageSuccess message={success} />

          {/* botón de submit */}
          <Button type="submit" size="sm" className="mx-auto my-5 w-[50%]">
            {isPending ? <Spinner visible /> : 'Iniciar sesión'}{' '}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
