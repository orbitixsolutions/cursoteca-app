'use client'

import { useEffect, useTransition } from 'react'
import { CourseFormProps } from './course-form.type'
import { useParams, useRouter } from 'next/navigation'
import { getEcaName } from '@/helpers/get-eca-name'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateCourseSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SheetFormWrapper } from '@/components/sheet-from-wrapper'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TextEditor } from '@/components/shared/dashboard/text-editor'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { updateCourse } from '@/app/[eca]/dashboard/courses/_services/update'
import { createCourse } from '@/app/[eca]/dashboard/courses/_services/create'
import { DialogDrop } from '@/components/dialog-drop/dialog-drop'
import { useUploadImageToCloud } from '@/services/upload-core/use-upload-to-cloud'

export const COURSE_CATEGORIES = [
  {
    name: 'none',
    value: 'NONE',
    label: 'Ninguno',
  },
  {
    name: 'logistics',
    value: 'LOGISTICS',
    label: 'Logistica',
  },
  {
    name: 'pharmaceuticals',
    value: 'PHARMACEUTICALS',
    label: 'Farmaceútica',
  },
  {
    name: 'others',
    value: 'OTHERS',
    label: 'Otros',
  },
]

export function CourseForm(props: CourseFormProps) {
  const { id } = props

  const IS_EDITING = !!id

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()
  const { handleUpload } = useUploadImageToCloud()

  const { eca } = useParams<{ eca: string }>()
  const { DOMAIN } = getEcaName(eca)

  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'NONE',
      isVisible: false,
      eca: DOMAIN,
    },
  })

  useEffect(() => {
    if (IS_EDITING) {
      startTransition(async () => {
        const res = await fetch(`/api/v0/admin/courses/${id}`)
        const DATA = await res.json()

        if (!res.ok) return

        form.setValue('title', DATA.title)
        form.setValue('description', DATA.description)
        form.setValue('category', DATA.category)
        form.setValue('eca', DATA.ecaId)
        form.setValue('isVisible', DATA.isVisible)
      })
    }
  }, [IS_EDITING, id, form])

  const IS_SUBMITTED = form.formState.isSubmitSuccessful

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateCourse(values, id)

        if (status === 201) {
          handleUpload({ id, folder: 'courses', path: 'course' })
          toast.success(message)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const COURSE_ID = crypto.randomUUID()
      const { status, message } = await createCourse(values, COURSE_ID)

      if (status === 201) {
        toast.success(message)
        form.reset()
        handleUpload({ id: COURSE_ID, folder: 'courses', path: 'course' })
        refresh()

        return
      }
    })
  })

  return (
    <SheetFormWrapper
      title={IS_EDITING ? 'Editar curso' : 'Agregar curso'}
      formId='course-form'
      isSubmitted={IS_SUBMITTED}
      isEditing={IS_EDITING}
      disabled={isPending}
    >
      <Form {...form}>
        <form
          id='course-form'
          onSubmit={onSubmit}
          className='grid gap-4 py-7'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
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
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorías</FormLabel>
                <Select
                  disabled={isPending}
                  value={field.value}
                  defaultValue='none'
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona una categoría' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorías</SelectLabel>
                      <SelectSeparator />
                      {COURSE_CATEGORIES.map((category) => (
                        <SelectItem
                          value={category.value}
                          key={category.value}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Imagen</FormLabel>
            <DialogDrop isLoading={isPending} />
          </FormItem>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <TextEditor
                    initialValue={field.value}
                    onChange={field.onChange}
                    isLoading={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='isVisible'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between gap-4 rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel>Visible para todos</FormLabel>
                  <FormDescription>
                    Permite que todos los estudiantes vean este contenido.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </SheetFormWrapper>
  )
}
