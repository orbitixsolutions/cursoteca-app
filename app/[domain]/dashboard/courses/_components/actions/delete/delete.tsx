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
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { DeleteProps } from '@/app/[domain]/dashboard/admin/_components/actions/delete/delete.type'
import { deleteCourse } from '@/app/[domain]/dashboard/courses/_services/delete'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { deleteImage } from '@/services/utils/delete-image'
import { toast } from 'sonner'

export function Delete(props: DeleteProps) {
  const { id } = props

  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      const { status, message } = await deleteCourse(id)
      if (status === 201) {
        refresh()
        toast.success(message)
        deleteImage({ itemId: id, folder: 'courses', path: 'course' })
        return
      }

      toast.error(message)
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='icon'
          variant='destructive'
          disabled={isPending}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro que deseas eliminar este curso?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Una vez eliminado esta accion no se puede revertir. Si esta seguro,
            presiona continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
