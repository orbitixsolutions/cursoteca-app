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
import { AdminFormProps } from '@/app/[eca]/dashboard/admin/_components/admin-form/admin-form.type'
import { SheetFormWrapper } from '@/components/sheet-from-wrapper'
import { Input } from '@/components/ui/input'
import { getEcaName } from '@/helpers/get-eca-name'
import { CreateAdminSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createAdmin } from '@/app/[eca]/dashboard/admin/_services/create'
import { getAdminById } from '@/app/[eca]/dashboard/admin/_services/fetch'
import { updateAdmin } from '@/app/[eca]/dashboard/admin/_services/update'
import { toast } from 'sonner'

export function AdminForm(props: AdminFormProps) {
  const { id } = props

  const IS_EDITING = !!id

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const { eca } = useParams<{ eca: string }>()
  const { DOMAIN } = getEcaName(eca)

  const form = useForm<z.infer<typeof CreateAdminSchema>>({
    resolver: zodResolver(CreateAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'ADMIN',
      eca: DOMAIN,
    },
  })

  useEffect(() => {
    if (IS_EDITING) {
      startTransition(async () => {
        const DATA = await getAdminById(id)
        if (!DATA) return

        form.setValue('name', DATA.name || '')
        form.setValue('email', DATA.email)
        form.setValue('role', DATA.role)
        form.setValue('password', DATA.password)
      })
    }
  }, [IS_EDITING, id, form])

  const IS_SUBMITTED = form.formState.isSubmitSuccessful

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateAdmin(values, id)

        if (status === 201) {
          refresh()
          toast.success(message)

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createAdmin(values)

      if (status === 201) {
        refresh()
        toast.success(message)
        form.reset()

        return
      }

      toast.error(message)
    })
  })

  return (
    <SheetFormWrapper
      title={IS_EDITING ? 'Editar administrador' : 'Agregar administrador'}
      formId='admin-form'
      isSubmitted={IS_SUBMITTED}
      isEditing={IS_EDITING}
      disabled={isPending}
    >
      <Form {...form}>
        <form
          id='admin-form'
          onSubmit={onSubmit}
          className='grid gap-4 py-7'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!IS_EDITING && (
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </SheetFormWrapper>
  )
}
