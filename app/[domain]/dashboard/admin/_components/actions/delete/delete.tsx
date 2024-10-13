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
import { useTransition } from 'react'
import { deleteAdmin } from '@/app/[domain]/dashboard/admin/_services/delete'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Delete(props: DeleteProps) {
  const { id } = props

  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      const { status, message } = await deleteAdmin(id)
      if (status === 201) {
        toast.success(message)
        refresh()

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
            ¿Estas seguro que deseas eliminar este administrador?
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
