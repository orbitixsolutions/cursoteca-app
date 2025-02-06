'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select'
import { createInscription } from '@/app/[eca]/(courses)/course/[id]/_services/create'
import { parseDate } from '@internationalized/date'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { InscriptionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { EDUCATIONAL_LEVELS, SELECT_DEPARTAMENTS } from '@/constants'
import { useParams, useRouter } from 'next/navigation'
import { getEcaName } from '@/helpers/get-eca-name'
import { toast } from 'sonner'
import { ErrorCard } from '@/components/error-card/error-card'
import { InputDate } from '@/components/ui/input-date'
import { formatDateToString, getCurrentDate } from '@/helpers/get-current-date'
import { useIsMobile } from '@/hooks/use-mobile'
import { ScrollArea } from '@/components/ui/scroll-area'

const INITIAL_ERROR = { message: '', active: false }

export function InscriptionForm() {
  const [isPending, startTransition] = useTransition()
  const isMobile = useIsMobile()

  const [open, setOpen] = useState(false)
  const [error, setError] = useState(INITIAL_ERROR)

  const { eca, id: courseId } = useParams<{ eca: string; id: string }>()
  const { refresh } = useRouter()

  const CURRENT_DATE = getCurrentDate()

  const { DOMAIN } = getEcaName(eca)

  const form = useForm<z.infer<typeof InscriptionSchema>>({
    resolver: zodResolver(InscriptionSchema),
    defaultValues: {
      firstNames: '',
      lastNames: '',
      phoneNumber: '',
      email: '',
      eca: DOMAIN,
      documentId: '',
      dateOfBorn: CURRENT_DATE,
      province: '',
      address: '',
      lastNameInstitution: '',
      educationalLevel: undefined,
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const DOCUMENT_ID = values.documentId

      const { status, message } = await createInscription(values, {
        courseId: courseId,
        documentId: DOCUMENT_ID,
        ecaId: eca,
      })

      setOpen(false)

      if (status === 201) {
        toast.success(message)
        form.reset()
        refresh()
        return
      }

      toast.error(message)
      setError({ active: true, message: message })
      return
    })
  })

  if (isMobile)
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>
          <Button
            disabled={isPending}
            size='full'
          >
            Inscribirse
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <ScrollArea className='px-6 pb-4 w-full h-[540px] space-y-6'>
            <DrawerHeader>
              <DrawerTitle>¡Primero ingresa tus datos!</DrawerTitle>
              <DrawerDescription>
                Al ingresar los datos estaras inscripto en el curso. Esta atento
                que podemos comunicarnos con usted.
              </DrawerDescription>
            </DrawerHeader>

            <Form {...form}>
              <form
                id='inscription-form'
                onSubmit={onSubmit}
                className='grid gap-6'
              >
                <div className='space-y-6'>
                  <h2 className='text-base font-bold'>Datos personales</h2>

                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='firstNames'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='line-clamp-1'>
                            Nombres
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder='Miguel Angel'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='lastNames'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='line-clamp-1'>
                            Apellidos
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder='Garcia Jimenez'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='line-clamp-1'>
                            Número de teléfono
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              disabled={isPending}
                              placeholder='34567890'
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
                          <FormLabel className='line-clamp-1'>
                            Correo electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              disabled={isPending}
                              placeholder='miguelangel1047@email.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    <FormField
                      control={form.control}
                      name='documentId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='line-clamp-1'>
                            Documento
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              disabled={isPending}
                              placeholder='#########'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='dateOfBorn'
                      render={({ field }) => {
                        const DATE = formatDateToString(field.value)

                        return (
                          <FormItem>
                            <FormLabel className='flex items-start line-clamp-1'>
                              Fecha de nacimiento
                            </FormLabel>
                            <FormControl>
                              <InputDate
                                aria-label='Fecha de nacimiento'
                                value={parseDate(DATE)}
                                onChange={(value) => {
                                  return field.onChange(value?.toString())
                                }}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='province'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-start'>
                            Departamento
                          </FormLabel>
                          <Select
                            disabled={isPending}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Selec. un departamento' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Departamentos</SelectLabel>
                                <SelectSeparator />

                                {SELECT_DEPARTAMENTS.map((provice) => (
                                  <SelectItem
                                    key={provice.value}
                                    value={provice.value}
                                  >
                                    {provice.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-start'>
                            Dirección
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder='Av. Juan Pablo II'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <h2 className='text-base font-bold'>Datos educativos</h2>

                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='lastNameInstitution'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ultima institución</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder='Universidad de Montevideo'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='educationalLevel'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nivel educativo</FormLabel>
                          <FormControl>
                            <Select
                              disabled={isPending}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Selecciona un nivel educativo' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Niveles</SelectLabel>
                                  <SelectSeparator />
                                  {EDUCATIONAL_LEVELS.map((level) => (
                                    <SelectItem
                                      key={level.value}
                                      value={level.value}
                                    >
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>

            <DrawerFooter className='grid px-0'>
              <Button
                disabled={isPending}
                form='inscription-form'
              >
                Enviar
              </Button>

              <DrawerClose asChild>
                <Button variant='outline'>Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    )

  return (
    <div className='flex flex-1 flex-col space-y-2'>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button disabled={isPending}>Inscribirse</Button>
        </DialogTrigger>
        <DialogContent className='max-w-[950px] w-full'>
          <DialogHeader>
            <DialogTitle>¡Primero ingresa tus datos!</DialogTitle>
            <DialogDescription>
              Al ingresar los datos estaras inscripto en el curso. Esta atento
              que podemos comunicarnos con usted.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              id='inscription-form'
              onSubmit={onSubmit}
              className='grid gap-5'
            >
              <div className='space-y-4'>
                <h2 className='text-base font-bold'>Datos personales</h2>

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='firstNames'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='line-clamp-1'>Nombres</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder='Miguel Angel'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='lastNames'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='line-clamp-1'>
                          Apellidos
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder='Garcia Jimenez'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='phoneNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='line-clamp-1'>
                          Número de teléfono
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            disabled={isPending}
                            placeholder='34567890'
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
                        <FormLabel className='line-clamp-1'>
                          Correo electrónico
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            disabled={isPending}
                            placeholder='miguelangel1047@email.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                  <FormField
                    control={form.control}
                    name='documentId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='line-clamp-1'>
                          Documento
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            disabled={isPending}
                            placeholder='#########'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='dateOfBorn'
                    render={({ field }) => {
                      const DATE = formatDateToString(field.value)

                      return (
                        <FormItem>
                          <FormLabel className='flex items-start line-clamp-1'>
                            Fecha de nacimiento
                          </FormLabel>
                          <FormControl>
                            <InputDate
                              aria-label='Fecha de nacimiento'
                              value={parseDate(DATE)}
                              onChange={(value) => {
                                return field.onChange(value?.toString())
                              }}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />

                  <FormField
                    control={form.control}
                    name='province'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-start'>
                          Departamento
                        </FormLabel>
                        <Select
                          disabled={isPending}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Selec. un departamento' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Departamentos</SelectLabel>
                              <SelectSeparator />

                              {SELECT_DEPARTAMENTS.map((provice) => (
                                <SelectItem
                                  key={provice.value}
                                  value={provice.value}
                                >
                                  {provice.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-start'>
                          Dirección
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder='Av. Juan Pablo II'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='space-y-4'>
                <h2 className='text-base font-bold'>Datos educativos</h2>

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='lastNameInstitution'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ultima institución</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder='Universidad de Montevideo'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='educationalLevel'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nivel educativo</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isPending}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Selecciona un nivel educativo' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Niveles</SelectLabel>
                                <SelectSeparator />
                                {EDUCATIONAL_LEVELS.map((level) => (
                                  <SelectItem
                                    key={level.value}
                                    value={level.value}
                                  >
                                    {level.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>

          <DialogFooter>
            <Button
              disabled={isPending}
              form='inscription-form'
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ErrorCard
        delay={5000}
        message={error.message}
        status={error.active}
        onChange={setError}
      />
    </div>
  )
}
