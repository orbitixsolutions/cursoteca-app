'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { login } from '@/app/login/_services/login'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await login(values)

      if (status === 201) {
        toast.success(message)
        form.reset()

        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className='grid gap-5'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='miguel1048@eca-email.com'
                  type='email'
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='********'
                  type='password'
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}
