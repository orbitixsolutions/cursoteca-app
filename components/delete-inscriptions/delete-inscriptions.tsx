import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { deleteInscriptions } from '@/app/[eca]/dashboard/inscriptions/_services/delete'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { DeleteInscriptionsProps } from '@/components/delete-inscriptions/delete-inscriptions.type'
import { AnimatePresence } from 'framer-motion'
import { MotionDiv } from '@/components/motion/components'
import { toast } from 'sonner'

export function DeleteInscriptions(props: DeleteInscriptionsProps) {
  const { items } = props
  const NEW_ITEMS = items.map((item) => item.id)

  const CURRENT_ROWS = items.length === 0
  const CURRENT_ITEMS = items.length

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const onDeleteItems = () => {
    startTransition(async () => {
      const { status, message } = await deleteInscriptions(NEW_ITEMS)
      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return (
    <AnimatePresence>
      {!CURRENT_ROWS && (
        <MotionDiv
          key='delete-inscriptions'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className='fixed max-w-[720px] w-full mx-auto bottom-24 left-[16rem] right-0 bg-card p-4 rounded-lg shadow-2xl shadow-destructive/15 border border-destructive/20'
        >
          <div className='container mx-auto flex items-center justify-between'>
            <p className='text-sm'>
              <span className='font-bold text-destructive'>
                {CURRENT_ITEMS}
              </span>{' '}
              Inscripito(s) seleccionado(s)
            </p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro/a?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Si estas seguro/a,
                    presiona el botón de eliminar.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDeleteItems}
                    disabled={isPending}
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
