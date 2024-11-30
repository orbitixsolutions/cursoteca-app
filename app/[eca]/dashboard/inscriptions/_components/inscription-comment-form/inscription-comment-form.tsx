import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useState, useTransition } from 'react'
import { InscriptionCommentFormProps } from '@/app/[eca]/dashboard/inscriptions/_components/inscription-comment-form/inscription-comment-form.type'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InscriptionComentSchema } from '@/schemas'
import { createInscriptionComment } from '@/app/[eca]/dashboard/inscriptions/_services/create'
import { TextEditor } from '@/components/shared/dashboard/text-editor'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Check, X } from 'lucide-react'

export function InscriptionCommentForm(props: InscriptionCommentFormProps) {
  const { id } = props

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof InscriptionComentSchema>>({
    resolver: zodResolver(InscriptionComentSchema),
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await createInscriptionComment(values, id)

      if (status === 201) {
        toast.success(message)
        form.reset()
        setIsOpen(false)
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button>Agregar comentario</Button>
      </PopoverTrigger>
      <PopoverContent className='w-[480px] space-y-2'>
        <Form {...form}>
          <form
            id='inscription-comment-form'
            onSubmit={onSubmit}
          >
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextEditor
                      initialValue={field.value}
                      onChange={field.onChange}
                      isLoading={isPending}
                      placeholder='Escribe un comentario'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <div className='flex items-center justify-end gap-2'>
            <div className='flex items-center gap-2'>
              <Button
                form='inscription-comment-form'
                type='reset'
                size='icon'
                variant='secondary'
                disabled={isPending}
                onClick={() => setIsOpen(false)}
              >
                <X />
              </Button>
              <Button
                form='inscription-comment-form'
                type='submit'
                size='icon'
                disabled={isPending}
              >
                <Check />
              </Button>
            </div>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
