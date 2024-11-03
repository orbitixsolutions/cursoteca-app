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
import { useForm } from 'react-hook-form'
import { startTransition, useEffect, useTransition } from 'react'
import { AdminSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { getUserById } from '@/app/[domain]/dashboard/admin/_services/fetch'
import { updateAdmin } from '@/app/[domain]/dashboard/admin/_services/update'
import { AdminFormProps } from '@/app/[domain]/dashboard/admin/_components/admin-form/admin-form.type'
import { createAdmin } from '@/app/[domain]/dashboard/admin/_services/create'
import { SheetFormWrapper } from '@/components/sheet-from-wrapper'
import { toast } from 'sonner'

export function AdminForm(props: AdminFormProps) {
  const { id } = props
  const { domain } = useParams<{ domain: string }>()

  const { refresh } = useRouter()
  const [isPending, startTranstion] = useTransition()

  const IS_EDITING = !!id
  const ECA_NAME = decodeURIComponent(domain)

  const form = useForm<z.infer<typeof AdminSchema>>({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      ecaId: ECA_NAME,
      email: '',
      name: '',
      password: '',
      role: 'ADMIN',
    },
  })

  useEffect(() => {
    if (IS_EDITING) {
      startTransition(async () => {
        const DATA = await getUserById({ id })
        if (!DATA) return

        form.setValue('name', DATA.name)
        form.setValue('email', DATA.email)
        form.setValue('role', DATA.role)
      })
    }
  }, [IS_EDITING, id, form])

  const onSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
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
      title={IS_EDITING ? 'Editar administrador' : 'Crear administrador'}
      description={
        IS_EDITING
          ? 'Editar un administrador para tu ECA'
          : 'Crear un nuevo administrador para tu ECA'
      }
      formId='course-form'
      isEditing={IS_EDITING}
      disabled={isPending}
    >
      <Form {...form}>
        <form
          id='course-form'
          onSubmit={onSubmit}
          className='grid gap-4 px-1 py-4'
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
                    placeholder='Pepito Gonzales'
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
                <FormLabel>Correo electronico</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={`pepitogonzales@${ECA_NAME.replaceAll('-', '')}.com`}
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
                      placeholder='******'
                      type='password'
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
