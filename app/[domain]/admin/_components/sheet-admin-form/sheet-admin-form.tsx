'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { ROLES } from '@/constants'
import { Pencil } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { startTransition, useEffect, useTransition } from 'react'
import { AdminCreatorSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { getUserById } from '@/app/[domain]/admin/_services/fetch'
import { updateAdmin } from '@/app/[domain]/admin/_services/update'
import { SheetAdminFormProps } from '@/app/[domain]/admin/_components/sheet-admin-form/sheet-admin-form.type'
import { createAdmin } from '@/app/[domain]/admin/_services/create'
import { toast } from 'sonner'

export function SheetAdminForm(props: SheetAdminFormProps) {
  const { id } = props
  const { domain } = useParams<{ domain: string }>()

  const { refresh } = useRouter()
  const [isPending, startTranstion] = useTransition()

  const IS_EDIT = !!id
  const ECA_NAME = decodeURIComponent(domain)

  const form = useForm<z.infer<typeof AdminCreatorSchema>>({
    resolver: zodResolver(AdminCreatorSchema),
    defaultValues: {
      eca_id: ECA_NAME,
      email: '',
      name: '',
      password: '',
      role: undefined,
    },
  })

  useEffect(() => {
    if (IS_EDIT) {
      startTransition(async () => {
        const DATA = await getUserById({ id, eca: ECA_NAME })
        if (!DATA) return

        form.setValue('name', DATA.name)
        form.setValue('email', DATA.email)
        form.setValue('password', DATA.password)
        form.setValue('role', DATA.role)
      })
    }
  }, [id, IS_EDIT, ECA_NAME, form])

  const onSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      if (IS_EDIT) {
        const { status, message } = await updateAdmin(values, id)

        if (status === 201) {
          toast.success(message)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createAdmin(values)

      if (status === 201) {
        toast.success(message)
        form.reset()
        refresh()

        return
      }

      toast.error(message)
    })
  })

  const onReset = () => form.reset()

  return (
    <Sheet>
      <SheetTrigger asChild>
        {IS_EDIT ? (
          <Button size='icon'>
            <Pencil />
          </Button>
        ) : (
          <Button>Crear administrador</Button>
        )}
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>
            {IS_EDIT ? 'Editar administrador' : 'Crear administrador'}
          </SheetTitle>
          <SheetDescription>
            {IS_EDIT
              ? 'Editar un administrador para tu ECA'
              : 'Crear un nuevo administrador para tu ECA'}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[750px]'>
          <Form {...form}>
            <form
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

              {!IS_EDIT && (
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

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un rol' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLES.map(({ name, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    variant='secondary'
                    type='button'
                    onClick={onReset}
                  >
                    Cancelar
                  </Button>
                </SheetClose>
                <Button
                  disabled={isPending}
                  type='submit'
                >
                  {IS_EDIT ? 'Editar' : 'Crear'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
