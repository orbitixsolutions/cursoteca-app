'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/app/[domain]/auth/_services/login'
import { toast } from 'sonner'

export function LoginForm() {
  const { domain } = useParams<{ domain: string }>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { message, status } = await login(values, domain)

      if (status === 201) {
        toast.success(message)
        return
      }

      toast.error(message)
    })
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className='w-[480px] p-6 grid gap-5'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder='usuario@ejemplo.com'
                  {...field}
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
                  type='password'
                  disabled={isPending}
                  placeholder='******'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type='submit'
          size='full'
        >
          {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}
