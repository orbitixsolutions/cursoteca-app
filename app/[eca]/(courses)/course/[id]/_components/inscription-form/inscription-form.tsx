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
import { createStudent } from '@/app/[eca]/(courses)/course/[id]/_services/create'
import { z } from 'zod'
import { es } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { StudentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { EDUCATIONAL_LEVELS, SELECT_PROVINCES } from '@/constants'
import { useParams, useRouter } from 'next/navigation'
import { getEcaName } from '@/helpers/get-eca-name'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { toast } from 'sonner'

export function InscriptionForm() {
  const [documentId, saveDocumentId] = useLocalStorage('documentId', '')
  const [isPending, startTransition] = useTransition()

  const { eca } = useParams<{ eca: string }>()
  const { refresh } = useRouter()

  const { DOMAIN } = getEcaName(eca)

  const STUDENT = documentId !== ''
  const API_URL = `/api/v0/admin/students`

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      firstNames: '',
      lastNames: '',
      phoneNumber: '',
      email: '',
      eca: DOMAIN,
      documentId: '',
      dateOfBorn: new Date(),
      province: '',
      address: '',
      lastNameInstitution: '',
      educationalLevel: 'NONE',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const DOCUMENT_ID = values.documentId

      const res = await fetch(`${API_URL}/${DOCUMENT_ID}`)
      const DATA = await res.json()

      if (DATA) {
        saveDocumentId(DOCUMENT_ID)
        return
      }

      if (!STUDENT) {
        const { status, message } = await createStudent(values)

        if (status === 201) {
          toast.success(message)
          form.reset()

          saveDocumentId(DOCUMENT_ID)
          refresh()

          return
        }

        toast.error(message)
        return
      }
    })
  })

  useEffect(() => {
    if (STUDENT) {
      fetch(`${API_URL}/${documentId}`).then((res) =>
        res.json().then((DATA) => {
          if (!DATA) return

          saveDocumentId(DATA.documentId)
        })
      )
    }
  }, [documentId, form, STUDENT, API_URL, saveDocumentId])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Inscribirse</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[950px] w-full'>
        <DialogHeader>
          <DialogTitle>¡Primero ingresa tus datos!</DialogTitle>
          <DialogDescription>
            Una vez que ingreses tus datos podras acceder al curso.
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
                      <FormLabel>Nombres</FormLabel>
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
                      <FormLabel>Apellidos</FormLabel>
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
                      <FormLabel>Número de teléfono</FormLabel>
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
                      <FormLabel>Correo electrónico</FormLabel>
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
              <div className='grid grid-cols-4 gap-4'>
                <FormField
                  control={form.control}
                  name='documentId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento</FormLabel>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de nacimiento</FormLabel>
                      <FormControl>
                        <DatePicker
                          disabled={isPending}
                          locale={es}
                          placeholder='Selecciona una fecha'
                          value={field.value}
                          onChange={field.onChange}
                          disableFutureDates
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='province'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provincia</FormLabel>
                      <Select
                        disabled={isPending}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecciona una provincia' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Provincias</SelectLabel>
                            <SelectSeparator />

                            {SELECT_PROVINCES.map((provice) => (
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
                      <FormLabel>Dirección</FormLabel>
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
  )
}
