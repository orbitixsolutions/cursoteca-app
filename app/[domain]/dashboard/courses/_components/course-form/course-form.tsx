'use client'

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
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'
import { z } from 'zod'
import { SheetFormWrapper } from '@/components/sheet-from-wrapper'
import { COURSE_CATEGORIES } from '@/constants'
import { Input } from '@/components/ui/input'
import { CourseSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { getCourseById } from '@/app/[domain]/dashboard/courses/_services/fetch'
import { updateCourse } from '@/app/[domain]/dashboard/courses/_services/update'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/text-area'
import { createCourse } from '@/app/[domain]/dashboard/courses/_services/create'
import { CourseFormProps } from '@/app/[domain]/dashboard/courses/_components/course-form/course-form.type'
import { DialogDrop } from '@/components/dialog-drop/dialog-drop'
import { createId } from '@paralleldrive/cuid2'
import { useUploadImageToCloud } from '@/hooks/use-upload-to-cloud'
import { useStore } from '@/services/store/use-store'
import { useFileImage } from '@/services/store/use-file-image'
import { toast } from 'sonner'

export function CourseForm(props: CourseFormProps) {
  const { id } = props

  const FILE_STORE = useStore(useFileImage, (state) => state)
  const { handleUpload } = useUploadImageToCloud()

  const { domain } = useParams<{ domain: string }>()
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const IS_EDITING = !!id
  const ECA_NAME = decodeURIComponent(domain)

  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: '',
      description: '',
      isVisible: false,
      category: undefined,
      ecaId: ECA_NAME,
    },
  })

  useEffect(() => {
    startTransition(async () => {
      if (IS_EDITING) {
        const DATA = await getCourseById({ id })
        if (!DATA) return

        form.setValue('title', DATA.title)
        form.setValue('description', DATA.description)
        form.setValue('category', DATA.category)
        form.setValue('ecaId', DATA.ecaId)
      }
    })
  }, [IS_EDITING, id, form])

  const onSubmit = form.handleSubmit((values) => {
    const courseId = createId()

    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateCourse(values, id)

        if (status === 201) {
          toast.success(message)
          handleUpload({ id, folder: 'courses', path: 'course' })
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createCourse(values, courseId)

      if (status === 201) {
        toast.success(message)
        form.reset()
        handleUpload({ id: courseId, folder: 'courses', path: 'course' })
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <SheetFormWrapper
      title={IS_EDITING ? 'Editar curso' : 'Crear curso'}
      description={
        IS_EDITING
          ? 'Edita los datos del curso.'
          : 'Ingresa los datos del curso.'
      }
      formId='edit-course'
      isEditing={IS_EDITING}
      disabled={isPending}
    >
      <Form {...form}>
        <form
          id='edit-course'
          onSubmit={onSubmit}
          className='grid gap-4 px-1 py-4'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Título del curso'
                    disabled={isPending}
                  />
                </FormControl>
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
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorías</FormLabel>
                <Select
                  disabled={isPending}
                  value={field.value}
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

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Descripción del curso'
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
